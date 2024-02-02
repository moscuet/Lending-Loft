import React, { useEffect, useState } from 'react'

import userService from '../../services/userService'
import { USER_DATA } from '../../types'
import Loader from 'react-ts-loaders'
import { LoaderContainer } from '../ui/StyledComponenet'
import NoDataFound from '../ui/NoDataFound'
import NotFound from '../ui/NotFound'
import '../../styles/adminboard.css'
import ConfirmPopup from '../ui/deletePopup'
import { toast } from 'react-toastify'

export default function Users() {
  const [users, setUsers] = useState<USER_DATA[]>([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    userService
      .getCustomerBoard()
      .then(
        (response) => {
          setUsers(response.data)
        },
        (error) => {
          setMessage(error.message)
        }
      )
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const handleDeleteUser = (id: string) => {
    setDeleteId(id)
    setShowConfirm(true)
  }
  const confirmDeleteUser = () => {
    if (!deleteId) return
    userService
      .deleteUser(deleteId)
      .then(() => {
        const updatedUsers = users.filter((user) => user._id !== deleteId)
        setUsers(updatedUsers)
        toast.success('Successfully deleted the User')
      })
      .catch((error) => {
        toast.error(`Failed to delete the User: ${error.message}`)
      })
      .finally(() => {
        setShowConfirm(false)
        setDeleteId(null)
      })
  }

  const cancelDelete = () => {
    setShowConfirm(false)
    setDeleteId(null)
  }

  return (
    <>
      {loading && (
        <LoaderContainer>
          <Loader type="spinner" color="var(--loader-color)" />
        </LoaderContainer>
      )}

      {!loading && (
        <div className="admin__usersList">
          <ol>
            <li>
              <div> Name</div>
              <div> Roles</div>
              <div>Action</div>
            </li>
            {users.length > 0 ? (
              users.map((user) => (
                <li key={user._id}>
                  <div> {`${user.firstName} ${user.lastName}`}</div>
                  <div> {`${user.roles} `}</div>
                  <div>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      disabled={
                        user.roles === 'admin' ||
                        user.roles === 'moderator' ||
                        user.firstName === 'Test'
                      }
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            ) : message ? (
              <NotFound message={message} />
            ) : (
              <NoDataFound type={'user'} />
            )}
          </ol>
          {showConfirm && deleteId && (
            <ConfirmPopup
              message="Are you sure you want to delete this user?"
              onCancel={cancelDelete}
              onDelete={confirmDeleteUser}
            />
          )}
        </div>
      )}
    </>
  )
}
