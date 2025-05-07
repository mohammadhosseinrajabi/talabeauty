import React from 'react'
import RightNav from './rightNav'
import LeftNav from './leftNav'
import '../Home/homePage.css'; 
export default function NavDesktop() {
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light dir-rtl nav-desktop" dir='rtl'>
    <div className="container-fluid">
    <img src="/auth/images/logo.webp" alt="" className="logo-menu" />
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-between" id="navbarNavDropdown">
       <RightNav/>
      <LeftNav/>
      </div>
    </div>
  </nav>
  )
}
