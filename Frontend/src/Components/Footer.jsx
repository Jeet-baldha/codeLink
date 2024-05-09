import React from 'react'
import { RiInstagramFill,RiTwitterFill,RiFacebookFill } from "react-icons/ri";

function Footer() {
    return (
        <div className='text-white '>
            <div className='  flex justify-around px-20 py-20'>
                <div>
                    <h1 className=' text-3xl font-bold  pb-5'>CodeLink</h1>
                    <ul className=' flex text-3xl  gap-10'>
                        <li><RiInstagramFill></RiInstagramFill></li>
                        <li><RiFacebookFill /></li>
                        <li><RiTwitterFill /></li>
                    </ul>
                </div>
                <div>
                    <ul className=' text-xl font-semibold'>
                        <li className=' list-disc'>Terms of Service</li>
                        <li className=' list-disc pt-5'>Privacy Policy</li>
                    </ul>
                </div>
            </div>

            <div className=' text-center p-3 text-xl'>
            © 2024 CodeLink. All rights reserved.
            </div>
        </div>
    )
}

export default Footer