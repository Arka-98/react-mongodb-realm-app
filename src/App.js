import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import AddProduct from './pages/AddProduct'
import EditProduct from './pages/EditProduct'
import Home from './pages/Home'
import Login from './pages/Login'
import ProductDetails from './pages/ProductDetails'
import Register from './pages/Register'
import Profile from './pages/Profile'
import PrivateRoute from './components/routes/PrivateRoute'
import AppContext, { AppProvider } from './components/context/AppContext'
import { useContext } from 'react'
import NotFound from './pages/NotFound'
import About from './pages/About'

function App() {
  // const { loading } = useContext(AppContext)
  return (
    <Router>
      <AppProvider>
        <Navbar />
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route element={<PrivateRoute/>}>
            <Route index element={<Home/>} />
            <Route path='/product/:productId' element={<ProductDetails/>} />
            <Route path='/edit/:productId' element={<EditProduct/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/add' element={<AddProduct/>} />
          </Route>
          <Route path='*' element={<NotFound/>} />
          <Route path='/about' element={<About/>} />
        </Routes>
      </AppProvider>
    </Router>
  )
}

export default App