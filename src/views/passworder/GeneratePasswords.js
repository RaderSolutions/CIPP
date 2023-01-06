/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-key */
import React, {useState} from 'react'
import { CButton, CCol, CForm, CRow } from '@coreui/react'

import { Form } from 'react-final-form'
import { RFFCFormInput} from 'src/components/forms'

import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { CippContentCard, CippPage } from 'src/components/layout'

import { generatePasswords } from 'src/js/passworder'

const EditVariable = () => {
  const [passwords, setPasswords] = useState([])

  const onSubmit = (values) => {

    setPasswords(generatePasswords(Number(values.NumberPass), Number(values.NumberWords)))

  }



  // this is dumb
  return (
    <CippPage
      title={`Generate Passwords`}
      tenantSelector={false}
    >
      {(
        <>

          <CRow>
            <CCol lg={6} xs={12}>
              <CippContentCard title="Password Options" icon={faEdit}>
                {(
                  <Form
                    
                    onSubmit={onSubmit}
                    render={({ handleSubmit, submitting, values }) => {
                      return (
                        <CForm onSubmit={handleSubmit}>
                            <CRow>
                            <CCol lg={6} xs={12}>
              <RFFCFormInput
                type="text"
                name="NumberPass"
                label="Number of Passwords"
                //disabled={true}
              />
            </CCol>
            <CCol lg={6} xs={12}>
            <RFFCFormInput
                type="text"
                name="NumberWords"
                label="Number of Words"
              />
            </CCol>
                            </CRow>
                          <CRow className="mb-3">
                            <CCol md={6}>
                              <CButton type="submit" disabled={submitting}>
                                Generate Passwords
                              </CButton>
                            </CCol>
                          </CRow>
                        </CForm>
                      )
                    }}
                  />
                )}
              </CippContentCard>
            </CCol>
            <CCol lg={6} xs={12}>
              <CippContentCard title="Passwords">
                {(
                  <>
                   
                   {passwords.map(password => <p>{password}</p>)}
                   
                  </>
                )}
              </CippContentCard>
            </CCol>
          </CRow>
        </>
      )}
    </CippPage>
  )
}

export default EditVariable
