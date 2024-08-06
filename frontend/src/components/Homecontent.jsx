import React from 'react'
import { useSelector } from 'react-redux'

const Homecontent = () => {
    const {user} = useSelector(state=>state.auth)
  return (
    <div className=' w-full px-4 py-8  flex flex-col gap-6'>
      <div className=' flex justify-between'>

        <h1 className=' text-black text-3xl roboto-bold '> Goood morning, {user?.name || "User!"}</h1>
        <p className=' flex gap-2'>Help and feedback <div className=' rounded-full w-5 h-5 bg-slate-500 text-white text-center'>?</div></p>
      </div>
      
    </div>
  )
}

export default Homecontent
