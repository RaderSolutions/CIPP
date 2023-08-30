/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { CButton, CCallout, CCol, CForm, CRow } from '@coreui/react'
import { useSelector } from 'react-redux'
import { Form, FormSpy, Field, useFormState } from 'react-final-form'
import {
  RFFCFormInput,
  RFFCFormSwitch,
  RFFCFormSelect,
  Condition,
} from 'src/components/forms'
import useQuery from 'src/hooks/useQuery'
import { useLazyGenericPostRequestQuery } from 'src/store/api/app'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch, faEdit } from '@fortawesome/free-solid-svg-icons'
import { CippContentCard, CippPage, CippWizard } from 'src/components/layout'
import { TenantSelector } from 'src/components/utilities'

const ChangeLabel = () => {
return (
  <div>
    test
  </div>
)
}

export default ChangeLabel
