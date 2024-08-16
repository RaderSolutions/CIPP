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
  // const tenant = useSelector((state) => state.app.currentTenant)
  const [ocVisible, setOCVisible] = useState(false)
  const scheduleLink = `/scripts/schedule`
  return (
    <>
      <Link to={scheduleLink}>
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
          
        ]}
        actions={[
          {
            icon: <FontAwesomeIcon icon={faEdit} className="me-2" />,
            label: 'Schedule Script',
            link: scheduleLink,
            color: 'info',
          },
        //   {
        //     label: 'Delete Sc',
        //     color: 'info',
        //     modal: true,
        //     modalUrl: `api/LtRatelDIDs?TenantFilter=${tenant.customerId}&Action=Delete&DIDNumber=${row.Number}`,
        //     modalMessage: 'Are you sure you want to delete this DID?',
        //   },
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
    selector: (row) => row['Name'],
    sortable: true,
    exportSelector: 'Name',
  },
  {
    name: 'Actions',
    center: true,
    cell: Offcanvas,
  },
]

const ScriptsList = () => {
  const tenant = useSelector((state) => state.app.currentTenant)
  //const addDidButton = <TitleButton href="ratel/administration/dids/add" title="Add DID Number to Device" />
  return (
    <CippPageList
      title="Enhanced Labtech Scripts"
      // TitleButton={addDidButton}
      datatable={{
        keyField: 'Number',
        columns,
        reportName: `${tenant.customerId}-Script-List`,
        path: '/api/LtListScripts',
        params: { },
      }}
    />
  )
}

export default ScriptsList
