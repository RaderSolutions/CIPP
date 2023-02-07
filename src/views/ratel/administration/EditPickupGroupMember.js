/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { CButton, CCallout, CCol, CForm, CRow, CSpinner } from '@coreui/react'
import useQuery from 'src/hooks/useQuery'
import { useDispatch } from 'react-redux'
import { Form } from 'react-final-form'
import { RFFCFormInput, RFFCFormSelect } from 'src/components/forms'
import { CippCodeBlock, ModalService } from 'src/components/utilities'
import { useLazyGenericPostRequestQuery } from 'src/store/api/app'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch, faEdit, faEye } from '@fortawesome/free-solid-svg-icons'
import { CippContentCard, CippPage } from 'src/components/layout'
import { useListPickupMemberQuery } from 'src/store/api/ratelPickupGroups'

export const EditMember = () => {
  const [genericPostRequest, postResults] = useLazyGenericPostRequestQuery()
  const [queryError, setQueryError] = useState(false)

  let query = useQuery()
  const tenantDomain = query.get('tenantDomain')
  const ext = query.get('extension')
  const type = query.get('type')

  const {
    data: member = {},
    isFetching: memberIsFetching,
    error: memberError,
  } = useListPickupMemberQuery({ tenantDomain, ext, type })

  useEffect(()=>{
    console.log(member)
  },[member])

  const onSubmit = (values) => {
    const shippedValues = {
      Extension: values.Extension,
      Groups: values.Groups,
      Type: values.Type,
    }

    genericPostRequest({ path: '/api/LtRatelPickupGroups', values: shippedValues })
  }


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
                    <CCol>
                      <RFFCFormInput type="text" name="Extension" label="Extension" />
                    </CCol>
                    <CCol>
                      <RFFCFormInput type="text" name="Groups" label="Groups" />
                    </CCol>
                    <CCol>
                      <RFFCFormInput type="text" name="Type" label="Type" />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol md={6}>
                      <CButton type="submit">
                        Edit Member
                        {postResults.isFetching && (
                          <FontAwesomeIcon icon={faCircleNotch} spin className="ms-2" size="1x" />
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
    </CippPage>
    </>
  )
}

export default EditMember
