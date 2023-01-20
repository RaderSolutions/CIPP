/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
// import { CButton } from '@coreui/react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEllipsisV, faEdit } from '@fortawesome/free-solid-svg-icons'
import { CippPageList } from 'src/components/layout'
import { CippActionsOffcanvas } from 'src/components/utilities'
// import { Link } from 'react-router-dom'
// import { TitleButton } from 'src/components/buttons'

const Offcanvas = (row) => {
  ;<CippActionsOffcanvas
    title="Pickup Groups"
    extendedInfo={[
      { label: 'Name', value: `${row.Name}` },
      { label: 'Description', value: `${row.Description}` },
      { label: 'Dialplan', value: `${row.Dialplan}` },
    ]}
    actions={[
      {
        label: 'Edit Dialplan',
        color: 'info',
        modal: true,
        modalUrl: `TODO`,
        // modalMessage: '',
      },
      {
        label: 'Delete Dialplan',
        modal: true,
        modalUrl: `TODO`,
        modalMessage: 'Are you sure you want to delete this dialplan?',
      },
    ]}
    placement="end"
    visible={ocVisible}
    id={row.Number}
    hideFunction={() => setOCVisible(false)}
  />
}

const columns = [
  {
    name: 'Name',
    selector: (row) => row['Extension'],
    sortable: true,
    exportSelector: 'Name',
  },
  {
    name: 'Description',
    selector: (row) => row['Description'],
    sortable: true,
    exportSelector: 'Description',
  },
  {
    name: 'Dialplan',
    selector: (row) => row['Type'],
    sortable: true,
    exportSelector: 'Dialplan',
  },
  {
    name: 'Actions',
    cell: Offcanvas,
  },
]

const DialplanList = () => {
  const tenant = useSelector((state) => state.app.currentTenant)
  // const addNewDialplan = (
  //   <TitleButton href="/ratel/administration/pickupgroups/addDialplan" title="Add Dialplan" />
  // )
  return (
    <>
    <CippPageList
      title="Pickup Groups"
      // titleButton={addNewDialplan}
      datatable={{
        keyField: 'Extension',
        columns,
        reportName: `${tenant.customerId}-RATEL-Dialplan-List`,
        path: '/api/LtListRatelDialplans',
        params: { TenantFilter: tenant?.customerId },
      }}
    />
    </>
  )
}

export default DialplanList
