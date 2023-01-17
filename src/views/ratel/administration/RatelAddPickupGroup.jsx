/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { CCallout, CCol, CFormSelect, CRow, CSpinner } from '@coreui/react'
import { Field } from 'react-final-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { CippWizard } from 'src/components/layout'
import PropTypes from 'prop-types'
import { RFFCFormInput, RFFCFormSelect, RFFCFormTextarea } from 'src/components/forms'
import { TenantSelector } from 'src/components/utilities'
import { useLazyGenericPostRequestQuery } from 'src/store/api/app'
import {
  useListDeviceLocationsQuery,
  useListDeviceContactsQuery,
  useListDeviceModelsQuery,
} from 'src/store/api/ratelDevices'
import { useListDidsQuery } from 'src/store/api/ratelDids'

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

const AddPickupGroup = () => {
  const [genericPostRequest, postResults] = useLazyGenericPostRequestQuery()
  const [formFields, setFormFields] = useState(<></>)
  const [deviceType, setDeviceType] = useState('Generic')
  const [dialplanType, setDialplanType] = useState('Default')
  const [callerIdType, setCallerIdType] = useState('Default')
  const [callerIdField, setCallerIdField] = useState(<></>)
  const [dialplanField] = useState(
    <>
      <CRow>
        <RFFCFormTextarea name="Dialplan" label="Edit Dialplan" />
      </CRow>
    </>,
  )
  const tenantDomain = useSelector((state) => state.app.currentTenant.customerId)

  const handleSubmit = async (values) => {
    const shippedValues = {
      TenantFilter: tenantDomain,
      Extensions: values.Extensions,
      Groups: values.Groups,
      Type: values.Type,
    }

    alert(JSON.stringify(values, null, 2))
    genericPostRequest({ path: '/api/LtAddRatelPickupGroup', values: shippedValues })
  }

  return (
    <CippWizard onSubmit={handleSubmit} wizardTitle="Add Ratel Device Wizard">
      <CippWizard.Page
        title="Tenant Choice"
        description="Choose the tenant to add a pickup group to"
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
        title="Pickup Group Information"
        description="Enter the pickup group information"
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
            <CCol lg={6} xs={12}>
              <RFFCFormSelect
                name="Type"
                label="Type"
                placeholder={'Select Type'}
                values={[
                  { value: 'Pickup', label: 'Pickup' },
                  { value: 'Call', label: 'Call' },
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

export default AddPickupGroup
