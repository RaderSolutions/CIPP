/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { CButton, CCallout, CCol, CForm, CRow } from '@coreui/react'
import { useSelector } from 'react-redux'
import { Form, FormSpy, Field, useFormState } from 'react-final-form'
import {
  RFFCFormInput,
  RFFCFormSwitch,
  RFFCFormSelect,
  Condition,
} from 'src/components/forms'
import useQuery from 'src/hooks/useQuery'
import { useLazyGenericPostRequestQuery } from 'src/store/api/app'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch, faEdit } from '@fortawesome/free-solid-svg-icons'
import { CippContentCard, CippPage, CippWizard } from 'src/components/layout'
import { TenantSelector } from 'src/components/utilities'

const ChangeLabel = () => {
  const handleSubmit = () => {
    
  }
  const [genericPostRequest, postResults] = useLazyGenericPostRequestQuery()
return (
  <CippWizard
    onSubmit={handleSubmit}
     wizardTitle="Change Device Label"
     >
       <CippWizard.Page
       title="Tenant Choice"
       description="Choose the tenant containing the device you wish to change"
          >
         <center>
           <h3 className="text-primary">Step 1</h3>
           <h5 className="card-title mb-4">Choose a tenant</h5>
         </center>
         <hr className="my-4" />
         {/* <Field name="selectedTenants">{(props) => <TenantSelector />}</Field> */}
         <Error name="selectedTenants" />
         <hr className="my-4" />
             </CippWizard.Page>
             <CippWizard.Page
            title="Select Change Value(s)"
            description="Choose which combination of changes to make"
            >
                <center>
          <h3 className="text-primary">Step 2</h3>
          <h5>Choose Value(s) to Change</h5>
        </center>
        <hr className="my-4" />
        <div className="mb-2"></div>
         <br></br>
         <CRow>
             <CCol lg={6} xs={12}>
                 <RFFCFormSelect 
                name="ChangeValue"
                 label="Change Value"
                 values={[
                     { value: "Label Change", label: "Label Change" },
                     { value: "Label and Email Change", label: "Label and Email Change" },
                     { value: "LTID Change", label: "LTID Change" },
                 ]}
                 />
             </CCol>
         </CRow>
        </CippWizard.Page>
        <CippWizard.Page>
         <center>
           <h3 className="text-primary">Step 3</h3>
           <h5>Enter New Value(s)</h5>
         </center>
         <hr className="my-4" />
         <div className="mb-2"></div>
         <br></br>
        <Condition when="ChangeValue" is="Label Change">
         <CRow>
             <CCol lg={6} xs={12}>
                 <RFFCFormInput
                 type="text"
                name="Label"
                 label="Edit Device Label"
                />
            </CCol>
        </CRow>
        </Condition>
        <Condition when="ChangeValue" is="Label and Email Change">
         <CRow>
             <CCol lg={6} xs={12}>
                 <RFFCFormInput
                 type="text"
                 name="Label"
                 label="Edit Device Label"
                 />
             </CCol>
            <CCol lg={6} xs={12}>
                 <RFFCFormInput
                 type="text"
                name="Email"
                label="Edit Device Email"
                />
            </CCol>
        </CRow>
        </Condition>
        <Condition when="ChangeValue" is="LTID Change">
      <CRow>
         <CCol lg={6} xs={12}>
                 <RFFCFormInput
                 type="text"
                 name="LTID"
                 label="Edit Device LTID"
                 />
             </CCol>
         </CRow>
         </Condition>
         </CippWizard.Page>
        <CippWizard.Page>
        <center>
          <h3 className="text-primary">Step 4</h3>
          <h5>Confirm and Apply</h5>
        </center>
        <hr className="my-4" />
        <hr className="my-4" />
   
                     
       </CippWizard.Page> 
    </CippWizard>

)
}

export default ChangeLabel
