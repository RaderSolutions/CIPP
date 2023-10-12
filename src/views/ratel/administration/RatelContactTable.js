/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
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
        //   extendedInfo={[
        //     { label: 'Extension', value: `${row.Extension}` },
        //     { label: 'Page Group', value: `${row.PageGroupName}` },
        //     { label: 'Device Id', value: `${row.DeviceId}` },
        //     { label: 'Device Ext', value: `${row.DeviceExt}` },
        //     { label: 'User', value: `${row.User}` },
        //     { label: 'Location', value: `${row.Location}` },
        //     { label: 'Hide from PB', value: `${row.HideFromPB}` },
        //   ]}
          actions={[
            // {
            //   icon: <FontAwesomeIcon icon={faEdit} className="me-2" />,
            //   label: 'Edit Page Group',
            //   link: editLink,
            //   color: 'info',
            // },
            // {
            //   icon: <FontAwesomeIcon icon={faEdit} className="me-2" />,
            //   label: 'Add Member to Page group',
            //   link: addMemberLink,
            //   color: 'info',
            // },
            // {
            //   label: 'Hide from Phonebook',
            //   color: 'info',
            //   modal: true,
            //   modalUrl: `/api/LtScheduleScript?TenantFilter=${tenant.customerId}&Parameters=Key=dial_ext|Value=${row.DialExtension},Key=pagegroup_name|Value=${row.PageGroupName},Key=hide_from_pb|Values='1',Key=is_deletion|Values=0&RatelScript=true&ScriptId=7410`,
            //   modalMessage: 'Are you sure you want to hide/unhide this paging group?',
            // },
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

const ContactTable = () => {

    const columns = [
        {
            name: 'ID',
            selector: (row) => row['id'],
            sortable: true,
            exportSelector: 'id',
        },
        {
            name: 'LTContactID',
            selector: (row) => row['LT ContactID'],
            sortable: true,
            exportSelector: 'LT ContactID',
        },
        {
            name: 'Sorted Phonebook ID',
            selector: (row) => row['Sort_PhonebookID'],
            sortable: true,
            exportSelector: 'Sort_PhonebookID',
        },
        {
            name: 'Sorted Device ID',
            selector: (row) => row['Sort_InternalDevice'],
            sortable: true,
            exportSelector: 'Sort_InternalDevice',
        },
        {
            name: 'Sort Weight',
            selector: (row) => row['Sort Weight'],
            sortable: true,
            exportSelector: 'Sort Weight',
        }
    ]
  return (
    <CippPageList
      title="LT Contacts"
    //   titleButton={addPhonebookEntryButton}
      datatable={{
        keyField: 'ID',
        columns,
        reportName: `${tenant.customerId}-RATEL-PhonebookSort-List`,
        path: '/api/LtListRatelPhonebookSort',
        params: { TenantFilter: tenant?.customerId },
      }}
    />
  )
}

export default ContactTable