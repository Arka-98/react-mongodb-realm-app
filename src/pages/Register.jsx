import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Button from "../components/layout/Button"
import Input from "../components/layout/Input"
import { MdKeyboardArrowRight } from "react-icons/md"
import AppContext from "../components/context/AppContext"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

function Register() {
    const navigate = useNavigate()
    const { user, loading, mongoClient, setMongoClient, authenticateUser, registerUserWithDB } = useContext(AppContext)
    const [formData, setFormData] = useState({ username: "", email: "", password: "" })
    const [errors, setErrors] = useState({ username: null, email: null, password: null })
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
    useEffect(()=>{
        if(user && mongoClient) {
            console.log(user)
            registerUserWithDB({ _id: user.id, ...formData }).then(() => navigate('/profile'))
        }
    }, [mongoClient])
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
        await authenticateUser(formData)
        // registerUserWithDB(formData)
    }
    return (
        <div className="w-96 mx-auto my-3">
            {loading ? <AiOutlineLoading3Quarters className="text-4xl absolute animate-spin z-50 mx-auto top-52 left-0 right-0" />:
            <>
                <form onSubmit={handleSubmit} className="flex flex-col gap-1">
                    <label>Username</label>
                    <Input type="text" name="username" value={formData.username} onChange={handleInput} onError={errors.username} placeholder="Enter username" />
                    <label>Email</label>
                    <Input type="text" name="email" value={formData.email} onChange={handleInput} onError={errors.email} placeholder="Enter email" />
                    <label>Password</label>
                    <Input type="password" name="password" value={formData.password} onChange={handleInput} onError={errors.password} placeholder="Enter password" />
                    <Button type="submit" isDisabled={disabled}>Register</Button>
                </form>
                <Link to='/login' className="text-violet-500 font-semibold block w-fit mt-5 mx-auto pb-0.5 border-b-2 hover:border-b-violet-600">
                    Sign in instead<MdKeyboardArrowRight className="inline text-lg" />
                </Link>
            </>}
        </div>
    )
}

export default Register