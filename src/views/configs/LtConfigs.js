/* eslint-disable prettier/prettier */
import { useSelector } from 'react-redux'
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
  const [configData, setConfigData] = useState(null)
  const [formData, setFormData] = useState({})

  const handleConfigLoad = async (config) => {
    // Fetch the blob for the selected config
    const response = await fetch(`/api/GrabConfigBlob?configNumber=${config.value}`)
    const data = await response.json()

    // Store the blob data in state
    setConfigData(data.schema.config.items[0].properties)

    // Clear the form data state
    setFormData({})
  }

  const handleSubmit = async (values) => {
    const { text, ...rest } = configData

    // Merge the form data with the default values from the config blob
    const mergedData = { ...rest, ...formData, text }

    // Create the final mockup script using the merged data
    const mockupScript = Object.entries(mergedData).reduce(
      (script, [key, value]) => script.replace(new RegExp(`%${key}%`, 'g'), value),
      mergedData.text,
    )

    console.log(mockupScript)
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
                              onChange={setSelectedConfig}
                            />
                          </CCol>
                        </CRow>
                        <CRow className="mb-3">
                          <CCol>
                            <CButton
                              type="button"
                              onClick={() => handleConfigLoad(selectedConfig)}
                              disabled={!selectedConfig}
                            >
                              <FontAwesomeIcon icon={faCog} className="me-2" />
                              Load Config
                            </CButton>
                          </CCol>
                        </CRow>
                        {configData && (
                          <>
                            {Object.entries(configData).map(([key, value], index) => (
                              <CRow key={index}>
                                <CCol>
                                  <CCard className="options-card">
                                    <CCardHeader>
                                      <CCardTitle className="d-flex justify-content-between">
                                        {value.title}
                                        <small>{value.type}</small>
                                      </CCardTitle>
                                    </CCardHeader>
                                    <CCardBody>
                                      {value.type === 'string' && (
                                        <input
                                          type="text"
                                          className="form-control"
                                          name={key}
                                          value={formData[key] ?? value.default}
                                          onChange={(e) =>
                                            setFormData({
                                              ...formData,
                                              [key]: e.target.value,
                                            })
                                          }
                                        />
                                      )}
                                      {value.type === 'boolean' && (
                                        <div className="form-check">
                                          <input
                                            type="checkbox"
                                            className="form-check-input"
                                            name={key}
                                            checked={formData[key] ?? value.default}
                                            onChange={(e) =>
                                              setFormData({
                                                ...formData,
                                                [key]: e.target.checked,
                                              })
                                            }
                                          />
                                          <label className="form-check-label">
                                            {value.description}
                                          </label>
                                        </div>
                                      )}
                                      {value.type === 'array' && (
                                        <>
                                          {value.items.type === 'string' && (
                                            <div className="mb-3">
                                              {value.items.enum && (
                                                <select
                                                  className="form-select"
                                                  name={key}
                                                  value={formData[key] ?? value.default}
                                                  onChange={(e) =>
                                                    setFormData({
                                                      ...formData,
                                                      [key]: e.target.value,
                                                    })
                                                  }
                                                >
                                                  {value.items.enum.map((item, index) => (
                                                    <option key={index} value={item}>
                                                      {item}
                                                    </option>
                                                  ))}
                                                </select>
                                              )}
                                            </div>
                                          )}
                                          {value.items.type === 'object' && (
                                            <CippCodeBlock
                                              language="json"
                                              value={JSON.stringify(value.items, null, 2)}
                                            />
                                          )}
                                        </>
                                      )}
                                    </CCardBody>
                                  </CCard>
                                </CCol>
                              </CRow>
                            ))}
                            <CRow>
                              <CCol className="d-flex justify-content-end">
                                <CButton type="submit" color="primary" disabled={!selectedConfig}>
                                  <FontAwesomeIcon icon={faLink} className="me-2" />
                                  Generate Mockup
                                </CButton>
                              </CCol>
                            </CRow>
                          </>
                        )}
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
/* eslint-enable prettier/prettier */
