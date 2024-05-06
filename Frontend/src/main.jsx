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
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={route} > </RouterProvider>
    </Provider>
  </React.StrictMode>,
)
