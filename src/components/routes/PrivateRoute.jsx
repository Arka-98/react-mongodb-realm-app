import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import AppContext from '../context/AppContext'

function PrivateRoute() {
    const { user } = useContext(AppContext)
    return user ? <Outlet/> : <Navigate to="/login" />
}

export default PrivateRoute