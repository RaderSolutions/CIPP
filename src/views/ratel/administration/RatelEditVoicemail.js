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
  const mailbox = query.get('Mailbox')
  const password = query.get('Password')
  const name = query.get('Name')
  const emailAddress = query.get('EmailAddress')
  const extraOptions = query.get('ExtraOptions')
  const voicemails = query.get('Voicemails')
  // mailbox=%mailbox%|password=%password%|name=%name%|email_address=%email_address%|options=%options%

  const onSubmit = (values) => {
    const shippedValues = {
      TenantFilter: tenantDomain,
      mailbox: values.mailbox,
      password: values.password,
      name: values.name,
      email_address: values.emailAddress,
      options: values.options,
    }
    genericPostRequest({
      path: `/api/LtScheduleScript?TenantFilter=${tenantDomain}&Parameters=Key=mailbox|Value=${values.mailbox},Key=password|Value=${values.password},Key=name|Value=${values.name},Key=email_address|Value=${values.emailAddress},Key=options|Value=${values.options}&Action=Update&RatelScript=true&ScriptId=7379`,
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
                        <RFFCFormInput type="text" name="mailbox" label="Mailbox" placeholder={mailbox ? mailbox : ''} />
                      </CCol>
                      <CCol lg={6} xs={12}>
                        <RFFCFormInput type="text" name="password" label="Password" placeholder={password ? password : ''} />
                      </CCol>

                      <CCol lg={6} xs={12}>
                        <RFFCFormInput
                          type="text"
                          name="name"
                          label="Name"
                          placeholder={name ? name : ''}
                          //disabled={formDIsabled}
                        />
                      </CCol>
                      <CCol lg={6} xs={12}>
                        <RFFCFormInput
                          type="text"
                          name="emailAddress"
                          label="Email Address"
                          placeholder={emailAddress ? emailAddress : ''}
                          //disabled={formDIsabled}
                        />
                      </CCol>
                      <CCol lg={6} xs={12}>
                        <RFFCFormInput
                          type="text"
                          name="options"
                          label="Options"
                          placeholder={extraOptions ? extraOptions : ''}
                          //disabled={formDIsabled}
                        />
                      </CCol>
                      <CCol lg={6} xs={12}>
                        <CButton type="submit" color="primary" disabled={submitting}>
                          Edit Voicemail
                          {postResults.isFetching && (
                            <FontAwesomeIcon icon={faCircleNotch} spin className="ms-2" size="1x" />
                          )}
                        </CButton>
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
