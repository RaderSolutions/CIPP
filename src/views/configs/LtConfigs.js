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

import { CippCodeBlock } from 'src/components/utilities'

const Configs = () => {
  const tenant = useSelector((state) => state.app.currentTenant)

  useEffect(() => {
    fetch('/api/GrabConfigs')
      .then((response) => response.json())
      .then((data) => {
        console.log('Config list fetched:', data)
        setConfigList(data)
      })
  }, [])

  const [selectedConfig, setSelectedConfig] = useState()
  const [configList, setConfigList] = useState([])

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
    console.log('config in configFields: ', config)
    const properties = Object.keys(config)
    properties.map((property, index) => {
      console.log("The Prop: ", property)
      return (
        <CRow key={index}>
          <CCol>
            <input type="text" name={property} placeholder={property} />
          </CCol>
        </CRow>
      )
    })
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
                              onChange={(value) => setSelectedConfig(configList.find(config => config.Number === value))}
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
