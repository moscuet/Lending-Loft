import React, { useEffect, useState } from 'react'

import userService from '../../services/userService'
import { USER_DATA } from '../../types'

import './adminboard.css'


export default function Users() {

  const [users, setUsers] = useState<USER_DATA[]>([])
  const [message, setMessage] = useState('')

  console.log(message)
  useEffect(() => {
    userService.getCustomerBoard().then(
      (response) => {
        setUsers(response.data);
      },
      (error) => {
        const _Users =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setMessage(_Users);
      }
    );
  }, []);
  const handleDeleteUser = (id: string) => {
    userService.deleteUser(id).then(
      res => {
        const updatUsers = users.filter(user => user._id !== id)
        setUsers(updatUsers)
      }
    )

  }
  return (
    <div  className='admin__usersList'>
      <ol >
        <li>
          <div> Name</div>
          <div> Roles</div>
          <div>Action</div>
        </li>
        {users.map(user => (
          <li key={user._id}>
            <div> {`${user.firstName} ${user.lastName}`}</div>
            <div> {`${user.roles} `}</div>
            <div>
              <button onClick={() => handleDeleteUser(user._id)} disabled={user.roles === 'admin' || user.firstName==='Test'}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ol>

    </div>
  )
}

