import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2Icon } from 'lucide-react'
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
// import { User } from 'lucide-react';

export default function Register() {
  const [loading, setLoading] = useState(false)
  const [formData,setFormData] = useState({
    name:"",email:"",password:""
  })
  const navigate = useNavigate()

  function handleChange(e){
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  async function handleSubmit(e){
    setLoading(true)
    e.preventDefault()
    try {
      
          const res = await fetch(`http://localhost:3000/users`,{
            method:"POST",
            headers:{
              "content-type":"application/json"
            },
            body:JSON.stringify(formData)
          })
          if(res.status===201)
          {
             toast.success("Registeration success!!")
             setLoading(false)
             setTimeout(()=>{
                 navigate("/login")
             },1500)
          }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <div>
      <div className='h-screen w-screen flex justify-center items-center '>
        <form className='shadow p-5' onSubmit={handleSubmit}>
          <h1 className='text-2xl font-semibold mb-4'>Register Form
          {/* <User /> */}

          </h1>
          <div>
            <span>Name</span>
            <Input type="text" name="name" className={'focus-visible:ring-transparent'}
             value={formData.name}
             onChange={handleChange}
            />
          </div>
          <div>
            <span>Email</span>
            <Input type="Email" name="email" className={'focus-visible:ring-transparent'}
            value={formData.email}
            onChange={handleChange}
            />
          </div>

          <div>
            <span>Password</span>
            <Input type="password" name="password" className={'focus-visible:ring-transparent'}
            value={formData.password}
            
            onChange={handleChange}
            autoComplete='off'
            />
          </div>
          {
            loading
              ? <Button className={'w-full mt-3'}>
                <Loader2Icon className="animate-spin" /> Please wait
              </Button>
              : <Button className={'w-full mt-3'}>Register</Button>
          }

          <p className='text-sm mt-3 text-center'>Already registered? 
             <NavLink to='/login' className={'hover:underline ml-1'}>Click here</NavLink> </p>




        </form>
      </div>
    </div>
  )
}
