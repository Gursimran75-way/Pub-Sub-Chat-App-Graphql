import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { RootState } from '../Store/store'

const OpenRoute = ({children}) => {

    const { isLoggedIn } = useSelector((state: RootState) => state.chat)

    if(!isLoggedIn){
        return children
    }
    else{
      return  <Navigate to={"/"} />
    }
}

export default OpenRoute