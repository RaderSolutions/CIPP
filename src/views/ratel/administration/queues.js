/* eslint-disable prettier/prettier */
import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import { CButton } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { CippPageList } from 'src/components/layout'
import { Link } from 'react-router-dom'
import { CippActionsOffcanvas } from 'src/components/utilities'
// import { TitleButton } from 'src/components/buttons'

const Offcanvas = (row, rowIndex, formatExtraData) => {
    const tenant = useSelector((state) => state.app.currentTenant)
    const [ocVisible, setOCVisible] = useState(false)
    const editLink = `/ratel/administration/queues/edit?tenantDomain=${tenant.customerId}`
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
          title="Queue Information"
          extendedInfo={[
            { label: 'Queue Name', value: `${row.QueueName}` },
            { label: 'Device ID', value: `${row.DeviceId}` },
            { label: 'Extension', value: `${row.Extension}` },
            { label: 'Ring Strategy', value: `${row.RingStrategy}` },
            { label: 'User', value: `${row.User}` },
            { label: 'Location', value: `${row.Location}` }
          ]}
          actions={[
            {
              icon: <FontAwesomeIcon icon={faEdit} className="me-2" />,
              label: 'Edit queue',
              link: editLink,
              color: 'info',
            },
            {
              label: 'Delete queue',
              color: 'info',
              modal: true,
              modalUrl: `/api/LtScheduleScript?TenantFilter=${tenant.customerId}&Parameters=Key=astFamily|Value=${row.Family},Parameters=Key=astKey|Value=${row.Key},Parameters=Key=astValue|value=${row.Value},&RatelScript=true&ScriptId=7356`,
              modalMessage: 'Are you sure you want to delete this queue?',
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

const columns = [
    {
      name: 'Family',
      selector: (row) => row['Family'],
      sortable: true,
      exportSelector: 'Family',
    },
    {
      name: 'Key',
      selector: (row) => row['Key'],
      sortable: true,
      exportSelector: 'Key',
    },
    {
      name: 'Value',
      selector: (row) => row['Value'],
      sortable: true,
      exportSelector: 'Value',
    },
    {
      name: 'Last Read From RATEL',
      selector: (row) => row['LastRead'],
      sortable: true,
      exportSelector: 'LastRead',
    },
    {
        name: 'Actions',
        cell: Offcanvas,
      }
]

const QueuesList = () => {
    const tenant = useSelector((state) => state.app.currentTenant)
    // const addQueueButton = <TitleButton href="/ratel/administration/queues/add" title="Add Queue" />

    return (
      <>
      <CippPageList
        title="Queues"
        // titleButton={addQueueButton}
        datatable={{
          keyField: 'id',
          columns,
          reportName: `${tenant.customerId}-RATEL-Queues-List`,
          path: '/api/LtListRatelQueues',
          params: { TenantFilter: tenant?.customerId },
        }}
      />
      </>
    )
  }
  
  export default QueuesList
  