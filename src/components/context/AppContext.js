import { createContext, useEffect, useState, use } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Realm from "realm-web"

const AppContext = createContext()

export function AppProvider({ children }) {
    const navigate = useNavigate()
    const app = new Realm.App({ id: "myshop-ygxji" })
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(app.currentUser)
    const [userData, setUserData] = useState(null)
    const [mongoClient, setMongoClient] = useState(user?.mongoClient('mongodb-atlas'))
    useEffect(() => {
        console.log("context called")
        setMongoClient(user?.mongoClient('mongodb-atlas'))
    }, [user])

    const handleAnonymousLogin = async () => {
        try {
            setLoading(true)
            const currentUser = await app.logIn(Realm.Credentials.anonymous())
            // client = app.currentUser?.mongoClient('mongodb-atlas')
            setUser(currentUser)
            navigate('/profile')
        } catch(error) {
            console.log(error)
        }
        setLoading(false)
    }

    const authenticateUser = async ({username, email, password}) => {
        try {
            setLoading(true)
            await app.emailPasswordAuth.registerUser(email, password)
            await loginWithEmailAndPassword(email, password)
        } catch(error) {
            console.log(error)
        }
        setLoading(false)
    }

    const registerUserWithDB = async ({ _id, username, email, password }) => {
        try {
            const usersColl = mongoClient.db('shop').collection('users')
            const userData = {
                _id: new Realm.BSON.ObjectId(_id),
                username,
                email,
                password
            }
            const result = await usersColl.insertOne(userData)
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }
    const loginWithEmailAndPassword = async (email, password) => {
        try {
            setLoading(true)
            const currentUser = await app.logIn(Realm.Credentials.emailPassword(email, password))
            setUser(currentUser)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    const logOut = async () => {
        try {
            setLoading(true)
            await user.logOut()
            setUser(null)
            // setMongoClient(null)
            // navigate('/login')
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    const fetchUserDetails = async (userId) => {
        try {
            const usersColl = mongoClient.db('shop').collection('users')
            const userData = await usersColl.findOne({ _id: new Realm.BSON.ObjectId(userId) })
            console.log(loading)
            setUserData(userData)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchData = async () => {
        try {
            // setLoading(true)
            const productsColl = mongoClient.db('shop').collection('products')
            let products = []
            const data = await productsColl.find({})
            data.forEach(product => {
                product.price = product.price.toString()
                product._id = product._id.toString()
                product.userId = product.userId.toString()
                products.push(product)
            })
            // setLoading(false)
            return products
        } catch (error) {
            console.log(error)
        }
    }

    const fetchSingleProduct = async (productId) => {
        try {
            setLoading(true)
            const productsColl = mongoClient.db('shop').collection('products')
            let product = await productsColl.findOne({ _id: new Realm.BSON.ObjectId(productId) })
            product.price = product.price.toString()
            setLoading(false)
            return product
        } catch (error) {
            console.log(error)
        }
    }

    const fetchProductsWithUserId = async (userId) => {
        try {
            const productsColl = mongoClient.db('shop').collection('products')
            let products = []
            const data = await productsColl.find({ userId: new Realm.BSON.ObjectId(userId) })
            data.forEach(product => {
                product._id = product._id.toString()
                product.price = product.price.toString()
                product.userId = product.userId.toString()
                products.push(product)
            })
            return products
        } catch (error) {
            console.log(error)
        }
    }

    const addProduct = async ({ name, price, image, description }) => {
        try {
            setLoading(true)
            const productsColl = mongoClient.db('shop').collection('products')
            const newProduct = {
                name,
                price: new Realm.BSON.Decimal128(price),
                image,
                description,
                userId: new Realm.BSON.ObjectId(user.id)
            }
            const result = await productsColl.insertOne(newProduct)
            console.log(result)
            setLoading(false)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    const deleteProduct = async (productId) => {
        try {
            setLoading(true)
            const productsColl = mongoClient.db('shop').collection('products')
            const result = await productsColl.deleteOne({ _id: new Realm.BSON.ObjectId(productId) })
            console.log(result)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const updateProduct = async (productId, { name, price, image, description }) => {
        try {
            setLoading(true)
            const productsColl = mongoClient.db('shop').collection('products')
            const updatedProduct = {
                name,
                price: new Realm.BSON.Decimal128(price),
                image,
                description
            }
            const result = await productsColl.updateOne({ _id: new Realm.BSON.ObjectId(productId) }, { $set: updatedProduct })
            console.log(result)
            setLoading(false)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AppContext.Provider value = {{
            user,
            userData,
            loading,
            mongoClient,
            setLoading,
            setMongoClient,
            fetchUserDetails,
            handleAnonymousLogin,
            authenticateUser,
            registerUserWithDB,
            fetchData,
            fetchSingleProduct,
            fetchProductsWithUserId,
            deleteProduct,
            addProduct,
            updateProduct,
            logOut,
            loginWithEmailAndPassword
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext