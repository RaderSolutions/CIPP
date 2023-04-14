/* eslint-disable prettier/prettier */
import React, {useState} from 'react'
import { useSelector } from 'react-redux'
// import { CButton } from '@coreui/react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEllipsisV, faEdit } from '@fortawesome/free-solid-svg-icons'
import { CippPageList } from 'src/components/layout'
// import { CippActionsOffcanvas } from 'src/components/utilities'
// import { Link } from 'react-router-dom'


const columns = [
  {
    name: 'Number',
    selector: (row) => row['Name'],
    sortable: true,
    exportSelector: 'Name',
  },
]

const ConfigList = () => {
  const tenant = useSelector((state) => state.app.currentTenant)
  //const addDidButton = <TitleButton href="ratel/administration/dids/add" title="Add DID Number to Device" />
  return (
    <CippPageList
      title="Configs"
      // TitleButton={addDidButton}
      datatable={{
        keyField: 'Number',
        columns,
        //reportName: `${tenant.customerId}-Script-List`,
        path: '/api/GrabConfigs',
        params: { },
      }}
    />
  )
}

export default ConfigList
