import React, { useContext, useEffect, useRef, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import AppContext from '../components/context/AppContext'
import Button from '../components/layout/Button'
import Product from '../components/products/Product'

function Profile() {
    const { user, userData, logOut, loading, fetchUserDetails, fetchProductsWithUserId, deleteProduct, setLoading } = useContext(AppContext)
    const navigate = useNavigate()
    const [products, setProducts] = useState(null)
    const isMounted = useRef(true)
    useEffect(() => {
        if(isMounted.current && user.providerType !== "anon-user") {
            fetchData()
            console.log(user.providerType)
        }
        return () => {
            isMounted.current = false
        }
    }, [user])
    const fetchData = async () => {
        setLoading(true)
        await fetchUserDetails(user.id)
        setProducts(await fetchProductsWithUserId(user.id))
        setLoading(false)
    }
    const handleClick = async () => {
        await logOut()
        navigate('/login')
    }
    const handleDelete = async (id) => {
        await deleteProduct(id)
        const data = await fetchData()
        setProducts(data)
    }
    return (
        <div className='w-4/5 mx-auto my-6 relative'>
            {loading ? <AiOutlineLoading3Quarters className="text-4xl absolute animate-spin z-50 mx-auto top-52 left-0 right-0" />:
            <>
                <h1 className="text-4xl">My Profile</h1>
                <div className="flex flex-col gap-1 my-6">
                    <p>ID: {user.id}</p>
                    {userData &&
                        <>
                            <p>Name: {userData.username}</p>
                            <p>Email: {userData.email}</p>
                        </>
                    }
                </div>
                <Button handleClick={handleClick}>Logout</Button>
                <hr className='my-6'/>
                <h1 className="text-4xl mb-6">My Products</h1>
                {products ? products.map(product => <Product key={product._id} product={product} handleDelete={()=>handleDelete(product._id)} />) : 
                user.providerType === 'anon-user' ? <p>Anonymous users cannot add products</p> : <p>You haven't added any products yet</p>}
            </>}
        </div>
    )
}

export default Profile