/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { CButton, CCallout, CCol, CForm, CRow, CSpinner } from '@coreui/react'
import useQuery from 'src/hooks/useQuery'
import { useDispatch } from 'react-redux'
import { Form } from 'react-final-form'
import { RFFCFormInput, RFFCFormSelect, RFFCFormTextarea } from 'src/components/forms'
// import { CippCodeBlock, ModalService } from 'src/components/utilities'
import { useLazyGenericPostRequestQuery } from 'src/store/api/app'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch, faEdit, faEye } from '@fortawesome/free-solid-svg-icons'
import { CippContentCard, CippPage } from 'src/components/layout'
import { CippCodeBlock } from 'src/components/utilities'


const EditDialplan = () => {
//   const dispatch = useDispatch()
//   let query = useQuery()
//   const dialplan = query.get('dialplan')
//   const name = query.get('name')
//   const description = query.get('description')
//   const tenantDomain = query.get('tenantDomain')
//   const [queryError, setQueryError] = useState(false)

//   const [genericPostRequest, postResults] = useLazyGenericPostRequestQuery()
//   const onSubmit = (values) => {
//     //@todo: need to fix copyfrom in api so this is no longer required

//     //@todo: need to fix this in api so this hacky shit is no longer needed.

//     const shippedValues = {
//       Name: values.Name,
//       Description: values.Description,
//       Dialplan: values.Dialplan,
//     }
//     //window.alert(JSON.stringify(shippedValues))
//     // console.log(values)
//     // genericPostRequest({ path: '/api/LtRatelDIDs', values: shippedValues })
//   }



//   return (
//     <CippPage>
//       <CCol lg={6} xs={12}>
//         <CippContentCard title="Edit Dialplan" icon={faEdit}>
//           <Form
//             // initialValues={{ ...initialState }}
//             onSubmit={onSubmit}
//             render={({ handleSubmit, submitting, values }) => {
//               return (
//                 <CForm onSubmit={handleSubmit}>
//                 <CRow><CCol>
//                         <RFFCFormInput type="text" name="Name" label="Name"  />
//                     </CCol>
//                     <CCol>
//                         <RFFCFormInput type="text" name="Description" label="Description"  />
//                     </CCol>
//                     <CCol>
//                         <RFFCFormInput type="text" name="Dialplan" label="Dialplan" />
//                     </CCol>
//                 </CRow>
//                   <CRow className="mb-3">
//                     <CCol md={6}>
//                       <CButton type="submit" >
//                         Edit Member
                 
//                       </CButton>
//                     </CCol>
//                   </CRow>
           
//                 </CForm>
//               )
//             }}
//           />
//         </CippContentCard>
//       </CCol>
//     </CippPage>
//   )
return (
    <>
    <div>
        test
    </div>
    </>
)
}

export default EditDialplan
