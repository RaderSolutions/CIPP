/* eslint-disable prettier/prettier */
import React from 'react'
import { CCallout, CCol, CRow, CSpinner, CListGroup, CListGroupItem } from '@coreui/react'
import { Field, FormSpy, useFormState } from 'react-final-form'
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

  const initialFormValues = {
    TenantFilter: tenantDomain,
    Dial: '',
    Salutation: '',
    FirstName: '',
    MiddleName: '',
    LastName: '',
    Suffix: '',
    Email: '',
    Organization: '',
    JobTitle: '',
    Location: '',
    Notes: '',
  };


  const handleSubmit = async (values) => {
    console.log('tenantDomain', tenantDomain)
    console.log('tenant filter from values', values.TenantFilter)
    const shippedValues = {
      TenantFilter: values.TenantFilter,
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
      // ContactType: values.ContactType,
      // IsFromFOP: values.IsFromFOP
    }

    alert(JSON.stringify(values, null, 2))
    genericPostRequest({ path: '/api/LtRatelPhonebookEntry', values: shippedValues })
  }

  return (
    <CippWizard onSubmit={handleSubmit} initialValues={initialFormValues} wizardTitle="Add Phonebook Entry">
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
            {/* <CCol lg={6} xs={12}>
              <RFFCFormInput
                type="text"
                name="contactType"
                label="Contact Type"
                //disabled={formDIsabled}
              />
            </CCol> */}
            {/* <CCol lg={6} xs={12}>
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
            </CCol> */}
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
                  const formState = useFormState()
                  console.log('formState', formState)
                  console.log('props', props)
                  const { values } = props;
                  const valuesArray = Object.keys(values).map((key) => ({
                    key: key,
                    value: values[key]
                  }))
                  let dialKey
                  dialKey = valuesArray.find((item) => item.key === 'Dial')
                  let salutationKey
                  salutationKey = valuesArray.find((item) => item.key === 'salutation')
                  let firstNameKey
                  firstNameKey = valuesArray.find((item) => item.key === 'firstName')
                  let middleNameKey
                  middleNameKey = valuesArray.find((item) => item.key === 'middleName')
                  let lastNameKey
                  lastNameKey = valuesArray.find((item) => item.key === 'lastName')
                  let suffixKey
                  suffixKey = valuesArray.find((item) => item.key === 'suffix')
                  let emailKey
                  emailKey = valuesArray.find((item) => item.key === 'email')
                  let organizationKey
                  organizationKey = valuesArray.find((item) => item.key === 'organization')
                  let jobTitleKey
                  jobTitleKey = valuesArray.find((item) => item.key === 'jobTitle')
                  let locationKey
                  locationKey = valuesArray.find((item) => item.key === 'location')
                  let notesKey
                  notesKey = valuesArray.find((item) => item.key === 'notes')
                  let contactTypeKey
                  contactTypeKey = valuesArray.find((item) => item.key === 'contactType')
                  // let isFromFOPKey
                  // isFromFOPKey = valuesArray.find((item) => item.key === 'select')
                  
                  
                  console.log('dialKey', dialKey)
                  console.log('valuesArray', valuesArray)
                  return (
                    <CListGroup>
                    {
                      dialKey && <CListGroupItem>
                        {`Dial: ${dialKey.value}`}
                        </CListGroupItem>
                    }
                    {
                      salutationKey && <CListGroupItem>
                        {`Salutation: ${salutationKey.value}`}
                        </CListGroupItem>
                    }
                    {
                      firstNameKey && <CListGroupItem>
                        {`First Name: ${firstNameKey.value}`}
                        </CListGroupItem>
                    }
                    {
                      middleNameKey && <CListGroupItem>
                        {`Middle Name: ${middleNameKey.value}`}
                        </CListGroupItem>
                    }
                    {
                      lastNameKey && <CListGroupItem>
                        {`Last Name: ${lastNameKey.value}`}
                        </CListGroupItem>
                    }
                    {
                      suffixKey && <CListGroupItem>
                        {`Suffix: ${suffixKey.value}`}
                        </CListGroupItem>
                    }
                    {
                      emailKey && <CListGroupItem>
                        {`Email: ${emailKey.value}`}
                        </CListGroupItem>
                    }
                    {
                      organizationKey && <CListGroupItem>
                        {`Organization: ${organizationKey.value}`}
                        </CListGroupItem>
                    }
                    {
                      jobTitleKey && <CListGroupItem>
                        {`Job Title: ${jobTitleKey.value}`}
                        </CListGroupItem>
                    }
                    {
                      locationKey && <CListGroupItem>
                        {`Location: ${locationKey.value}`}
                        </CListGroupItem>
                    }
                    {
                      notesKey && <CListGroupItem>
                        {`Notes: ${notesKey.value}`}
                        </CListGroupItem>
                    }
                    {
                      contactTypeKey && <CListGroupItem>
                        {`Contact Type: ${contactTypeKey.value}`}
                        </CListGroupItem>
                    }
                    {/* {
                      isFromFOPKey && <CListGroupItem>
                        {`Is From FOP: ${isFromFOPKey.value}`}
                        </CListGroupItem>
                    } */}

                    </CListGroup>
               
               )
                }}
                </FormSpy>
            )
          }

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
