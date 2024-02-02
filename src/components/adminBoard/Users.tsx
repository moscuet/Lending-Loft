import React, { useEffect, useState } from 'react'

import userService from '../../services/userService'
import { USER_DATA } from '../../types'

import './adminboard.css'
import Loader from 'react-ts-loaders'
import { LoaderContainer } from '../ui/StyledComponenet'
import NoDataFound from '../ui/NoDataFound'
import NotFound from '../ui/NotFound'


export default function Users() {

  const [users, setUsers] = useState<USER_DATA[]>([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    setLoading(true)
    userService.getCustomerBoard().then(
      (response) => {
        setUsers(response.data);
      },
      (error) => {
        setMessage(error.message);
      }
    ).finally(() => {
      setLoading(false)
    });
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
    <>
      {
        loading && <LoaderContainer>
          <Loader type="spinner" color="var(--loader-color)" />
        </LoaderContainer>
      }

      {!loading && <div className='admin__usersList'>
        <ol >
          <li>
            <div> Name</div>
            <div> Roles</div>
            <div>Action</div>
          </li>
          {users.length > 0 ? users.map(user => (
            <li key={user._id}>
              <div> {`${user.firstName} ${user.lastName}`}</div>
              <div> {`${user.roles} `}</div>
              <div>
                <button onClick={() => handleDeleteUser(user._id)} disabled={user.roles === 'admin' || user.roles === 'moderator' || user.firstName === 'Test'}>
                  Delete
                </button>
              </div>
            </li>
          ))
            :
            message ? <NotFound message={message} />
              :
              <NoDataFound type={'user'} />
          }


        </ol>

      </div>}


    </>
  )
}

