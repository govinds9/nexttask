import React from 'react'
import Sidebar from './Sidebar.jsx'

const Layout = ({children}) => {
  return (
<div className='grid grid-cols-12'>
  <div className='col-span-12 md:col-span-2'>
    <Sidebar />
  </div>
  <div className='col-span-12 md:col-span-10  bg-slate-100 min-h-screen '>
    {children}
  </div>
</div>
  )
}

export default Layout
