import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

export default function PrivateRoute() {
    const { currentstudent } = useSelector((state) => state.student)
    return (
        currentstudent &&
            currentstudent.isAlumni ? <Outlet /> : <Navigate to='/login' />
    )
}
