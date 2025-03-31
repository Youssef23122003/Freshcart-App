import React from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { useContext } from 'react'

export default function ProtectRoutes({ children }) {
    let { userLogin } = useContext(UserContext)
    let userToken = localStorage.getItem('userToken')

    if (userToken === null) {
        return <Navigate to="/signin" />
    }

    return children
}
