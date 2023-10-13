/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { CButton } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faEdit } from '@fortawesome/free-solid-svg-icons'
import { CippPageList } from 'src/components/layout'
import { CippActionsOffcanvas } from 'src/components/utilities'
import { Link } from 'react-router-dom'
import { TitleButton } from 'src/components/buttons'
import { useListDeviceModelsQuery } from 'src/store/api/ratelDevices'

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

export const ProductsTable = () => {
    const columns = [
        {
            name: "ID",
            selector: (row) => row['id'],
            sortable: true,
            exportSelector: 'ID',
        },
        {
            name: 'Manufacturer',
            selector: (row) => row['manufacturer_name'],
            sortable: true,
            exportSelector: 'Manufacturer',
        },
        {
            name: 'Model',
            selector: (row) => row['model'],
            sortable: true,
            exportSelector: 'Model',
        },
        {
            name: "BLF Page Size",
            selector: (row) => row['blf_page_size'],
            sortable: true,
            exportSelector: 'BLFPageSize',
        },
        {
            name: "BLF Page Count",
            selector: (row) => row['blf_page_count'],
            sortable: true,
            exportSelector: 'BLFPageCount',
        },
        {
            name: "Supports LLDP",
            selector: (row) => row['supports_lldp'],
            sortable: true,
            exportSelector: 'SupportsLLDP',
            Cell: (row) => row.value ? 'true' : 'false',
        }
    ]
    const {
        data: devices = [],
        isFetching: deviceModelsAreFetching,
        error: devicesModelsError
    } = useListDeviceModelsQuery()
    console.log('devices', devices)
  return (
    // <>
    // <span>
    //     hold
    // </span>
    // </>
    <CippPageList 
    title="Products"
    datatable={{
        keyField:'id',
        columns,
        reportName: 'Products Table',
        path:'/api/LtListRatelDeviceModels',
        params: {isProductTable: true}
    }}
    />
  )
}

export default ProductsTable