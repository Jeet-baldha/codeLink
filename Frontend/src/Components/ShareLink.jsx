import React from 'react'
import { IoIosCloseCircle, IoMdCopy } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
function ShareLink({ endUrl , setOpenCodeLinkBox}) {

    const copyLink = () => {
        navigator.clipboard.writeText(`https://codelink-frontend.onrender.com//code/${endUrl}`).then(toast.success("Link Copied to clipboard"))
    }

    return (
        <div className=' absolute w-screen h-screen flex justify-center items-center top-0 right-0 bg-gray-200 bg-opacity-20 z-50'>
            <div className=' w-96 bg-dark-grayish-blue text-white h-80 z-10  rounded-sm'>
                <div className=' float-right mt-2 mr-2 hover:cursor-pointer' onClick={ () => setOpenCodeLinkBox(false)}><IoIosCloseCircle className=' text-3xl' /></div>
                <div className=' mt-6 p-5'>
                    <h1 className=' pb-2 text-3xl'>Share Code</h1>
                    <p className=' pb-2 '>Anyone with access to this URL will see your code in real time.</p>
                    <p className=' text-xl text-gray-500 pb-3'>Share this URL</p>
                    <div className=' text-black flex'>
                        <input readOnly value={`http://localhost:5173/code/${endUrl}`} className=' w-full p-2 rounded-sm' />
                        <div className=' text-white text-4xl font-bold hover:cursor-pointer' onClick={copyLink}>
                            <IoMdCopy />
                        </div>
                    </div>
                    <button className=' bg-light-bluish-green text-xl font-medium mt-5 px-5 py-1 rounded-sm text-white' onClick={() => setOpenCodeLinkBox(false)}>Close</button>
                </div>
            </div>

                    <ToastContainer position='top-center' theme='dark' autoClose={1000} />
        </div>
    )
}

export default ShareLink