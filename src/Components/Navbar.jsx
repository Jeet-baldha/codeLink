import React from 'react'

function Navbar() {
    return (
        <div className=' flex bg-dark-grayish-blue shadow-md h-14 items-center text-xl text-white justify-between px-10 w-full'>
            <div className=' text-light-gray'>
                CodeLink
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