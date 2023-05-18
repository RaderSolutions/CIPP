/* eslint-disable prettier/prettier */
import { useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
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
import { Form, useFormState } from 'react-final-form'
import { useListConfigsQuery } from 'src/store/api/ltConfigs'
import { CippCodeBlock } from 'src/components/utilities'

const Configs = () => {
  const tenant = useSelector((state) => state.app.currentTenant)
  const [selectedConfig, setSelectedConfig] = useState({})
  const [configList, setConfigList] = useState([])
  const [jsonContents, setJsonContents] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/GrabConfigs')
        const data = await response.json()
        const configs = data.jsonContents
        const blobs = data.blobs

        console.log('Config list fetched:', configs)
        console.log('Blobs:', blobs)

        setConfigList(configs)
        setJsonContents(blobs.map((blob) => JSON.parse(blob)))
      } catch (error) {
        console.error('Error fetching config list:', error)
      }
    }

    fetchData()
  }, [])

  const {
    data: configs = {},
    isFetching: configsAreFetching,
    error: configsFetchingError,
  } = useListConfigsQuery()

  console.log('CONFIGS FROM QUERY:', configs)
  console.log('CONFIGS ARE FETCHING:', configsAreFetching)

  useEffect(() => {
    console.log('CONFIG LIST:', configList)
    console.log('JSON CONTENTS:', jsonContents)
  }, [configList, jsonContents])

  const configListFx = () => {
    if (configList.length !== 0) {
      const options = configList.map((config, index) => ({
        value: config.Number,
        label: config.Name,
      }))

      console.log('Config list options:', options)
      return options
    }

    return []
  }

  const ConfigFields = ({ config }) => {
    const { values: currentValues } = useFormState()
    console.log('useFormState Values in ConfigFields:', currentValues)
    const currentConfig = configList.find((cfg) => cfg.Name === currentValues.ConfigFile)
    console.log('config in ConfigFields:', currentConfig)

    if (currentConfig === undefined) {
      return null
    }

    return (
      <>
        <CRow>
          <CCol>
            <div>{currentConfig.Name}</div>
            <CippCodeBlock title="Config" language="json" code={JSON.stringify(config, null, 2)} />
          </CCol>
        </CRow>
      </>
    )
  }

  const handleSubmit = async (values) => {
    console.log('Selected config:', selectedConfig)
    console.log('Form values:', values)
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
                              values={configListFx()}
                              onChange={(value) => {
                                console.log('Value:', value)
                                setSelectedConfig(configList.find((cfg) => cfg.Number === value))
                              }}
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
                          <CCol>
                            {configList.length > 0 && <ConfigFields config={selectedConfig} />}
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
    </>
  )
}

export default Configs
