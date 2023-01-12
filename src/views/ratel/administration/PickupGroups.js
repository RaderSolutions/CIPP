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

const Offcanvas = (row, rowIndex, formatExtraData) => {
  const tenant = useSelector((state) => state.app.currentTenant)
  const [ocVisible, setOCVisible] = useState(false)
  const editLink = `/ratel/administration/PickupGroups/addMember?tenantDomain=${tenant.customerId}`
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
        title="Group Information"
        extendedInfo={[
          { label: 'Extension', value: `${row.Extension}` },
          { label: 'Pickup Group', value: `${row.PickupGroupName}` },
          { label: 'Device Id', value: `${row.DeviceId}` },
          { label: 'Device Ext', value: `${row.DeviceExt}` },
          { label: 'User', value: `${row.User}` },
          { label: 'Location', value: `${row.Location}` },
          { label: 'Hide from PB', value: `${row.HideFromPB}` },
        ]}
        actions={[
          {
            icon: <FontAwesomeIcon icon={faEdit} className="me-2" />,
            label: 'Add Member to Pickup group',
            link: editLink,
            color: 'info',
          },
          {
            label: 'Remove Member from Pickup group',
            color: 'info',
            modal: true,
            modalUrl: `TODO`,
            modalMessage: 'Are you sure you want to remove this member from the pickup group?',
          },
          {
            label: 'Hide from Phonebook',
            color: 'info',
            modal: true,
            modalUrl: `TODO`,
            modalMessage: 'Are you sure you want to hide/unhide this pickup group?',
          },
          {
            label: 'Delete Pickup Group',
            color: 'info',
            modal: true,
            modalUrl: `TODO`,
            modalMessage: 'Are you sure you want to delete this pickup group?',
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
    name: 'Extension',
    selector: (row) => row['Extension'],
    sortable: true,
    exportSelector: 'Extension',
  },
  {
    name: 'Pickup Group',
    selector: (row) => row['PickupGroupName'],
    sortable: true,
    exportSelector: 'Pickup Group',
  },
  {
    name: 'Device Id',
    selector: (row) => row['DeviceId'],
    sortable: true,
    exportSelector: 'DeviceId',
  },
  {
    name: 'Device Ext',
    selector: (row) => row['DeviceExt'],
    sortable: true,
    exportSelector: 'DeviceExt',
  },
  {
    name: 'User',
    selector: (row) => row['User'],
    sortable: true,
    exportSelector: 'User',
  },
  {
    name: 'Location',
    selector: (row) => row['Location'],
    sortable: true,
    exportSelector: 'Location',
  },
  {
    name: 'Hide from PB',
    selector: (row) => row['HideFromPB'],
    sortable: true,
    exportSelector: 'HideFromPB',
  },
  {
    name: 'Actions',
    cell: Offcanvas,
  },
]

const PickupGroupsList = () => {
  const tenant = useSelector((state) => state.app.currentTenant)
  const addPickupGroupButton = (
    <TitleButton href="ratel/administration/pickupgroups/add" title="Add Pickup Group" />
  )
  return (
    <CippPageList
      title="Pickup Groups"
      TitleButton={addPickupGroupButton}
      datatable={{
        keyField: 'Extension',
        columns,
        reportName: `${tenant.customerId}-RATEL-PickupGroups-List`,
        path: '/api/LtListRatelPickupGroups',
        params: { TenantFilter: tenant?.customerId },
      }}
    />
  )
}

export default PickupGroupsList
