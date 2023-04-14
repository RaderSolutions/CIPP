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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink, faCog } from '@fortawesome/free-solid-svg-icons'

import { RFFCFormSelect } from 'src/components/forms'
import { Form } from 'react-final-form'

import { CippCodeBlock } from 'src/components/utilities'

const ConfigList = () => {
  const tenant = useSelector((state) => state.app.currentTenant)

  // Get the list of configs from an API
  const [configList, setConfigList] = useState([])

  useEffect(() => {
    fetch('/api/GrabConfigs')
      .then((response) => response.json())
      .then((data) => setConfigList(data))
  }, [])

  return configList.map((config, index) => ({
    value: config.Number,
    label: config.Name,
  }))
}

const Configs = () => {
  const [selectedConfig, setSelectedConfig] = useState()

  const handleSubmit = async (values) => {
    console.log(values)
  }

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
                              values={ConfigList()}
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
          {}
          {}
          {}
        </CCol>
      </CRow>
    </>
  )
}

export default Configs
