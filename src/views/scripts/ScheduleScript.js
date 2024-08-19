/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react'
import { CCallout, CSpinner } from '@coreui/react'
import { Field } from 'react-final-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { CippWizard } from 'src/components/layout'
import PropTypes from 'prop-types'
// import { JsonForms } from '@jsonforms/react'
import { useLazyGenericPostRequestQuery } from 'src/store/api/app'
import { useListScriptQuery } from 'src/store/api/scripts'
import useQuery from 'src/hooks/useQuery'
import { RFFCFormSelect } from 'src/components/forms'

const Error = ({ name }) => (
  <Field
    name={name}
    subscription={{ touched: true, error: true }}
    render={({ meta: { touched, error } }) =>
      touched && error ? (
        <CCallout color="danger">
          <FontAwesomeIcon icon={faExclamationTriangle} color="danger" />
          {error}
        </CCallout>
      ) : null
    }
  />
)

Error.propTypes = {
  name: PropTypes.string.isRequired,
}

const ScheduleLtScript = () => {
  const [genericPostRequest, postResults] = useLazyGenericPostRequestQuery()
  let query = useQuery()
  const scriptName = query.get('script')
  const handleSubmit = async (values) => {
    const shippedValues = {}

    // genericPostRequest({ path: 'api/LtScheduleScript', values: shippedValues })
  }

  const {
    data: script = {},
    isFetching: scriptIsFetching,
    error: scriptFetchError,
  } = useListScriptQuery({ scriptName })
  
  useEffect(() => {
    console.log('script', script)
  }, [script])

  useEffect(() => {
    function labelValue(number) {
      let label = ''
      switch (number) {
        case 1:
          label = 'Computer'
          break
        case 2:
          label = 'Location'
          break
        case 3:
          label = 'Company'
          break
        case 13:
          label = 'Contact'
          break
        default:
          label = ''
      }
      return label
    }
    if (script && !scriptFetchError) {
      // <RFFCFormSelect
      //   name="Did"
      //   label="Choose Caller ID"
      //   placeholder={!scriptIsFetching ? 'Select Target Type' : 'Loading...'}
      //   values={script.schema.enhancedLTScript.items?.map((item) => ({
      //     value: item,
      //     label: labelValue(item),
      //   }))}
      //   //disabled={formDIsabled}
      // />
    }
  }, [])

  return (
    <CippWizard onSubmit={handleSubmit} wizardTitle="Schedule LT Script">
      <CippWizard.Page title="" description="">
        <center>
          <h3 className="text-primary">Step 1</h3>
          <h5 className="card-title mb-4">Choose a script target</h5>
        </center>
        <hr className="my-4" />
        select target type
        {/* {script.schema.enhancedLTScript.predefinedTargets} */}
        <hr className="my-4" />
      </CippWizard.Page>
      <CippWizard.Page title="" description="">
        <center>
          <h3 className="text-primary">Step 2</h3>
          <h5>Fill out script fields</h5>
        </center>
        <div className="mb-2">
          {/* <JsonForms schema={script.schema.enhancedLTScript.items} /> */}
        </div>
        <hr className="my-4" />
      </CippWizard.Page>
      <CippWizard.Page title="" description="">
        {/* <center>
          <h3 className="text-primary">Step 4</h3>
          <h5 className="mb-4">Confirm and apply</h5>
          <hr className="my-4" />
          {postResults.isFetching && (
            <CCallout color="info">
              <CSpinner>Loading</CSpinner>
            </CCallout>
          )}
          {postResults.isSuccess && <CCallout color="success">{postResults.data.Results}</CCallout>}
        </center> */}
        <hr className="my-4" />
      </CippWizard.Page>
    </CippWizard>
  )
}
export default ScheduleLtScript
