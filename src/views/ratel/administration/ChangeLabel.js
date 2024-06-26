/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { CButton, CCallout, CCol, CForm, CRow, CListGroup, CListGroupItem } from '@coreui/react'
import { useSelector } from 'react-redux'
import { Form, FormSpy, Field, useFormState } from 'react-final-form'
import {
  RFFCFormInput,
  RFFCFormSwitch,
  RFFCFormSelect,
  Condition,
} from 'src/components/forms'
import useQuery from 'src/hooks/useQuery'
import { useLazyGenericPostRequestQuery } from 'src/store/api/app'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch, faEdit } from '@fortawesome/free-solid-svg-icons'
import { CippContentCard, CippPage, CippWizard } from 'src/components/layout'
import { TenantSelector } from 'src/components/utilities'
import { useListDeviceContactsQuery } from 'src/store/api/ratelDevices'
import { post } from 'jquery'


const ChangeLabel = () => {
  // const tenantDomain = useSelector((state) => state.app.currentTenant.customerId)
  let query = useQuery()
  const tenantDomain = query.get('tenantDomain')
  const deviceId = query.get('deviceId')

  const {
    data: deviceContacts = [],
    isFetching: deviceContactsAreFetching,
    error: deviceContactsError,
  } = useListDeviceContactsQuery({ tenantDomain })

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
  const handleSubmit = (values) => {
    alert(JSON.stringify(values, null, 2))
    console.log('submit values', values)
    genericPostRequest({ path: `/api/LtScheduleScript?TenantFilter=${tenantDomain}&Parameters=Key=new_Label|Value=${values.Label},Key=new_Email|Value=${values.Email},Key=new_LTID|Value=${values.ContactId},Key=Device_Id|Value=${deviceId}&RatelScript=true&ScriptId=7853`})
  }

  const [genericPostRequest, postResults] = useLazyGenericPostRequestQuery()
  

  return (
  <CippWizard
    onSubmit={handleSubmit}
     wizardTitle="Change Device Label"
     >
       <CippWizard.Page
       title="Tenant Choice"
       description="Choose the tenant containing the device you wish to change"
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
             <CippWizard.Page
                  title="Select Change Value(s)"
                  description="Choose which combination of changes to make"
                    >
                        <center>
                  <h3 className="text-primary">Step 2</h3>
                  <h5>Choose Value(s) to Change</h5>
                </center>
                <hr className="my-4" />
                <div className="mb-2"></div>
                <br></br>
                <CRow>
                    <CCol lg={6} xs={12}>
                        <RFFCFormSelect 
                        name="ChangeValue"
                        label="Change Value"
                        values={[
                            { value: "Label Change", label: "Label Change" },
                            { value: "Label and Email Change", label: "Label and Email Change" },
                            { value: "LTID Change", label: "LTID Change" },
                        ]}
                        placeholder='Select Change Value'
                        />
                      </CCol>
                  </CRow>
        </CippWizard.Page>
        
        <CippWizard.Page title="Enter New Values">
         <center>
           <h3 className="text-primary">Step 3</h3>
           <h5>Enter New Value(s)</h5>
         </center>
         <hr className="my-4" />
         <div className="mb-2"></div>
         <br></br>
         <Condition when="ChangeValue" is="Label Change">
         <CRow>
             <CCol lg={6} xs={12}>
                 <RFFCFormInput
                 type="text"
                name="Label"
                 label="Edit Device Label"
                />
            </CCol>
        </CRow>
        </Condition>
        <Condition when="ChangeValue" is="Label and Email Change">
         <CRow>
             <CCol lg={6} xs={12}>
                 <RFFCFormInput
                 type="text"
                 name="Label"
                 label="Edit Device Label"
                 />
             </CCol>
            <CCol lg={6} xs={12}>
                 <RFFCFormInput
                 type="text"
                name="Email"
                label="Edit Device Email"
                />
            </CCol>
        </CRow>
        </Condition>
        <Condition when="ChangeValue" is="LTID Change">
      <CRow>
         <CCol lg={6} xs={12}>
                 {/* <RFFCFormInput
                 type="text"
                 name="LTID"
                 label="Edit Device LTID"
                 /> */}
                 <RFFCFormSelect
                  name="ContactId"
                  label="Select Contact"
                  placeholder={!deviceContactsAreFetching ? 'Select Contact' : 'Loading...'}
                  values={
                    deviceContacts &&
                    !deviceContactsAreFetching &&
                    deviceContacts.map((contact) => ({
                      value: contact.ContactID,
                      label: contact.Name,
                    }))
                  }
                  />
             </CCol>
         </CRow>
         </Condition>
         </CippWizard.Page>
        <CippWizard.Page>
        <center>
          <h3 className="text-primary">Step 4</h3>
          <h5>Confirm and Apply</h5>
        </center>
        <hr className="my-4" />
        {!postResults.isSuccess && (
          <FormSpy subscription={{ values: true, labels: true }}>
            {
              (props) => {
                const formState = useFormState()
                const { values } = props
                const valuesArray = Object.keys(values)?.map((key) => ({
                  key: key,
                  value: values[key]
                }));
                console.log('values in form spy', values)
                let labelKey
                labelKey = valuesArray.find(value => Object.values(value).includes('Label'))
                console.log('label key', labelKey)
                let emailKey
                emailKey = valuesArray.find(value => Object.values(value).includes('Email'))
                let ltidKey
                ltidKey = valuesArray.find(value => Object.values(value).includes('ContactId'))
                
                return <CListGroup>
                  {
                    labelKey && <CListGroupItem>
                      {`Label : ${labelKey.value}`}
                      </CListGroupItem>
                  }
                  {
                    emailKey && <CListGroupItem>
                      {`Email : ${emailKey.value}`}
                      </CListGroupItem>
                  }
                  {
                    ltidKey && <CListGroupItem>
                      {`LTID : ${ltidKey.value}`}
                      </CListGroupItem>
                  }
                </CListGroup>
              }
            }
            </FormSpy>
        )}
       </CippWizard.Page> 
    </CippWizard>

)
}

export default ChangeLabel
