/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { CButton, CCol, CRow } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faEdit } from '@fortawesome/free-solid-svg-icons'
import { CippContentCard, CippPageList } from 'src/components/layout'
import { CippActionsOffcanvas } from 'src/components/utilities'
import { ActionContentCard } from 'src/components/contentcards'
import { Link } from 'react-router-dom'
// import { Link } from 'react-router-dom'
// import { TitleButton } from 'src/components/buttons'

const installationContent = [
  {
    link: '#',
    label: 'Set as Primary Ratel Host',
  },
  {
    link: '#',
    label: 'Set as Alternate Ratel Host',
  },
  {
    link: '#',
    label: 'Install Asterisk',
  },
]

const Offcanvas = (row) => {
  const [ocVisible, setOCVisible] = useState(false)
  return (
    <>
      <CButton size="sm" color="link" onClick={() => setOCVisible(true)}>
        <FontAwesomeIcon icon={faEllipsisV} />
      </CButton>
      <CippActionsOffcanvas
        title="Dialplans"
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
            color: 'info',
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
    </>
  )
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
   
        <CCol>
          <Link >
            <CButton size="sm" variant="ghost" color="warning">
              Reboot Server When No Calls Are Active
            </CButton>
          </Link>
          <Link>
            <CButton size="sm" variant="ghost" color="warning">
              Force Resync Of All Phones
            </CButton>
          </Link>
        </CCol>
        {/* <CCol>
          <ActionContentCard title="Installation" content={installationContent} />
        </CCol> */}
        <CippPageList
          title="Current Internal Dialplans"
          // titleButton={addNewDialplan}
          datatable={{
            keyField: 'Extension',
            columns,
            reportName: `${tenant.customerId}-RATEL-Dialplan-List`,
            path: '/api/LtListRatelInternalDialplans',
            params: { TenantFilter: tenant?.customerId },
          }}
        />
     
    </>
  )
}

export default DialplanList
