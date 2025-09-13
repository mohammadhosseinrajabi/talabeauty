import React from 'react'
import RightNav from './rightNav'
import LeftNav from './leftNav'
import '../Home/homePage.css'; 
import { useLocation, useParams } from 'react-router-dom';
export default function NavDesktop() {
    const location=useLocation()
     const { id } = useParams();

  const isProductPage= location.pathname===`/ProductPage/${id}`;
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light dir-rtl nav-desktop" dir='rtl'
    style={{padding:isProductPage?'2rem':'0'}}
    >
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
