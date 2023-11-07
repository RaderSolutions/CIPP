/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { CButton, CCallout, CCol, CForm, CRow, CSpinner } from '@coreui/react'
import useQuery from 'src/hooks/useQuery'
import { useDispatch, useSelector } from 'react-redux'
import { Form } from 'react-final-form'
import { RFFCFormInput, RFFCFormSelect } from 'src/components/forms'
import { CippCodeBlock, ModalService } from 'src/components/utilities'
import { useLazyGenericPostRequestQuery } from 'src/store/api/app'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch, faEdit, faEye } from '@fortawesome/free-solid-svg-icons'
import { CippContentCard, CippPage } from 'src/components/layout'

export const EditVoicemail = () => {
  const [genericPostRequest, postResults] = useLazyGenericPostRequestQuery()
  const tenantDomain = useSelector((state) => state.app.currentTenant.customerId)
  const query = useQuery()
  const ID = query.get('ID')
  // mailbox=%mailbox%|password=%password%|name=%name%|email_address=%email_address%|options=%options%

  const onSubmit = (values) => {
    const shippedValues = {
      TenantFilter: tenantDomain,
      Mailbox: values.mailbox,
      Password: values.password,
      Name: values.name,
      EmailAddress: values.emailAddress,
      Options: values.options,
    }

    genericPostRequest({
      path: `/api/LtScheduleScript?TenantFilter=${tenantDomain}&Action=Update&RatelScript=true&ScriptId=7379`,
      values: shippedValues,
    })
  }

  useEffect(() => {
    console.log('postResults', postResults)
  }, [postResults])

  return (
    <>
      <CippPage>
        <CCol>
          <CippContentCard title="Member Details" icon={faEdit}>
            <Form
              // initialValues={{ ...initialState }}
              onSubmit={onSubmit}
              render={({ handleSubmit, submitting, values }) => {
                return (
                  <CForm onSubmit={handleSubmit}>
                    <CRow>
                      <CCol lg={6} xs={12}>
                        <RFFCFormInput type="text" name="mailbox" label="Mailbox" />
                      </CCol>
                      <CCol lg={6} xs={12}>
                        <RFFCFormInput type="text" name="password" label="Password" />
                      </CCol>

                      <CCol lg={6} xs={12}>
                        <RFFCFormInput
                          type="text"
                          name="name"
                          label="Name"
                          //disabled={formDIsabled}
                        />
                      </CCol>
                      <CCol lg={6} xs={12}>
                        <RFFCFormInput
                          type="text"
                          name="emailAddress"
                          label="Email Address"
                          //disabled={formDIsabled}
                        />
                      </CCol>
                      <CCol lg={6} xs={12}>
                        <RFFCFormInput
                          type="text"
                          name="options"
                          label="Options"
                          //disabled={formDIsabled}
                        />
                      </CCol>
                    </CRow>
                  </CForm>
                )
              }}
            />
          </CippContentCard>
        </CCol>
      </CippPage>
    </>
  )
}

export default EditVoicemail