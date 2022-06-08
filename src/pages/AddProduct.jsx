import { useContext, useEffect, useState } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { useNavigate } from "react-router-dom"
import AppContext from "../components/context/AppContext"
import Button from "../components/layout/Button"
import Input from "../components/layout/Input"

function AddProduct() {
    const { user, loading, addProduct } = useContext(AppContext)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({ name: "", price: "", image: "", description: "" })
    const [errors, setErrors] = useState({ name: null, price: null, image: null, description: null })
    const [disabled, setDisabled] = useState(true)
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
        if(user.providerType === "anon-user") {
            navigate('/profile')
        }
    }, [])
    const handleInput = (e) => {
        const { name, value } = e.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
        setErrors(prevData => ({
            ...prevData,
            [name]: !Boolean(value)
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        await addProduct(formData)
    }
    return (
        <div className="w-96 mx-auto my-3">
            {loading ? <AiOutlineLoading3Quarters className="text-4xl absolute animate-spin z-50 mx-auto top-52 left-0 right-0" />:
            <>
                <form onSubmit={handleSubmit} className="flex flex-col gap-1">
                    <label>Name</label>
                    <Input type="text" name="name" value={formData.name} onChange={handleInput} onError={errors.name} />
                    <label>Price</label>
                    <Input type="number" name="price" value={formData.price} onChange={handleInput} onError={errors.price} />
                    <label>Image URL</label>
                    <Input type="text" name="image" value={formData.image} onChange={handleInput} onError={errors.image} />
                    <label>Description</label>
                    <textarea name="description" className="border-2 border-violet-300 focus:outline-none focus:ring-1 focus:border-violet-600 px-2" value={formData.description} onChange={handleInput} onError={errors.description} />
                    <Button type="submit" isDisabled={disabled}>Create Product</Button>
                </form>
            </>}
        </div>
    )
}

export default AddProduct