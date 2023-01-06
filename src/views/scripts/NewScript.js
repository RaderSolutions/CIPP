/* eslint-disable prettier/prettier */
import React  from 'react'
import { ReactFormBuilder } from 'react-form-builder2';
import {  CRow } from '@coreui/react'
import 'react-form-builder2/dist/app.css';
import { CippContentCard } from 'src/components/layout';
const NewLtScript = () => { 
  const items = [
    {
      key: 'TextInput',
      canHaveAnswer: true,
      canHaveAlternateForm: false,
      name: 'Text Input',
      label: 'Placeholder Label',
      icon: 'fas fa-font',
      field_name: 'text_input_',
    },{  
      key: 'Header',
    }]
    return ( 
        <CRow className="row justify-content-center cipp-wizard">
             <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
    integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" ></link>
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.13.0/css/all.css"></link>
        <CippContentCard title="Create New Script">

        <ReactFormBuilder 
        edit
        toolbarItems={items}
        url={''}
        />
        </CippContentCard>

        
        </CRow>
    )
}

export default NewLtScript