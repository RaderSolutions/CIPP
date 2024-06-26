/* eslint-disable prettier/prettier */
import React, { Suspense, useEffect, useState } from 'react'
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

  const {
    data: members = {},
    isFetching: pickupGroupMemberIsFetching,
    error: pickupGroupError,
  } = useListPickupMemberQuery({ tenantDomain, extension, type })

  useEffect(() => {
    if (!extension || !tenantDomain || !type) {
      ModalService.open({
        body: 'Error invalid request, could not load requested pickup group member.',
        title: 'Invalid Request',
      })
      setQueryError(true)
    } else {
      setQueryError(false)
    }
  }, [members, pickupGroupMemberIsFetching, pickupGroupError])

  useEffect(() => {
    console.log('postResults', postResults)
    console.log('members', members, 'errors', pickupGroupError)
    console.log(tenantDomain, extension, type)
  }, [members, pickupGroupError, postResults])

  const onSubmit = (values) => {
    const shippedValues = {
      TenantFilter: tenantDomain,
      Extension: extension,
      Groups: values.Groups,
      Type: values.Type,
      IsSyncScheduled: 1,
      Action: 'Edit',
      ID: members.ID,
    }
    genericPostRequest({ path: '/api/LtRatelPickupGroups', values: shippedValues })
  }

  const formDisabled = queryError === true || !members || Object.keys(members).length === 0
  return (
    <>
      <Suspense fallback={'loading'}>
        <CippPage
          title={`Edit Member: ${pickupGroupMemberIsFetching ? 'Loading...' : 'Member'}
        
        `}
        >
          {!queryError && (
            <CCol>
              <CippContentCard title="Member Details" icon={faEdit}>
                {!pickupGroupMemberIsFetching && (
                  <Form
                    // initialValues={{ ...initialState }}
                    onSubmit={onSubmit}
                    render={({ handleSubmit, submitting, values }) => {
                      return (
                        <CForm onSubmit={handleSubmit}>
                          <CRow>
                            <CCol className="mt-3">
                              Extension:
                              {" "}
                              {extension}
                            </CCol>
                            <CCol>
                              <RFFCFormInput type="text" name="Groups" label="Group Name" />
                            </CCol>
                            <CCol>
                              <RFFCFormSelect
                                name="Type"
                                label="Type"
                                placeholder={'Select Type'}
                                values={[
                                  { value: 'pickup', label: 'Pickup' },
                                  { value: 'call', label: 'Call' },
                                ]}
                              />
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
                            <CCallout color="success">{postResults.data.Results}</CCallout>
                          )}
                        </CForm>
                      )
                    }}
                  />
                )}
              </CippContentCard>
            </CCol>
          )}
        </CippPage>
      </Suspense>
    </>
  )
}

export default EditMember
