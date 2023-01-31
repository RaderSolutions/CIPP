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
import { values } from 'core-js/core/array'

const EditDialplan = () => {
  const dispatch = useDispatch()
  let query = useQuery()
  const dialplan = query.get('dialplan')
  const name = query.get('name')
  const description = query.get('description')
  const tenantDomain = query.get('tenantDomain')
  const [queryError, setQueryError] = useState(false)

  const [genericPostRequest, postResults] = useLazyGenericPostRequestQuery()
  const onSubmit = (values) => {
    //@todo: need to fix copyfrom in api so this is no longer required

    //@todo: need to fix this in api so this hacky shit is no longer needed.

    const shippedValues = {
      Name: values.Name,
      Description: values.Description,
      Dialplan: values.Dialplan,
    }
    //window.alert(JSON.stringify(shippedValues))
    // console.log(values)
    // genericPostRequest({ path: '/api/LtRatelDIDs', values: shippedValues })
  }

  // this is dumb

  return (
    <CippPage title="Edit Dialplan" tenantSelector={false}>
      <>
        {/* {postResults.isSuccess && <CCallout color="success">{postResults.data?.Results}</CCallout>}
        {queryError && (
          <CRow>
            <CCol xs={12}>
              <CCallout color="danger">
                {/* @todo add more descriptive help message here */}
{/*           
              </CCallout>
            </CCol>
          </CRow> */}
      
        <CRow> 
          <CCol lg={6} xs={12}>
            <CippContentCard title="Placeholder" icon={faEdit}>
              <Form
                initialValues={{ ...initialState }}
                onSubmit={onSubmit}
                render={({ handleSubmit, submitting, values }) => {
                  return (
                    <CForm onSubmit={handleSubmit}>
                      <CRow>
                        <CCol lg={6} xs={12}>
                          <RFFCFormInput type="text" name="Name" label="Name" />
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
                        <RFFCFormTextarea name="Dialplan" label="Edit Dialplan" />
                      </CRow>

                      <CCol lg={6} xs={12}></CCol>
                      <CRow className="mb-3">
                        <CCol md={6}>
                          <CButton type="submit" disabled={submitting || formDisabled}>
                            {/* {postResults.isFetching && (
                              <FontAwesomeIcon
                                icon={faCircleNotch}
                                spin
                                className="ms-2"
                                size="1x"
                              />
                            )} */}
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
          <CCol lg={6} xs={12}>
            {/* <CippContentCard title="Raw Dialplan Data" icon={faEye}>
                <CippCodeBlock code={values.Dialplan} />
            </CippContentCard> */}
          </CCol>
        </CRow>
      </>
    </CippPage>
  )
}

export default EditDialplan
