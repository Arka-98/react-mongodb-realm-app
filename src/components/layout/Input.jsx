import React from 'react'
import PropTypes from 'prop-types'
import { MdError } from 'react-icons/md'

function Input({ type, name, value, onChange, placeholder, onError }) {
  return (
    <div className='relative'>
      <input type={type} name={name} className={`w-full border-2 focus:outline-none hover:ring-2 hover:ring-violet-200 focus:border-violet-600 px-2 ${onError ? "border-red-600" : "border-violet-400"}`} value={value} onChange={onChange} placeholder={placeholder} />
      {onError && <MdError className='absolute text-red-600 text-xl right-1.5 top-1'/>}
    </div>
  )
}

Input.defaultProps = {
    type: "text",
    onError: false
}

Input.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default Input