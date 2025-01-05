import React from 'react'

export default function Loader() {
  return (
    <div className='z-[99] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <div className="loader"></div>
    </div>
  )
}
