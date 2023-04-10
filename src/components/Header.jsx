import React from 'react'
import PropTypes from 'prop-types'

function Header({text, bgColor, textColor}) {

  const headerStyles = {
    backgroundColor: bgColor,
    color: textColor
  }

  return (
    <div>
        <div className="container" style={headerStyles}>
            <h1>{text}</h1>
        </div>
    </div>
  )
}

Header.defaultProps = {
  text: 'Feedback UI',
  bgColor: 'rgba(0,0,0,0.6)',
  textColor: '#ff6a95'
}

Header.propTypes = {
  text: PropTypes.string, 
  bgColor: PropTypes.string, 
  textColor: PropTypes.string, 
}

export default Header