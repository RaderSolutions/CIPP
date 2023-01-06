/* eslint-disable prettier/prettier */
import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import { CButton } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faEdit } from '@fortawesome/free-solid-svg-icons'
import { CippPageList } from 'src/components/layout'
import { CippActionsOffcanvas } from 'src/components/utilities'
import { Link } from 'react-router-dom'
// import { TitleButton } from 'src/components/buttons'

const Offcanvas = (row, rowIndex, formatExtraData) => {
  const tenant = useSelector((state) => state.app.currentTenant)
  const [ocVisible, setOCVisible] = useState(false)
  const editLink = `/ratel/administration/dids/editDialplan?tenantDomain=${tenant.customerId}&DidNumber=${row.Number}`
  //console.log(row)
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
          { label: 'Number', value: `${row.Number}` },
          { label: 'Extension', value: `${row.Extension}` },
          { label: 'Device Id', value: `${row.DeviceId}` },
          { label: 'First Name', value: `${row.FirstName}` },
          { label: 'Last Name', value: `${row.LastName}` },
          { label: 'Dialplan', value: `${row.Dialplan}` },
          { label: 'Description', value: `${row.Description}` },
          { label: 'Caller Id?', value: `${row.IsDeviceCallerId}` },
          { label: 'Needs Sync?', value: `${row.NeedsSync}`}
        ]}
        actions={[
          {
            icon: <FontAwesomeIcon icon={faEdit} className="me-2" />,
            label: 'Edit Dialplan',
            link: editLink,
            color: 'info',
          },
          {
            label: 'Delete DID',
            color: 'info',
            modal: true,
            modalUrl: `api/LtRatelDIDs?TenantFilter=${tenant.customerId}&Action=Delete&DIDNumber=${row.Number}`,
            modalMessage: 'Are you sure you want to delete this DID?',
          },
        ]}
        placement="end"
        visible={ocVisible}
        id={row.Number}
        hideFunction={() => setOCVisible(false)}
      />
    </>
  )
}

const columns = [
  {
    name: 'Number',
    selector: (row) => row['Number'],
    sortable: true,
    exportSelector: 'Number',
  },
  {
    name: 'Extension',
    selector: (row) => row['Extension'],
    sortable: true,
    exportSelector: 'Extension',
  },
  {
    name: 'Device ID',
    selector: (row) => row['DeviceId'],
    sortable: true,
    exportSelector: 'DeviceId',
  },
  {
    name: 'First Name',
    selector: (row) => row['FirstName'],
    sortable: true,
    exportSelector: 'FirstName',
  },
  {
    name: 'Last Name',
    selector: (row) => row['LastName'],
    sortable: true,
    exportSelector: 'LastName',
  },
  {
    name: 'Description',
    selector: (row) => row['Description'],
    sortable: true,
    exportSelector: 'Description',
  },
  {
    name: 'Is Device CallerID?',
    selector: (row) => row['IsDeviceCallerId'],
    sortable: true,
    exportSelector: 'IsDeviceCallerId',
  },
  {
    name: 'Needs Sync?',
    selector: (row) => row['NeedsSync'],
    sortable: true,
    exportSelector: 'NeedsSync',
  },
  {
    name: 'Custom Dialplan',
    selector: (row) => row['Dialplan'],
    sortable: true,
    exportSelector: 'Dialplan',
  },
  {
    name: 'Actions',
    center: true,
    cell: Offcanvas,
  },
]

const DIDsList = () => {
  const tenant = useSelector((state) => state.app.currentTenant)
  // const addDidButton = <TitleButton href="ratel/administration/dids/add" title="Add DID Number to Device" />
  return (
    <CippPageList
      title="DIDs"
      // TitleButton={addDidButton}
      datatable={{
        keyField: 'Number',
        columns,
        reportName: `${tenant.customerId}-RATEL-DIDs-List`,
        path: '/api/LtListRatelDIDs',
        params: { TenantFilter: tenant?.customerId },
      }}
    />
  )
}

export default DIDsList
