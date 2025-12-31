
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './auth/Login'
import Register from './auth/Register'
import { Toaster } from 'sonner'
import Dashboard from './pages/Dashboard'
import Employees from './pages/Employees'
import Logout from './pages/Logout'

function App() {

  return (
    <>
        <BrowserRouter>
           <Routes>
             <Route path='/' element={<Navigate to="/login"/>}/>
             <Route path='/login' element={<Login/>}/>
             <Route path='/register' element={<Register/>}/>
             <Route path='/dashboard' element={<Dashboard/>}/>
             <Route path='/employees' element={<Employees/>}/>
             <Route path='/logout' element={<Logout/>}/>
           </Routes>
        </BrowserRouter>  
        <Toaster/>
    </>
  )
}

export default App
