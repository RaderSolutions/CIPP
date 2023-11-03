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
    const editLink = `/ratel/administration/voicemailAdmin/edit?tenantDomain=${tenant.customerId}`
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
          title="Voicemail Box Information"
          extendedInfo={[
            { label: 'Mailbox', value: `${row.Mailbox}` },
            { label: 'Password', value: `${row.Password}` },
            { label: 'Name', value: `${row.Name}` },
            { label: 'Email Address', value: `${row.EmailAddress}` },
            { label: 'Extra Options', value: `${row.ExtraOptions}` },
            { label: 'Voicemails', value: `${row.Voicemails}` }
          ]}
          actions={[
            {
              icon: <FontAwesomeIcon icon={faEdit} className="me-2" />,
              label: 'Edit mailbox',
              link: editLink,
              color: 'info',
            },
            {
                label: 'Reset mailbox',
                color: 'info',
                modal: true,
                modalUrl: `/api/LtScheduleScript?TenantFilter=${tenant.customerId}&Parameters=Key=astFamily|Value=${row.Family},Parameters=Key=astKey|Value=${row.Key},Parameters=Key=astValue|value=${row.Value},&RatelScript=true&ScriptId=7356`,
                modalMessage: 'This deletes voicemails & greetings. Are you sure you want to reset this mailbox?',
              },
            {
              label: 'Delete mailbox',
              color: 'info',
              modal: true,
              modalUrl: `/api/LtScheduleScript?TenantFilter=${tenant.customerId}&Parameters=Key=astFamily|Value=${row.Family},Parameters=Key=astKey|Value=${row.Key},Parameters=Key=astValue|value=${row.Value},&RatelScript=true&ScriptId=7356`,
              modalMessage: 'Are you sure you want to delete this mailbox?',
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
      name: 'Mailbox',
      selector: (row) => row['Mailbox'],
      sortable: true,
      exportSelector: 'Mailbox',
    },
    {
      name: 'Password',
      selector: (row) => row['Password'],
      sortable: true,
      exportSelector: 'Password',
    },
    {
      name: 'Name',
      selector: (row) => row['Name'],
      sortable: true,
      exportSelector: 'Name',
    },
    {
      name: 'Email Address',
      selector: (row) => row['EmailAddress'],
      sortable: true,
      exportSelector: 'EmailAddress',
    },
    {
        name: 'Extra Options',
        selector: (row) => row['ExtraOptions'],
        sortable: true,
        exportSelector: 'ExtraOptions',
      },
      {
        name: 'Voicemails',
        selector: (row) => row['Voicemails'],
        sortable: true,
        exportSelector: 'Voicemails',
      },
    {
        name: 'Actions',
        cell: Offcanvas,
      }
]

const VoicemailBoxesList = () => {
    const tenant = useSelector((state) => state.app.currentTenant)
    const [genericPostRequest, postResults] = useLazyGenericPostRequestQuery()
    const addVoicemailButton = (
    <TitleButton href="/ratel/administration/mailboxes/add" title="Add Voicemail" />
  )

    return (
      <>
      <CippPageList
        title="Voicemail Boxes"
        // titleButton={addQueueButton}
        datatable={{
          keyField: 'id',
          columns,
          reportName: `${tenant.customerId}-RATEL-VoicemailBoxes-List`,
          path: '/api/LtListRatelVoicemailBoxes',
          params: { TenantFilter: tenant?.customerId },
        }}
      />
      </>
    )
  }
  
  export default VoicemailBoxesList
  