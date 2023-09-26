/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { CCallout, CCol, CRow, CSpinner, CListGroup, CListGroupItem } from '@coreui/react'
import { Field, FormSpy, useForm, useFormState } from 'react-final-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { CippWizard } from 'src/components/layout'
import PropTypes, { array } from 'prop-types'
import { RFFCFormInput, RFFCFormSelect, RFFCFormSwitch, Condition, RFFCFormTextarea } from 'src/components/forms'
import { TenantSelector } from 'src/components/utilities'
import { useLazyGenericPostRequestQuery } from 'src/store/api/app'
import { useListDidsQuery } from 'src/store/api/ratelDids'
import { useListDevicesQuery } from 'src/store/api/ratelDevices'
import { useListVariablesQuery, useListVariableQuery } from 'src/store/api/ratelVariables'
import { useSelector } from 'react-redux'

const Error = ({ name }) => (
    <Field
      name={name}
      subscription={{ touched: true, error: true }}
      render={({ meta: { touched, error } }) =>
        touched && error ? (
          <CCallout color="danger">
            <FontAwesomeIcon icon={faExclamationTriangle} color="danger" />
            {error}
          </CCallout>
        ) : null
      }
    />
  )

  Error.propTypes = {
    name: PropTypes.string.isRequired,
  }

export const AddRatelVariable = ({ children }) => {
    const tenantDomain = useSelector((state) => state.app.currentTenant.customerId)
    // const values = useFormState().values
//     const {
//         data: variables = [],
//         isFetching: isFetchingVariables,
//         error: variablesError,
//     } = useListVariablesQuery({ tenantDomain})
    
// useEffect(()=>{
//     console.log('variables', variables)
// },[variables])
    const [genericPostRequest, postResults ] = useLazyGenericPostRequestQuery()

    const onSubmit = async (values) => {
      console.log('values', values)
    }

  return (
    <CippWizard
    onSubmit={onSubmit}
    wizardTitle="Add Ratel Variable"
    >
        <CippWizard.Page>
        <center>
        <h3 className="text-primary">Step 1</h3>
        <h5 className="card-title mb-4">Choose a tenant</h5>
        </center>
        <hr className="my-4" />
        <Field name="selectedTenants">{(props) => <TenantSelector />}</Field>
        <Error name="selectedTenants" />
        <hr className="my-4" />
        </CippWizard.Page> 
        <CippWizard.Page title="Input Family" description="Input Family To Fetch Avaialable Values">
        <center>
          <h3 className="text-primary">Step 2</h3>
          <h5>Input Family</h5>
        </center>
        <CRow>
            <CCol lg={6} xs={12}>
              <RFFCFormInput
                label="Family"
                name="family"
                placeholder="Input Family"
                />
                </CCol>
                <CCol lg={6} xs={12}>
                <RFFCFormInput
                label="Key"
                name="key"
                placeholder="Input Key"
                />
                </CCol>
                <CCol lg={6} xs={12}>
                <RFFCFormInput
                label="Value"
                name="value"
                placeholder="Input Value"
                />
                </CCol>
        </CRow>
        </CippWizard.Page>
        <CippWizard.Page title="Confirm">
        <FormSpy subscription={{ values: true, labels: true }}>
            {
                
                (props) => {
                    const { values } = props
                   
                    return (
                        <div>
                            test
                        </div>
                    )
                }
            }
        </FormSpy>
        </CippWizard.Page>

            
    </CippWizard>
  )
}

export default AddRatelVariable