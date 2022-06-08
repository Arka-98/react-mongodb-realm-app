import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom'
import AppContext from '../components/context/AppContext'
import Button from '../components/layout/Button'
import Input from '../components/layout/Input'

function EditProduct() {
    const { loading, fetchSingleProduct, updateProduct } = useContext(AppContext)
    const navigate = useNavigate()
    const params = useParams()
    const [product, setProduct] = useState({ name: "", price: 0.0, image: "", description: "" })
    const [errors, setErrors] = useState({ name: false, price: false, image: false, description: false })
    const [disabled, setDisabled] = useState(false)
    useEffect(() => {
        setDisabled(isError())
    }, [errors])
    const isError = () => {
        for(let i in errors) {
            if(errors[i] || errors[i] === null) {
                return true
            }
        }
        return false
    }
    useEffect(() => {
        console.log("edit called")
        fetchSingleProduct(params.productId).then((data) => setProduct(data))
    }, [params.productId])
    const handleInput = (e) => {
        const {name, value} = e.target
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }))
        setErrors(prevData => ({
            ...prevData,
            [name]: !Boolean(value)
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        await updateProduct(params.productId, product)
    }
    return (
        <div className="w-96 mx-auto my-3">
            {loading ? <AiOutlineLoading3Quarters className="text-4xl absolute animate-spin z-50 mx-auto top-52 left-0 right-0" />:
            <>
                <form onSubmit={handleSubmit} className="flex flex-col gap-1">
                    <label>Name</label>
                    <Input type="text" name="name" value={product.name} onChange={handleInput} onError={errors.name} />
                    <label>Price</label>
                    <Input type="number" name="price" value={product.price} onChange={handleInput} onError={errors.price} />
                    <label>Image URL</label>
                    <Input type="text" name="image" value={product.image} onChange={handleInput} onError={errors.image} />
                    <label>Description</label>
                    <textarea name="description" className="border-2 border-violet-300 focus:outline-none focus:ring-1 focus:border-violet-600 px-2" value={product.description} onChange={handleInput} onError={errors.description} />
                    <Button type="submit" isDisabled={disabled}>Update Product</Button>
                </form>
            </>}
        </div>
    )
}

export default EditProduct