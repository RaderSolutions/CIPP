/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { CButton, CCallout, CCol, CForm, CRow, CSpinner } from '@coreui/react'
import useQuery from 'src/hooks/useQuery'
import { useDispatch } from 'react-redux'
import { Form } from 'react-final-form'
import { RFFCFormInput, RFFCFormSelect, RFFCFormTextarea } from 'src/components/forms'
import { useLazyGenericPostRequestQuery } from 'src/store/api/app'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch, faEdit, faEye } from '@fortawesome/free-solid-svg-icons'
import { CippContentCard, CippPage } from 'src/components/layout'
import { CippCodeBlock } from 'src/components/utilities'
import { useSelector } from 'react-redux'

export const AddDialplanInternal = () => {
  const tenant = useSelector((state) => state.app.currentTenant)
  const [genericPostRequest, postResults] = useLazyGenericPostRequestQuery()
   
  const onSubmit = async (values) => {
    console.log(values)
    await genericPostRequest({
      path: `/api/LtScheduleScript?TenantFilter=${tenant.customerId}&Parameters=Key=Name|Value=${values.name},Key=Dialplan|Value=${values.dialplan},Key=Notes|Value=${values.description},Key=Delete|Value=0&RatelScript=true&ScriptId=7387`,
    })
  }
  
  return (
    <CippPage title="Add Internal Dialplan">
        <CCol>
          <CippContentCard title="Add Internal Dialplan" icon={faEdit}>
            <Form
              // initialValues={{ ...initialState }}
              onSubmit={onSubmit}
              render={({ handleSubmit, submitting, values }) => {
                return (
                  <CForm onSubmit={handleSubmit}>
                    <CRow>
                      <CCol>
                        <RFFCFormInput type="text" name="name" label="Name" />
                      </CCol>
                      <CCol>
                        <RFFCFormInput type="text" name="description" label="Description" />
                      </CCol>
                      <CCol>
                        <RFFCFormTextarea type="text" name="dialplan" label="Dialplan" />
                     </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol md={6}>
                        <CButton type="submit">Add Dialplan</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                )
              }}
            />
          </CippContentCard>
          {postResults.isFetching && (
            <CCallout color="info">
              <CSpinner>Loading</CSpinner>
            </CCallout>
          )}
          {postResults.isSuccess && <CCallout color="success">{postResults.data.Results}</CCallout>}
        </CCol>
        </CippPage>
  )
}

export default AddDialplanInternal