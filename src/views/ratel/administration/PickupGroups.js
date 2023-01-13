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
        title="Pickup Groups"
        extendedInfo={[
          { label: 'Extension', value: `${row.Extension}` },
          { label: 'Groups', value: `${row.Groups}` },
          { label: 'Type', value: `${row.Type}` },
         
        ]}
        actions={[
          {
            label: 'Remove Member from Pickup group',
            color: 'info',
            modal: true,
            modalUrl: `TODO`,
            modalMessage: 'Are you sure you want to remove this member from the pickup group?',
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
    name: 'Groups',
    selector: (row) => row['Groups'],
    sortable: true,
    exportSelector: 'Groups',
  },
  {
    name: 'Type',
    selector: (row) => row['Type'],
    sortable: true,
    exportSelector: 'DeviceId',
  },

  {
    name: 'Actions',
    cell: Offcanvas,
  },
]

const PickupGroupsList = () => {
  const tenant = useSelector((state) => state.app.currentTenant)
  const addPickupGroupButton = (
    <TitleButton href="ratel/administration/PickupGroups/add" title="Add Pickup Group" />
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
