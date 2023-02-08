/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { CButton, CCallout, CCol, CForm, CRow, CSpinner } from '@coreui/react'
import useQuery from 'src/hooks/useQuery'
import { useDispatch } from 'react-redux'
import { Form } from 'react-final-form'
import { RFFCFormInput, RFFCFormSelect } from 'src/components/forms'
import { CippCodeBlock, ModalService } from 'src/components/utilities'
import { useLazyGenericGetRequestQuery, useLazyGenericPostRequestQuery } from 'src/store/api/app'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch, faEdit, faEye } from '@fortawesome/free-solid-svg-icons'
import { CippContentCard, CippPage } from 'src/components/layout'
import { useListPickupMemberQuery } from 'src/store/api/pickupgroups'

export const EditMember = () => {
  const [genericPostRequest, postResults] = useLazyGenericPostRequestQuery()

  const [queryError, setQueryError] = useState(false)

  let query = useQuery()
  const tenantDomain = query.get('tenantDomain')
  const extension = query.get('extension')
  const type = query.get('type')

  console.log(type)

  // tenantDomain=fd715e1a-29b4-4bdb-bf15-14dcb99f2bf7&extension=1001&groups=Reception&type=undefined

  const {
    data: members = [],
    isFetching: pickupGroupMemberIsFetching,
    error: pickupGroupError,
  } = useListPickupMemberQuery({ tenantDomain, extension, type })

  useEffect(() => {
    if (!extension || !tenantDomain || !type) {
      console.log(extension)
      ModalService.open({
        body: 'Error invalid request, could not load requested pickup group member.',
        title: 'Invalid Request',
      })
      setQueryError(true)
    } else {
      console.log(members)
      setQueryError(false)
    }
  }, [members, isFetching, error])

  const onSubmit = (values) => {
    const shippedValues = {
      Extension: values.Extension,
      Groups: values.Groups,
      Type: values.Type,
    }

    genericPostRequest({ path: '/api/LtRatelPickupGroups', values: shippedValues })
  }

  const formDisabled = queryError === true || !members || Object.keys(members).length === 0
  return (
    <>
      <CippPage
      title={
        `Edit Member: ${
          pickupGroupMemberIsFetching ? 'Loading...' : 'Member'
        }
        
        `
      }
      >
        {!queryError && (
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
                          <CButton type="submit" disabled={submitting || formDisabled}>
                            Edit Member
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
        )}
      </CippPage>
    </>
  )
}

export default EditMember
