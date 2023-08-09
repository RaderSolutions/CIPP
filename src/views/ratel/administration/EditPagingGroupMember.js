/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { CButton, CCallout, CCol, CForm, CRow, CListGroup, CListGroupItem, CSpinner } from '@coreui/react'
import useQuery from 'src/hooks/useQuery'
import { useDispatch } from 'react-redux'
import { Form, FormSpy } from 'react-final-form'
import { RFFCFormInput, RFFCFormSelect } from 'src/components/forms'
import { CippCodeBlock, ModalService } from 'src/components/utilities'
import { useLazyGenericGetRequestQuery, useLazyGenericPostRequestQuery } from 'src/store/api/app'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch, faEdit, faEye } from '@fortawesome/free-solid-svg-icons'
import { CippContentCard, CippPage } from 'src/components/layout'
// import { useListPickupMemberQuery } from 'src/store/api/pickupgroups'

export const EditPageMember = () => {
  const [genericPostRequest, postResults] = useLazyGenericPostRequestQuery()

  const [queryError, setQueryError] = useState(false)

  //   let query = useQuery()
  //   const tenantDomain = query.get('tenantDomain')
  //   const extension = query.get('extension')
  //   const type = query.get('type')

  //   console.log('type', type, 'ext', extension)

  // tenantDomain=fd715e1a-29b4-4bdb-bf15-14dcb99f2bf7&extension=1001&groups=Reception&type=undefined

  //   const {
  //     data: members = {},
  //     isFetching: pagingGroupMemberIsFetching,
  //     error: pagingGroupMemberError,
  //   } = useListPagingMemberQuery({ tenantDomain, extension, type })

  //   useEffect(() => {
  //     console.log(members)
  //   }, [members])

  //   useEffect(() => {
  //     if (!extension || !tenantDomain || !type) {
  //       ModalService.open({
  //         body: 'Error invalid request, could not load requested pickup group member.',
  //         title: 'Invalid Request',
  //       })
  //       setQueryError(true)
  //     } else {
  //       setQueryError(false)
  //     }
  //   }, [members, isFetching, error])

  const onSubmit = (values) => {
    console.log('submit')
    const shippedValues = {
      MemberPageExtension: values.MemberPageExtension,
      MemberDeviceExtension: values.MemberDeviceExtension,
    }

    genericPostRequest({ path: '/api/LtRatelPagingGroups', values: shippedValues })
  }

  //   const formDisabled = queryError === true || !members || Object.keys(members).length === 0
  return (
    <>
      <CippPage
      // title={`Edit Member: ${pagingGroupMemberIsFetching ? 'Loading...' : 'Member'}

      // `}
      >
        {/* {!queryError && ( */}
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
                        <RFFCFormInput
                          type="text"
                          name="MemberPageExtension"
                          label="Member Pagin Extension"
                        />
                      </CCol>
                      <CCol>
                        <RFFCFormInput
                          type="text"
                          name="MemberDeviceExtension"
                          label="Member Device Extension"
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol md={6}>
                        <CButton type="submit" disabled={submitting || formDisabled}>
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
                          return (
                            <FormSpy subscription={{ values: true, labels: true }}>
                              {
                                (props) => {
                                  return (
                                    <CListGroup>

                                    </CListGroup>
                                  )
                                }
                              }

                            </FormSpy>
                          )

                        })}
                      </CCallout>
                    )}
                  </CForm>
                )
              }}
            />
          </CippContentCard>
        </CCol>
        {/* )} */}
      </CippPage>
    </>
  )
}

export default EditPageMember
