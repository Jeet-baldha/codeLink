import React from 'react'
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import CodeEditor from './Components/CodeEditor'

function App() {
  return (
    <div className=' w-full h-screen bg-dark-grayish-blue'>
      <Navbar />
      <Sidebar />
      <CodeEditor />
    </div>  
  )
}

export default App