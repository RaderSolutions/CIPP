/* eslint-disable prettier/prettier */
import React from 'react'
import { CCallout, CCol, CRow, CSpinner, CListGroup, CListGroupItem } from '@coreui/react'
import { Field, FormSpy, useFormState } from 'react-final-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { CippWizard } from 'src/components/layout'
import PropTypes from 'prop-types'
import { RFFCFormInput, RFFCFormRadio, RFFCFormSelect, RFFCFormSwitch, RFFCFormTextarea } from 'src/components/forms/RFFComponents'
import { TenantSelector } from 'src/components/utilities'
import { useLazyGenericPostRequestQuery } from 'src/store/api/app'
import { useSelector } from 'react-redux'


const AddPagingGroup = () => {
  const [genericPostRequest, postResults] = useLazyGenericPostRequestQuery()

  const tenantDomain = useSelector((state) => state.app.currentTenant.customerId)

  const handleSubmit = async (values) => {
    alert(JSON.stringify(values, null, 2))
    genericPostRequest({
      path: `/api/LtScheduleScript?TenantFilter=${tenantDomain}&Parameters=Key=dial_ext|Value=${values.DialExtension},Key=pagegroup_name|Value=${values.PageGroupName},Key=hide_from_pb|Values=${values.HideFromPB},Key=is_deletion|Values=0&RatelScript=true&ScriptId=7410`,
    })
  }

  return (
    <CippWizard onSubmit={handleSubmit} wizardTitle="Add Ratel Paging Group Wizard">
      <CippWizard.Page
        title="Tenant Choice"
        description="Choose the tenant to add a paging group to"
      >
        <center>
          <h3 className="text-primary">Step 1</h3>
          <h5 className="card-title mb-4">Choose a tenant</h5>
        </center>
        <hr className="my-4" />
        <Field name="selectedTenants">{(props) => <TenantSelector />}</Field>
        {/* <Error name="selectedTenants" /> */}
        <hr className="my-4" />
      </CippWizard.Page>
      <CippWizard.Page
        title="Paging Group Information"
        description="Enter the paging group information"
      >
        <center>
          <h3 className="text-primary">Step 2</h3>
          <h5>Enter Paging Group Information</h5>
        </center>
        <hr className="my-4" />
        <div className="mb-2">
          <CRow>
            {/* TODO: discuss w SW */}
            <CCol lg={6} xs={12}>
              <RFFCFormInput name="DialExtension" label="Page Group Extension" />
            </CCol>
            <CCol lg={6} xs={12}>
              <RFFCFormInput name="PageGroupName" label="Page Group Name" />
            </CCol>
            <CCol lg={6} xs={12}>
              <RFFCFormSwitch name="HideFromPB" label="Hide From Phonebook" value={true} />
            </CCol>
          </CRow>
        </div>
        <hr className="my-4" />
      </CippWizard.Page>
      <CippWizard.Page title="Review and Confirm" description="Confirm the settings to apply">
        <center>
          <h3 className="text-primary">Step 3</h3>
          <h5 className="mb-4">Confirm and apply</h5>
          <hr className="my-4" />
          {postResults.isFetching && (
            <CCallout color="info">
              <CSpinner>Loading</CSpinner>
            </CCallout>
          )}
          {
            !postResults.isFetching && !postResults.isSuccess && (
              <FormSpy subscription={{ values: true, labels: true }}>
                {
                  (props) => {
                    const formState = useFormState()
                    const {values} = props;
                    const valuesArray = Object.keys(formState.values)?.map((key) => ({
                      key: key,
                      value: values[key]
                    }));

                    console.log('valuesArray', valuesArray) 
                    let dialExtensionKey;
                    dialExtensionKey = valuesArray.find((item) => item.key === 'DialExtension');
                    let pageGroupNameKey;
                    pageGroupNameKey = valuesArray.find((item) => item.key === 'PageGroupName');
                    let hideFromPBKey;
                    hideFromPBKey = valuesArray.find((item) => item.key === 'HideFromPB');
                    console.log('dialExtensionKey', dialExtensionKey)
                    return <CListGroup>
                      {
                        dialExtensionKey && <CListGroupItem>
                          {`Dial Extension: ${dialExtensionKey.value}`}
                        </CListGroupItem>
                      }
                      {
                        pageGroupNameKey && <CListGroupItem>
                          {`Page Group Name: ${pageGroupNameKey.value}`}
                        </CListGroupItem>
                      }
                      {
                        hideFromPBKey && <CListGroupItem>
                          {`Hide From Phonebook: ${hideFromPBKey.value}`}
                        </CListGroupItem>
                      }
                    </CListGroup>
                  }
                }
                </FormSpy>
            )
          }
          {postResults.isSuccess && <CCallout color="success">{postResults.data.Results}</CCallout>}
        </center>
        <hr className="my-4" />
      </CippWizard.Page>
    </CippWizard>
  )
}

export default AddPagingGroup
