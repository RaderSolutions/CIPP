/* eslint-disable prettier/prettier */
import {
  CFormCheck,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormSwitch,
  CFormTextarea,
  CSpinner,
} from '@coreui/react'
import Select from 'react-select'
import AsyncSelect from 'react-select/async'
import { Field, useFormState } from 'react-final-form'
import React from 'react'
import PropTypes from 'prop-types'
import { useEffect } from 'react'

/*
  wrapper classes for React Final Form with CoreUI
 */
const sharedPropTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  label: PropTypes.string,
  validate: PropTypes.func,
  disabled: PropTypes.bool,
  input: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.any,
    }),
  }),
}

export const RFFCFormFeedback = ({ meta }) => {
  return (
    <CFormFeedback invalid={meta.error && meta.touched} valid={!meta.error && meta.touched}>
      {meta.touched && meta.error}
    </CFormFeedback>
  )
}

RFFCFormFeedback.propTypes = {
  meta: PropTypes.shape({
    error: PropTypes.any,
    touched: PropTypes.bool,
  }),
}

export const RFFCFormCheck = ({ name, label, className = 'mb-3', validate, disabled = false }) => {
  return (
    <Field name={name} type="checkbox" validate={validate}>
      {({ input, meta }) => (
        <div className={className}>
          <CFormCheck
            {...input}
            // @todo revisit this, only shows green when checked
            valid={!meta.error && meta.touched && validate}
            invalid={meta.error && meta.touched && validate}
            disabled={disabled}
            id={name}
            label={label}
          />
          <RFFCFormFeedback meta={meta} />
        </div>
      )}
    </Field>
  )
}

RFFCFormCheck.propTypes = {
  ...sharedPropTypes,
}

export const RFFCFormSwitch = ({ name, label, className = 'mb-3', validate, disabled = false }) => {
  const { values: currentValues } = useFormState()
  useEffect(() => {
    console.log(currentValues)
  }, [currentValues])
  return (
    <Field name={name} type="checkbox" validate={validate}>
      {({ meta, input }) => (
        <div className={className}>
          <CFormSwitch
            {...input}
            // @todo revisit this, only shows green when checked
            valid={!meta.error && meta.touched && validate}
            invalid={meta.error && meta.touched && validate}
            disabled={disabled}
            id={name}
            label={label}
          />
          {input.value && <RFFCFormFeedback meta={meta} />}
        </div>
      )}
    </Field>
  )
}

RFFCFormSwitch.propTypes = {
  ...sharedPropTypes,
}

export const RFFCFormInput = ({
  name,
  label,
  type = 'text',
  placeholder,
  className = 'mb-3',
  validate,
  disabled = false,
  spellCheck = true,
  autoFocus = false,
}) => {
  return (
    <Field name={name} validate={validate}>
      {({ input, meta }) => {
        return (
          <div className={className}>
            {label && <CFormLabel htmlFor={name}>{label}</CFormLabel>}
            <CFormInput
              {...input}
              valid={!meta.error && meta.touched}
              invalid={meta.error && meta.touched}
              type={type}
              id={name}
              disabled={disabled}
              area-describedby={name}
              placeholder={placeholder}
              spellCheck={spellCheck}
              autoFocus={autoFocus}
            />
            <RFFCFormFeedback meta={meta} />
          </div>
        )
      }}
    </Field>
  )
}
RFFCFormInput.propTypes = {
  ...sharedPropTypes,
  type: PropTypes.oneOf(['color', 'file', 'text', 'password']),
  placeholder: PropTypes.string,
}

export const RFFCFormRadio = ({
  name,
  label,
  value,
  className = 'mb-3',
  validate,
  disabled = false,
}) => {
  return (
    <Field name={name} type="radio" value={value} validate={validate}>
      {({ meta, input }) => (
        <div className={className}>
          <CFormCheck
            {...input}
            valid={!meta.error && meta.touched}
            invalid={meta.error && meta.touched}
            disabled={disabled}
            type="radio"
            name={name}
            label={label}
          />
          <RFFCFormFeedback meta={meta} />
        </div>
      )}
    </Field>
  )
}

RFFCFormRadio.propTypes = {
  ...sharedPropTypes,
}

export const RFFCFormTextarea = ({
  name,
  label,
  value,
  placeholder,
  className = 'mb-3',
  validate,
  disabled = false,
}) => {
  return (
    <Field name={name} value={value} validate={validate}>
      {({ meta, input }) => {
        return (
          <div className={className}>
            <CFormLabel htmlFor={name}>{label}</CFormLabel>
            <CFormTextarea
              {...input}
              valid={!meta.error && meta.touched}
              invalid={meta.error && meta.touched}
              disabled={disabled}
              id={name}
              placeholder={placeholder}
              //value={value}
            />
            <RFFCFormFeedback meta={meta} />
          </div>
        )
      }}
    </Field>
  )
}

RFFCFormTextarea.propTypes = {
  ...sharedPropTypes,
  placeholder: PropTypes.string,
}
// modified rffcformselect
// export const RFFCFormSelect = ({
//   name,
//   label,
//   values = [],
//   placeholder,
//   className = 'mb-3',
//   validate,
//   disabled = false,
//   // onChange,
//   setTypeState,
// }) => {
//   // handler for ignoring the first element ('the placeholder')
//   const selectValidate = (value, allValues, meta) => {
//     if (validate) {
//       if (value !== placeholder) {
//         return validate(value, allValues, meta)
//       }
//       return null
//     }
//   }


//   let newValues;
//   if (!Array.isArray(values) && Object.isObject(values)) {
//     newValues = Object.entries(values)
//   }
//   // const handleChange = (e) => {
//   //   console.log('event', e.target.value)
//   //   // return e.target.value
//   // }
//   // const handleInputChange = (event) => {
//   //   input.onChange(event)
//   //   console.log(event.target.value)
//   // }
//   // const { values: currentValues } = useFormState()
//   useEffect(() => {
//     console.log('label', label)
//     // setDeviceTypeLocal(currentValues.SelectDeviceType)
//     // setDialplanTypeLocal(current.SelectDialplanType)
//     // setCallerIdTypeLocal(current.SelectCal)
//   }, [label])

//   return (
//     <Field name={name} validate={selectValidate}>
//       {({ input, meta }) => (
//         <div className={className}>
//           {label && <CFormLabel>{label}</CFormLabel>}
//           <CFormSelect
//             {...input}
//             valid={!meta.error && meta.touched}
//             invalid={meta.error && meta.touched}
//             disabled={disabled}
//             onSelect={() => {
//               console.log('select', input.label)
//             }}
//           >
//             <option value={placeholder}>{placeholder}</option>
//             {!newValues || newValues === null || Array.isArray(newValues) === false ? <option key={'test null'}>"test null" </option> : newValues.map(({ label, value }, idx) => (
//               <option key={`${idx}-${value}`} value={value}>
//                 {label}
//               </option>
//             ))}
//           </CFormSelect>
//           <RFFCFormFeedback meta={meta} />
//         </div>
//       )}
//     </Field>
//   )
// }

// RFFCFormSelect.propTypes = {
//   ...sharedPropTypes,
//   placeholder: PropTypes.string.isRequired,
//   values: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.any })),
// }
// original rrfcformselect
export const RFFCFormSelect = ({
  name,
  label,
  values = [],
  placeholder,
  className = 'mb-3',
  validate,
  disabled = false,
}) => {
  // handler for ignoring the first element ('the placeholder')
  const selectValidate = (value, allValues, meta) => {
    if (validate) {
      if (value !== placeholder) {
        return validate(value, allValues, meta)
      }
      return null
    }
  }

  return (
    <Field name={name} validate={selectValidate}>
      {({ input, meta }) => (
        <div className={className}>
          {label && <CFormLabel>{label}</CFormLabel>}
          <CFormSelect
            {...input}
            valid={!meta.error && meta.touched}
            invalid={meta.error && meta.touched}
            disabled={disabled}
          >
            <option value={placeholder}>{placeholder}</option>
            {values.map(({ label, value }, idx) => (
              <option key={`${idx}-${value}`} value={value}>
                {label}
              </option>
            ))}
          </CFormSelect>
          <RFFCFormFeedback meta={meta} />
        </div>
      )}
    </Field>
  )
}

RFFCFormSelect.propTypes = {
  ...sharedPropTypes,
  placeholder: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.any })),
}
export const RFFCFormSelectObjectValue = ({
  name,
  label,
  values = [],
  placeholder,
  className = 'mb-3',
  validate,
  disabled = false,
  // onChange,
  setTypeState,
}) => {
  // handler for ignoring the first element ('the placeholder')
  const selectValidate = (value, allValues, meta) => {
    if (validate) {
      if (value !== placeholder) {
        return validate(value, allValues, meta)
      }
      return null
    }
  }
  
  const { values: currentValues } = useFormState()
  
  useEffect(() => {
    console.log('values in custom select', values)
    // setDeviceTypeLocal(currentValues.SelectDeviceType)
    // setDialplanTypeLocal(current.SelectDialplanType)
    // setCallerIdTypeLocal(current.SelectCal)
  }, [label])

  return (
    <Field name={name} validate={selectValidate}
     format={(value) => (
      value ? value.value : ''
      )
      } 
    // format={
    //   (value) => {
    //     if (value){
    //       return {
    //         displayValue: displayValue,
    //         value: value,
    //         label: label
    //       }
    //     }
    //   }
    // }
      parse={(value) => ({ value, label })} >
      {({ input, meta }) => {
        // this probably wont work
        // const currentValue = JSON.parse(input.value);
        const currentValue = input.label;
        return (
          <div className={className}>
            {label && <CFormLabel>{label}</CFormLabel>}
            <CFormSelect
              {...input}
              valid={!meta.error && meta.touched}
              invalid={meta.error && meta.touched}
              disabled={disabled}
              onSelect={() => {
                console.log('select', currentValue.label)
              }}
            >
              <option value={placeholder}>{placeholder}</option>
              {values.map(({ label, value }, idx) => (
                <option key={`${idx}-${value}`} 
                value={ JSON.stringify({ value, label })}
                // value={{ value: value, label: label }}
                >
                  {label}
                </option>
              ))}
            </CFormSelect>
            <RFFCFormFeedback meta={meta} />
          </div>
        )
      }}
    </Field>
  )
}

RFFCFormSelectObjectValue.propTypes = {
  ...sharedPropTypes,
  placeholder: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.any })),
}
export function Condition({ when, is, children, like, regex }) {
  return (
    <>
      {is && (
        <Field name={when} subscription={{ value: true }}>
          {({ input: { value } }) => (value === is ? children : null)}
        </Field>
      )}
      {like && (
        <Field name={when} subscription={{ value: true }}>
          {({ input: { value } }) => (value.includes(like) ? children : null)}
        </Field>
      )}
      {regex && (
        <Field name={when} subscription={{ value: true }}>
          {({ input: { value } }) => (value.match(regex) ? children : null)}
        </Field>
      )}
    </>
  )
}

Condition.propTypes = {
  when: PropTypes.string.isRequired,
  is: PropTypes.any,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
}

export const RFFSelectSearch = ({
  name,
  label,
  values = [],
  placeholder,
  validate,
  onChange,
  multi,
  disabled = false,
}) => {
  const selectSearchvalues = values.map((val) => ({
    value: val.value,
    label: val.name,
  }))

  return (
    <Field name={name} validate={validate}>
      {({ meta, input }) => {
        return (
          <div>
            <CFormLabel htmlFor={name}>{label}</CFormLabel>
            {onChange && (
              <Select
                className="react-select-container"
                classNamePrefix="react-select"
                {...input}
                isClearable={false}
                name={name}
                id={name}
                disabled={disabled}
                options={selectSearchvalues}
                placeholder={placeholder}
                isMulti={multi}
                onChange={onChange}
              />
            )}
            {!onChange && (
              <Select
                className="react-select-container"
                classNamePrefix="react-select"
                {...input}
                isClearable={true}
                name={name}
                id={name}
                disabled={disabled}
                options={selectSearchvalues}
                placeholder={placeholder}
                isMulti={multi}
              />
            )}
            <RFFCFormFeedback meta={meta} />
          </div>
        )
      }}
    </Field>
  )
}

RFFSelectSearch.propTypes = {
  ...sharedPropTypes,
  multi: PropTypes.bool,
  placeholder: PropTypes.string,
  values: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string, name: PropTypes.string }))
    .isRequired,
}
