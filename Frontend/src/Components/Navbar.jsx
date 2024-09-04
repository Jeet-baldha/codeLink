import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar({ className }) {


    return (
        <div className={` flex ${className}  shadow-md h-14 text-xl text-white px-20 w-full overflow-hidden items-center`}>
            <div className=' fixed -right-5 top-3 bg-red-500 px-10 text-sm rotate-45 overflow-hidden'>Beta</div>
            <div className=' text-light-gray text-center text-3xl font-bold w-full '>
                <NavLink to={'/'} >CodeLink</NavLink>
            </div>
            <div className=' absolute right-20 flex gap-10 '>
                <button className='text-white text-xl font-semibold'><NavLink to={'/auth/login'} >Login</NavLink></button>
                <button className='text-white text-xl font-semibold'><NavLink to={'/auth/signup'} >Sign up</NavLink></button>
            </div>
        </div>
    )
}

export default Navbar