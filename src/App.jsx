import { useState } from 'react'

import './App.css'
import { BrowserRouter,Navigate,Route,Routes } from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import { Toaster } from './components/ui/sonner'
import Dashboard from './pages/Dashboard'
import Employees from './pages/Employees'
import Logout from './pages/Logout'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<Navigate to="/login"/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
       <Route path='/employees' element={<Employees/>}></Route>
        <Route path='/logout' element={<Logout/>}></Route>

    
      </Routes>
      </BrowserRouter>
    <Toaster/>
    </>
  )
}

export default App;
