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

    const onSubmit = async (values) => {

    }

  return (
    <CippPage title="Replace Device">
      <CCol>
        <CippContentCard title="Replace Device">
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
                        name="mac"
                        label="MAC Address"
                        // value={}
                        // placeholder={}
                      />
                    </CCol>
                    <CCol>
                      <RFFCFormInput
                        type="text"
                        name="productID"
                        label="Product ID"
                        // value={}
                        // placeholder={}
                      />
                    </CCol>
                   
                  </CRow>
                  <CRow className="mb-3">
                    <CCol md={6}>
                      <CButton type="submit">Replace Dialplan</CButton>
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
