/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { CButton, CCol, CInput, CRow } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faEdit } from '@fortawesome/free-solid-svg-icons'
import { CippContentCard, CippPageList } from 'src/components/layout'
import { CippActionsOffcanvas, RatelSetupOffCanvas } from 'src/components/utilities'
import { ActionContentCard } from 'src/components/contentcards'
import { Link } from 'react-router-dom'
// import { TitleButton } from 'src/components/buttons'

const Offcanvas = (row) => {
  const tenant = useSelector((state) => state.app.currentTenant)
  const [ocVisible, setOCVisible] = useState(false)
  const editLink = `/ratel/administration/setup/editDialplan?tenantDomain=${tenant.customerId}&name=${row.Name}&description=${row.Description}&dialplan=${row.Dialplan}`

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
            link: editLink,
            // modalInput: true,
            // modalUrl: `/api/LtScheduleScript?TenantFilter=${tenant.customerId},Parameters=Key=Name|Value=${row.Dialplan},Key=Dialplan|Value=${input.Dialplan},Key=Notes|Value=${input.Notes}&RatelScript=true&ScriptId=7387`,
            // // modalMessage: '',
          },
          {
            label: 'Delete Dialplan',
            color: 'info',
            modal: true,
            modalUrl: `/api/LtScheduleScript?TenantFilter=${tenant.customerId}&Parameters=Key=Delete|Value=1,Key=Name|Value=${row.Name},Key=Notes|Value=${row.Description},Key=Dialplan|Value=dialplanValue&RatelScript=true&ScriptId=7387`,
            modalInput: true,
            modalMessage: '',
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
          <CippContentCard title="Special Features" style={{ maxWidth: '50vw' }}>
            {/* <h5>License Keys</h5> */}
            {/* <CRow style={{ paddingLeft: '2em', paddingRight: '2em' }}> */}
            <CCol style={{ display: 'flex', flexDirection: 'column' }}>
              <label for="test">FOP:</label>
              <input style={{ maxWidth: '500px' }} type="text" name="fop" />
              <CButton style={{ maxWidth: '500px' }} size="sm" variant="ghost" color="warning">
                Apply FOP License
              </CButton>
              <Link to="/ratel/administration/setup/setupVoiceRecording">
                <CButton style={{ maxWidth: '500px' }} size="sm" variant="ghost" color="warning">
                  Setup Voice Recording Ext.
                </CButton>
              </Link>
              {/* <Link to="/ratel/administration/setup/createGreetingWithText">
                <CButton style={{ maxWidth: '500px' }} size="sm" variant="ghost" color="warning">
                  Create A Greeting Using Text-To-Speech
                </CButton>
              </Link> */}
            </CCol>
          </CippContentCard>
        </CCol>
        <CCol>
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
        </CCol>
        {/* </CRow> */}
      </CRow>
    </>
  )
}

export default DialplanList
