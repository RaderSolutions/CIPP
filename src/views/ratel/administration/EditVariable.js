/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { CButton, CCallout, CCol, CForm, CRow, CSpinner } from '@coreui/react'
import useQuery from 'src/hooks/useQuery'
import { useDispatch } from 'react-redux'
import { Form } from 'react-final-form'
import { RFFCFormInput} from 'src/components/forms'
import { useListVariableQuery} from 'src/store/api/ratelVariables'
import { CippCodeBlock, ModalService } from 'src/components/utilities'
import { useLazyGenericPostRequestQuery } from 'src/store/api/app'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch, faEdit, faEye } from '@fortawesome/free-solid-svg-icons'
import { CippContentCard, CippPage } from 'src/components/layout'
//import { jsonToCSV } from 'react-papaparse'

const EditVariable = () => {
  const dispatch = useDispatch()
  let query = useQuery()
  const family = query.get('variableFamily')
  const key = query.get('variableKey')
  const tenantDomain = query.get('tenantDomain')
  const [queryError, setQueryError] = useState(false)
  const {
    data: variable,
    isFetching: variableIsFetching,
    error: variableError,
  } = useListVariableQuery({ tenantDomain, family, key })




  useEffect(() => {
    if (!family|| !tenantDomain) {
      ModalService.open({
        body: 'Error invalid request, could not load requested did.',
        title: 'Invalid Request',
      })
      setQueryError(true)
    } else {
      setQueryError(false)
    }
  }, [family, tenantDomain, dispatch])

  const [genericPostRequest, postResults] = useLazyGenericPostRequestQuery()
  const onSubmit = (values) => {
    //@todo: need to fix copyfrom in api so this is no longer required
    if (!values.CopyFrom) {
      values.CopyFrom = ''
    }
    //@todo: need to fix this in api so this hacky shit is no longer needed.

    const shippedValues = {
      family: values.Family,
      key: values.Key,
      value: values.Value
    }
     //window.alert(JSON.stringify(shippedValues))
    // console.log(values)
    genericPostRequest({ path: `/api/LtScheduleScript?TenantFilter=${tenantDomain}&Parameters=Key=astFamily|Value=${shippedValues.family},Key=astKey|Value=${shippedValues.key},Key=astValue|value=${shippedValues.value}&RatelScript=true&ScriptId=7355` })
    console.log(postResults)
  }

  const initialState = {
    ...variable,
  }

  console.log(variable)
  // this is dumb
  const formDisabled =
    queryError === true || !!variableError || !variable || Object.keys(variable).length === 0
  const RawVariable = JSON.stringify(variable, null, 2)
  return (
    <CippPage
      title={`Edit Variable: ${
        variableIsFetching ? 'Loading...' : variable.Family + ' ' + variable.Key }`}
      tenantSelector={false}
    >
      {!queryError && (
        <>
          {postResults.isSuccess && (
            <CCallout color="success">{JSON.stringify(postResults)}</CCallout>
          )}
          {queryError && (
            <CRow>
              <CCol xs={12}>
                <CCallout color="danger">
                  {/* @todo add more descriptive help message here */}
                  Failed to load variable
                </CCallout>
              </CCol>
            </CRow>
          )}
          <CRow>
            <CCol lg={6} xs={12}>
              <CippContentCard title="Variable Details" icon={faEdit}>
                {variableIsFetching && <CSpinner />}
                {variableError && <span>Error loading variable</span>}
                {!variableIsFetching && (
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
                name="Family"
                label="Family"
                disabled={true}
              />
            </CCol>
            <CCol lg={6} xs={12}>
            <RFFCFormInput
                type="text"
                name="Key"
                label="Key"
                disabled={true}
              />
            </CCol>
                            </CRow>
                            <CRow>
                            <RFFCFormInput
                type="text"
                name="Value"
                label="Value"
              />
                            </CRow>
                          <CRow className="mb-3">
                            <CCol md={6}>
                              <CButton type="submit" disabled={submitting || formDisabled}>
                                Edit Variable
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
                              {JSON.stringify(postResults)}
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
              <CippContentCard title="Raw Variable Data" icon={faEye}>
                {variableIsFetching && <CSpinner />}
                {variableError && <span>Error loading variable</span>}
                {!variableIsFetching && (
                  <>
                    This is the (raw) information for this variable.
                    <CippCodeBlock language="json" code={RawVariable} />
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
