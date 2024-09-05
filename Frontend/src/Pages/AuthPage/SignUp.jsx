import React, { useState } from 'react'
import { RiEyeLine } from 'react-icons/ri'
import { RiEyeCloseLine } from 'react-icons/ri';
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';

function SignUp() {


    const [inputData, setInputData] = useState({
        username: '',
        email: '',
        password: ''
    })

    const [eyeOpen, setEyeOpen] = useState(false);


    const handleInputData = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
    }

    const submitForm = async (e) => {
        e.preventDefault();

        try {
            const data = await axios.post('http://localhost:3000/auth/register', inputData);
            alert(data.data.message);

            if (data.data.successcd) {
                localStorage.setItem('authToken', data.data.jsonwebtoken);
            }

        } catch (error) {
            alert(error.message);
        }
        setInputData({
            username: '',
            password: '',
            email: ''
        })
    }

    const googleAuthVerify = async (credentialResponse) => {
        console.log(credentialResponse);

        try {
            const data = await axios.post('http://localhost:3000/auth/googleAuthVerify', {token:credentialResponse.credential});
            if (data.data.success) {
                alert(data.data.message);
                localStorage.setItem('authToken', data.data.jsonwebtoken);
            }

        } catch (error) {
            alert(error.message);
        }

    }


    return (
        <div className=' login-gredient h-svh w-svw flex justify-center items-center'>
            <div className=' bg-white rounded-md p-5'>

                <h1 className=' font-bold text-3xl text-center'>Hello MOTO</h1>
                <form onSubmit={submitForm} className=' flex flex-col w-96 gap-2 mt-5'>
                    <label className=' text-xl font-semibold'>Username</label>
                    <input type='text' name='username' value={inputData.username} onChange={handleInputData} className='bg-gray-200 rounded-sm px-2 py-1 border-black' required></input>
                    <label className=' text-xl font-semibold'>Email</label>
                    <input type='email' name='email' value={inputData.email} onChange={handleInputData} className='bg-gray-200 rounded-sm px-2 py-1 border-black' required></input>
                    <label className=' text-xl font-semibold'>Password</label>
                    <div className=' flex w-full items-center justify-end'>
                        <input type={eyeOpen ? 'text' : 'password'} name='password' value={inputData.password} onChange={handleInputData} className='bg-gray-200 rounded-sm px-2 py-1 border-black w-full' required></input>
                        {eyeOpen ? <RiEyeLine className=' absolute mr-3 cursor-pointer text-xl' onClick={() => setEyeOpen(!eyeOpen)} onMouseLeave={() => setEyeOpen(false)} ></RiEyeLine> : <RiEyeCloseLine className=' absolute mr-3 cursor-pointer text-xl' onClick={() => setEyeOpen(!eyeOpen)} ></RiEyeCloseLine>}
                    </div>
                    <button type='submit' className=' bg-dark-blue-black text-white p-2 mt-3 text-xl font-bold rounded-sm '>Sign up</button>
                </form>
                <p>Already have account? <NavLink to={'/auth/login'} className={'font-semibold hover:font-normal hover:underline'}>Login here</NavLink> </p>
                <h1 className=' text-xl font-bold text-center my-5 text-gray-500'>OR</h1>
                <div className=''>

                    <GoogleLogin onSuccess={credentialResponse => {
                            googleAuthVerify(credentialResponse);
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}

                        size='large'
                        width={'380px'}
                    ></GoogleLogin>
                </div>
            </div>
        </div>

    )
}

export default SignUp