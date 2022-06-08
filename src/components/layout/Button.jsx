import React from 'react'
import PropTypes from 'prop-types'

function Button({ children, type, handleClick, isDisabled }) {
  return (
    <button type={type} disabled={isDisabled} onClick={handleClick} className="w-fit h-fit px-2 py-0.5 mt-2 text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white active:bg-blue-700 duration-100 disabled:border-slate-300 disabled:text-slate-300 disabled:hover:bg-white">
      {children}
    </button>
  )
}

Button.propTypes = {
}

Button.defaultProps = {
  type: "button",
  handleClick: undefined,
  isDisabled: false
}

export default Button