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
import {
  useListConfigsQuery,
} from 'src/store/api/ltConfigs'
// Might need
import { CippCodeBlock } from 'src/components/utilities'

const Configs = () => {
  const tenant = useSelector((state) => state.app.currentTenant)
// May or may not want to leverage all state mgmt features of react-final-form? dependent on 
// how we handle submission since ltConfigs is used to generate a file? -Tripp
  const [selectedConfig, setSelectedConfig] = useState({})
  const [configList, setConfigList] = useState([])
// May want to refactor this to use redux/API instead of fetch
// See ltConfigs and ratelDevices in store/api 
// If we use API, will have our configList returned from a hook; if not, we can keep it in state as above -Tripp
// -Tripp
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/GrabConfigs');
        console.log('response b4 JSON: ', response);
        const data = await response.json();
        console.log('Config list fetched:', data);
        data.forEach(dat => console.log('Heres a piece! ', dat.text));
        setConfigList(data);
      } catch (error) {
        console.error('Error fetching config list:', error);
      }
    }
   fetchData();
  }, []);

  const {
    data: configs = {},
    isFetching: configsAreFetching,
    error: configsFetchingError,
  } = useListConfigsQuery()

  console.log('CONFIGS FROM QUERY: ', configs)
  console.log('CONFIGS ARE FETCHING: ', configsAreFetching)
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
      // "value" is undefined here; looks like Number is not a property on our config objects -Tripp ********************
      console.log('Config list options:', options)
      return options
    }
    return []
  }
// config prop here will be needed if we use react state mgmt. If we use react-final-form, use useFormState() hook. -Tripp
  const ConfigFields = ({ config }) => {
    const { values: currentValues } = useFormState()
    console.log('useFormState Values in ConfigFields: ', currentValues)
    let currentConfig = configList.find(config => config.Name === currentValues.ConfigFile)
    console.log('config in ConfigFields: ', currentConfig)
if (currentConfig === undefined) {
  return (
    <>
    </>
  )
}
    return (
      <>
        <CRow>
          <CCol>
            {
              // Just displaying current config name for now -Tripp
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
                              onChange={(value) => {
                                console.log("Value: ", value)
                                setSelectedConfig(configList.find(config => config.Number === value))}}
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
