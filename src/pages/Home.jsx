import { useContext, useEffect, useState } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import AppContext from "../components/context/AppContext"
import ProductList from "../components/products/ProductList"

function Home() {
    return (
        <div className="w-4/5 mx-auto my-6">
            <h1 className="text-4xl mb-6">Products</h1>
            <ProductList />
        </div>
    )
}

export default Home