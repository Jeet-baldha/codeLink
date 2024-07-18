import React, { useState } from 'react'
import { RiEyeLine } from 'react-icons/ri'
import { RiEyeCloseLine } from 'react-icons/ri';
import { NavLink } from 'react-router-dom'
import axios from 'axios';

function SignUp() {


    const [inputData,setInputData] = useState({
        username: '',
        email: '',
        password: ''
    })

    const [eyeOpen,setEyeOpen] = useState(false);


    const handleInputData = (e) =>{
        setInputData({...inputData,[e.target.name]:e.target.value});
    }

    const submitForm = async(e) => {
        e.preventDefault();

        try {
            const data = await axios.post('http://localhost:3000/auth/register',inputData);
            alert(data.data.message);
            
            const verify = await axios.get('http://localhost:3000/auth/validateToken',{ headers:{
                token:data.data.jsonwebtoken,
            }});

            alert(verify.data);

        } catch (error) {
            alert(error.message);
        }
        setInputData({
            username: '',
            password: '',
            email:''
        })
    }


    return (
        <div className=' login-gredient h-svh w-svw flex justify-center items-center'>
        <div className=' bg-white rounded-md p-5'>
            
                <h1 className=' font-bold text-3xl text-center'>Hello MOTO</h1>
            <form onSubmit={submitForm} className=' flex flex-col w-96 gap-2 mt-5'>
                <label className=' text-xl font-semibold'>Username</label>
                <input type='text'name='username' value={inputData.username} onChange={handleInputData} className='bg-gray-200 rounded-sm px-2 py-1 border-black'></input>
                <label className=' text-xl font-semibold'>Email</label>
                <input type='email'name='email' value={inputData.email} onChange={handleInputData} className='bg-gray-200 rounded-sm px-2 py-1 border-black'></input>
                <label className=' text-xl font-semibold'>Password</label>
                <div className=' flex w-full items-center justify-end'>
                    <input type={eyeOpen ? 'text' : 'password'} name='password' value={inputData.password} onChange={handleInputData} className='bg-gray-200 rounded-sm px-2 py-1 border-black w-full'></input>
                    { eyeOpen ? <RiEyeLine className=' absolute mr-3 cursor-pointer text-xl' onClick={ () => setEyeOpen(!eyeOpen)} onMouseLeave={ () => setEyeOpen(false)} ></RiEyeLine> :  <RiEyeCloseLine className=' absolute mr-3 cursor-pointer text-xl' onClick={ () => setEyeOpen(!eyeOpen)} ></RiEyeCloseLine>}
                </div>
                <button type='submit' className=' bg-dark-blue-black text-white p-2 mt-3 text-xl font-bold rounded-sm '>Sign up</button>
            </form>
            <p>Already have account? <NavLink to={'/auth/login'} className={'font-semibold hover:font-normal hover:underline'}>Login here</NavLink> </p>
            <h1 className=' text-xl font-bold text-center my-5 text-gray-500'>OR</h1>
            <div className=''>
                    <button aria-label="Continue with google" role="button" className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-2 px-4 border rounded-sm border-gray-700 flex items-center w-full">
                        <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.9892 10.1871C18.9892 9.36767 18.9246 8.76973 18.7847 8.14966H9.68848V11.848H15.0277C14.9201 12.767 14.3388 14.1512 13.047 15.0812L13.0289 15.205L15.905 17.4969L16.1042 17.5173C17.9342 15.7789 18.9892 13.221 18.9892 10.1871Z" fill="#4285F4" />
                            <path d="M9.68813 19.9314C12.3039 19.9314 14.4999 19.0455 16.1039 17.5174L13.0467 15.0813C12.2286 15.6682 11.1306 16.0779 9.68813 16.0779C7.12612 16.0779 4.95165 14.3395 4.17651 11.9366L4.06289 11.9465L1.07231 14.3273L1.0332 14.4391C2.62638 17.6946 5.89889 19.9314 9.68813 19.9314Z" fill="#34A853" />
                            <path d="M4.17667 11.9366C3.97215 11.3165 3.85378 10.6521 3.85378 9.96562C3.85378 9.27905 3.97215 8.6147 4.16591 7.99463L4.1605 7.86257L1.13246 5.44363L1.03339 5.49211C0.37677 6.84302 0 8.36005 0 9.96562C0 11.5712 0.37677 13.0881 1.03339 14.4391L4.17667 11.9366Z" fill="#FBBC05" />
                            <path d="M9.68807 3.85336C11.5073 3.85336 12.7344 4.66168 13.4342 5.33718L16.1684 2.59107C14.4892 0.985496 12.3039 0 9.68807 0C5.89885 0 2.62637 2.23672 1.0332 5.49214L4.16573 7.99466C4.95162 5.59183 7.12608 3.85336 9.68807 3.85336Z" fill="#EB4335" />
                        </svg>
                        <p className="text-base font-medium ml-4 text-gray-700">Continue with Google</p>
                    </button>
                </div>
        </div>
    </div>
        
    )
}

export default SignUp