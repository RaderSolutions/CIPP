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

const PhonebookHideEntry = () => {
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
    genericPostRequest({
      path: `/api/LtScheduleScript?TenantFilter=${tenant}&Parameters=Key=Delete|Value=1,Key=Broken_Device_Id|Value='${deviceId}',Key=New_Product_ID|Value=${values.productId},Key=New_Mac_Address|Value=${values.macAddress}&RatelScript=true&ScriptId=7901`,
    })
  }

  return (
    <div>
        test
    </div>
  )
}

export default PhonebookHideEntry

