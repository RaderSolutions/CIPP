/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { CCallout, CCol, CRow, CSpinner } from '@coreui/react'
import { Field } from 'react-final-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

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
// import Select from 'react-select'
import { required } from 'src/validators'

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

const AddRatelDevice = ({ children }) => {
  const [genericPostRequest, postResults] = useLazyGenericPostRequestQuery()
  const [formFields, setFormFields] = useState('')
  const [dialplanFormFields, setDialplanFormFields] = useState(<></>)
  const [deviceType, setDeviceType] = useState('User')
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
  const {
    data: deviceLocations = {},
    isFetching: deviceLocationsAreFetching,
    error: deviceLocationsError,
  } = useListDeviceLocationsQuery({ tenantDomain })

  const {
    data: deviceContacts = {},
    isFetching: deviceContactsAreFetching,
    error: deviceContactsError,
  } = useListDeviceContactsQuery({ tenantDomain })

  const {
    data: deviceModels = {},
    isFetching: deviceModelsAreFetching,
    error: deviceModelsError,
  } = useListDeviceModelsQuery()

  const {
    data: deviceDids = {},
    isFetching: deviceDidsAreFetching,
    error: deviceDidsError,
  } = useListDidsQuery({ tenantDomain })

  const genericFields = (
    <>
      <CRow>
        <CCol lg={6} xs={12}>
          <RFFCFormInput type="text" name="MacAddress" label="MAC Address" />
        </CCol>
        <CCol lg={6} xs={12}>
          <RFFCFormInput
            type="text"
            name="ExtensionNumber"
            label="Extension Number"
            //disabled={formDIsabled}
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol lg={6} xs={12}>
          {deviceLocationsAreFetching && <CSpinner />}
          {!deviceLocationsAreFetching && (
            <RFFCFormSelect
              name="Location"
              label="Device Location"
              placeholder={!deviceLocationsAreFetching ? 'Select Location' : 'Loading...'}
              values={deviceLocations?.map((deviceLocation) => ({
                value: deviceLocation.locationId,
                label: deviceLocation.Name,
              }))}
              //disabled={formDIsabled}
            />
          )}
          {deviceLocationsError && <span>Failed to load list of client locations</span>}
        </CCol>
        <CCol lg={6} xs={12}>
          {deviceModelsAreFetching && <CSpinner />}
          {!deviceModelsAreFetching && (
            <RFFCFormSelect
              name="ModelId"
              label="Device Model"
              placeholder={!deviceModelsAreFetching ? 'Select Model' : 'Loading...'}
              values={deviceModels?.map((deviceModel) => ({
                value: deviceModel.modelId,
                label: deviceModel.Name,
              }))}
              //disabled={formDIsabled}
            />
          )}
          {deviceModelsError && <span>Failed to load list of device models</span>}
        </CCol>
      </CRow>
      <CRow>
        <CCol lg={6} xs={12}>
          <RFFCFormInput
            type="text"
            name="FopGroup"
            label="FOP Group"
            //disabled={formDIsabled}
          />
        </CCol>
        <CCol lg={6} xs={12}>
          <RFFCFormInput
            type="text"
            name="Label"
            label="Label"
            //disabled={formDIsabled}
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol lg={6} xs={12}>
          <RFFCFormSelect
            type="text"
            name="HideFromPhonebook"
            label="Hide From Phonebook?"
            placeholder="Select an option"
            values={[
              { value: 1, label: 'true' },
              { value: 0, label: 'false' },
            ]}
            //disabled={formDIsabled}
          />
        </CCol>
        <CCol lg={6} xs={12}>
          <RFFCFormInput
            type="text"
            name="EmailAddress"
            label="Voicemail Email"
            //disabled={formDIsabled}
          />
        </CCol>
      </CRow>
    </>
  )

  const userFields = (
    <>
      <CRow>
        <CCol lg={6} xs={12}>
          <RFFCFormInput type="text" name="MacAddress" label="MAC Address" />
        </CCol>
        <CCol lg={6} xs={12}>
          <RFFCFormInput
            type="text"
            name="ExtensionNumber"
            label="Extension Number"
            //disabled={formDIsabled}
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol lg={6} xs={12}>
          {deviceLocationsAreFetching && <CSpinner />}
          {!deviceLocationsAreFetching && (
            <RFFCFormSelect
              name="Location"
              label="Device Location"
              placeholder={!deviceLocationsAreFetching ? 'Select Location' : 'Loading...'}
              values={deviceLocations?.map((deviceLocation) => ({
                value: deviceLocation.locationId,
                label: deviceLocation.Name,
              }))}
              //disabled={formDIsabled}
            />
          )}
          {deviceLocationsError && <span>Failed to load list of client locations</span>}
        </CCol>
        <CCol lg={6} xs={12}>
          {deviceModelsAreFetching && <CSpinner />}
          {!deviceModelsAreFetching && (
            <RFFCFormSelect
              name="ModelId"
              label="Device Model"
              placeholder={!deviceModelsAreFetching ? 'Select Model' : 'Loading...'}
              values={deviceModels?.map((deviceModel) => ({
                value: deviceModel.modelId,
                label: deviceModel.Name,
              }))}
              //disabled={formDIsabled}
            />
          )}
          {deviceModelsError && <span>Failed to load list of device models</span>}
        </CCol>
      </CRow>
      <CRow>
        <CCol lg={6} xs={12}>
          <RFFCFormInput
            type="text"
            name="FopGroup"
            label="FOP Group"
            //disabled={formDIsabled}
          />
        </CCol>
        <CCol lg={6} xs={12}>
          {deviceContactsAreFetching && <CSpinner />}
          {!deviceContactsAreFetching && (
            <RFFCFormSelect
              name="ContactID"
              label="Device Contact"
              placeholder={!deviceContactsAreFetching ? 'Select Contact' : 'Loading...'}
              values={deviceContacts?.map((deviceContact) => ({
                value: deviceContact.ContactID,
                label: deviceContact.Name,
              }))}
              //disabled={formDIsabled}
            />
          )}
          {deviceContactsError && <span>Failed to load list of client contacts</span>}
        </CCol>
      </CRow>
    </>
  )

  const customCallerIDcustomDialplan = (
    <div>
      <CRow>
        {callerIdField}
        {dialplanField}
      </CRow>
    </div>
  )

  const defaultCallerIDcustomDialplan = dialplanField

  const customCallerIDdefaultDialplan = <div>{callerIdField}</div>

  useEffect(() => {
    if (deviceDids) {
      setCallerIdField(
        <>
          <CRow>
            <CCol lg={6} xs={12}>
              {deviceDidsAreFetching && <CSpinner />}
              {!deviceDidsAreFetching && (
                <RFFCFormSelect
                  name="Did"
                  label="Choose Caller ID"
                  placeholder={!deviceDidsAreFetching ? 'Select Caller ID' : 'Loading...'}
                  values={deviceDids?.map((deviceDid) => ({
                    value: deviceDid.Number,
                    label: deviceDid.Number,
                  }))}
                  //disabled={formDIsabled}
                />
              )}
              {deviceDidsError && <span>Failed to load list of client DIDs</span>}
            </CCol>

            <RFFCFormInput
              type="text"
              name="Did"
              label="Need to add a new DID?"
              placeholder="Enter new DID value"
            />
          </CRow>
        </>,
      )
    } else {
      setCallerIdField(<text>No available DIDs for this customer.</text>)
    }

    if (callerIdType === 'Custom') {
      setDialplanFormFields(<div>{customCallerIDcustomDialplan}</div>)
    } else if (callerIdType === 'Default' && dialplanType === 'Custom') {
      setDialplanFormFields(<div>{defaultCallerIDcustomDialplan}</div>)
    }
  }, [
    tenantDomain,

    dialplanType,
    callerIdType,
    deviceLocationsAreFetching,
    deviceLocations,
    deviceLocationsError,
    deviceContactsAreFetching,
    deviceContacts,
    deviceContactsError,
    deviceModelsAreFetching,
    deviceModels,
    deviceModelsError,
    deviceDidsAreFetching,
    deviceDids,
    deviceDidsError,
    callerIdField,
    dialplanField,
  ])

  const handleSubmit = async (values) => {
    const shippedValues = {
      TenantFilter: tenantDomain,
      MacAddress: values.MacAddress,
      ExtensionNumber: values.ExtensionNumber,
      Label: values.Label,
      EmailAddress: values.EmailAddress,
      ContactId: values.ContactID,
      LocationId: values.Location,
      ProductId: values.ModelId,
      DidNumber: values.DidNumber,
      FopGroup: values.FopGroup,
      HideFromPhonebook: values.HideFromPhonebook,
      tenantID: tenantDomain,
      deviceType: values.deviceType,
      dialplanType: values.dialplanType,
      callerIdType: values.callerIdType,
    }

    alert(JSON.stringify(values, null, 2))
    genericPostRequest({
      path: '/api/LtAddRatelDevice',
      values: shippedValues,
    })
  }

  // const handleTypeChange = (selectedValue) => {
  //   setFormFields(selectedValue)
  // }
  // const handleTypeChange = (e) => {
  //   console.log(e.target.value)
  //   setFormFields(e.target.value)
  // }

  useEffect(()=>{
    console.log(values)
  },[])


  return (
    <CippWizard onSubmit={handleSubmit} wizardTitle="Add Ratel Device Wizard">
      <CippWizard.Page
        title="Tenant Choice"
        description="Choose the tenant to add a RATEL device to"
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
          <h5>Choose Device Type</h5>
        </center>
        <hr className="my-4" />
        <div className="mb-2"></div>
        <br></br>
        <center>
          <CRow>
            <CCol lg={6} xs={12}>
              {/* <Select
                className="react-select-container me-3"
                classNamePrefix="react-select"
                options={[
                  { value: 'Generic', label: 'Generic' },
                  { value: 'User', label: 'User' },
                ]}
                isClearable={true}
                name="SelectDeviceType"
                placeholder="Select an option"
                label="Select Device Type:"
                onChange={handleTypeChange}
              /> */}
              <RFFCFormSelect
                name="SelectDeviceType"
                label="Select Device Type:"
                // placeholder="Select an option"
                values={[
                  { value: 'Generic', label: 'Generic' },
                  { value: 'User', label: 'User' },
                ]}
                
                // setFormFieldState={setFormFields}
                // onChange={setFormFields}
              />
            </CCol>
            <CCol lg={6} xs={12}>
              <RFFCFormSelect
                type="text"
                name="SelectDialplanType"
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
                type="text"
                name="SelectCallerIDType"
                label="Select CallerID Type:"
                placeholder="Select an option"
                values={[
                  { value: 'Default', label: 'Default' },
                  { value: 'Custom', label: 'Custom' },
                ]}
                //disabled={formDIsabled}
              />
            </CCol>
          </CRow>
        </center>
        <hr className="my-4" />
      </CippWizard.Page>
      <CippWizard.Page title="Device Information" description="Enter the device information">
        <center>
          <h3 className="text-primary">Step 3</h3>
          <h5>Enter device information</h5>
        </center>
        <hr className="my-4" />
        <div className="mb-2">
          {dialplanFormFields}
          {formFields === 'Generic' ? genericFields : userFields}
        </div>
        <hr className="my-4" />
      </CippWizard.Page>
      <CippWizard.Page title="Review and Confirm" description="Confirm the settings to apply">
        <center>
          <h3 className="text-primary">Step 4</h3>
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

export default AddRatelDevice
