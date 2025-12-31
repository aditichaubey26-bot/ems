import React from 'react'
import Sidebar from './Sidebar'

export default function Dashboard() {
  return (
    <div className='flex'>
       <Sidebar/>
       <div>
          <h1>This is dashboard page</h1>
       </div>
    </div>
  )
}
