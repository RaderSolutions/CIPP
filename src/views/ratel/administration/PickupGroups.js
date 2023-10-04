/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { CButton, CCol, CCallout, CSpinner } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faEdit } from '@fortawesome/free-solid-svg-icons'
import { CippPageList } from 'src/components/layout'
import { CippActionsOffcanvas } from 'src/components/utilities'
import { Link } from 'react-router-dom'
import { TitleButton } from 'src/components/buttons'
import { useLazyGenericPostRequestQuery } from 'src/store/api/app'

const Offcanvas = (row, rowIndex, formatExtraData) => {
  const tenant = useSelector((state) => state.app.currentTenant)
  const [ocVisible, setOCVisible] = useState(false)
  const editLink = `/ratel/administration/pickupgroups/editMember?tenantDomain=${tenant.customerId}&extension=${row.Extension}&groups=${row.Groups}&type=${row.Type}`

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
        title="Pickup Groups"
        extendedInfo={[
          { label: 'Extension', value: `${row.Extension}` },
          { label: 'Groups', value: `${row.Groups}` },
          { label: 'Type', value: `${row.Type}` },
        ]}
        actions={[
          {
            icon: <FontAwesomeIcon icon={faEdit} className="me-2" />,
            label: 'Edit Member',
            link: editLink,
            color: 'info',
            modal: true,
            // modalUrl: `TODO`,
          },
          {
            label: 'Remove Member from Pickup group',
            color: 'info',
            modal: true,
            modalUrl: `api/LtRatelPickupGroups`,
            modalBody: {
              TenantFilter: tenant.customerId,
              Action: 'Delete',
              Extension: row.Extension,
              Type: row.Type,
              Groups: row.Groups,
            },
            modalType:"POST",
            modalMessage: 'Are you sure you want to remove this member from the pickup group?',
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
    name: 'Extension',
    selector: (row) => row['Extension'],
    sortable: true,
    exportSelector: 'Extension',
  },
  {
    name: 'Group Name',
    selector: (row) => row['Groups'],
    sortable: true,
    exportSelector: 'Groups',
  },
  {
    name: 'Type',
    selector: (row) => row['Type'],
    sortable: true,
    exportSelector: 'Type',
  },
  {
    name: 'Actions',
    cell: Offcanvas,
  },
]

const PickupGroupsList = () => {
  const tenant = useSelector((state) => state.app.currentTenant)
  const [genericPostRequest, postResults] = useLazyGenericPostRequestQuery()
  const addPickupGroupMemberButton = (
    <TitleButton
      href="/ratel/administration/pickupgroups/addMember"
      title="Add Pickup Group Member"
    />
  )
  const handleUpdateDevices = async () => {
    // script from jeff
  }
  return (
    <>
    <CCol
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
     <CButton onClick={handleUpdateDevices} style={{ maxWidth: '500px' }} className="mb-3">
          Process Pending Device Updates
          </CButton>
          <CippPageList
      title="Pickup Groups"
      titleButton={addPickupGroupMemberButton}
      datatable={{
        keyField: 'Extension',
        columns,
        reportName: `${tenant.customerId}-RATEL-PickupGroups-List`,
        path: '/api/LtListRatelPickupGroups',
        params: { TenantFilter: tenant?.customerId },
      }}
    />
      {/* {postResults.isFetching && (
            <CCallout color="info">
              <CSpinner>Loading</CSpinner>
            </CCallout>
          )}
          {postResults.isSuccess && <CCallout color="success">Sync Script Run Successfully</CCallout>} */}
    </CCol>
    </>
  
  )
}

export default PickupGroupsList
