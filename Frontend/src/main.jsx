import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {RouterProvider, createBrowserRouter,} from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Editor from './Pages/Editor.jsx'
import App2 from './App2.jsx'


const route = createBrowserRouter([
  {
    path:'',
    element:<App />,
    children:[
      {
        path:'/',
        element:<Home />
      },
    ]
  },
  {
    path:'/code',
    element: <App2 />,
    children:[
      {
        path:'/code/:id',
        element:<Editor />
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={route} > </RouterProvider>
  </React.StrictMode>,
)
