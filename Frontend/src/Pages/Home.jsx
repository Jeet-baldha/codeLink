import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Home() {

    const navigate = useNavigate();

    const [endurl,setendurl] = useState("");

    const handleClick = async () => {
        const result = await axios.get('https://codelink-lyor.onrender.com/geturl');
        setendurl(result.data);  
    }
    
    useEffect(() => {
        endurl && navigate('/code/'+endurl);      
    },[endurl,navigate]);

    return (
        <div className=' text-white'>
            <div className='flex items-center justify-center'>
                <div className=' py-64 px-20 w-3/4 flex flex-col justify-center align-middle items-center '>
                <h1 className=' text-5xl text-white font-bold text-center'>Welcome to CodeLink: Your Real-Time Code Sharing Platform</h1>
                <h1 className=' py-5 text-xl text-center'>Code together, in real-time, with anyone, anywhere</h1>
                <button className=' px-3 py-2 border-white border-2 font-bold rounded-sm mt-3 text-white text-center w-32 hover:bg-white hover:text-dark-blue-black' onClick={handleClick}>Share Now</button>
                <p  className=' pt-2 text-sm text-center'>Share code for free.</p>
                </div>
            </div>
            <ToastContainer position='top-center' theme='dark' autoClose={1000} />
        </div>
    )
}

export default Home