/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { CButton, CCallout, CCol, CForm, CRow, CSpinner } from '@coreui/react'
import useQuery from 'src/hooks/useQuery'
import { useDispatch } from 'react-redux'
import { Form } from 'react-final-form'
import {
  RFFCFormInput,
} from 'src/components/forms'
import { CippWizard } from 'src/components/layout'
import { useListDidQuery,useListSampleDialplansQuery} from 'src/store/api/ratelDids'
import { CippCodeBlock, ModalService } from 'src/components/utilities'
import { useLazyGenericPostRequestQuery } from 'src/store/api/app'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch, faEdit, faEye } from '@fortawesome/free-solid-svg-icons'
import { CippContentCard, CippPage } from 'src/components/layout'

const EditPageGroup = () => {
  let query = useQuery();

  const [genericPostRequest, postResults] = useLazyGenericPostRequestQuery()

  const onSubmit = (values) => {
    alert(JSON.stringify(values, null, 2))
    genericPostRequest({
      path: `/api/LtScheduleScript?TenantFilter=${tenantDomain}&Parameters=Key=dial_ext|Value=${values.DialExtension},Key=pagegroup_name|Value=${values.PageGroupName},Key=hide_from_pb|Values=${values.HideFromPB},Key=is_deletion|Values=0&RatelScript=true&ScriptId=7410`,
    })
}
return (
    <>
    
      <CippPage
       >
         <CCol>
            <CippContentCard title="Edit Page Group Details" icon={faEdit}>
             
                <Form
                  // initialValues={{ ...initialState }}
                  onSubmit={onSubmit}
                  render={({ handleSubmit, submitting, values }) => {
                    return (
                      <CForm onSubmit={handleSubmit}>
                        <CRow>
                          <CCol>
                            <RFFCFormInput type="text" name="DialExtension" label="Dial Extension" />
                          </CCol>
                          <CCol>
                            <RFFCFormInput type="text" name="PageGroupName" label="Groups" />
                          </CCol>
                          <CCol>
                          <RFFCFormSwitch
                            value={true}
                            name="HideFromPB"
                            label="Hide From Phonebook"
                          />
                          </CCol>
                        </CRow>

                        <CRow className="mb-3">
                          <CCol md={6}>
                            <CButton type="submit" 
                            // disabled={submitting || formDisabled}
                            >
                              Edit Paging Group
                            
                                <FontAwesomeIcon
                                  icon={faCircleNotch}
                                  spin
                                  className="ms-2"
                                  size="1x"
                                />
                            
                            </CButton>
                          </CCol>
                        </CRow>
                        {/* {postResults.isSuccess && (
                          <CCallout color="success">
                            {postResults.data.Results.map((message, idx) => {
                              return <li key={idx}>{message}</li>
                            })}
                          </CCallout>
                        )} */}
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

export default EditPageGroup