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
  const tenant = useSelector((state) => state.app.currentTenant)
  const [ocVisible, setOCVisible] = useState(false)
  const editLink = `/passworder/change-password?tenantDomain=${tenant.customerId}&contactID=${row.ContactID}`

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
        title="Contact Information"
        extendedInfo={[
          { label: 'ContactID', value: `${row.ContactID}` },
          { label: 'Name', value: `${row.Name}` }
        ]}
        actions={[
          {
            icon: <FontAwesomeIcon icon={faEdit} className="me-2" />,
            label: 'Contact Password',
            link: editLink,
            color: 'info',
          },
          {
            label: 'Schedule Ratel Softphone Setup',
            color: 'info',
            modal: true,
            modalUrl: `/api/TODO`,
            modalMessage: 'Are you sure you want to schedule softphone setup?',
          },
          {
            label: 'Covert to/from shared mailbox',
            color: 'info',
            modal: true,
            modalUrl: `/api/LtScheduleScript/TODO`,
            modalMessage: 'Are you sure you want to modify this mailbox?',
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
    name: 'ContactID',
    selector: (row) => row['ContactID'],
    sortable: true,
    exportSelector: 'ContactID',
  },
  {
    name: 'Name',
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

const ContactsList = () => {
  const tenant = useSelector((state) => state.app.currentTenant)
  // const addDidButton = <TitleButton href="ratel/administration/dids/add" title="Add DID Number to Device" />
  return (
    <CippPageList
      title="Client Contacts"
      // TitleButton={addDidButton}
      datatable={{
        keyField: 'Number',
        columns,
        reportName: `${tenant.customerId}-RATEL-DIDs-List`,
        path: '/api/LtListClientContacts',
        params: { TenantFilter: tenant?.customerId },
      }}
    />
  )
}

export default ContactsList
