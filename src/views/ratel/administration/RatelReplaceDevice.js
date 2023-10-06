/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { CCallout, CCol, CRow, CSpinner, CListGroup, CListGroupItem, CButton, CForm } from '@coreui/react'
import { CippContentCard, CippPage } from 'src/components/layout'
import { Field, FormSpy, useForm, useFormState, Form } from 'react-final-form'
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
import useQuery from 'src/hooks/useQuery'

const ReplaceRatelDevice = ({ children }) => {
  const [genericPostRequest, postResults] = useLazyGenericPostRequestQuery()
  const query = useQuery()
  const deviceId = query.get('deviceId')

  const onSubmit = async (values) => {
    console.log('replace device values', values)
    genericPostRequest({
        path: `LtScheduleScript?TenantFilter=${tenant.customerId}&Parameters=Key=Delete|Value=1,Key=deviceId|Value='${deviceId}',Key=productId|Value=${values.productId},Key=macAddress|Value=${values.macAddress}&RatelScript=true&ScriptId=7901`,
    })
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
                      name="macAddress"
                      label="MAC Address"
                      // value={}
                      // placeholder={}
                    />
                  </CCol>
                  <CCol>
                    <RFFCFormInput
                      type="text"
                      name="productId"
                      label="Product ID"
                      // value={}
                      // placeholder={}
                    />
                  </CCol>
                  <CCol style={{
                    paddingTop: '2rem',
                  }}>
                    <CButton type="submit">Replace Device</CButton>
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
