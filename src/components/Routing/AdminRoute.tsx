import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { AppState } from '../../types'

import LoadingToRedirect from './LoadingToRedirect'

const AdminRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const user = useSelector((state: AppState) => state.auth.user)
  const [ok, setOk] = useState(false)

  useEffect(() => {
    if (user && user._id) {
      user.roles === 'admin' ? setOk(true) : setOk(false)
    }
  }, [user])

  return ok ? children : <LoadingToRedirect />
}
export default AdminRoute
