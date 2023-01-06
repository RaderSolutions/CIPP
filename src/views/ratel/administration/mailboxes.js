/* eslint-disable prettier/prettier */
import React from 'react'
import { useSelector } from 'react-redux'
import { CippPageList } from 'src/components/layout'

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
    name: 'EmailAddress',
    selector: (row) => row['EmailAddress'],
    sortable: true,
    exportSelector: 'EmailAddress',
  },
  {
    name: 'ExtraOptions',
    selector: (row) => row['ExtraOptions'],
    sortable: true,
    exportSelector: 'ExtraOptions',
  },
  {
    name: 'Voicemails',
    selector: (row) => row['Voicemails'],
    sortable: true,
    exportSelector: 'Voicemails',
  }
]

const MailboxesList = () => {
  const tenant = useSelector((state) => state.app.currentTenant)
  return (
    <>

    <CippPageList
      title="Voicemail Boxes"
    //   titleButton={addUserDeviceButton}
      datatable={{
        keyField: 'id',
        columns,
        reportName: `${tenant.customerId}-RATEL-Mailboxes-List`,
        path: '/api/LtListRatelVoicemailBoxes',
        params: { TenantFilter: tenant?.customerId },
      }}
    />
    </>
  )
}

export default MailboxesList
