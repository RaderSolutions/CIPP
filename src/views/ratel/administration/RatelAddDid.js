/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { CCallout, CCol, CRow, CSpinner, CListGroup, CListGroupItem } from '@coreui/react'
import { Field, FormSpy, useForm, useFormState } from 'react-final-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { CippWizard } from 'src/components/layout'
import PropTypes, { array } from 'prop-types'
import { RFFCFormInput, RFFCFormSelect, RFFCFormSwitch, Condition } from 'src/components/forms'
import { TenantSelector } from 'src/components/utilities'
import { useLazyGenericPostRequestQuery } from 'src/store/api/app'
import { useListDidsQuery } from 'src/store/api/ratelDids'
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

  const onSubmit = async (values) => {
    console.log('values', values)
  }

const AddRatelDid = ({ children }) => {
return (
    <CippWizard
    // initialValues={{
    //     ...formValues }}
    onSubmit={onSubmit}
    wizardTitle="Add Ratel DID Wizard"
    >
    <CippWizard.Page
     title="Select Tenant"
     description="Choose the tenant to add the DID to"       
    >
        <center>
        <h3 className="text-primary">Step 1</h3>
        <h5 className="card-title mb-4">Choose a tenant</h5>
        </center>
        <hr className="my-4" />
        <Field name="selectedTenants">{(props) => <TenantSelector />}</Field>
        <Error name="selectedTenants" />
        <hr className="my-4" />
    </CippWizard.Page>
    <CippWizard.Page title="Select Device Type" description="Choose the type of device to add">
        <center>
          <h3 className="text-primary">Step 2</h3>
          <h5>Choose Did Type</h5>
        </center>
        <hr className="my-4" />
        <div className="mb-2"></div>
        <br></br>
        <center>
          <CRow>
            <CCol lg={6} xs={12}>
              <RFFCFormSelect
                name="DidType"
                values={[
                  { value: 'Device', label: 'Device' },
                  { value: 'IncomingDialplan', label: 'Incoming Dialplan' },
                  { value: 'ConferenceBridge', label: 'Conference Bridge' },
                ]}
                placeholder="Select an option"
                label="Select Did Type:"
              />
            </CCol>
            {/* <CCol lg={6} xs={12}>
              <RFFCFormSelect
                name="DialplanType"
                label="Select Dialplan Type:"
                placeholder="Select an option"
                values={[
                  { value: 'Default', label: 'Default' },
                  { value: 'Custom', label: 'Custom' },
                ]}
                //disabled={formDIsabled}
              />
            </CCol>
            <CCol lg={6} xs={12}>
              <RFFCFormSelect
                name="CallerIDType"
                label="Select CallerID Type:"
                placeholder="Select an option"
                values={[
                  { value: 'Default', label: 'Default' },
                  { value: 'Custom', label: 'Custom' },
                ]}
                //disabled={formDIsabled}
              />
            </CCol> */}
          </CRow>
        </center>
        <hr className="my-4" />
      </CippWizard.Page>
    </CippWizard>
)
}

export default AddRatelDid