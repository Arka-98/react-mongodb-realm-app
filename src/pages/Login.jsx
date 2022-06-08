import { useContext, useEffect, useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import Button from "../components/layout/Button"
import Input from "../components/layout/Input"
import { MdKeyboardArrowRight } from "react-icons/md"
import AppContext from "../components/context/AppContext"
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

function Login() {
    const navigate = useNavigate()
    const { user, loading, handleAnonymousLogin, loginWithEmailAndPassword } = useContext(AppContext)
    const [formData, setFormData] = useState({ email: "", password: "" })
    const [errors, setErrors] = useState({ email: null, password: null })
    const [disabled, setDisabled] = useState(true)
    useEffect(()=>{
        if(user) {
            navigate('/profile')
        }
    }, [user])
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
        await loginWithEmailAndPassword(formData.email, formData.password)
    }
    return (
        <div className="w-96 mx-auto my-3 relative">
            {loading ? <AiOutlineLoading3Quarters className="text-4xl absolute animate-spin z-50 mx-auto top-52 left-0 right-0" />:
            <>
                <form onSubmit={handleSubmit} className="flex flex-col gap-1">
                    <label>Email</label>
                    <Input type="text" name="email" value={formData.email} onChange={handleInput} onError={errors.email} placeholder="Enter email" />
                    <label>Password</label>
                    <Input type="password" name="password" value={formData.password} onChange={handleInput} onError={errors.password} placeholder="Enter password" />
                    <div className="flex gap-3">
                        <Button type="submit" isDisabled={disabled}>Login</Button>
                        <Button handleClick={handleAnonymousLogin}>Login Anonymously</Button>
                    </div>
                </form>
                <Link to='/register' className="text-violet-500 font-semibold block w-fit mt-5 mx-auto pb-0.5 border-b-2 hover:border-b-violet-600">
                    Register yourself<MdKeyboardArrowRight className="inline text-lg" />
                </Link>
            </>}
        </div>
    )
}

export default Login