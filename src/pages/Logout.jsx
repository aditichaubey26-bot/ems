import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export default function Logout() {
    const navigate = useNavigate()
    function logout() {
        localStorage.removeItem("auth")
        toast.success("Logout successfully!")
        setTimeout(() => {
            navigate("/login")
        }, 2000)
    }

    useEffect(()=>{
        logout()
    },[])

    return (
        <div></div>
    )
}
