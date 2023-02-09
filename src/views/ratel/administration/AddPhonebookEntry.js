/* eslint-disable prettier/prettier */
import React from 'react'
import { CCallout, CCol, CRow, CSpinner } from '@coreui/react'
import { Field } from 'react-final-form'
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

const AddPhonebookEntry = () => {
  const [genericPostRequest, postResults] = useLazyGenericPostRequestQuery()

  const tenantDomain = useSelector((state) => state.app.currentTenant.customerId)

  const handleSubmit = async (values) => {
    const shippedValues = {
      TenantFilter: tenantDomain,
      Dial: values.dial,
      Salutation: values.salutation,
      FirstName: values.firstName,
      MiddleName: values.middleName,
      LastName: values.lastName,
      Suffix: values.suffix,
      Email: values.email,
      Organization: values.organization,
      JobTitle: values.jobTitle,
      Location: values.location,
      Notes: values.notes,
      ContactType: values.ContactType,
      IsFromFOP: values.IsFromFOP
    }

    alert(JSON.stringify(values, null, 2))
    genericPostRequest({ path: '/api/LtAddRatelPhonebookEntry', values: shippedValues })
  }

  return (
    <CippWizard onSubmit={handleSubmit} wizardTitle="Add Phonebook Entry">
      <CippWizard.Page
        title="Tenant Choice"
        description="Choose the tenant to add a phonebook entry to"
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
        title="Phonebook Entry Information"
        description="Enter the phonebook entry information"
      >
        <center>
          <h3 className="text-primary">Step 2</h3>
          <h5>Enter Phonebook Entry Information</h5>
        </center>
        <hr className="my-4" />
        <div className="mb-2">
          <CRow>
            <CCol lg={6} xs={12}>
              <RFFCFormInput
                type="text"
                name="Dial"
                label="Dial"
                //disabled={formDIsabled}
              />
            </CCol>
            {/* TODO: discuss w SW */}
            <CCol lg={6} xs={12}>
              <RFFCFormSelect
                name="salutation"
                label="Salutation"
                placeholder={'Select Salutation'}
                values={[
                  { value: null, label: 'None' },
                  { value: 'Mr.', label: 'Mr.' },
                  { value: 'Ms.', label: 'Ms.' },
                  { value: 'Mrs.', label: 'Mrs.' },
                  { value: 'Dr.', label: 'Dr.' },
                ]}
                //disabled={formDIsabled}
              />
            </CCol>
            <CCol lg={6} xs={12}>
              <RFFCFormInput
                type="text"
                name="firstName"
                label="First Name"
                //disabled={formDIsabled}
              />
            </CCol>
            <CCol lg={6} xs={12}>
              <RFFCFormInput
                type="text"
                name="middleName"
                label="Middle Name"
                //disabled={formDIsabled}
              />
            </CCol>
            <CCol lg={6} xs={12}>
              <RFFCFormInput
                type="text"
                name="lastName"
                label="Last Name"
                //disabled={formDIsabled}
              />
            </CCol>
            <CCol lg={6} xs={12}>
              <RFFCFormSelect
                name="suffix"
                label="Suffix"
                placeholder={'Select Suffix'}
                values={[
                  { value: null, label: 'None' },
                  { value: 'II', label: 'II' },
                  { value: 'III', label: 'III' },
                  { value: 'IV', label: 'IV' },
                  { value: 'JR', label: 'JR' },
                  { value: 'SR', label: 'SR' },
                ]}
                //disabled={formDIsabled}
              />
            </CCol>
            <CCol lg={6} xs={12}>
              <RFFCFormInput
                type="text"
                name="email"
                label="Email"
                //disabled={formDIsabled}
              />
            </CCol>
            <CCol lg={6} xs={12}>
              <RFFCFormInput
                type="text"
                name="organization"
                label="Organization"
                //disabled={formDIsabled}
              />
            </CCol>
            <CCol lg={6} xs={12}>
              <RFFCFormInput
                type="text"
                name="jobTitle"
                label="Job Title"
                //disabled={formDIsabled}
              />
            </CCol>
            <CCol lg={6} xs={12}>
              <RFFCFormInput
                type="text"
                name="location"
                label="Location"
                //disabled={formDIsabled}
              />
            </CCol>
            <CCol lg={6} xs={12}>
              <RFFCFormInput
                type="text"
                name="notes"
                label="Notes"
                //disabled={formDIsabled}
              />
            </CCol>
            <CCol lg={6} xs={12}>
              <RFFCFormInput
                type="text"
                name="contactType"
                label="Contact Type"
                //disabled={formDIsabled}
              />
            </CCol>
            <CCol lg={6} xs={12}>
              <RFFCFormSelect
                name="select"
                label="Is From FOP"
                placeholder={'Select Option'}
                values={[
                  { value: null, label: 'None' },
                  { value: true, label: 'true' },
                  { value: false, label: 'false' },
                ]}
                //disabled={formDIsabled}
              />
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
          {postResults.isSuccess && <CCallout color="success">{postResults.data.Results}</CCallout>}
        </center>
        <hr className="my-4" />
      </CippWizard.Page>
    </CippWizard>
  )
}

export default AddPhonebookEntry
