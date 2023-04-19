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
import { Form, useFormState } from 'react-final-form'
// Might need
import { CippCodeBlock } from 'src/components/utilities'

const Configs = () => {
  const tenant = useSelector((state) => state.app.currentTenant)
// May or may not want to leverage all state mgmt features of react-final-form? dependent on 
// how we handle submission since ltConfigs is used to generate a file? -Tripp
  const [selectedConfig, setSelectedConfig] = useState({})
  const [configList, setConfigList] = useState([])
// May want to refactor this to use redux/API instead of fetch
// See ltConfigs and ratelDevices in store/api -Tripp
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/GrabConfigs');
        console.log('response b4 JSON: ', response);
 
        console.log('Config list fetched:', data);
       const data = await response.json();
        setConfigList(data);
      } catch (error) {
        console.error('Error fetching config list:', error);
      }
    }
   fetchData();
  }, []);
  
  useEffect(() => {
    console.log('CONFIG LIST: ', configList)
    // const { values: currentValues } = useFormState()
    // console.log('useFormState ', values)
  }, [configList])

  const configListFx = () => {
    if (configList !== []) {
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
    console.log('useFormState Values in ConfigFields: ', currentValues)
  
    if (currentValues === {}) {
      return (
        <>
        </>
      )
    }
let currentConfig = configList.find(config => config.Name === currentValues.ConfigFile)
console.log('config in ConfigFields: ', currentConfig)
    return (
      <>
        <CRow>
          <CCol>
            {
              <div>
                {
                 currentConfig.Name 
                }
              </div>
            }
            {/* <CippCodeBlock
              title="Config"
              language="json"
              code={JSON.stringify(config, null, 2)}
            /> */}
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
                              // onChange={(value) => {
                              //   console.log("Value: ", value)
                              //   setSelectedConfig(configList.find(config => config.Number === value))}}
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
                            {configList.length > 0 && (
                              <>
                                <ConfigFields config={selectedConfig} />
                              </>
                            )}
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
