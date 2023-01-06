/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react'
import { CButton, CCol, CForm, CRow, CSpinner } from '@coreui/react'
import useQuery from 'src/hooks/useQuery'
import { Form } from 'react-final-form'
import { RFFCFormInput, RFFCFormSwitch } from 'src/components/forms'
import { ModalService } from 'src/components/utilities'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { CippContentCard, CippPage } from 'src/components/layout'
import { useDispatch } from 'react-redux'
import { generatePasswords } from 'src/js/passworder'
import { useListDeviceContactQuery } from 'src/store/api/ratelDevices'
import { useLazyGenericPostRequestQuery } from 'src/store/api/app'
const ChangePassword = () => {
  let query = useQuery()
  const dispatch = useDispatch()
  const [genericPostRequest, postResults] = useLazyGenericPostRequestQuery()
  const [passwords, setPasswords] = useState([])
  const [pwComplexityEnabled, setPwComplexityEnabled] = useState('')
  const contactID = query.get('contactID')
  const tenantDomain = query.get('tenantDomain')
  
  const [queryError, setQueryError] = useState(false)
  const {
    data: contact,
    isFetching: contactIsFetching,
    error: contactError,
  } = useListDeviceContactQuery({ tenantDomain, contactID })

  const onSubmit = (values) => {
    var passwordCheck = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{10,38}$/;
    if(!passwordCheck.test(values.NewPassword)) { 
      window.alert("Password is not complex enough. Please enter a password with at least 10 characters and include a special character and number.")
    } else {
      const shippedValues = {
        contactId: contactID,
        newPassword: values.NewPassword,
        documentOnly: values.DocumentOnly
      }
      window.alert(JSON.stringify(shippedValues))
       genericPostRequest({ path: `/api/LtScheduleScript?TenantFilter=${tenantDomain}&Parameters=Key=PortalADUser|Value='',Key=ContactID|Value=${contactID},Key=SkipAD|Value=${values.DocumentOnly},Key=SkipO365|Value=${values.DocumentOnly}|BatchLength=1`})
    }
  }

  useEffect(() => {
    if (!contactID || !tenantDomain) {
      ModalService.open({
        body: 'Error invalid request, could not load requested did.',
        title: 'Invalid Request',
      })
      setQueryError(true)
    } else {
      setQueryError(false)
      setPasswords(generatePasswords(10, 3))
    }
  }, [contactID, tenantDomain, dispatch])

  return (
    <CippPage title={`Password Update`} tenantSelector={false}>
      {!queryError && (
        <>
          <CRow>
            <CCol lg={6} xs={12}>
              <CippContentCard
                title="Update Password"
                icon={faEdit}
                className="list-group-content-card"
              >
                {contactIsFetching && <CSpinner />}
                {contactError && <span>Error loading did</span>}
                {!contactIsFetching && (
                  <>
                    {contact[0].PasswordComplexityEnabled === "1" ? <div>This customer has Password Complexity enabled and part of that requires that the user changes their password upon first logon. They should also get an email with instructions on how to move forward when you sync the account.</div>: ''}
                    <br/>
                    <div>
                      <b>{contact[0].firstname + ' ' + contact[0].lastname}</b>
                    </div>
                    <div>Email: {contact[0].Email}</div>
                    <div>Password: {contact[0].raderPassword}</div>
                    <div>Password Expires from Portal: {contact[0].RaderPasswordExpiration}</div>
                    <div>AD Name (aka MSN): {contact[0].MSN}</div>
                    <br />
                    <Form
                      onSubmit={onSubmit}
                      render={({ handleSubmit, submitting, values }) => {
                        return (
                          <CForm onSubmit={handleSubmit}>
                            <CRow>
                              <CCol lg={6} xs={12}>
                                <RFFCFormInput
                                  type="text"
                                  name="NewPassword"
                                  label="New Password"
                                />
                                <RFFCFormSwitch name="DocumentOnly" label="Document Password Only" />
                              </CCol>
                            </CRow>
                            <CRow className="mb-3">
                              <CCol md={6}>
                                <CButton type="submit" disabled={submitting} >
                                  Submit
                                </CButton>
                              </CCol>
                            </CRow>
                          </CForm>
                        )
                      }}
                    />
                  </>
                )}
              </CippContentCard>
            </CCol>
            <CCol lg={6} xs={12}>
              <CippContentCard title="Password Options">
                {
                  <>
                    {passwords.map((password) => (
                      <p>{password}</p>
                    ))}
                  </>
                }
              </CippContentCard>
            </CCol>
          </CRow>
        </>
      )}
    </CippPage>
  )
}

export default ChangePassword
