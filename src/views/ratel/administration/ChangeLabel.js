/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { CButton, CCallout, CCol, CForm, CRow } from '@coreui/react'
import { useSelector } from 'react-redux'
import { Form } from 'react-final-form'
import {
  RFFCFormInput,
} from 'src/components/forms'
import useQuery from 'src/hooks/useQuery'
import { useLazyGenericPostRequestQuery } from 'src/store/api/app'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch, faEdit } from '@fortawesome/free-solid-svg-icons'
import { CippContentCard, CippPage } from 'src/components/layout'

const ChangeDeviceLabel = () => {
  let query = useQuery()
  const deviceId = query.get('deviceId')
//   const tenantDomain = query.get('tenantDomain')
  const tenant = useSelector((state) => state.app.currentTenant)
  const [queryError ] = useState(false)
  const [genericPostRequest, postResults] = useLazyGenericPostRequestQuery()
  const onSubmit = (values) => {
    //@todo: need to fix copyfrom in api so this is no longer required
    if (!values.CopyFrom) {
      values.CopyFrom = ''
    }
    //@todo: need to fix this in api so this hacky shit is no longer needed.

    const shippedValues = {
      Label: values.Label,
      DeviceId: deviceId
    }
    // window.alert(JSON.stringify(shippedValues))
    // console.log(values)
    genericPostRequest({ path: `/api/LtScheduleScript?TenantFilter=${tenant.customerId}&Parameters=Key=new_Label|Value=${shippedValues.Label},Key=Device_Id|Value=${shippedValues.DeviceId}&RatelScript=true&ScriptId=7853`})
  }


  // this is dumb
  const formDisabled =
    queryError === true 

  return (
    <CippPage
      title={`Edit Device Label`}
      tenantSelector={false}
    >
      {!queryError && (
        <>
          {postResults.isSuccess && (
            <CCallout color="success">{postResults.data?.Results}</CCallout>
          )}
          <CRow>
            <CCol lg={6} xs={12}>
            <CippContentCard title="Enter New Device Label" icon={faEdit}>
              <text>Note: This will ONLY update the devices label. To proceed, enter a new label and click Submit.</text>
                  <Form
                    onSubmit={onSubmit}
                    render={({ handleSubmit, submitting, values }) => {
                      return (
                        <CForm onSubmit={handleSubmit}>
                          <RFFCFormInput
                            type="text"
                            name="Label"
                            label="Edit Device Label"
                            //disabled={formDIsabled}
                          />
                          <CRow className="mb-3">
                            <CCol md={6}>
                              <CButton type="submit" disabled={submitting || formDisabled}>
                                Submit
                                {postResults.isFetching && (
                                  <FontAwesomeIcon
                                    icon={faCircleNotch}
                                    spin
                                    className="ms-2"
                                    size="1x"
                                  />
                                )}
                              </CButton>
                            </CCol>
                          </CRow>
                          {postResults.isSuccess && (
                            <CCallout color="success">
                              {postResults.data.Results.map((message, idx) => {
                                return <li key={idx}>{message}</li>
                              })}
                            </CCallout>
                          )}
                        </CForm>
                      )
                    }}
                  />
              </CippContentCard>
            </CCol>
          </CRow>
        </>
      )}
    </CippPage>
  )
}

export default ChangeDeviceLabel
