/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { CButton, CCallout, CCol, CForm, CRow, CSpinner } from '@coreui/react'
import useQuery from 'src/hooks/useQuery'
import { useDispatch } from 'react-redux'
import { Form } from 'react-final-form'
import { RFFCFormInput, RFFCFormSelect, RFFCFormTextarea } from 'src/components/forms'
// import { CippCodeBlock, ModalService } from 'src/components/utilities'
import { useLazyGenericPostRequestQuery } from 'src/store/api/app'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch, faEdit, faEye } from '@fortawesome/free-solid-svg-icons'
import { CippContentCard, CippPage } from 'src/components/layout'
import { CippCodeBlock } from 'src/components/utilities'

const EditDialplan = () => {
  const dispatch = useDispatch()
  let query = useQuery()
  const dialplan = query.get('dialplan')
  const name = query.get('name')
  const description = query.get('description')
  // const tenantDomain = query.get('tenantDomain')
  const [queryError, setQueryError] = useState(false)

  const initialState = {
    dialplan: dialplan,
    name: name,
    description: description,
  }

  const [genericPostRequest, postResults] = useLazyGenericPostRequestQuery()
  const onSubmit = (values) => {
    window.alert(JSON.stringify(shippedValues))
    console.log(values)
    genericPostRequest({
      path: `/api/LtScheduleScript?TenantFilter=${tenant.customerId}&Parameters=Key=Name|Value=${values.name},Key=Dialplan|Value=${values.dialplan},Key=Notes|Values=${values.description}&RatelScript=true&ScriptId=7387`,
    })
  }

  return (
    <>
      <CRow>
        <CCol>
          <CippContentCard title="Edit Dialplan" icon={faEdit}>
            <Form
              initialValues={{ ...initialState }}
              onSubmit={onSubmit}
              render={({ handleSubmit, submitting, values }) => {
                return (
                  <CForm onSubmit={handleSubmit}>
                    <CRow>
                      <CCol>
                        <RFFCFormInput type="text" name="Name" label="Name" />
                      </CCol>
                      <CCol>
                        <RFFCFormInput type="text" name="Description" label="Description" />
                      </CCol>
                      <CCol>
                        <RFFCFormTextarea type="text" name="Dialplan" label="Dialplan" />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol md={6}>
                        <CButton type="submit">Edit Member</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                )
              }}
            />
          </CippContentCard>
        </CCol>
        {/* <CCol style={{ maxWidth: '50vw' }}>
          {dialplan && (
            <CippContentCard>
              <CippCodeBlock code={dialplan} language="json" />
            </CippContentCard>
          )}
        </CCol> */}
      </CRow>
    </>
  )
}

export default EditDialplan
