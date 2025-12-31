import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { toast } from 'sonner'
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function Employees() {
  const [edit, setEdit] = useState(false)
  const [id, setId] = useState("")
  const [search, setSearch] = useState("")
  const [formData, setFormData] = useState({
    name: "", email: "", city: "", designation: ""
  })
  const [employees, setEmployees] = useState([])

  // handleSeacrh
  function handleSearch(e)
  {
     setSearch(e.target.value)
  }
  
  // filterData 
   const filterData  = employees.filter((empolyee)=>{
    const todo =`${empolyee.name} ${empolyee.city}`
    return todo.toLowerCase().includes(search.toLowerCase())
  })


  


  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }



  // handleCancel
  function handleCancel() {
    setEdit(false)
    setFormData({
      name: "",
      email: "",
      city: "",
      designation: ""
    })
  }

  // handleEdit
  function handleEdit(emp) {
    setId(emp.id)

    setFormData({
      name: emp.name,
      email: emp.email,
      city: emp.city,
      designation: emp?.designation,
    })
    setEdit(true)
  }
  async function getEmployees() {
    try {
      const res = await fetch(`http://localhost:3000/employees`)
      const data = await res.json()
      // console.log(data) 
      setEmployees(data)

    } catch (error) {
      console.log(error)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (edit) {
      try {
        const res = await fetch(`http://localhost:3000/employees/${id}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(formData)
        })
        if (res.status === 200) {
          toast.success(`${formData.name} updated successfully!`)
          getEmployees()
        }
      } catch (error) {
        console.log(error)
      }
    }
    else {
      try {
        const res = await fetch(`http://localhost:3000/employees`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(formData)
        })
        if (res.status === 201) {
          toast.success(`${formData.name} added successfully!`)
          setFormData({
            name: "",
            email: "",
            city: "",
            designation: ""
          })
          getEmployees()
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  async function handleDelete(id) {
    try {
      const res = await fetch(`http://localhost:3000/employees/${id}`, {
        method: "DELETE"
      })
      if (res.status === 200) {
        toast.success('Record deleted successfully!')
        getEmployees()
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getEmployees()
  }, [])


  return (
    <div className='flex'>
      <div>
        <Sidebar />
      </div>
      <div className='bg-gray-100 w-screen flex flex-col md:flex-row'>
        <div className='p-4 w-full md:w-1/3'>
          <form className='bg-white  p-4 space-y-2' >
            <h1 className='font-semibold mb-3 text-xl'>
              {
                edit ? "Edit Employee" : "Add Employee"
              }
            </h1>
            <div>
              <input type="text" className='border p-2 w-full rounded'
                placeholder='name'
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <input type="email" className='border p-2 w-full rounded'
                placeholder='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <input type="text" className='border p-2 w-full rounded'
                placeholder='city'
                name='city'
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div>
              <input type="text" className='border p-2 w-full rounded'
                placeholder='designation'
                name="designation"
                value={formData.designation}
                onChange={handleChange}
              />
            </div>

            {
              edit
                ? <div className='flex space-x-1'>
                  <button className='bg-green-600 p-2 w-full rounded text-white
            hover:bg-green-700 hover:cursor-pointer font-semibold
            '
                    onClick={handleSubmit}
                  >
                    Save</button>
                  <button className='bg-red-600 p-2 w-full rounded text-white
            hover:bg-red-700 hover:cursor-pointer font-semibold
            ' onClick={handleCancel}>
                    Cancel</button>
                </div>
                : <>
                  <button className='bg-gray-600 p-2 w-full rounded text-white
            hover:bg-gray-700 hover:cursor-pointer font-semibold
            '
                    onClick={handleSubmit}
                  >
                    Submit</button>
                </>

            }

          </form>
        </div>
        <div className='w-full md:w-2/3'>
          <div className='p-4'>

            <div className='flex  bg-white w-full p-1 mb-2 rounded'>
              <Input  placeholder='Search by name'
                className=' w-full p-1 focus-visible:ring-transparent border-none' 
                onChange={handleSearch}
                />
              <Search /> 
            </div>
            <table className='border w-full bg-white'>

              <thead>
                <tr className='bg-gray-50 text-left'>
                  <th className='p-2'>Name</th>
                  <th className='p-2'>Email</th>
                  <th className='p-2'>City</th>
                  <th className='p-2'>Designation</th>
                  <th className='p-2'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  filterData.map((emp, i) => <tr key={i}>
                    <td className='p-2'>{emp?.name}</td>
                    <td className='p-2'>{emp?.email}</td>
                    <td className='p-2'>{emp?.city}</td>
                    <td className='p-2'>{emp?.designation}</td>
                    <td className='p-2 space-x-1 flex flex-col space-y-1 md:space-y-0  md:flex-row'>
                      <button className='bg-teal-600 hover:cursor-pointer hover:bg-teal-700 text-white font-semibold px-5 py-1 rounded'
                        onClick={() => {
                          handleEdit(emp)
                        }}
                      >
                        Edit</button>
                      <button className='bg-red-600 hover:cursor-pointer hover:bg-red-700 text-white font-semibold px-5 py-1 rounded' onClick={() => {
                        if (window.confirm("Are you sure to delete?")) {
                          handleDelete(emp?.id)
                        }
                      }}>Delete</button>
                    </td>
                  </tr>)
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
