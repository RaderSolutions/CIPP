/* eslint-disable prettier/prettier */
import React from 'react'
import { CCallout, CCol, CRow, CSpinner, CListGroup, CListGroupItem } from '@coreui/react'
import { Field, FormSpy } from 'react-final-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { CippWizard } from 'src/components/layout'
import PropTypes from 'prop-types'
import { RFFCFormInput, RFFCFormSelect, RFFCFormTextarea } from 'src/components/forms'
import { TenantSelector } from 'src/components/utilities'
import { useLazyGenericPostRequestQuery } from 'src/store/api/app'
import { useSelector } from 'react-redux'

// const Error = ({ name }) => (
//   <Field
//     name={name}
//     subscription={{ touched: true, error: true }}
//     render={({ meta: { touched, error } }) =>
//       touched && error ? (
//         <CCallout color="danger">
//           <FontAwesomeIcon icon={faExclamationTriangle} color="danger" />
//           {error}
//         </CCallout>
//       ) : null
//     }
//   />
// )

// Error.propTypes = {
//   name: PropTypes.string.isRequired,
// }

const AddPagingGroupMember = () => {
  const [genericPostRequest, postResults] = useLazyGenericPostRequestQuery()

  const tenantDomain = useSelector((state) => state.app.currentTenant.customerId)
console.log('testing build/changes')
  const handleSubmit = async (values) => {
    // const shippedValues = {
    //   TenantFilter: tenantDomain,
    //   PageGroupExtension: values.PagegroupExt,
    //   DeviceExtension: values.DeviceExt,
    // }

    alert(JSON.stringify(values, null, 2))
    genericPostRequest({
      path: `/api/LtScheduleScript?TenantFilter=${tenantDomain}&Parameters=Key=function|Value=add,Key=pagegroup_ext|Value=${values.PagegroupExt},Key=device_ext|Value=${values.DeviceExt}&RatelScript=true&ScriptId=7411`,
    })
  }

  return (
    <CippWizard onSubmit={handleSubmit} wizardTitle="Add Ratel Paging Group Member Wizard">
      <CippWizard.Page
        title="Tenant Choice"
        description="Choose the tenant to add a paging group member to"
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
        title="Paging Group Member Information"
        description="Enter the paging group member information"
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
              <RFFCFormInput name="PagegroupExt" label="Page Group Extension" />
            </CCol>
            <CCol lg={6} xs={12}>
              <RFFCFormInput name="DeviceExt" label="Device Extension" />
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
          {
            !postResults.isSuccess && (
              <FormSpy subscription={{ values: true, labels: true }}>
                {
                  (props) => {
                    const { values } = props
                    console.log("VALUES ADD PAGING GROUP MEMBER: ", values)
                    const valuesArray = Object.keys(values).map((key) => ({
                      key: key,
                      value: values[key],
                    }))
                    console.log("VALUES ARRAY: ", valuesArray)
                    let pageGroupKey
                    pageGroupKey = valuesArray.find((item) => item.key === 'PagegroupExt')
                    let deviceExtKey
                    deviceExtKey = valuesArray.find((item) => item.key === 'DeviceExt')
                    return (
                     <CListGroup>
                      {
                        pageGroupKey && <CListGroupItem>{`Page Group Extension: ${pageGroupKey.value}`}</CListGroupItem>
                      }
                      {
                        deviceExtKey && <CListGroupItem>{`Device Extension: ${deviceExtKey.value}`}</CListGroupItem>
                      }
                      </CListGroup>
                    )
                  }
                }
                </FormSpy>
            )
              }
         
    
        {postResults.isFetching && (
          <CCallout color="info">
            <CSpinner>Loading</CSpinner>
          </CCallout>
        )}
        {postResults.isSuccess && <CCallout color="success">Script Run Successfully</CCallout>}
        <hr className="my-4" />
        </center>
        <hr className="my-4" />
      </CippWizard.Page>
    </CippWizard>
  )
}

export default AddPagingGroupMember
