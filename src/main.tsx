import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import UserDetails from './UserDetails.tsx'
import Login from './Login.tsx'
import dashboard from './Dashboard.tsx'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Signup from './Signup.tsx'
import Dashboard from './Dashboard.tsx'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/userdetails" element={<UserDetails/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
