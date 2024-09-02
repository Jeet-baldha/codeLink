import React from 'react'
import Home from './Pages/Home'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { Outlet } from 'react-router-dom'

function App() {

  
  return (
    <>
      <div className='gredient'>
      <Navbar  />
        <Outlet />
      <Footer />
      </div>
    </> 
  )
}

export default App