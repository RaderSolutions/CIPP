/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { CButton, CCol, CRow } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { CippPageList } from 'src/components/layout'
import { Link } from 'react-router-dom'
import { CippActionsOffcanvas } from 'src/components/utilities'
import { TitleButton } from 'src/components/buttons'
import { useLazyGenericPostRequestQuery } from 'src/store/api/app'

const Offcanvas = (row, rowIndex, formatExtraData) => {
  const tenant = useSelector((state) => state.app.currentTenant)
  const [ocVisible, setOCVisible] = useState(false)
  const deviceType = row.ContactID ? 'User' : 'Generic'
  const editLink = `/ratel/administration/devices/edit?tenantDomain=${tenant.customerId}&deviceId=${row.DeviceId}&deviceType=${deviceType}`
  const changeLabelLink = `/ratel/administration/devices/changeLabel?tenantDomain=${tenant.customerId}&deviceId=${row.DeviceId}&deviceType=${deviceType}`
  console.log('tenant customer id', tenant.customerId)
  return (
    <>
      <Link to={editLink}>
        <CButton size="sm" variant="ghost" color="warning">
          <FontAwesomeIcon icon={faEdit} />
        </CButton>
      </Link>
      <CButton size="sm" color="link" onClick={() => setOCVisible(true)}>
        <FontAwesomeIcon icon={faEllipsisV} />
      </CButton>
      <CippActionsOffcanvas
        title="Device Information"
        extendedInfo={[
          { label: 'Device ID', value: `${row.DeviceId}` },
          { label: 'MAC Address', value: `${row.MacAddress}` },
          { label: 'Extension', value: `${row.ExtensionNumber}` },
          { label: 'Label', value: `${row.Label}` },
          { label: 'Email Address', value: `${row.EmailAddress}` },
          { label: 'Contact ID', value: `${row.ContactID}` },
          { label: 'Location', value: `${row.Location}` },
          { label: 'Model', value: `${row.Model}` },
          { label: 'DID Number', value: `${row.DidNumber}` },
          { label: 'FOP Group', value: `${row.FopGroup}` },
          { label: 'Hide From Phonebook?', value: `${row.HideFromPhonebook}` },
          { label: 'Needs Sync?', value: `${row.NeedsSync}` },
          { label: 'Last Sync', value: `${row.LastSync}` },
          { label: 'SIP Password', value: `${row.SipPassword}` },
          { label: 'IP Address', value: `${row.IpAddress}` },
        ]}
        actions={[
          {
            icon: <FontAwesomeIcon icon={faEdit} className="me-2" />,
            label:"Replace Device",
            link: `/ratel/administration/devices/replace?tenantDomain=${tenant.customerId}&deviceId=${row.DeviceId}&deviceType=${deviceType}`,
            color: 'info',
          },
          {
            icon: <FontAwesomeIcon icon={faEdit} className="me-2" />,
            label: 'Edit Device',
            link: editLink,
            color: 'info',
          },
          {
            icon: <FontAwesomeIcon icon={faEdit} className="me-2" />,
            label: 'Change Device Label',
            link: changeLabelLink,
            color: 'info',
          },
          {
            label: 'Reconfigure Phone',
            color: 'info',
            modal: true,
            modalUrl: `/api/LtRatelReconfigurePhones?Reconfigure=${row.MacAddress}&TenantFilter=${tenant.customerId}`,
            modalMessage: 'Are you sure you want to reconfigure this device?',
          },
          {
            label: 'Delete device',
            color: 'info',
            modal: true,
            modalUrl: `/api/LtScheduleScript?TenantFilter=${tenant.customerId}&Parameters=Key=extension_number|Value=${row.ExtensionNumber}&RatelScript=true&ScriptId=6898`,
            modalMessage: 'Are you sure you want to delete this device?',
          },
        ]}
        placement="end"
        visible={ocVisible}
        id={row.id}
        hideFunction={() => setOCVisible(false)}
      />
    </>
  )
}

const columns = [
  {
    name: 'Device ID',
    selector: (row) => row['DeviceId'],
    sortable: true,
    exportSelector: 'DeviceId',
  },
  {
    name: 'Mac Address',
    selector: (row) => row['MacAddress'],
    sortable: true,
    exportSelector: 'MacAddress',
  },
  {
    name: 'Extension Number',
    selector: (row) => row['ExtensionNumber'],
    sortable: true,
    exportSelector: 'ExtensionNumber',
  },
  {
    name: 'Label',
    selector: (row) => row['Label'],
    sortable: true,
    exportSelector: 'Label',
  },
  {
    name: 'EmailAddress',
    selector: (row) => row['EmailAddress'],
    sortable: true,
    exportSelector: 'EmailAddress',
  },
  {
    name: 'Contact ID',
    selector: (row) => row['ContactID'],
    sortable: true,
    exportSelector: 'ContactID',
  },
  {
    name: 'Location',
    selector: (row) => row['Location'],
    sortable: true,
    exportSelector: 'Location',
  },
  {
    name: 'Model',
    selector: (row) => row['Model'],
    sortable: true,
    exportSelector: 'Model',
  },
  {
    name: 'DID Number',
    selector: (row) => row['DidNumber'],
    sortable: true,
    exportSelector: 'DidNumber',
  },
  {
    name: 'FOP Group',
    selector: (row) => row['FopGroup'],
    sortable: true,
    exportSelector: 'FopGroup',
  },
  {
    name: 'Hide From Phonebook',
    selector: (row) => row['HideFromPhonebook'],
    sortable: true,
    exportSelector: 'HideFromPhonebook',
  },
  {
    name: 'Needs Sync',
    selector: (row) => row['NeedsSync'],
    sortable: true,
    exportSelector: 'NeedsSync',
  },
  {
    name: 'Last Sync',
    selector: (row) => row['LastSync'],
    sortable: true,
    exportSelector: 'LastSync',
  },
  {
    name: 'SIP Password',
    selector: (row) => row['SipPassword'],
    sortable: true,
    exportSelector: 'SipPassword',
  },
  {
    name: 'IP Address',
    selector: (row) => row['IpAddress'],
    sortable: true,
    exportSelector: 'IpAddress',
  },
  {
    name: 'Actions',
    cell: Offcanvas,
  },
]

const DevicesList = () => {
  const tenant = useSelector((state) => state.app.currentTenant)
  const [genericPostRequest, postResults] = useLazyGenericPostRequestQuery()
  const addUserDeviceButton = (
    <TitleButton href="/ratel/administration/devices/add" title="Add Device" />
  )

  const onClickReconfigAll = async () => {
    genericPostRequest({
      path: `/api/LtRatelReconfigurePhones?TenantFilter=${tenant.customerId}&Reconfigure=ALL`,
    })
  }

return (
    <>
      
        <CButton size="sm" variant="ghost" color="warning"
        onClick={onClickReconfigAll}
        >
          Reconfigure All Phones
        </CButton>
      
       <Link>
        <CButton to={`/api/LtScheduleScript?TenantFilter=${tenant.customerId}&RatelScript=true&ScriptId=6886`} size="sm" variant="ghost" color="warning">
            Run Script to Process Pending Device Updates
        </CButton>
       </Link>
 
      <br />
      <br />

      <CippPageList
        title="Devices"
        titleButton={addUserDeviceButton}
        datatable={{
          keyField: 'id',
          columns,
          reportName: `${tenant.customerId}-RATEL-Devices-List`,
          path: '/api/LtListRatelDevices',
          params: { TenantFilter: tenant?.customerId },
        }}
      />
    </>
  )
}

export default DevicesList
