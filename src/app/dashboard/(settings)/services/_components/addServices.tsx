import React from 'react'
import ServiceInfo from './serviceInfo'

function AddServices() {
  return (
    <div className='grid grid-cols-3 rounded-md'>
        <div className='col-span-2 bg-gray-200 p-6 h-screen'><ServiceInfo/></div>
        {/* <div className='col-span-1 bg-white p-6'><AddService /></div> */}
    </div>
  )
}

export default AddServices
