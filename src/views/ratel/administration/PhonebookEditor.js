/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { CButton } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faEdit } from '@fortawesome/free-solid-svg-icons'
import { CippPageList } from 'src/components/layout'
import { CippActionsOffcanvas } from 'src/components/utilities'
import { Link } from 'react-router-dom'
import { TitleButton } from 'src/components/buttons'

const Offcanvas = (row, rowIndex, formatExtraData) => {
  const tenant = useSelector((state) => state.app.currentTenant)
  const [ocVisible, setOCVisible] = useState(false)
  const editLink = `/ratel/administration/phonebookEditor/editEntry?tenantDomain=${tenant.customerId}&ID=${row.ID}`
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
        title="Group Information"
        extendedInfo={[
          { label: 'Id', value: `${row.ID}` },
          { label: 'Dial', value: `${row.Dial}` },
          { label: 'Salutation', value: `${row.Salutation}` },
          { label: 'First Name', value: `${row.FirstName}` },
          { label: 'Middle Name', value: `${row.MiddleName}` },
          { label: 'Last Name', value: `${row.LastName}` },
          { label: 'Suffix', value: `${row.Suffix}` },
          { label: 'Email', value: `${row.Email}` },
          { label: 'Organization', value: `${row.Organization}` },
          { label: 'JobTitle', value: `${row.JobTitle}` },
          { label: 'Location', value: `${row.Location}` },
          { label: 'Notes', value: `${row.Notes}` },
        ]}
        actions={[
          {
            icon: <FontAwesomeIcon icon={faEdit} className="me-2" />,
            label: 'Edit Entry',
            link: editLink,
            color: 'info',
          },
          {
            label: 'Hide from Phonebook',
            color: 'info',
            modal: true,
            modalUrl: `TODO`,
            modalMessage: 'Are you sure you want to hide/unhide this paging group?',
          },
          {
            label: 'Delete Page Group',
            color: 'info',
            modal: true,
            modalUrl: ``,
            modalMessage: 'Are you sure you want to delete this phonebook entry?',
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
    name: 'ID',
    selector: (row) => row['ID'],
    sortable: true,
    exportSelector: 'ID',
  },
  {
    name: 'Dial',
    selector: (row) => row['Dial'],
    sortable: true,
    exportSelector: 'Dial',
  },
  {
    name: 'Salutation',
    selector: (row) => row['Salutation'],
    sortable: true,
    exportSelector: 'Salutation',
  },
  {
    name: 'FirstName',
    selector: (row) => row['FirstName'],
    sortable: true,
    exportSelector: 'FirstName',
  },
  {
    name: 'MiddleName',
    selector: (row) => row['MiddleName'],
    sortable: true,
    exportSelector: 'MiddleName',
  },
  {
    name: 'LastName',
    selector: (row) => row['LastName'],
    sortable: true,
    exportSelector: 'LastName',
  },
  {
    name: 'Suffix',
    selector: (row) => row['Suffix'],
    sortable: true,
    exportSelector: 'Suffix',
  },
  {
    name: 'Email',
    selector: (row) => row['Email'],
    sortable: true,
    exportSelector: 'Email',
  },
  {
    name: 'Organization',
    selector: (row) => row['Organization'],
    sortable: true,
    exportSelector: 'Organization',
  },
  {
    name: 'JobTitle',
    selector: (row) => row['jobTitle'],
    sortable: true,
    exportSelector: 'JobTitle',
  },
  {
    name: 'Location',
    selector: (row) => row['Location'],
    sortable: true,
    exportSelector: 'Location',
  },
  {
    name: 'Notes',
    selector: (row) => row['Notes'],
    sortable: true,
    exportSelector: 'Notes',
  },
  {
    name: 'Actions',
    cell: Offcanvas,
  },
]

const PhonebookEntryList = () => {
  const tenant = useSelector((state) => state.app.currentTenant)
  const addPhonebookEntryButton = (
    <TitleButton href="/ratel/administration/phonebookEditor/addEntry" title="Add Phonebook Entry" />
  )
  return (
    <CippPageList
      title="Phonebook Editor"
      titleButton={addPhonebookEntryButton}
      datatable={{
        keyField: 'ID',
        columns,
        reportName: `${tenant.customerId}-RATEL-PhonebookEntries-List`,
        path: '/api/LtListRatelPhonebookEntries',
        params: { TenantFilter: tenant?.customerId },
      }}
    />
  )
}

export default PhonebookEntryList
