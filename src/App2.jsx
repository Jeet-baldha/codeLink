import React from 'react'
import Home from './Pages/Home'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { Outlet } from 'react-router-dom'

function App2() {
    return (
        <>
            <div className='gredient'>
                <Navbar className= ' bg-dark-grayish-blue' />
                <Outlet />
            </div>
        </>
    )
}

export default App2