import React from 'react'
import LoginHomeBtn from './loginHomeBtn'
import { Link } from 'react-router-dom'

export default function LeftNav() {
  return (
    <form className="d-flex">
    {/* <ul className="navbar-nav">
    <li className="nav-item">
        <a className="nav-link" href="#">ورود آرایشگران</a>
    </li>
      </ul> */}
  
    <LoginHomeBtn targetPath="/login" title="ورود کاربران"/>
    <LoginHomeBtn targetPath="/LoginAdmin" title="ورود ادمین"/>
     
   </form>
  )
}
