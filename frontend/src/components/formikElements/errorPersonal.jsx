import React from 'react'

export default function ErrorPersonal({children}) {
  return (
    <div className='text-right text-danger fs-7 d-flex'>
        {children}
    </div>
  )
}
