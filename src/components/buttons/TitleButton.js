/* eslint-disable prettier/prettier */
import React from 'react'
import { CButton } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default function TitleButton({ icon, title, href = null, onClick = null }) {
  if (href) {
    return (
      <Link to={href}>
        <CButton size="sm" color="primary">
          <FontAwesomeIcon style={{color: 'white'}} icon={icon ?? faPlus} className="pe-1" />
          <font style={{ color: 'white' }}>{title}</font>
          {/* {title} */}
        </CButton>
      </Link>
    )
  } else if (onClick) {
    return (
      <CButton size="sm" color="primary" onClick={onClick}>
        <FontAwesomeIcon style={{color: 'white'}} icon={icon ?? faPlus} className="pe-1" />
        <font style={{ color: 'white' }}>{title}</font>
        {/* {title} */}
      </CButton>
    )
  }
}

TitleButton.propTypes = {
  icon: PropTypes.object,
  title: PropTypes.string.isRequired,
  href: PropTypes.string,
  onClick: PropTypes.func,
}
