/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { CCallout, CCol, CRow, CSpinner, CListGroup, CListGroupItem, CForm } from '@coreui/react'
import { Field, FormSpy, useForm, useFormState } from 'react-final-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { CippWizard } from 'src/components/layout'
import PropTypes, { array } from 'prop-types'
import {
  RFFCFormInput,
  RFFCFormSelect,
  RFFCFormSelectObjectValue,
  RFFCFormTextarea,
  RFFCFormSwitch,
  Condition,
} from 'src/components/forms'

import { TenantSelector } from 'src/components/utilities'
import { useLazyGenericPostRequestQuery } from 'src/store/api/app'
import {
  useListDeviceLocationsQuery,
  useListDeviceContactsQuery,
  useListDeviceModelsQuery,
} from 'src/store/api/ratelDevices'
import { useListDidsQuery } from 'src/store/api/ratelDids'
import { useListDialplansQuery } from 'src/store/api/ratelDialplans'
import { useSelector } from 'react-redux'

// import { ConfirmDevice } from './ConfirmDevice'
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
  const [callerIdField, setCallerIdField] = useState(<></>)
  // const [confirmFormState, setConfirmFormState] = useState([])
  // test push

  const tenantDomain = useSelector((state) => state.app.currentTenant.customerId)
  const {
    data: dialplans = [],
    isFetching: dialplansAreFetching,
    error: dialplansError,
  } = useListDialplansQuery({ tenantDomain })
  const {
    data: deviceLocations = [],
    isFetching: deviceLocationsAreFetching,
    error: deviceLocationsError,
  } = useListDeviceLocationsQuery({ tenantDomain })

  const {
    data: deviceContacts = [],
    isFetching: deviceContactsAreFetching,
    error: deviceContactsError,
  } = useListDeviceContactsQuery({ tenantDomain })

  const {
    data: deviceModels = [],
    isFetching: deviceModelsAreFetching,
    error: deviceModelsError,
  } = useListDeviceModelsQuery()

  const {
    data: deviceDids = [],
    isFetching: deviceDidsAreFetching,
    isSuccess: deviceDidsSuccess,
    error: deviceDidsError,
  } = useListDidsQuery({ tenantDomain })
  console.log("DEVICE DIDS", deviceDids)
  console.log("DEVICE LOCATIONS", deviceLocations)
  console.log("DEVICE CONTACTS", deviceContacts)
  console.log('Devices', deviceModels)

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
      DeviceType: values.DeviceType,
      DialplanType: values.DialplanType,
      CallerIDType: values.CallerIDType,
    }
   // alert(JSON.stringify(values, null, 2))
   let result = genericPostRequest({
      path: '/api/LtAddRatelDevice',
      values: shippedValues,
    }).unwrap()
    // if (result) {
    //   let syncRes = genericPostRequest({
    //     path: `/api/LtScheduleScript?TenantFilter=${tenantDomain}&Parameters=Key=device_id|Value=0,Key=force_resync_all|Value=0&RatelScript=true&ScriptId=6886`,
    //   }).unwrap()
    //   console.log('DEVICE/SCRIPT SCHEDULE', syncRes)
    // }
  }

  const formValues = [
    {
      ToggleNewDidInput: false,
    },
  ]
const [newValues, setNewValues] = useState([])
useEffect(()=>{
  console.log("NEW VALUES USE EFFECT", newValues)
}, [newValues])

useEffect(()=>{
  console.log("dialplans", dialplans)
},[dialplans])


if (!formValues) {
  return (
    <>
    <CSpinner />
    <div>
      Loading...
    </div>
    </>
  )
}

  return (
   <CippWizard
      initialValues={{ ...formValues }}
      onSubmit={handleSubmit}
      wizardTitle="Add Ratel Device Wizard"
    >
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
              <RFFCFormSelect
                name="DeviceType"
                values={[
                  { value: 'Generic', label: 'Generic' },
                  { value: 'User', label: 'User' },
                ]}
                placeholder="Select an option"
                label="Select Device Type:"
              />
            </CCol>
            <CCol lg={6} xs={12}>
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
          {/* {dialplanFormFields} */}
          {/* {formFields === 'Generic' ? genericFields : userFields} */}
          {/* {genericFields} */}
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
                  values={deviceLocations && deviceLocations?.map((deviceLocation) => ({
                    value: deviceLocation.locationId,
                    label: deviceLocation.Name,
                  }))}
                  // parse={(value) => ({
                  //   // console.log(deviceLocation.find(loc) => loc.locationId === value))
                  //   value : value,
                  //   label: deviceLocations.find((location) => deviceLocations.indexOf(location.locationId) === deviceLocations.indexOf(value?.Name) || '')
                    
                 

                   
                    
                  // })}
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
                  values={
                    deviceModels &&
                    deviceModels?.map((deviceModel) => ({
                      value: deviceModel.modelId,
                      label: deviceModel.Name,
                    }))
                  }
                  //disabled={formDIsabled}
                />
              )}
              {deviceModelsError && <span>Failed to load list of device models</span>}
            </CCol>
          </CRow>
          <CCol lg={6} xs={12}>
            <RFFCFormInput
              type="text"
              name="FopGroup"
              label="FOP Group"
              //disabled={formDIsabled}
            />
          </CCol>
          <Condition when="DeviceType" is={'User'}>
            <CCol lg={6} xs={12}>
              {deviceContactsAreFetching && <CSpinner />}
              {!deviceContactsAreFetching && (
                <RFFCFormSelect
                  name="ContactID"
                  label="Device Contact"
                  placeholder={!deviceContactsAreFetching ? 'Select Contact' : 'Loading...'}
                  values={
                    deviceContacts &&
                    deviceContacts?.map((deviceContact) => ({
                      value: deviceContact.ContactID,
                      label: deviceContact.Name,
                    }))
                  }
                  //disabled={formDIsabled}
                />
              )}
              {deviceContactsError && <span>Failed to load list of client contacts</span>}
            </CCol>
          </Condition>
          <Condition when="DeviceType" is={'Generic'}>
            <CCol lg={6} xs={12}>
              <RFFCFormInput
                type="text"
                name="EmailAddress"
                label="Voicemail Email"
                //disabled={formDIsabled}
              />
            </CCol>
          </Condition>
          <Condition when="DeviceType" is={'Generic'}>
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
          </Condition>
          <Condition when="DeviceType" is={'Generic'}>
            <CCol lg={6} xs={12}>
              <RFFCFormInput
                type="text"
                name="Label"
                label="Label"
                //disabled={formDIsabled}
              />
            </CCol>
          </Condition>
          <Condition when="DialplanType" is={'Custom'}>
            <CRow>
              {/* <RFFCFormTextarea name="Dialplan" label="Edit Dialplan" /> */}
              {dialplansAreFetching && <CSpinner />}
              {!dialplansAreFetching && dialplans &&
                <RFFCFormSelect 
                 name="Dialplan"
                 label="Choose Custom Dialplan"
                 placeholder={!dialplansAreFetching ? 'Select Custom Dialplan' : 'Loading...'}
                 values={dialplans && dialplans?.map((dialplan) => ({
                   label: dialplan.description,
                   value: dialplan.dialplan_name,
                 }))}
              />}
              {
                !dialplansAreFetching && dialplans.length <= 0 &&
                <div className='my-2'>
                <span>No custom dialplans available for this customer.</span>
                </div>
              }
            </CRow>
          </Condition>
          <Condition when="CallerIDType" is={'Custom'}>
            <>
              <CRow>
                <CCol>
                  <RFFCFormSwitch name="ToggleNewDidInput" label="Need to add a new DID?" />
                </CCol>
              </CRow>
              <CRow>
                <CCol lg={6} xs={12}>
                  {deviceDidsAreFetching && <CSpinner />}
                  {!deviceDidsAreFetching && deviceDids && (
                    <RFFCFormSelect
                      name="CallerID"
                      label="Choose Caller ID"
                      placeholder={!deviceDidsAreFetching ? 'Select Caller ID' : 'Loading...'}
                      values={deviceDids && deviceDids?.map((deviceDid) => ({
                        label: deviceDid.Number,
                        value: deviceDid.Number,
                      }))}
                      //disabled={formDIsabled}
                    />
                  )}
                  {!deviceDids && <text>No available DIDs for this customer.</text>}
                  {deviceDidsError && <span>Failed to load list of client DIDs</span>}
                </CCol>
                <Condition when="ToggleNewDidInput" is={true}>
                  <CCol lg={6} xs={12}>
                    <RFFCFormInput
                      type="text"
                      name="Did"
                      label="New DID value"
                      placeholder="Enter new DID value"
                    />
                  </CCol>
                </Condition>
              </CRow>
            </>
            <CCol>{callerIdField}</CCol>
          </Condition>
        </div>
        <hr className="my-4" />
      </CippWizard.Page>
      <CippWizard.Page title="Review and Confirm" description="Confirm the settings to apply">
        <center>
          <h3 className="text-primary">Step 4</h3>
          <h5 className="mb-4">Confirm and Apply</h5>
          <hr className="my-4" />
          {/* Need to take the previous form values and prefill appropriate inputs with those values as placeholders
        so that the user can review the information and make necessary changes before submitting */}
        {/* <ConfirmDevice useFormState={useFormState}/> */}
       
          {!postResults.isSuccess && (
            <FormSpy subscription={{ values: true, labels: true }}>
             {(props) => {
                const formState = useFormState()
                console.log('PROPS IN FORM SPY', props)
                console.log('FORM STATE IN FORM SPY', formState)
                const { values } = props;
                const selectedLocationLabel = values.Location?.label
                console.log('selectedLocation', selectedLocationLabel)
                const valuesArray = Object.keys(formState.values)?.map((key) => ({
                  key: key,
                  value: values[key]
                }));
                let newValues = valuesArray.filter((obj) => typeof obj.value !== "object");
                console.log('NEW VALUES', newValues)
                let deviceKey
                  // if (newValues.includes("ModelId")) {
                    deviceKey = newValues.find(value => Object.values(value).includes("ModelId"))
                  // }
                  let deviceLocationKey
                  // if (newValues.includes("Location")) {
                    deviceLocationKey = newValues.find(value => Object.values(value).includes("Location"))
                  console.log('DEVICE KEY IN SPY', deviceKey)
                  let deviceContactKey
                  // if (newValues.includes("ContactID")) {
                    deviceContactKey = newValues.find(value => Object.values(value).includes("ContactID"))
                  let deviceTypeKey
                  // if (newValues.includes("DeviceType")) {
                    deviceTypeKey = newValues.find(value => Object.values(value).includes("DeviceType"))
                    let dialplanKey
                    dialplanKey = newValues.find(value => Object.values(value).includes("DialplanType"))
                    let callerIDTypeKey
                    callerIDTypeKey = newValues.find(value => Object.values(value).includes("CallerIDType"))
                    let modelIDKey
                    modelIDKey = newValues.find(value => Object.values(value).includes("ModelId"))
                    let locationKey
                    locationKey = newValues.find(value => Object.values(value).includes("Location"))
                    let hideFromPhonebookKey
                    hideFromPhonebookKey = newValues.find(value => Object.values(value).includes("HideFromPhonebook"))
                    let macAddressKey
                    macAddressKey = newValues.find(value => Object.values(value).includes("MacAddress"))
                    let extensionNumberKey
                    extensionNumberKey = newValues.find(value => Object.values(value).includes("ExtensionNumber"))
                    let fopGroupKey
                    fopGroupKey = newValues.find(value => Object.values(value).includes("FopGroup"))
                    let emailKey
                    emailKey = newValues.find(value => Object.values(value).includes("Email"))
                    let labelKey
                    labelKey = newValues.find(value => Object.values(value).includes("Label"))
                    let callerIDKey
                    callerIDKey = newValues.find(value => Object.values(value).includes("CallerID"))
                    let didKey
                    didKey = newValues.find(value => Object.values(value).includes("Did"))
                    console.log('DEVICE CONTACT KEY IN SPY', deviceContactKey)
                  console.log('DEVICE TYPE KEY IN SPY', deviceTypeKey)
                  console.log('DEVICE LOCATION KEY IN SPY', deviceLocationKey)
                  let deviceModelLabel
                  if (deviceKey) {
                    deviceModelLabel = deviceModels.find(device => device.modelId === parseInt(deviceKey.value))
                    // setNewValues(deviceModelLabel)
                    console.log('DEVICE MODEL LABEL IN SPY', deviceModelLabel)
                  }
                  let deviceLocationLabel
                  if (deviceLocationKey) {
                    deviceLocationLabel = deviceLocations.find(location => location.locationId === parseInt(deviceLocationKey.value))
                  // setNewValues(deviceLocationLabel)  
                  }
                  let deviceContactLabel
                  if (deviceContactKey) {
                    deviceContactLabel = deviceContacts.find(contact => contact.ContactID === parseInt(deviceContactKey.value))
                  }
                  let hideFromPhonebookLabel
                  if (hideFromPhonebookKey) {
                    hideFromPhonebookLabel = hideFromPhonebookKey.value === "1" ? "True" : "False"
                  }
                   
                return <CListGroup>
                 
                 
                  {
                   deviceTypeKey && <CListGroupItem>
                      {`Device Type : ${deviceTypeKey.value}`}
                      </CListGroupItem>
                    }
                   {
                    dialplanKey && <CListGroupItem>
                    {`Dialplan Type : ${dialplanKey.value}`}
                    </CListGroupItem>
                   }
                   {
                    callerIDTypeKey && <CListGroupItem>
                    {`Caller ID Type : ${callerIDTypeKey.value}`}
                    </CListGroupItem>
                   }
                   
                   {deviceLocationLabel && <CListGroupItem>
                     {`Location : ${deviceLocationLabel.Name}`}
                    </CListGroupItem>}
                    {deviceModelLabel &&
                      <CListGroupItem>
                    { `Model : ${deviceModelLabel.Name}`}
                    </CListGroupItem>}
                    {
                      hideFromPhonebookLabel && <CListGroupItem>
                      {`Hide From Phonebook : ${hideFromPhonebookLabel}`}
                      </CListGroupItem>
                    }
                    {
                      macAddressKey && <CListGroupItem>
                      {`MAC Address : ${macAddressKey.value}`}
                      </CListGroupItem>
                    }
                    {
                      extensionNumberKey && <CListGroupItem>
                      {`Extension Number : ${extensionNumberKey.value}`}
                      </CListGroupItem>
                    }
                    {
                      fopGroupKey && <CListGroupItem>
                      {`FOP Group : ${fopGroupKey.value}`}
                      </CListGroupItem>
                    }
                    {
                      emailKey && <CListGroupItem>
                      {`Email Address : ${emailKey.value}`}
                      </CListGroupItem>

                    }
                    {
                      labelKey && <CListGroupItem>
                      {`Label : ${labelKey.value}`}
                      </CListGroupItem>
                    }
                   {deviceContactLabel && <CListGroupItem>
                    {`Contact : ${deviceContactLabel.Name}`}
                    </CListGroupItem>
                    }
                    {
                      didKey && <CListGroupItem>
                      {`DID : ${didKey.value}`}
                      </CListGroupItem>
                    }
                  {
                    callerIDKey && <CListGroupItem>
                    {`Caller ID : ${callerIDKey.value}`}
                    </CListGroupItem>
                  }

                  {/* 
                  {deviceKey &&
                    <CListGroupItem>
                      
                  {/* {`${formatString(deviceKey)} " : " ${deviceLabel.Name}`} */}
                  {/* </CListGroupItem>}  */}
                 
               
                   
                  </CListGroup>
              }}
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

export default AddRatelDevice