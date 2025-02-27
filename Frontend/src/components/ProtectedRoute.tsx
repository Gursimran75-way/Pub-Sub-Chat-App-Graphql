import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { RootState } from '../Store/store';

const ProtectedRoute = (childern) => {
    const { isLoggedIn} = useSelector((state: RootState)=>state.chat)
    if (!isLoggedIn) {
        <Navigate to='/auth' />;
    }else{
        <Navigate to='/' />;
    }
}

export default ProtectedRoute