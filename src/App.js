import React from 'react'
import "./assets/styles/tranzoop.css";
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div>
      <BrowserRouter>
        <AppRoutes />
        <ToastContainer autoClose={2000} />
      </BrowserRouter>
    </div>
  )
}

export default App
