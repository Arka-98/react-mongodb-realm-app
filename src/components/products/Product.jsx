import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import AppContext from '../context/AppContext'

function Product({ product, handleDelete }) {
  const { user } = useContext(AppContext)
  // console.log(product.userId, user.id)
  return (
    <div className='flex w-full relative shadow-lg gap-10 rounded-md overflow-hidden'>
      <img src={product.image} className="w-96 h-52 object-cover object-center" alt={product.name} />
      <div className="flex flex-col gap-3 justify-center">
        <p className='text-violet-600 font-bold text-lg'>{product.name}</p>
        <p className='font-bold'>${product.price}</p>
        <p>{product.description}</p>
      </div>
      <div className='absolute bottom-5 right-5 text-violet-600 font-semibold'>
        <Link to={`/product/${product._id}`} className="">Details</Link>
        {(product.userId === user.id) &&
          <>
            <Link to={`/edit/${product._id}`} className='mx-4'>Edit</Link>
            <button onClick={handleDelete} className='text-red-500 font-semibold'>Delete</button>
          </>
        }
      </div>
    </div>
  )
}

Product.defaultProps = {
  handleDelete: undefined
}

export default Product