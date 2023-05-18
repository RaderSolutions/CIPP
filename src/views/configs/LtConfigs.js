/* eslint-disable prettier/prettier */
import { useSelector } from 'react-redux'
import React, { useEffect } from 'react'
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

const Configs = () => {
  const tenant = useSelector((state) => state.app.currentTenant)
  const [configList, setConfigList] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/GrabConfigs')
        const data = await response.json()
        const blobs = data.blobs

        console.log('Blobs:', blobs)

        setConfigList(blobs.map((blob) => JSON.parse(blob)))

        const jsonContents = data.jsonContents
        jsonContents.forEach((content) => console.log('JSON Content:', content))
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
  }, [configList])

  const configListFx = () => {
    if (configList.length !== 0) {
      const options = configList.map((config, index) => ({
        value: index,
        label: config.Name,
      }))

      console.log('Config list options:', options)
      return options
    }

    return []
  }

  const ConfigFields = () => {
    const { values: currentValues } = useFormState()
    console.log('useFormState Values in ConfigFields:', currentValues)

    return null
  }

  const handleSubmit = async (values) => {
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
                              onChange={() => {}}
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
                          <CCol>{configList.length > 0 && <ConfigFields />}</CCol>
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
        <CCol>{/* Additional components */}</CCol>
      </CRow>
    </>
  )
}

export default Configs
