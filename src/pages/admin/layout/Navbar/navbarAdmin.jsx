import React from 'react'
import RightContent from './rightContent'
import LeftContent from './leftContent'

export default function NavbarAdmin() {
  return (
    <nav className="adminNavbar navbar fixed-top navbar-dark bg-secondary top_navbar py-0" dir='rtl'>
    <div className="container-fluid h-100 pe-0">
     <RightContent/>

    <LeftContent/>
    </div>
  </nav>
  )
}
