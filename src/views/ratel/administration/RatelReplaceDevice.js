/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import {
  CCallout,
  CCol,
  CRow,
  CSpinner,
  CListGroup,
  CListGroupItem,
  CButton,
  CForm,
} from '@coreui/react'
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
import { useListDeviceModelsQuery } from 'src/store/api/ratelDevices'
import { useSelector } from 'react-redux'
import useQuery from 'src/hooks/useQuery'

const ReplaceRatelDevice = ({ children }) => {
  const [genericPostRequest, postResults] = useLazyGenericPostRequestQuery()
  const query = useQuery()
  const deviceId = query.get('deviceId')
  const tenant = query.get('tenantDomain')

  const {
    data: deviceModels = [],
    isFetching: deviceModelsAreFetching,
    error: deviceModelsError,
  } = useListDeviceModelsQuery()

  const onSubmit = async (values) => {
    console.log('replace device values', values)
    let intDeviceID = parseInt(deviceId)
    genericPostRequest({
      path: `/api/LtScheduleScript?TenantFilter=${tenant}&Parameters=Key=Skip_Phonebook_Rebuild|Value=0,Key=Broken_Device_Id|Value=${intDeviceID},Key=New_Product_ID|Value=${values.productId},Key=New_Mac_Address|Value=${values.macAddress}&RatelScript=true&ScriptId=7901`,
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
                      {deviceModelsAreFetching && <CSpinner />}
                      {!deviceModelsAreFetching && (
                        <RFFCFormSelect
                          type="text"
                          name="productId"
                          label="Product ID"
                          placeholder={!deviceModelsAreFetching ? 'Select Model' : 'Loading...'}
                          values={
                            deviceModels &&
                            deviceModels?.map((deviceModel) => ({
                              value: deviceModel.modelId,
                              label: deviceModel.Name,
                            }))
                          }
                        />
                      )}
                    </CCol>
                    <CCol
                      style={{
                        paddingTop: '2rem',
                      }}
                    >
                      <CButton type="submit">Replace Device</CButton>
                    </CCol>

                    {postResults.isFetching && (
                      <CCallout color="info">
                        <CSpinner>Loading</CSpinner>
                      </CCallout>
                    )}
                    {postResults.isSuccess && (
                      <CCallout color="success">Replace Device Script Succesfully Invoked</CCallout>
                    )}
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
