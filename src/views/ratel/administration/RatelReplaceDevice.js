/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { CCallout, CCol, CRow, CSpinner, CListGroup, CListGroupItem } from '@coreui/react'
import { CippContentCard, CippPage } from 'src/components/layout'
import { Field, FormSpy, useForm, useFormState } from 'react-final-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { CippWizard } from 'src/components/layout'
import PropTypes, { array } from 'prop-types'
import {
  RFFCFormInput,
  RFFCFormSelect,
  RFFCFormSwitch,
  Condition,
  RFFCFormTextarea,
} from 'src/components/forms'
import { TenantSelector } from 'src/components/utilities'
import { useLazyGenericPostRequestQuery } from 'src/store/api/app'
import { useListDidsQuery } from 'src/store/api/ratelDids'
import { useListDevicesQuery } from 'src/store/api/ratelDevices'
import { useListVariablesQuery, useListVariableQuery } from 'src/store/api/ratelVariables'
import { useSelector } from 'react-redux'

const ReplaceRatelDevice = ({ children }) => {
    const [genericPostRequest, postResults] = useLazyGenericPostRequestQuery()
    const handleSubmit = async (values) => {
        
    }

  return (
    <CippPage title="Edit Dialplan">
      <CCol>
        <CippContentCard title="Edit Dialplan" icon={faEdit}>
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
                        name="name"
                        label="Name"
                        value={name}
                        placeholder={name}
                      />
                    </CCol>
                    <CCol>
                      <RFFCFormInput
                        type="text"
                        name="description"
                        label="Description"
                        value={description}
                        placeholder={description}
                      />
                    </CCol>
                    <CCol>
                      <RFFCFormTextarea
                        type="text"
                        name="dialplan"
                        label="Dialplan"
                        value={dialplan}
                        placeholder={dialplan}
                        defaultValue={dialplan}
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol md={6}>
                      <CButton type="submit">Edit Dialplan</CButton>
                    </CCol>
                  </CRow>
                </CForm>
              )
            }}
          />
        </CippContentCard>
      </CCol>
    </CippPage>
  )
}

export default ReplaceRatelDevice
