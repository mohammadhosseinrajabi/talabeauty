import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Alert } from '../../utils/alert'

export default function Logout() {
    const [isLoading,setIsLoading]=useState(true)
    useEffect(()=>{
        const accessToken = localStorage.getItem('accessToken')
        const refreshToken = localStorage.getItem('refreshToken')


        axios.post('/authentication/LogOut',
            {refreshToken:refreshToken},
            {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'  
              },
        }).then(res=>{
            if(res.status===200){
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                setIsLoading(false)
            }
            else{
                Alert("متاسفم!","error")
            }
        }).catch(error=>{
            setIsLoading(false)
            Alert("متاسفانه مشکلی از سمت سرور رخ داده!","error")
        })
    },[])
  return (
      <>
      {
          isLoading ?(
            <h1 className='text-center waiting_center'>لطفا صبر کنید ...</h1>
        ):(   
            <Navigate to="/auth/login"/>
        )
      }
    </>
  )
}
