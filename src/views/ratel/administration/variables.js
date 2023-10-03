/* eslint-disable prettier/prettier */
import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import { CButton } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { CippPageList } from 'src/components/layout'
import { Link } from 'react-router-dom'
import { CippActionsOffcanvas } from 'src/components/utilities'
import { TitleButton } from 'src/components/buttons'
import { useLazyGenericPostRequestQuery } from 'src/store/api/app'

const Offcanvas = (row, rowIndex, formatExtraData) => {
    const tenant = useSelector((state) => state.app.currentTenant)
    const [ocVisible, setOCVisible] = useState(false)
    const editLink = `/ratel/administration/variables/edit?tenantDomain=${tenant.customerId}&variableFamily=${row.Family}&variableKey=${row.Key}`
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
          title="Variable Information"
          extendedInfo={[
            { label: 'Family', value: `${row.Family}` },
            { label: 'Key', value: `${row.Key}` },
            { label: 'Value', value: `${row.Value}` },
            { label: 'Last Read From RATEL', value: `${row.LastRead}` }
          ]}
          actions={[
            {
              icon: <FontAwesomeIcon icon={faEdit} className="me-2" />,
              label: 'Edit variable',
              link: editLink,
              color: 'info',
            },
            {
              label: 'Delete variable',
              color: 'info',
              modal: true,
              modalUrl: `/api/LtScheduleScript?TenantFilter=${tenant.customerId}&Parameters=Key=astFamily|Value=${row.Family},Key=astKey|Value=${row.Key},Key=astValue|value=${row.Value}&RatelScript=true&ScriptId=7356`,
              modalMessage: 'Are you sure you want to delete this variable?',
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

const VariablesList = () => {
    const tenant = useSelector((state) => state.app.currentTenant)
    const addVariableButton = <TitleButton href="/ratel/administration/variables/add" title="Add Variable" />
    const [genericPostRequest, postResults ] = useLazyGenericPostRequestQuery()
   
    const handleSyncASTDB = async () => {
      genericPostRequest({
        path: `/api/LtScheduleScript?TenantFilter=${tenantDomain}&RatelScript=true&ScriptId=7354`
    })
  }
  
    return (
      <>
      <CCol
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
      l>
        <CButton onClick={handleSyncASTDB} style={{ maxWidth: '500px' }} className="mb-3">
          Sync Data From RATEL
          </CButton>
      <CippPageList
        title="Variables"
        titleButton={addVariableButton}
        datatable={{
          keyField: 'id',
          columns,
          reportName: `${tenant.customerId}-RATEL-Variables-List`,
          path: '/api/LtListRatelVariables',
          params: { TenantFilter: tenant?.customerId },
        }}
      />
      </CCol>
   
      </>
    )
  }
  
  export default VariablesList
  