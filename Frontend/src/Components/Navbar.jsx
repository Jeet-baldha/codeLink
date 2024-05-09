import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar({className}) {


    return (
        <div className={` flex ${className}  shadow-md h-14 items-center text-xl text-white px-20 w-full overflow-hidden` }>
            <div className=' fixed -right-5 top-3 bg-red-500 px-10 text-sm rotate-45 overflow-hidden'>Beta</div>
            <div className=' text-light-gray text-center w-full text-3xl font-bold'>
                <NavLink to={'/'} >CodeLink</NavLink>
            </div>
        </div>
    )
}

export default Navbar