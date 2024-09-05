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
        <div className=' absolute w-screen h-screen bg-opacity-20 z-50 flex items-center justify-center bottom-10 right-0'>
            <div className=' w-96 bg-dark-grayish-blue text-white h-auto z-10  rounded-sm'  >
                <div className=' float-right mt-1 mr-2 hover:cursor-pointer' onClick={() => setOpenFeedback(false)}><IoIosCloseCircle className=' text-3xl' /></div>
                <div className=' mt-4 p-4'>
                    <h1 className=' text-xl font-semibold text-white pb-4'>Feddback Form</h1>
                    <form className=' flex flex-col gap-4 text-black' onSubmit={handleSubmit}>
                        <input type='email' placeholder=' Enter your email'  className=' p-2 rounded-sm outline-none' onChange={handleChange} value={ input.email} name='email'></input>
                        <textarea className=' p-2 rounded-sm outline-none'  rows={4} placeholder='Report bug and write feddback or suggest imporvement' onChange={handleChange} value={input.report} name='report'></textarea>
                        <button className=' p-2 rounded-sm bg-light-bluish-green font-bold text-xl text-white hover:bg-white hover:text-dark-blue-black duration-200 '>Submit</button>
                    </form>
                </div>
            </div>

            <ToastContainer position='top-center' theme='dark' autoClose={1000} />
        </div>
    )
}

export default Feedback