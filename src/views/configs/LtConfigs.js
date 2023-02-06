/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCol,
  CRow,
  CForm,
} from '@coreui/react'
// import {
//   useLazyExecClearCacheQuery,
//   useLazyExecNotificationConfigQuery,
//   useLazyExecPermissionsAccessCheckQuery,
//   useLazyExecTenantsAccessCheckQuery,
//   useLazyGenericGetRequestQuery,
//   useLazyGenericPostRequestQuery,
//   useLazyListNotificationConfigQuery,
// } from 'src/store/api/app'
// import {
//   useExecAddExcludeTenantMutation,
//   useExecRemoveExcludeTenantMutation,
// } from 'src/store/api/tenants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  //   faCheckCircle,
  //   faCircleNotch,
  //   faExclamationTriangle,
  //   faEye,
  //   faEyeSlash,
  //   faTrash,
  //   faRecycle,
  faLink,
  faCog,
} from '@fortawesome/free-solid-svg-icons'
// import { useListTenantsQuery } from 'src/store/api/tenants'
// import { useLazyEditDnsConfigQuery, useLazyGetDnsConfigQuery } from 'src/store/api/domains'
// import { useDispatch, useSelector } from 'react-redux'
// import { cellBooleanFormatter, CellTip, CellTipIcon, CippTable } from 'src/components/tables'
// import { CippPage, CippPageList } from 'src/components/layout'
import {
  //  RFFCFormSwitch,
  // RFFCFormInput,
  RFFCFormSelect,
} from 'src/components/forms'
import { Form } from 'react-final-form'
// import useConfirmModal from 'src/hooks/useConfirmModal'
// import { setCurrentTenant } from 'src/store/features/app'
import {
  CippCodeBlock,
  // ModalService,
  // TenantSelectorMultiple
} from 'src/components/utilities'
// import CippListOffcanvas from 'src/components/utilities/CippListOffcanvas'
// import { TitleButton } from 'src/components/buttons'
// import Skeleton from 'react-loading-skeleton'
// import { Buffer } from 'buffer'

const Configs = () => {
  const [selectedConfig, setSelectedConfig] = useState()
  //   const [listConfigs] = useLazyGenericGetRequestQuery()

  const handleSubmit = async (values) => {
    console.log(values)
  }

  // const handleGetLink = () => {
  //   console.log('Making link')
  //   listScriptLink({
  //     path: 'api/ExecMaintenanceScripts',
  //     params: { ScriptFile: selectedScript, MakeLink: 'True' },
  //   })
  // }
  // const dumb = [
  //   {
  //     config: 'config',
  //   },
  //   {
  //     config: 'config',
  //   },
  //   {
  //     config: 'config',
  //   },
  // ]

  return (
    <>
      <CRow>
        <CCol>
          <CCard className="options-card">
            <CCardHeader>
              <CCardTitle className="d-flex justify-content-between">Configurations</CCardTitle>
            </CCardHeader>
            <CCardBody>
              <Form
                initialValues={{}}
                onSubmit={handleSubmit}
                render={({ handleSubmit, submitting, values }) => {
                  return (
                    <CForm onSubmit={handleSubmit}>
                      <>
                        <CRow>
                          <CCol>
                            <RFFCFormSelect
                              name="ConfigFile"
                              label="Config File"
                              placeholder="-- Select a config --"
                              // values={dumb}
                              values={[
                                { value: 'name', label: 'value' },
                                { value: 'name2', label: 'value2' },
                              ]}
                            />
                          </CCol>
                        </CRow>
                        <CRow className="mb-3">
                          <CCol>
                            <CButton type="submit" disabled={submitting}>
                              <FontAwesomeIcon icon={faCog} className="me-2" />
                              Load Config
                            </CButton>
                          </CCol>
                        </CRow>
                      </>
                    </CForm>
                  )
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          {/* <CCard>
              <CCardBody>
                <Skeleton count={10} />
              </CCardBody>
            </CCard>
         */}
          {/* <CCard>
            <CCardHeader>
              <CCardTitle>Script Details</CCardTitle>
            </CCardHeader>
            <CCardBody>
              {/* <p>
                <CButton type="submit" onClick={handleGetLink}>
                  <FontAwesomeIcon icon={faLink} className="me-2" />
                  Create Link
                </CButton>
              </p> */}
          {/* 
              <p>
                <>
                  <p>
                    Copy this text into a PowerShell terminal, we recommend Azure Cloud Shell. Azure
                    modules and the az command line utilties are required for these scripts to work.
                    The link is valid for 5 minutes.
                  </p>
                  <CippCodeBlock
                    language="text"
                    showLineNumbers={false}
                    wrapLongLines={true}
                    //   code={
                    //   }
                  />
                </>
              </p>

              <p>
                <h5>Config File Contents</h5>
                <CippCodeBlock
                  language="powershell"
                  showLineNumbers={true}
                  wrapLongLines={false}
                  // code={}
                />
              </p>
            </CCardBody>
          </CCard>  */}
        </CCol>
      </CRow>
    </>
  )
}

export default Configs
