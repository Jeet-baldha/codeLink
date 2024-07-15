import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter, } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Editor from './Pages/Editor.jsx'
import App2 from './App2.jsx'
import { Provider } from 'react-redux'
import store from './Store/store.js'
import Login from './Pages/AuthPage/Login.jsx'
import SignUp from './Pages/AuthPage/SignUp.jsx'
import AuthLayout from './AuthLayout.jsx'

const route = createBrowserRouter([
  {
    path: '',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
    ]
  },
  {
    path: '/code',
    element: <App2 />,
    children: [
      {
        path: '/code/:id',
        element: <Editor />
      }
    ]
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: '/auth/login',
        element: <Login />
      },
      {
        path: '/auth/signup',
        element: <SignUp />
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={route} > </RouterProvider>
    </Provider>
  </React.StrictMode>,
)
