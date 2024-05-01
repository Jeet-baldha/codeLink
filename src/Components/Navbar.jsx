import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar({className}) {
    return (
        <div className={` flex ${className}  shadow-md h-14 items-center text-xl text-white justify-between px-20 w-full`}>
            <div className=' text-light-gray'>
                <NavLink to={'/'} >CodeLink</NavLink>
            </div>
            <div className=' text-light-gray pl-5'>
                <ul className=' flex gap-5'>
                    <li className=' hover:cursor-pointer'>Sign Up</li>
                    <li className=' cursor-pointer'>Log In</li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar