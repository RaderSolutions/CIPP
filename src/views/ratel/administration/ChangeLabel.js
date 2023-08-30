 /* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { CButton, CCallout, CCol, CForm, CRow } from '@coreui/react'
import { useSelector } from 'react-redux'
import { Form, FormSpy, useFormState } from 'react-final-form'
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

const ChangeDeviceLabel = () => {
  let query = useQuery()
  const deviceId = query.get('deviceId')
//   const tenantDomain = query.get('tenantDomain')
  const tenant = useSelector((state) => state.app.currentTenant)
  const [queryError ] = useState(false)
  const [genericPostRequest, postResults] = useLazyGenericPostRequestQuery()
  const handleSubmit = (values) => {
    //@todo: need to fix copyfrom in api so this is no longer required
    if (!values.CopyFrom) {
      values.CopyFrom = ''
    }
    //@todo: need to fix this in api so this hacky shit is no longer needed.

    const shippedValues = {
      Label: values.Label,
      DeviceId: deviceId
    }
  //  TODO
    genericPostRequest({ path: `/api/LtScheduleScript?TenantFilter=${tenant.customerId}&Parameters=Key=new_Label|Value=${shippedValues.Label},Key=Device_Id|Value=${shippedValues.DeviceId},Key=newEmail|Value=0,Key=newLTID|Value=0&RatelScript=true&ScriptId=7853`})
  }

  const formValues = {
    test: 'test'
  }

  // this is dumb
  const formDisabled =
    queryError === true 

  return (
    <CippWizard
    initialValues={{
      ...formValues
    }}
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
                />
            </CCol>
        </CRow>
       </CippWizard.Page>
       <CippWizard.Page>
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
                <RFFCFormInput
                type="text"
                name="LTID"
                label="Edit Device LTID"
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
        <hr className="my-4" />
     {!postResults.isSuccess && (
     <FormSpy subscription={{ values: true, labels: true }}>
      {(props) => {
        const formState = useFormState()
        const { values } = props
        console.log('FORM STATE IN CHANGE LABEL', formState)
        const valuesArray = Object.keys(values)?.map((key) => ({
          key: key,
          value: values[key]
        })
      )
      let labelKey
      labelKey = valuesArray?.find((item) => item.key === 'Label')
      let emailKey
      emailKey = valuesArray?.find((item) => item.key === 'Email')
      let ltidKey
      ltidKey = valuesArray?.find((item) => item.key === 'LTID')
      
      return <CListGroup>
        {labelKey &&
          <CListGroupItem>
            {`Change Device Label to ${labelKey?.value}`}
          </CListGroupItem>

        }
        {
          emailKey &&
          <CListGroupItem>
            {`Change Device Email to ${emailKey?.value}`}
          </CListGroupItem>
        }
        {
          ltidKey &&
          <CListGroupItem>
            {`Change Device LTID to ${ltidKey?.value}`}
          </CListGroupItem>
        }
      </CListGroup>

      }}
      </FormSpy>  
     )  
    }
        {postResults.isFetching && (
            <CCallout color="info">
              <CSpinner>Loading</CSpinner>
            </CCallout>
          )}
          {postResults.isSuccess && <CCallout color="success">{postResults.data.Results}</CCallout>}
          <hr className="my-4" />
       </CippWizard.Page>
    </CippWizard>
   
  )
}

export default ChangeDeviceLabel
