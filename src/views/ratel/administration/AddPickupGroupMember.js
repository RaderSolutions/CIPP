/* eslint-disable prettier/prettier */
import React from 'react'
import { CCallout, CCol, CRow, CSpinner, CListGroup, CListGroupItem } from '@coreui/react'
import { Field, FormSpy, useFormState } from 'react-final-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { CippWizard } from 'src/components/layout'
import PropTypes from 'prop-types'
import { RFFCFormInput, RFFCFormSelect, RFFCFormTextarea } from 'src/components/forms'
import { TenantSelector } from 'src/components/utilities'
import { useLazyGenericPostRequestQuery } from 'src/store/api/app'
import { useSelector } from 'react-redux'

// const Error = ({ name }) => (
//   <Field
//     name={name}
//     subscription={{ touched: true, error: true }}
//     render={({ meta: { touched, error } }) =>
//       touched && error ? (
//         <CCallout color="danger">
//           <FontAwesomeIcon icon={faExclamationTriangle} color="danger" />
//           {error}
//         </CCallout>
//       ) : null
//     }
//   />
// )

// Error.propTypes = {
//   name: PropTypes.string.isRequired,
// }

const AddPickupGroupMember = () => {
  const [genericPostRequest, postResults] = useLazyGenericPostRequestQuery()

  const tenantDomain = useSelector((state) => state.app.currentTenant.customerId)

  const handleSubmit = async (values) => {
    const shippedValues = {
      TenantFilter: tenantDomain,
      Extension: values.Extension,
      Type: values.Type,
      Groups: values.Groups,
      IsSyncScheduled: 1,
    }

    alert(JSON.stringify(values, null, 2))
    genericPostRequest({ path: '/api/LtRatelPickupGroups', values: shippedValues })
  }

  return (
    <CippWizard onSubmit={handleSubmit} wizardTitle="Add Ratel Pickup Group Member Wizard">
      <CippWizard.Page
        title="Tenant Choice"
        description="Choose the tenant to add a pickup group member to"
      >
        <center>
          <h3 className="text-primary">Step 1</h3>
          <h5 className="card-title mb-4">Choose a tenant</h5>
        </center>
        <hr className="my-4" />
        <Field name="selectedTenants">{(props) => <TenantSelector />}</Field>
        {/* <Error name="selectedTenants" /> */}
        <hr className="my-4" />
      </CippWizard.Page>
      <CippWizard.Page
        title="Pickup Group Member Information"
        description="Enter the pickup group member information"
      >
        <center>
          <h3 className="text-primary">Step 2</h3>
          <h5>Enter Pickup Group Information</h5>
        </center>
        <hr className="my-4" />
        <div className="mb-2">
          <CRow>
            <CCol lg={6} xs={12}>
              <RFFCFormInput
                type="text"
                name="Extension"
                label="Extension"
                //disabled={formDIsabled}
              />
            </CCol>
            {/* TODO: discuss w SW */}
            <CCol lg={6} xs={12}>
              <RFFCFormInput
                type="text"
                name="Groups"
                label="Group Name"
                //disabled={formDIsabled}
              />
            </CCol>
            <CCol lg={6} xs={12}>
              <RFFCFormSelect
                name="Type"
                label="Type"
                placeholder={'Select Type'}
                values={[
                  { value: 'pickup', label: 'Pickup' },
                  { value: 'call', label: 'Call' },
                ]}
                //disabled={formDIsabled}
              />
            </CCol>
          </CRow>
        </div>
        <hr className="my-4" />
      </CippWizard.Page>
      <CippWizard.Page title="Review and Confirm" description="Confirm the settings to apply">
        <center>
          <h3 className="text-primary">Step 3</h3>
          <h5 className="mb-4">Confirm and apply</h5>
          <hr className="my-4" />
          {!postResults.isFetching && !postResults.isSuccess && (
            <FormSpy subscription={{ values: true, labels: true }}>
              {
                (props) => {
                  const formState = useFormState()
                  const valuesArray = Object.keys(formState.values)?.map((key) => {
                    return { key, value: formState.values[key] }
                  })
                  let extensionKey 
                   extensionKey = valuesArray.find((item) => item.key === 'Extension')
                  let groupsKey 
                  groupsKey= valuesArray.find((item) => item.key === 'Groups')
                  let typeKey 
                  typeKey = valuesArray.find((item) => item.key === 'Type')

                 return <CListGroup>
                  {
                    extensionKey && <CListGroupItem>
                      {`Extension: ${extensionKey.value}`}
                    </CListGroupItem>
                  }
                  {
                    groupsKey && <CListGroupItem>
                      {`Groups: ${groupsKey.value}`}
                    </CListGroupItem>
                  }
                  {
                    typeKey && <CListGroupItem>
                      {`Type: ${typeKey.value}`}
                    </CListGroupItem>
                  }
                 </CListGroup>
                }
              }
            </FormSpy>
          )}
          {postResults.isFetching && (
            <CCallout color="info">
              <CSpinner>Loading</CSpinner>
            </CCallout>
          )}
          {postResults.isSuccess && <CCallout color="success">{postResults.data.Results}</CCallout>}
        </center>
        <hr className="my-4" />
      </CippWizard.Page>
    </CippWizard>
  )
}

export default AddPickupGroupMember
