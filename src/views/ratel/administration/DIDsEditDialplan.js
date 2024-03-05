/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { CButton, CCallout, CCol, CForm, CRow, CSpinner } from '@coreui/react'
import useQuery from 'src/hooks/useQuery'
import { useDispatch } from 'react-redux'
import { Form } from 'react-final-form'
import {
  RFFCFormInput,
  RFFCFormSelect,

  RFFCFormTextarea,

} from 'src/components/forms'
import { useListDidQuery,useListSampleDialplansQuery} from 'src/store/api/ratelDids'
import { CippCodeBlock, ModalService } from 'src/components/utilities'
import { useLazyGenericPostRequestQuery } from 'src/store/api/app'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch, faEdit, faEye } from '@fortawesome/free-solid-svg-icons'
import { CippContentCard, CippPage } from 'src/components/layout'

const EditDid = () => {
  const dispatch = useDispatch()
  let query = useQuery()
  const didNumber = query.get('DidNumber')
  const tenantDomain = query.get('tenantDomain')
  const [queryError, setQueryError] = useState(false)
  const {
    data: did,
    isFetching: didIsFetching,
    error: didError,
  } = useListDidQuery({ tenantDomain, didNumber })
  const {
    data: sampleDialplans = {},
    isFetching: sampleDialplansAreFetching,
    error: sampleDialplansError,
  } = useListSampleDialplansQuery({ Name: "EditDid" })




  useEffect(() => {
    if (!didNumber|| !tenantDomain) {
      ModalService.open({
        body: 'Error invalid request, could not load requested did.',
        title: 'Invalid Request',
      })
      setQueryError(true)
    } else {
      setQueryError(false)
    }
  }, [didNumber, tenantDomain, dispatch])

  const [genericPostRequest, postResults] = useLazyGenericPostRequestQuery()
  const onSubmit = (values) => {
    //@todo: need to fix copyfrom in api so this is no longer required
    if (!values.CopyFrom) {
      values.CopyFrom = ''
    }
    //@todo: need to fix this in api so this hacky shit is no longer needed.

    const shippedValues = {
      DidNumber: values.Number,
      Description: values.Description,
      Dialplan: values.Dialplan
    }
     //window.alert(JSON.stringify(shippedValues))
    // console.log(values)
    genericPostRequest({ path: '/api/LtRatelDIDs', values: shippedValues })
  }

  const initialState = {
    ...did,
  }

  // this is dumb
  const formDisabled =
    queryError === true || !!didError || !did || Object.keys(did).length === 0
  const RawDid = JSON.stringify(did, null, 2)
  return (
    <CippPage
      title={`Edit DID: ${
        didIsFetching ? 'Loading...' : did.Number }`}
      tenantSelector={false}
    >
      {!queryError && (
        <>
          {postResults.isSuccess && (
            <CCallout color="success">{postResults.data?.Results}</CCallout>
          )}
          {queryError && (
            <CRow>
              <CCol xs={12}>
                <CCallout color="danger">
                  {/* @todo add more descriptive help message here */}
                  Failed to load did
                </CCallout>
              </CCol>
            </CRow>
          )}
          <CRow>
            <CCol lg={6} xs={12}>
              <CippContentCard title="Did Details" icon={faEdit}>
                {didIsFetching && <CSpinner />}
                {didError && <span>Error loading did</span>}
                {!didIsFetching && (
                  <Form
                    initialValues={{ ...initialState }}
                    onSubmit={onSubmit}
                    render={({ handleSubmit, submitting, values }) => {
                      return (
                        <CForm onSubmit={handleSubmit}>
                            <CRow>
                            <CCol lg={6} xs={12}>
              <RFFCFormInput
                type="text"
                name="Number"
                label="Number"
                disabled={true}
              />
            </CCol>
            <CCol lg={6} xs={12}>
              <RFFCFormInput
                type="text"
                name="Description"
                label="Edit Description"
                //disabled={formDIsabled}
              />
            </CCol>
                            </CRow>
                            <CRow>
                        <RFFCFormTextarea 
                        name="Dialplan"
                        label="Edit Dialplan"
                        />
                            </CRow>

                          <CCol lg={6} xs={12}>
            {sampleDialplansAreFetching && <CSpinner />}
              {!sampleDialplansAreFetching && (
              <RFFCFormSelect
              name="Dialplan"
              label="Use a Sample Dialplan"
              placeholder={!sampleDialplansAreFetching? 'Select Sample Dialplan' : 'Loading...'}
              values={sampleDialplans?.map((sampleDialplan) => ({
                value: sampleDialplan.DialplanData,
                label: sampleDialplan.Name,
              }))}
              //disabled={formDIsabled}
            />
              )}
            {sampleDialplansError && <span>Failed to load list of sample dialplans</span>}
            </CCol>
                          <CRow className="mb-3">
                            <CCol md={6}>
                              <CButton type="submit" disabled={submitting || formDisabled}>
                                Edit Did
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
                )}
              </CippContentCard>
            </CCol>
            <CCol lg={6} xs={12}>
              <CippContentCard title="Raw Did Data" icon={faEye}>
                {didIsFetching && <CSpinner />}
                {didError && <span>Error loading did</span>}
                {!didIsFetching && (
                  <>
                    This is the (raw) information for this did.
                    <CippCodeBlock language="json" code={RawDid} />
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

export default EditDid
