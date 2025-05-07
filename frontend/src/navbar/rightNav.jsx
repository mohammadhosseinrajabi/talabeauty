import React from 'react'

export default function RightNav() {
  return (
    <ul className="navbar-nav">
    <li className="nav-item">
      <a className="nav-link active" aria-current="page" href="#">خانه</a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="#">آرایشگران   
    </a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="#">Pricing</a>
    </li>
    <li className="nav-item dropdown">
      <a className="nav-link dropdown-toggle " href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        Dropdown link
      </a>
      <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
        <li><a className="dropdown-item" href="#">Action</a></li>
        <li><a className="dropdown-item" href="#">Another action</a></li>
        <li><a className="dropdown-item" href="#">Something else here</a></li>
      </ul>
    </li>
  </ul>
  )
}
