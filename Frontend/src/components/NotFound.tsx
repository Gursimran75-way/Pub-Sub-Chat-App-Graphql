import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { RootState } from '../Store/store'

const NotFound = () => {
    const { isLoggedIn} = useSelector((state: RootState)=>state.chat)
  
    if(isLoggedIn) {
        return <Navigate to={"/"} />
    }else{
        return <Navigate to={"/auth"} />
    }
}

export default NotFound