import React, { useContext } from 'react'
import LoginHomeBtn from './loginHomeBtn'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

export default function LeftNav() {



  return (
    <form className="d-flex">

    <LoginHomeBtn targetPath="/login" title="ورود کاربران" showUserNameIfLoggedIn={true}/>
    {/* <LoginHomeBtn targetPath="/LoginAdmin" title="ورود ادمین" showUserNameIfLoggedIn={false}/> */}

    {/* <LoginHomeBtn  onClick={logOut} title="خروج" showUserNameIfLoggedIn={false}/> */}

     
   </form>
  )
}
