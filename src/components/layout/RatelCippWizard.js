/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'
import { CButton, CCardHeader, CNav, CNavItem, CNavLink, CRow, CCol } from '@coreui/react'
import { CippPage } from 'src/components/layout'

export const CippWizard = ({ wizardTitle, onSubmit, children, initialValues, setFormFieldState }) => {
  const [page, setPage] = useState(0)
  const [values, setValues] = useState(initialValues)

  const next = (values) => {
    setPage(Math.min(page + 1, children.length - 1))
    setValues(values)
  }

  const previous = () => {
    setPage(Math.max(page - 1, 0))
  }

  const validate = (values) => {
    const activePage = React.Children.toArray(children)[page]
    return activePage.props.validate ? activePage.props.validate(values) : {}
  }

  const handleSubmit = (values) => {
    const isLastPage = page === React.Children.count(children) - 1
    if (isLastPage) {
      return onSubmit(values)
    } else {
      next(values)
    }
  }


  const activePage = React.Children.toArray(children)[page]
  const isLastPage = page === React.Children.count(children) - 1

  return (
    <CippPage title={wizardTitle} tenantSelector={false} wizard={true}>
      <CRow className="row justify-content-center cipp-wizard">
        <CCol xxl={12}>
          <CCardHeader className="bg-transparent mb-4">
            <CNav variant="pills" role="tablist" className="nav-justified nav-wizard">
              {React.Children.map(children, ({ props: { description, title } }, idx) => (
                <CNavItem key={`wizard-nav-item-${idx}`} style={{ cursor: 'pointer' }}>
                  <CNavLink active={idx === page}>
                    <div className="wizard-step-icon">{idx + 1}</div>
                    <div className="wizard-step-text">
                      <div className="wizard-step-text-name">{title}</div>
                      <div className="wizard-step-text-details">{description}</div>
                    </div>
                  </CNavLink>
                  <br></br>
                </CNavItem>
              ))}
            </CNav>
          </CCardHeader>
          <Form initialValues={values} validate={validate} onSubmit={handleSubmit} setFormFieldState={setFormFieldState}>
            {({ handleSubmit, submitting, values }) => (
              <>
                <form onSubmit={handleSubmit}>
                  {activePage}
                  <div className="d-flex justify-content-between">
                    {page > 0 && (
                      <CButton className="me-auto" type="button" onClick={previous}>
                        « Previous
                      </CButton>
                    )}
                    {!isLastPage && (
                      <CButton className="ms-auto" type="submit">
                        Next »
                      </CButton>
                    )}
                    {isLastPage && (
                      <>
                        <CButton type="submit" disabled={submitting}>
                          Submit
                        </CButton>
                      </>
                    )}
                  </div>
                </form>
              </>
            )}
          </Form>
        </CCol>
      </CRow>
    </CippPage>
  )
}
CippWizard.Page.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
}
