/* eslint-disable prettier/prettier */
import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import { CButton, CRow, CCol } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faEdit } from '@fortawesome/free-solid-svg-icons'
import { CippPageList } from 'src/components/layout'
import { CippActionsOffcanvas } from 'src/components/utilities'
import { TitleButton } from 'src/components/buttons'

const Offcanvas = (row, rowIndex, formatExtraData) => {
  const tenant = useSelector((state) => state.app.currentTenant)
  const [ocVisible, setOCVisible] = useState(false)
  return (
    <>
      <CButton size="sm" color="link" onClick={() => setOCVisible(true)}>
        <FontAwesomeIcon icon={faEllipsisV} />
      </CButton>
      <CippActionsOffcanvas
        title="Number Information"
        extendedInfo={[
          { label: 'Blocked Number', value: `${row.BlockedNumber}` },
        ]}
        actions={[
          {
            label: 'Remove Blocked Number',
            color: 'info',
            modal: true,
            modalUrl: `TODO`,
            modalMessage: 'Are you sure you want to remove this number from the block list?',
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
    name: 'Blocked Number',
    selector: (row) => row['BlockedNumber'],
    sortable: true,
    exportSelector: 'BlockedNumber',
  },
  {
    name: 'Actions',
    cell: Offcanvas,
  }
]

const BlockedCallsList = () => {
  const tenant = useSelector((state) => state.app.currentTenant)
  const addNumberButton = <TitleButton href="ratel/administration/callblocking/add" title="Add Blocked Number" />
  
  const handleCallBlocking = (e) => {
    console.log(e.target.value)
  }
  
  return (
    <>
    <CRow>
      <CCol>
      <div>
      <label for="test">Phone Number:</label>
      <input style={{ maxWidth: '500px' }} type="text" name="" />
      </div>
      </CCol>
      <CCol>
      <div>
      <CButton size="sm" color="link" value={'add'} onClick={handleCallBlocking}>
      Add Number To Call Blocking
      </CButton>
        {/* <FontAwesomeIcon icon={faEllipsisV} /> */}
      </div>
      <div>
      <CButton size="sm" color="link" value={'remove'} onClick={handleCallBlocking}>
      Remove Number From Call Blocking
      </CButton>
        {/* <FontAwesomeIcon icon={faEllipsisV} /> */}
      </div>
      </CCol>
    </CRow>
    <CippPageList
      title="Blocked Numbers"
      TitleButton={addNumberButton}
      datatable={{
        keyField: 'Extension',
        columns,
        reportName: `${tenant.customerId}-RATEL-BlockedCalls-List`,
        path: '/api/LtListRatelBlockedNumbers',
        params: { TenantFilter: tenant?.customerId },
      }}
    />
    </>
  )
}

export default BlockedCallsList
