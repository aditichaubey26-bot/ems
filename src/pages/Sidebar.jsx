import React from 'react'
import { FaHome, FaBox, FaSignOutAlt } from "react-icons/fa"
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
    const menuItems = [
        { name: "Dashboard", path: "/dashboard", icon: <FaHome />, isParent: true },
        { name: "Employees", path: "/employees", icon: <FaBox />, isParent: false },
        { name: "Logout", path: "/logout", icon: <FaSignOutAlt />, isParent: false },
    ]
    return (
        <div className='flex flex-col  bg-black text-white  h-screen  w-16 md:w-65'>
            <div className='h-16 flex justify-center items-center'>
                <span className='hidden md:block text-xl font-bold'>Employee MS</span>
                <span className='md:hidden text-xl font-bold'>EMS</span>
            </div>


            <div>
                <ul className='space-y-2 p-2'>
                    {
                        menuItems.map((item, i) => <NavLink
                            to={item.path}

                            className={({ isActive }) => `${isActive ? 'bg-gray-500' : ""} flex items-center space-x-4  py-2.5 px-4 mb-2 rounded  hover:bg-white hover:text-gray-800 transition duration-200`}>
                            <span className='text-xl'> {item.icon}</span>
                            <span className='text-xl px-2 hidden md:block'>{item.name}</span>
                        </NavLink>)
                    }
                </ul>

            </div>
        </div>
    )
}
