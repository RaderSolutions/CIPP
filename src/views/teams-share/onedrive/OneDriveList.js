import { CLink } from '@coreui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { CippPageList } from 'src/components/layout'
import { CellTip } from 'src/components/tables'
import { TitleButton } from 'src/components/buttons'

const OneDriveList = () => {
  const tenant = useSelector((state) => state.app.currentTenant)
  const testTitleButton = (
    <TitleButton href="/ratel/administration/devices/add" title="Add Device" />
  )
  const columns = [
    {
      name: 'Name',
      selector: (row) => row['displayName'],
      sortable: true,
      cell: (row) => CellTip(row['displayName']),
      exportSelector: 'displayName',
    },
    {
      name: 'UPN',
      selector: (row) => row['UPN'],
      sortable: true,
      cell: (row) => CellTip(row['UPN']),
      exportSelector: 'UPN',
    },
    {
      name: 'Last Active',
      selector: (row) => row['LastActive'],
      sortable: true,
      exportSelector: 'LastActive',
    },
    {
      name: 'File Count (Total)',
      selector: (row) => row['FileCount'],
      sortable: true,
      exportSelector: 'FileCount',
    },
    {
      name: 'Used (GB)',
      selector: (row) => row['UsedGB'],
      sortable: true,
      exportSelector: 'UsedGB',
    },
    {
      name: 'Allocated (GB)',
      selector: (row) => row['Allocated'],
      sortable: true,
      exportSelector: 'Allocated',
    },
    {
      name: 'URL',
      selector: (row) => row['url'],
      sortable: true,
      exportSelector: 'URL',
      cell: (row) => {
        return (
          <CLink target="_blank" href={`${row.URL}`}>
            URL
          </CLink>
        )
      },
    },
  ]
  return (
    <CippPageList
      title="OneDrive List"
      titleButton={testTitleButton}
      datatable={{
        keyField: 'id',
        columns,
        reportName: `${tenant?.defaultDomainName}-OneDrive-Report`,
        path: '/api/ListSites?type=OneDriveUsageAccount',
        params: { TenantFilter: tenant?.customerId },
      }}
    />
  )
}

export default OneDriveList
