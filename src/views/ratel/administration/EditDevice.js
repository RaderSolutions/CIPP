/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { CButton, CCallout, CCol, CForm, CRow, CSpinner } from '@coreui/react'
import useQuery from 'src/hooks/useQuery'
import { useDispatch } from 'react-redux'
import { Form } from 'react-final-form'
import {
  RFFCFormInput,
  RFFCFormSelect,
} from 'src/components/forms'
import { useListDeviceQuery,useListDeviceLocationsQuery,useListDeviceContactsQuery, useListDeviceModelsQuery} from 'src/store/api/ratelDevices'
import { CippCodeBlock, ModalService } from 'src/components/utilities'
import { useLazyGenericPostRequestQuery } from 'src/store/api/app'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch, faEdit, faEye } from '@fortawesome/free-solid-svg-icons'
import { CippContentCard, CippPage } from 'src/components/layout'

const EditDevice = () => {
  const dispatch = useDispatch()
  let query = useQuery()
  const deviceId = query.get('deviceId')
  const tenantDomain = query.get('tenantDomain')
  const [queryError, setQueryError] = useState(false)
  const deviceType = query.get('deviceType')
  const [formFields, setFormFields] = useState(<></>)
  //const [editDevice, { error: editDeviceError, isFetching: editDeviceIsFetching }] = useEditDeviceMutation()

  const {
    data: device = {},
    isFetching: deviceIsFetching,
    error: deviceError,
  } = useListDeviceQuery({ tenantDomain, deviceId })

  const {
    data: deviceLocations = {},
    isFetching: deviceLocationsAreFetching,
    error: deviceLocationsError,
  } = useListDeviceLocationsQuery({ tenantDomain })

  const {
    data: deviceContacts = {},
    isFetching: deviceContactsAreFetching,
    error: deviceContactsError,
  } = useListDeviceContactsQuery({ tenantDomain })

  const {
    data: deviceModels = {},
    isFetching: deviceModelsAreFetching,
    error: deviceModelsError,
  } = useListDeviceModelsQuery()


  useEffect(() => {
    if (!deviceId || !tenantDomain) {
      ModalService.open({
        body: 'Error invalid request, could not load requested device.',
        title: 'Invalid Request',
      })
      setQueryError(true)
    } else {
      setQueryError(false)
    }
    if (deviceType === 'Generic') {
      setFormFields(
        <>
          <CRow>
            <CCol lg={6} xs={12}>
              <RFFCFormInput type="text" name="DeviceId" label="Device ID" disabled={true} />
            </CCol>
            <CCol lg={6} xs={12}>
              <RFFCFormInput type="text" name="MacAddress" label="MAC Address" disabled={true} />
            </CCol>
          </CRow>
          <CRow>
            <CCol lg={6} xs={12}>
              <RFFCFormInput
                type="text"
                name="ExtensionNumber"
                label="Edit Extension Number"
                //disabled={formDIsabled}
              />
            </CCol>
            <CCol lg={6} xs={12}>
              {deviceLocationsAreFetching && <CSpinner />}
              {!deviceLocationsAreFetching && (
              <RFFCFormSelect
              name="Location"
              label="Edit Device Location"
              placeholder={!deviceLocationsAreFetching? 'Select Location' : 'Loading...'}
              values={deviceLocations?.map((deviceLocation) => ({
                value: deviceLocation.locationId,
                label: deviceLocation.Name,
              }))}
              //disabled={formDIsabled}
            />
              )}
            {deviceLocationsError && <span>Failed to load list of client locations</span>}
            </CCol>
          </CRow>
          <CRow>
            <CCol lg={6} xs={12}>
            {deviceModelsAreFetching && <CSpinner />}
              {!deviceModelsAreFetching && (
              <RFFCFormSelect
              name="ModelId"
              label="Edit Device Model"
              placeholder={!deviceModelsAreFetching? 'Select Model' : 'Loading...'}
              values={deviceModels?.map((deviceModel) => ({
                value: deviceModel.modelId,
                label: deviceModel.Name,
              }))}
              //disabled={formDIsabled}
            />
              )}
            {deviceModelsError && <span>Failed to load list of device models</span>}
            </CCol>
            <CCol lg={6} xs={12}>
              <RFFCFormInput
                type="text"
                name="FopGroup"
                label="Edit FOP Group"
                //disabled={formDIsabled}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol lg={6} xs={12}>
              <RFFCFormInput
                type="text"
                name="Label"
                label="Edit Label"
                //disabled={formDIsabled}
              />
            </CCol>
            <CCol lg={6} xs={12}>
              <RFFCFormSelect
                type="text"
                name="HideFromPhonebook"
                label="Hide From Phonebook?"
                placeholder='Select an option'
                values={[{value:1, label: 'true'},{value:0,label:'false'}]}
                //disabled={formDIsabled}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol lg={6} xs={12}>
              <RFFCFormInput
                type="text"
                name="EmailAddress"
                label="Edit Voicemail Email"
                //disabled={formDIsabled}
              />
            </CCol>
          </CRow>
        </>,
      )
    } else { 
      setFormFields(<>
       <CRow>
            <CCol lg={6} xs={12}>
              <RFFCFormInput type="text" name="DeviceId" label="Device ID" disabled={true} />
            </CCol>
            <CCol lg={6} xs={12}>
              <RFFCFormInput type="text" name="MacAddress" label="MAC Address" disabled={true} />
            </CCol>
          </CRow>
          <CRow>
            <CCol lg={6} xs={12}>
              <RFFCFormInput
                type="text"
                name="ExtensionNumber"
                label="Edit Extension Number"
                //disabled={formDIsabled}
              />
            </CCol>
            <CCol lg={6} xs={12}>
              <RFFCFormInput
                type="text"
                name="LocationId"
                label="Edit Device Location"
                //disabled={formDIsabled}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol lg={6} xs={12}>
            {deviceModelsAreFetching && <CSpinner />}
              {!deviceModelsAreFetching && (
              <RFFCFormSelect
              name="Model"
              label="Edit Device Model"
              placeholder={!deviceModelsAreFetching? 'Select Model' : 'Loading...'}
              values={deviceModels?.map((deviceModel) => ({
                value: deviceModel.modelId,
                label: deviceModel.Name,
              }))}
              //disabled={formDIsabled}
            />
              )}
            {deviceModelsError && <span>Failed to load list of device models</span>}
            </CCol>
            <CCol lg={6} xs={12}>
              <RFFCFormInput
                type="text"
                name="FopGroup"
                label="Edit FOP Group"
                //disabled={formDIsabled}
              />
            </CCol>
          </CRow>
          <CRow>
          <CCol lg={6} xs={12}>
              {deviceContactsAreFetching && <CSpinner />}
              {!deviceContactsAreFetching && (
              <RFFCFormSelect
              name="ContactID"
              label="Edit Device Contact"
              placeholder={!deviceContactsAreFetching? 'Select Contact' : 'Loading...'}
              values={deviceContacts?.map((deviceContact) => ({
                value: deviceContact.locationId,
                label: deviceContact.Name,
              }))}
              //disabled={formDIsabled}
            />
              )}
            {deviceContactsError && <span>Failed to load list of client contacts</span>}
            </CCol>
            </CRow></>)
    }
  }, [deviceId, tenantDomain, deviceType, dispatch, deviceLocationsAreFetching, deviceLocations, deviceLocationsError, deviceContactsAreFetching, deviceContacts, deviceContactsError, deviceModelsAreFetching, deviceModels, deviceModelsError])

  const [genericPostRequest, postResults] = useLazyGenericPostRequestQuery()
  const onSubmit = (values) => {
    //@todo: need to fix copyfrom in api so this is no longer required
    if (!values.CopyFrom) {
      values.CopyFrom = ''
    }
    //@todo: need to fix this in api so this hacky shit is no longer needed.

    const shippedValues = {
      MacAddress: values.MacAddress,
      ExtensionNumber: values.ExtensionNumber,
      Label: values.Label,
      EmailAddress: values.EmailAddress,
      ContactId: values.ContactID,
      LocationId: values.Location,
      ProductId: values.ModelId,
      DidNumber: values.DidNumber,
      FopGroup: values.FopGroup,
      HideFromPhonebook: values.HideFromPhonebook,
      NeedsSync: values.NeedsSync,
      LastSync: values.LastSync,
      SipPassword: values.SipPassword,
      IpAddress: values.IpAddress,
      DeviceId: deviceId,
      tenantID: tenantDomain,
      deviceType: deviceType
    }
    // window.alert(JSON.stringify(shippedValues))
    // console.log(values)
    genericPostRequest({ path: '/api/LtAddRatelDevice', values: shippedValues })
  }

  const initialState = {
    deviceType: deviceType,
    ...device,
  }

  // this is dumb
  const formDisabled =
    queryError === true || !!deviceError || !device || Object.keys(device).length === 0
  const RawDevice = JSON.stringify(device, null, 2)
  return (
    <CippPage
      title={`Edit Device: ${
        deviceIsFetching ? 'Loading...' : device.Label + ' (' + deviceType
      } Device)`}
      tenantSelector={false}
    >
      {!queryError && (
        <>
          {postResults.isSuccess && (
            <CCallout color="success">{postResults.data?.Results}</CCallout>
          )}
          {queryError && (
            <CRow>
              <CCol xs={12}>
                <CCallout color="danger">
                  {/* @todo add more descriptive help message here */}
                  Failed to load device
                </CCallout>
              </CCol>
            </CRow>
          )}
          <CRow>
            <CCol lg={6} xs={12}>
              <CippContentCard title="Device Details" icon={faEdit}>
                {deviceIsFetching && <CSpinner />}
                {deviceError && <span>Error loading device</span>}
                {!deviceIsFetching && (
                  <Form
                    initialValues={{ ...initialState }}
                    onSubmit={onSubmit}
                    render={({ handleSubmit, submitting, values }) => {
                      return (
                        <CForm onSubmit={handleSubmit}>
                          {formFields}
                          <CRow className="mb-3">
                            <CCol md={6}>
                              <CButton type="submit" disabled={submitting || formDisabled}>
                                Edit Device
                                {postResults.isFetching && (
                                  <FontAwesomeIcon
                                    icon={faCircleNotch}
                                    spin
                                    className="ms-2"
                                    size="1x"
                                  />
                                )}
                              </CButton>
                            </CCol>
                          </CRow>
                          {postResults.isSuccess && (
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
                )}
              </CippContentCard>
            </CCol>
            <CCol lg={6} xs={12}>
              <CippContentCard title="Raw Device Data" icon={faEye}>
                {deviceIsFetching && <CSpinner />}
                {deviceError && <span>Error loading device</span>}
                {!deviceIsFetching && (
                  <>
                    This is the (raw) information for this device.
                    <CippCodeBlock language="json" code={RawDevice} />
                  </>
                )}
              </CippContentCard>
            </CCol>
          </CRow>
        </>
      )}
    </CippPage>
  )
}

export default EditDevice
