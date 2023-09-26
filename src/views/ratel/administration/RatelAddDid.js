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


const AddRatelDid = ({ children }) => {
  const tenantDomain = useSelector((state) => state.app.currentTenant.customerId)
  // const initialValues = {
  //   DidType: '',
  //   Did: '',
  //   ContactID: '',
  //   SetCallerId: false,
  // }
  const {
    data: devices = [],
    isFetching: devicesAreFetching,
    error: devicesError,
  } = useListDevicesQuery({ tenantDomain })

  const [genericPostRequest, postResults ] = useLazyGenericPostRequestQuery()
  const onSubmit = async (values) => {
    console.log('values in add DID', values)
    if (values.DidType === 'Device') {
      console.log('didtype device')
      const shippedValues = {
        TenantFilter: tenantDomain,
        DidNumber: values.Did,
        DeviceId: values.DeviceId,
        IsDeviceCallerId: values.SetCallerId,
        DidType: values.DidType,
      }
      genericPostRequest({ path: '/api/LtRatelDIDS', values: shippedValues })
    }
    else if (values.DidType === 'IncomingDialplan') {
        console.log('didtype incoming dialplan')
        // alert(JSON.stringify(values, null, 2))
        // const shippedValues = {
        //   TenantFilter: tenantDomain,
        //   DidNumber: values.Did,
        //   Dialplan: values.Dialplan,
        //   DidType: values.DidType,
        // }
        genericPostRequest({ path: `/api/LtScheduleScript?TenantFilter=${tenantDomain}&Parameters=Key=DID|Value=${values.Did},Key=Notes|Value=${values.DialplanName},Key=Dialplan|Value=${values.Dialplan}&RatelScript=true&ScriptId=7352` })
    // genericPostRequest({
    //   path: `/api/LtScheduleScript?TenantFilter=${tenantDomain}&Parameters=Key=DID|Value=${values.Did},Key=Dialplan|Value=${values.Dialplan}&RatelScript=true&ScriptId=7352`,
    // })
    } else if (values.DidType === 'ConferenceBridge') {
      const shippedValues = {
        TenantFilter: tenantDomain,
        DidNumber: values.Did,
        Extension: values.Extension,
        DidType: values.DidType,
      }
      genericPostRequest({ path: '/api/LtRatelDIDS', values: shippedValues })
        console.log('didtype conference bridge')
    }
  }

  useEffect(() =>{
    console.log('devices', devices)
  },[devices])

return (
  
    <CippWizard
    // initialValues={{initialValues}}
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
    <CippWizard.Page title="Select DID Type" description="Choose the type of DID to add">
        <center>
          <h3 className="text-primary">Step 2</h3>
          <h5>Choose DID Type</h5>
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
    
          </CRow>
        </center>
        <hr className="my-4" />
     </CippWizard.Page>
     <CippWizard.Page title="Enter DID Information" description="Enter the DID information">
        <center>
          <h3 className="text-primary">Step 3</h3>
          <h5>Enter DID Information</h5>
        </center>
        <Condition when="DidType" is={"Device"}>
        {/* did (txt), deviceid (dropdown with devices for client), setcallerid(bool) */}
       <h5>
          Device
       </h5>
        <CCol lg={6} xs={12}>
          <RFFCFormInput
            name="Did"
            label="Did:"
            placeholder="Enter the DID"
            type="text"
            required
          />
            </CCol>
            <CCol lg={6} xs={12}>
            {devicesAreFetching && <CSpinner />}
              {!devicesAreFetching && (
                <RFFCFormSelect
                  name="DeviceId"
                  label="Device"
                  placeholder={!devicesAreFetching ? 'Select Device' : 'Loading...'}
                  values={
                    devices &&
                    devices?.map((device) => ({
                      value: device.DeviceId,
                      label: device.Label,
                    }))
                  }
                  //disabled={formDIsabled}
                />
              )}

          </CCol>
          <CCol lg={6} xs={12}>
              <RFFCFormSwitch name="IsDeviceCallerId" label="Set Caller ID" value={true} />
          </CCol>
                    
         </Condition>
         <Condition when="DidType" is={"IncomingDialplan"}>
            {/* did, name of dialplan (text), dialplan (textarea) */}
            <h5>
              Incoming Dialplan
            </h5>
            <RFFCFormInput
                name="Did"
                label="Did:"
                placeholder="Enter the DID"
                type="text"
                />
                <RFFCFormInput
                name="DialplanName"
                label="Dialplan Name:"
                placeholder="Enter the Dialplan Name/Description"
                type="text"
                />
                <RFFCFormTextarea
                name="Dialplan"
                label="Dialplan"
                placeholder="Enter the Dialplan"
                type="textarea"
                />
        </Condition>
        <Condition when="DidType" is={"ConferenceBridge"}>
               {/* did, extension (txt inputs) */}
               <h5>
                  Conference Bridge
               </h5>
               <RFFCFormInput
                name="Did"
                label="Did:"
                placeholder="Enter the DID"
                type="text"
                />
                <RFFCFormInput
                name="Extension"
                label="Extension:"
                placeholder="Enter the Extension"
                type="text"
                />
        </Condition>
      </CippWizard.Page>
      <CippWizard.Page title="Confirm And Apply" description="Review Information And Apply Or Revise">
          <center>
            <h3 className="text-primary">Step 4</h3>
            <h5>Confirm And Apply</h5>
          </center>
          <FormSpy subscription={{ values: true, labels: true }}>
            {
              (props) => {
                const { values } = props
                const { labels } = props
                console.log("labels", labels)
                const valuesArray = Object.keys(values)?.map((key) => ({
                  key: key,
                  value: values[key]
                }))
                console.log('valuesArray', valuesArray)
                let didTypeKey
                didTypeKey = valuesArray?.find(value => value.key === 'DidType')
                let deviceKey
                deviceKey = valuesArray?.find(value => value.key === 'DeviceId')
                let didNumberKey
                didNumberKey = valuesArray?.find(value => value.key === 'Did')
                let isDeviceCallerIdKey
                isDeviceCallerIdKey = valuesArray?.find(value => value.key === 'IsDeviceCallerId')
                let extensionKey
                extensionKey = valuesArray?.find(value => value.key === 'Extension')
                let dialplanNameKey
                dialplanNameKey = valuesArray?.find(value => value.key === 'DialplanName')
                let deviceLabel
                if (deviceKey) {
                  deviceLabel = devices?.find(device => device.DeviceId === deviceKey?.value)?.Label
                  console.log('device label found', deviceLabel)
                }
                return <CListGroup>
                  {
                    didTypeKey && <CListGroupItem>
                      {`DID Type: ${didTypeKey?.value}`}
                    </CListGroupItem>
                  }
                  {
                    deviceKey && <CListGroupItem>
                      {`Device: ${deviceKey?.value}`}
                    </CListGroupItem>
                  }
                  {
                    didNumberKey && <CListGroupItem>
                      {`DID: ${didNumberKey?.value}`}
                    </CListGroupItem>
                  }
                  {
                    isDeviceCallerIdKey && <CListGroupItem>
                      {`Is Caller ID: ${isDeviceCallerIdKey?.value}`}
                    </CListGroupItem>
                  }
                  {
                    extensionKey && <CListGroupItem>
                      {`Extension: ${extensionKey?.value}`}
                    </CListGroupItem>
                  }
                  {
                    dialplanNameKey && <CListGroupItem>
                      {`Dialplan Name: ${dialplanNameKey?.value}`}
                    </CListGroupItem>
                  }
                </CListGroup>
              }
            }
            </FormSpy>
        </CippWizard.Page>
    </CippWizard>
)
}

export default AddRatelDid