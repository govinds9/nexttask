import React from 'react'

const Button = ({
    text,handleclick
}) => {
  return (
   <button className=' text-center bg-gradient-to-t from-violet-500 to-purple-600 rounded-lg text-white text-xl p-2 ' onClick={handleclick}>{text}</button>
  )
}

export default Button
