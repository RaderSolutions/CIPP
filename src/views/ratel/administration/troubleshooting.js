/* eslint-disable prettier/prettier */
import React from 'react'
import { useSelector } from 'react-redux'
import { CippPageList } from 'src/components/layout'
import { Link } from 'react-router-dom'
import { CButton } from '@coreui/react'
import { useLazyGenericPostRequestQuery } from 'src/store/api/app'

const columns = [
  {
    name: 'Script Ran At',
    selector: (row) => row['HistoryDate'],
    sortable: true,
    exportSelector: 'HistoryDate',
  },
  {
    name: 'Results',
    selector: (row) => row['Message'],
    sortable: true,
    exportSelector: 'Message',
  },
]

const TroubleshootingResultsList = () => {
  const tenant = useSelector((state) => state.app.currentTenant)
  const [genericPostRequest, postResults] = useLazyGenericPostRequestQuery()
  const handleClickTroubleshoot = () => {
    genericPostRequest({ path: `api/LtRatelScheduleScript?RatelScript=true&ScriptId=7856` })
  }
  return (
    <>
      <CButton onClick={handleClickTroubleshoot} size="sm" variant="ghost" color="warning">
        Run troubleshooting script
      </CButton>

      <CippPageList
        title="Troubleshooting History"
        datatable={{
          keyField: 'id',
          columns,
          reportName: `${tenant.customerId}-RATEL-Troubleshooting-History`,
          path: '/api/LtListRatelTroubleshootingHistory',
          params: { TenantFilter: tenant?.customerId },
        }}
      />
    </>
  )
}

export default TroubleshootingResultsList
