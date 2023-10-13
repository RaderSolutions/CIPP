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
  const addMemberLink = `/ratel/administration/PagingGroups/addMember?tenantDomain=${tenant.customerId}`
  const editLink = `/ratel/administration/PagingGroups/edit?tenantDomain=${tenant.customerId}&extension=${row.Extension}&groups=${row.PageGroupName}&type=${row.Type}`
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
          { label: 'Extension', value: `${row.Extension}` },
          { label: 'Page Group', value: `${row.PageGroupName}` },
          { label: 'Device Id', value: `${row.DeviceId}` },
          { label: 'Device Ext', value: `${row.DeviceExt}` },
          { label: 'User', value: `${row.User}` },
          { label: 'Location', value: `${row.Location}` },
          { label: 'Hide from PB', value: `${row.HideFromPB}` },
        ]}
        actions={[
          {
            icon: <FontAwesomeIcon icon={faEdit} className="me-2" />,
            label: 'Edit Page Group',
            link: editLink,
            color: 'info',
          },
          {
            icon: <FontAwesomeIcon icon={faEdit} className="me-2" />,
            label: 'Add Member to Page group',
            link: addMemberLink,
            color: 'info',
          },
          {
            label: 'Hide from Phonebook',
            color: 'info',
            modal: true,
            modalUrl: `/api/LtScheduleScript?TenantFilter=${tenant.customerId}&Parameters=Key=dial_ext|Value=${row.DialExtension},Key=pagegroup_name|Value=${row.PageGroupName},Key=hide_from_pb|Values='1',Key=is_deletion|Values=0&RatelScript=true&ScriptId=7410`,
            modalMessage: 'Are you sure you want to hide/unhide this paging group?',
          },
          // {
          //   label: 'Delete Page Group',
          //   color: 'info',
          //   modal: true,
          //   modalUrl: `TODO`,
          //   modalMessage: 'Are you sure you want to delete this paging group?',
          // },
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
    name: 'Extension',
    selector: (row) => row['Extension'],
    sortable: true,
    exportSelector: 'Extension',
  },
  {
    name: 'Page Group',
    selector: (row) => row['PageGroupName'],
    sortable: true,
    exportSelector: 'Page Group',
  },
  {
    name: 'Device Id',
    selector: (row) => row['DeviceId'],
    sortable: true,
    exportSelector: 'DeviceId',
  },
  {
    name: 'Device Ext',
    selector: (row) => row['DeviceExt'],
    sortable: true,
    exportSelector: 'DeviceExt',
  },
  {
    name: 'User',
    selector: (row) => row['User'],
    sortable: true,
    exportSelector: 'User',
  },
  {
    name: 'Location',
    selector: (row) => row['Location'],
    sortable: true,
    exportSelector: 'Location',
  },
  {
    name: 'Hide from PB',
    selector: (row) => row['HideFromPB'],
    sortable: true,
    exportSelector: 'HideFromPB',
    cell: (row) => row['HideFromPB'] === true ? 'true' : 'false'
  },
  {
    name: 'Actions',
    cell: Offcanvas,
  },
]

const PagingGroupsList = () => {
  const tenant = useSelector((state) => state.app.currentTenant)
  const addPagingGroupMemberButton = (
    <TitleButton
      href="/ratel/administration/paginggroups/addMember"
      title="Add Paging Group Member"
    />
  )
  const addPagingGroupTitleButtons = (
    <>
      <div style={{display: "flex", justifyContent:"space-between"}}>
        <TitleButton
          style={{ marginRight: '.5em' }}
          href="/ratel/administration/paginggroups/addMember"
          title="Add Paging Group Member"
        />
        <TitleButton
          style={{ marginLeft: '.5em' }}
          href="/ratel/administration/paginggroups/addPagingGroup"
          title="Add Paging Group"
        />
      </div>
    </>
  )
  const addPagingGroupButton = (
    <CButton href="/ratel/administration/paginggroups/addPagingGroup" title="Add Paging Group" />
  )
  console.log('paging groups list', )
  return (
    <CippPageList
      title="Paging Groups"
      titleButton={addPagingGroupTitleButtons}
      datatable={{
        keyField: 'Extension',
        columns,
        reportName: `${tenant.customerId}-RATEL-PagingGroups-List`,
        path: '/api/LtListRatelPagingGroups',
        params: { TenantFilter: tenant?.customerId },
      }}
    />
  )
}

export default PagingGroupsList
