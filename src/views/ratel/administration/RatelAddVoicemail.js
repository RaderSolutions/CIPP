/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { CCallout, CCol, CRow, CSpinner, CListGroup, CListGroupItem } from '@coreui/react'
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

const Error = ({ name }) => (
  <Field
    name={name}
    subscription={{ touched: true, error: true }}
    render={({ meta: { touched, error } }) =>
      touched && error ? (
        <CCallout color="danger">
          <FontAwesomeIcon icon={faExclamationTriangle} color="danger" />
          {error}
        </CCallout>
      ) : null
    }
  />
)

Error.propTypes = {
  name: PropTypes.string.isRequired,
}

export const AddRatelVoicemail = ({ children }) => {
  const tenantDomain = useSelector((state) => state.app.currentTenant.customerId)
  const [genericPostRequest, postResults] = useLazyGenericPostRequestQuery()
  // mailbox=%mailbox%|password=%password%|name=%name%|email_address=%email_address%|options=%options%

  const onSubmit = async (values) => {
    let result = await genericPostRequest({
      path: `/api/LtScheduleScript?TenantFilter=${tenantDomain}&Parameters=Key=mailbox|Value=${values.mailbox},Key=password|Value=${values.password},Key=name|value=${values.name},Key=email_address|Value=${values.email_address},Key=options|Value=${values.options}&RatelScript=true&ScriptId=7379`,
    }).unwrap()
    if (result.Data.Results.includes('Message=Success')) {
      // TODO - run sync here or manual, no. 7377
      let syncRes = await genericPostRequest({
        path: `/api/LtScheduleScript?TenantFilter=${tenantDomain}&Parameters=Key=Full_Reload|Value=0&RatelScript=true&ScriptId=7377`,
      }).unwrap()
      // console.log('syncRes', syncRes)
    }
  }
  return (
    <CippWizard onSubmit={onSubmit} wizardTitle="Add Ratel Voicemail">
      <CippWizard.Page title="Choose A Tenant">
        <center>
          <h3 className="text-primary">Step 1</h3>
          <h5 className="card-title mb-4">Choose a tenant</h5>
        </center>
        <hr className="my-4" />
        <Field name="selectedTenants">{(props) => <TenantSelector />}</Field>
        <Error name="selectedTenants" />
        <hr className="my-4" />
      </CippWizard.Page>
      <CippWizard.Page title="Input New Voicemail Fields" description="">
        <center>
          <h3 className="text-primary">Step 2</h3>
          {/* <h5>Input Family</h5> */}
        </center>
        {/* mailbox=%mailbox%|password=%password%|name=%name%|email_address=%email_address%|options=%options% */}
        <CRow>
          <CCol lg={6} xs={12}>
            <RFFCFormInput label="Mailbox" name="mailbox" placeholder="Mailbox" />
          </CCol>
          <CCol lg={6} xs={12}>
            <RFFCFormInput label="Password" name="password" placeholder="Password" />
          </CCol>
          <CCol lg={6} xs={12}>
            <RFFCFormInput label="Name" name="name" placeholder="Name" />
          </CCol>
          <CCol lg={6} xs={12}>
            <RFFCFormInput label="Email Address" name="email_address" placeholder="Email Address" />
          </CCol>
          <CCol lg={6} xs={12}>
            <RFFCFormInput label="Options" name="options" placeholder="Options" />
          </CCol>
        </CRow>
      </CippWizard.Page>
      <CippWizard.Page title="Confirm New Voicemail Values">
        <FormSpy subscription={{ values: true, labels: true }}>
          {(props) => {
            const { values } = props
            const valuesArray = Object.keys(values).map((key) => ({
              key: key,
              values: values[key],
            }))
            let mailboxKey = valuesArray.find((item) => item.key === 'mailbox')
            let passwordKey = valuesArray.find((item) => item.key === 'password')
            let nameKey = valuesArray.find((item) => item.key === 'name')
            let emailAddressKey = valuesArray.find((item) => item.key === 'email_address')
            let optionsKey = valuesArray.find((item) => item.key === 'options')
            return (
              <CListGroup className="my-4">
                {mailboxKey && <CListGroupItem>{`Mailbox: ${mailboxKey.values}`}</CListGroupItem>}
                {passwordKey && (
                  <CListGroupItem>{`Password: ${passwordKey.values}`}</CListGroupItem>
                )}
                {nameKey && <CListGroupItem>{`Name: ${nameKey.values}`}</CListGroupItem>}
                {emailAddressKey && (
                  <CListGroupItem>{`Email Address: ${emailAddressKey.values}`}</CListGroupItem>
                )}
                {optionsKey && <CListGroupItem>{`Options: ${optionsKey.values}`}</CListGroupItem>}
              </CListGroup>
            )
          }}
        </FormSpy>
      </CippWizard.Page>
    </CippWizard>
  )
}

export default AddRatelVoicemail
