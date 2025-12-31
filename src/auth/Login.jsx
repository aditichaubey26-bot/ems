import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2Icon } from 'lucide-react'
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const navigate = useNavigate()
  async function handleLogin(e)
  {
    e.preventDefault()
    //  console.log(email,password)
    try {
        const res =  await fetch(`http://localhost:3000/users`)
        const data = await res.json()
        let flag = false
        for(let i=0; i<data.length; ++i)
        {
            if(email === data[i].email && password === data[i].password)
            {
              flag=true
              localStorage.setItem("auth",JSON.stringify(data[i]))
              break
            }
            else{
             flag=false
            }
        }
        if(flag)
        {
          toast.success("Login Success!")
          navigate("/dashboard")
        }
        else{
          toast.error("Invalid credentials!")
        }

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <div className='h-screen w-screen flex justify-center items-center '>
        <form className='shadow p-5' onSubmit={handleLogin} >
          <h1 className='text-2xl font-semibold mb-4'>Login Form</h1>
          <div>
            <span>Email</span>
            <Input type="Email" name="email" className={'focus-visible:ring-transparent'}
             value={email} 
             onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <div>
            <span>Password</span>
            <Input type="password" name="password" className={'focus-visible:ring-transparent'}
               value={password}
               onChange={(e)=>setPassword(e.target.value)}
              autoComplete='off'
            />
          </div>
          {
            loading
              ? <Button className={'w-full mt-3'}>
                <Loader2Icon className="animate-spin" /> Please wait
              </Button>
              : <Button className={'w-full mt-3'}>Login</Button>
          }

          <p className='text-sm mt-3 text-center'>Not registered?
            <NavLink to='/register' className={'hover:underline ml-1'}>Click here</NavLink> </p>




        </form>
      </div>
    </div>
  )
}
