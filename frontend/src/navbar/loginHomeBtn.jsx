import React from 'react'
import { NavLink } from 'react-router-dom'

export default function LoginHomeBtn({targetPath,title}) {
  return (
    <NavLink to={targetPath}>
    <button className="btn-login dir-ltr" src="">{title}
    <img src="/auth/images/user.png" className='userPic' />
    </button>
    </NavLink>
  )
}
