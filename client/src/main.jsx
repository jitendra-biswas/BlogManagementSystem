import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'remixicon/fonts/remixicon.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './Context/authContext.jsx'
  import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider> 
      <App />
       <ToastContainer />
    </AuthProvider>
  </BrowserRouter>
)