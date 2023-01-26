/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { CButton, CCol, CInput, CRow } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faEdit } from '@fortawesome/free-solid-svg-icons'
import { CippContentCard, CippPageList } from 'src/components/layout'
import { CippActionsOffcanvas } from 'src/components/utilities'
import { ActionContentCard } from 'src/components/contentcards'
// import { Link } from 'react-router-dom'
// import { TitleButton } from 'src/components/buttons'

// const installationContent = [
//   {
//     link: '#',
//     label: 'Set as Primary Ratel Host',
//   },
//   {
//     link: '#',
//     label: 'Set as Alternate Ratel Host',
//   },
//   {
//     link: '#',
//     label: 'Install Asterisk',
//   },
//   {
//     link: '#',
//     label: 'Update Asterisk',
//   },
//   {
//     link: '#',
//     label: 'Start Config Sync between Master and Alternate',
//   },
//   {
//     link: '#',
//     label: 'Install Fail2Ban',
//   },
// ]

const redeployContent = [
  {
    link: '#',
    label: 'Force Resync Of All Phones',
  },
]

const rebootContent = [
  {
    link: '#',
    label: 'Reboot Server When No Calls Are Active',
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
    selector: (row) => row['Name'],
    sortable: true,
    exportSelector: 'Name',
    maxWidth: '600px',
  },
  {
    name: 'Description',
    selector: (row) => row['Description'],
    sortable: true,
    exportSelector: 'Description',
    maxWidth: '600px',
  },
  {
    name: 'Dialplan',
    selector: (row) => row['Dialplan'],
    sortable: true,
    exportSelector: 'Dialplan',
    maxWidth: '600px',
  },
  {
    name: 'Actions',
    cell: Offcanvas,
    maxWidth: '600px',
  },
]

const DialplanList = () => {
  const tenant = useSelector((state) => state.app.currentTenant)
  // const addNewDialplan = (
  //   <TitleButton href="/ratel/administration/pickupgroups/addDialplan" title="Add Dialplan" />
  // )
  return (
    <>
      {/* <CButton size="sm" variant="ghost" color="warning">
          Reboot Server When No Calls Are Active
        </CButton>
        <CButton size="sm" variant="ghost" color="warning">
          Force Resync Of All Phones
        </CButton> */}
      <CRow>
        <CCol>
          <ActionContentCard title="Redeploy Data" content={redeployContent} />
        </CCol>
        <CCol>
          <ActionContentCard title="Reboot Server" content={rebootContent} />
        </CCol>
      </CRow>

      <CRow>
        <h5 style={{ paddingBottom: '1em', paddingTop: '1em', paddingLeft: '2.5em' }}>Special Features</h5>
        {/* <CCol>
          <ActionContentCard title="Installation" content={installationContent} />
        </CCol> */}
        <CCol>
          <CippContentCard title="License Keys">
            {/* <h5>License Keys</h5> */}
            <CRow style={{ paddingLeft: '2em', paddingRight: '2em' }}>
              {' '}
              <label for="test">FOP:</label>
              <input style={{ maxWidth: '500px' }} type="text" name="fop" />
              <CButton style={{ maxWidth: '500px' }} size="sm" variant="ghost" color="warning">
                Apply FOP License
              </CButton>
            </CRow>
            <CRow>
              <label for="test">DPMA:</label>
              <input style={{ maxWidth: '500px' }} type="text" name="dpma" />
              <CButton style={{ maxWidth: '500px' }} size="sm" variant="ghost" color="warning">
                Save DPMA License Key
              </CButton>
            </CRow>
          </CippContentCard>
        </CCol>
        <CCol>
        <CButton style={{ maxWidth: '500px' }} size="sm" variant="ghost" color="warning">
          Setup Voice Recording Ext.
        </CButton>
        </CCol>
        <CCol>
        <CButton style={{ maxWidth: '500px' }} size="sm" variant="ghost" color="warning">
          Create A Greeting Using Text-To-Speech
        </CButton>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <br />
          <br />
          <div>
            <CippPageList
              title="Current Internal Dialplans"
              style={{ maxWidth: '50%', marginTop: '2em' }}
              // titleButton={addNewDialplan}
              datatable={{
                // keyField: 'Extension',
                columns,
                reportName: `${tenant.customerId}-RATEL-Dialplan-List`,
                path: '/api/LtListRatelInternalDialplans',
                params: { TenantFilter: tenant?.customerId },
              }}
            />
          </div>
        </CCol>
      </CRow>
    </>
  )
}

export default DialplanList
