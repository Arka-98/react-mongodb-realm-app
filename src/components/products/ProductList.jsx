import { useContext, useEffect, useRef, useState } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { useNavigate } from "react-router-dom"
import AppContext from "../context/AppContext"
import Product from "./Product"

function ProductList() {
    const navigate = useNavigate()
    const { mongoClient, loading, setLoading, fetchData, deleteProduct } = useContext(AppContext)
    const [productData, setProductData] = useState(null)
    useEffect(() => {
        if(mongoClient) {
            fetchProducts()
        }
    }, [mongoClient])
    const fetchProducts = () => {
        setLoading(true)
        fetchData().then((data) => {
            setProductData(data)
            setLoading(false)
        })
    }
    const handleDelete = async (id) => {
        await deleteProduct(id)
        const data = await fetchData()
        setProductData(data)
    }
    return (
        <div className="flex flex-col gap-3">
            {loading ? <AiOutlineLoading3Quarters className="text-4xl absolute animate-spin z-50 mx-auto top-52 left-0 right-0" />:
            productData?.map(product => <Product key={product._id} product={product} handleDelete={()=>handleDelete(product._id)} />)}
        </div>
    )
}

export default ProductList