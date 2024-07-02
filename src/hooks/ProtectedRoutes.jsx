import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = ({children,user,redirect='/login'}) => {
  if(!user) return <Navigate to={redirect} replace/>

  if(children) return children;
  return <Outlet/>;
}

export default ProtectedRoutes;