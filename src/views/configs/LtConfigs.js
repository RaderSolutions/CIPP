import { useState } from 'react'
import {
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
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

const Configs = () => {
  const [showModal, setShowModal] = useState(false)
  const tenant = useSelector((state) => state.app.currentTenant)

  useEffect(() => {
    fetch('/api/GrabConfigs')
      .then((response) => response.json())
      .then((data) => setConfigList(data))
  }, [])

  const [selectedConfig, setSelectedConfig] = useState()
  const [configList, setConfigList] = useState([])

  useEffect(() => {
    console.log('CONFIG LIST: ', configList)
    // console.log("Config Text", configList.schema.config.text)
  }, [configList])

  const configListFx = () => {
    if (configList !== []) {
      return configList.map((config, index) => ({
        value: config.Number,
        label: config.Name,
      }))
    }
  }

  const handleSubmit = async (values) => {
    console.log(values)
    setShowModal(true)
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
                            {configList !== [] && (
                              <>
                                <div>
                                  {/* Display selected config here; can use CippCodeBlock custom componenet */}
                                </div>
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
          <CModal show={showModal} onClose={() => setShowModal(false)}>
            <CModalHeader closeButton>Modal title</CModalHeader>
            <CModalBody>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </CButton>
              <CButton color="primary">Do Something</CButton>
            </CModalFooter>
          </CModal>
        </CCol>
      </CRow>
    </>
  )
}

export default Configs
