import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AppContext from '../components/context/AppContext'

function ProductDetails() {
    const { fetchSingleProduct } = useContext(AppContext)
    const params = useParams()
    const [product, setProduct] = useState({ _id: "", name: "", price: 0.0, image: "", description: "" })
    useEffect(() => {
        fetchSingleProduct(params.productId).then(data => setProduct(data))
    }, [params.productId])
    return (
        <div className='flex flex-col items-center gap-3 w-4/5 mx-auto my-6'>
            <img src={product.image} className="h-96" alt={product.name} />
            <h1 className='text-4xl'>{product.name}</h1>
            <p className='font-bold text-lg'>${product.price}</p>
            <p>{product.description}</p>
        </div>
    )
}

export default ProductDetails