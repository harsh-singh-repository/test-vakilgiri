import React from 'react'
import MessageIcon from './MessageIcon'
import DocumentIcon from './DocumentIcon'
import EditIcon from './EditIcon'

const ActionsOptions = () => {
  return (
    <div className='flex justify-center items-center gap-1'>
      <MessageIcon/>
      <DocumentIcon/>
      <EditIcon/>
    </div>
  )
}

export default ActionsOptions
