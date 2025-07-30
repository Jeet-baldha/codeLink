import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { IoIosCloseCircle, } from "react-icons/io";

function Feedback({setOpenFeedback}) {

    const [input,setInput] = useState({
        email:"",
        report:""
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(input);
        toast.success("Form submitted")
    }

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setInput( (prev) => {
            return {...prev,[name]: value}
        })
    }

    return (
        <div className=' absolute w-screen h-screen flex items-center justify-center bottom-10 right-0 bg-gray-200 bg-opacity-10 z-50'>
            <div className=' w-96 bg-gray-900 text-white h-auto z-10 rounded-sm'  >
                <div className=' float-right mt-1 mr-2 hover:cursor-pointer' onClick={() => setOpenFeedback(false)}><IoIosCloseCircle className=' text-3xl text-white' /></div>
                <div className=' mt-4 p-4'>
                    <h1 className=' text-xl font-semibold text-white pb-4'>Feedback Form</h1>
                    <form className=' flex flex-col gap-4 text-black' onSubmit={handleSubmit}>
                        <input type='email' placeholder=' Enter your email'  className=' p-2 rounded-sm outline-none' onChange={handleChange} value={ input.email} name='email'></input>
                        <textarea className=' p-2 rounded-sm outline-none'  rows={4} placeholder='Report bug and write feedback or suggest improvement' onChange={handleChange} value={input.report} name='report'></textarea>
                        <button className=' p-2 rounded-sm bg-gray-800 text-white font-medium hover:bg-gray-700 transition-colors duration-200'>Submit</button>
                    </form>
                </div>
            </div>

            <ToastContainer position='top-center' theme='dark' autoClose={1000} />
        </div>
    )
}

export default Feedback