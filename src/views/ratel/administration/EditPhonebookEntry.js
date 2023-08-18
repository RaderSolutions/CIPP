/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { CButton, CCallout, CCol, CForm, CRow, CSpinner } from '@coreui/react'
import useQuery from 'src/hooks/useQuery'
import { useDispatch, useSelector } from 'react-redux'
import { Form } from 'react-final-form'
import { RFFCFormInput, RFFCFormSelect } from 'src/components/forms'
import { CippCodeBlock, ModalService } from 'src/components/utilities'
import { useLazyGenericPostRequestQuery } from 'src/store/api/app'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch, faEdit, faEye } from '@fortawesome/free-solid-svg-icons'
import { CippContentCard, CippPage } from 'src/components/layout'

export const EditEntry = () => {
  const [genericPostRequest, postResults] = useLazyGenericPostRequestQuery()
  const tenantDomain = useSelector((state) => state.app.currentTenant.customerId)

  const onSubmit = (values) => {
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
    }

    genericPostRequest({ path: `/api/LtRatelPhonebookEntry?TenantFilter=${tenantDomain}Action=Update`, values: shippedValues })
  }

  useEffect(() => {
    console.log('postResults', postResults)
  },[postResults])

  return (
    <>
      <CippPage>
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
                        <RFFCFormInput type="text" name="ID" label="ID" />
                      </CCol>
                      <CCol>
                        <RFFCFormInput type="text" name="Dial" label="Dial" />
                      </CCol>
                      <CCol>
                        <RFFCFormSelect
                          name="Salutation"
                          label="Salutation"
                          values={[
                            { value: null, label: 'None' },
                            { value: 'Mr.', label: 'Mr.' },
                            { value: 'Ms.', label: 'Ms.' },
                            { value: 'Mrs.', label: 'Mrs.' },
                            { value: 'Dr.', label: 'Dr.' },
                          ]}
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
                      <CCol>
                        <RFFCFormSelect
                          name="select"
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
                    </CRow>
                    <CRow className="mb-3">
                      <CCol md={6}>
                        <CButton type="submit">
                          Edit Phonebook Entry
                          {postResults.isFetching && (
                            <FontAwesomeIcon icon={faCircleNotch} spin className="ms-2" size="1x" />
                          )}
                        </CButton>
                      </CCol>
                    </CRow>
                    {postResults.isSuccess && postResults.data.Results !== "Something went wrong." && (
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
      </CippPage>
    </>
  )
}

export default EditEntry
