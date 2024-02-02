import React, { useEffect, useState } from 'react'

import authorService from '../../services/authorService'

import { Author } from '../../types'

import EditAuthor from './EditAuthor'
import { LoaderContainer } from '../ui/StyledComponenet'
import Loader from 'react-ts-loaders'
import NotFound from '../ui/NotFound'
import { toast } from 'react-toastify'

import '../../styles//adminboard.css'
import ConfirmPopup from '../ui/deletePopup'

export default function Authors() {
  const [authors, setAuthors] = useState<Author[]>([])
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [editId, setEditId] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    setIsLoading(true)
    authorService
      .getAllAuthor()
      .then(
        (response) => {
          setAuthors(response.data)
        },
        (error) => {
          setMessage(error.message)
        }
      )
      .finally(() => {
        setIsLoading(false)
      })
  }, [isEdit])

  const handleDeleteAuthor = (id: string) => {
    setDeleteId(id)
    setShowConfirm(true)
  }
  const confirmDeleteAuthor = () => {
    if (!deleteId) return
    authorService
      .deleteAuthor(deleteId)
      .then(() => {
        const updatedAuthors = authors.filter(
          (author) => author._id !== deleteId
        )
        setAuthors(updatedAuthors)
        toast.success('Successfully removed the author')
      })
      .catch((error) => {
        toast.error('Failed to remove the author: ' + error.message)
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

  const handleEditAuthor = (id: string) => {
    setIsEdit(true)
    setEditId(id)
  }

  const handleEditStatus = () => {
    setIsEdit(!isEdit)
  }

  return (
    <div>
      {isLoading && (
        <LoaderContainer>
          <Loader type="spinner" color="var(--loader-color)" />
        </LoaderContainer>
      )}
      {!isLoading && !isEdit && message && <NotFound message={message} />}
      {!isLoading && !isEdit && !message && (
        <div className="admin__authorsList">
          <ol>
            <li>
              <div> Name</div>
              <div> Id</div>
              <div>Action</div>
            </li>
            {authors.map((author) => (
              <li>
                <div> {`${author.firstName} ${author.lastName}`}</div>
                <div> {`${author._id}`}</div>
                <div>
                  <button
                    className="deleteButton"
                    onClick={() => handleDeleteAuthor(author._id)}
                    disabled={author.firstName === 'Test'}
                  >
                    Delete
                  </button>
                  <button
                    className="editButton"
                    onClick={() => handleEditAuthor(author._id)}
                    disabled={author.firstName === 'Test'}
                  >
                    Edit
                  </button>
                </div>
              </li>
            ))}
          </ol>
          {showConfirm && deleteId && (
            <ConfirmPopup
              message={`Are you sure you want to delete the author?`}
              onCancel={cancelDelete}
              onDelete={confirmDeleteAuthor}
            />
          )}
        </div>
      )}
      {!isLoading && isEdit && (
        <EditAuthor eId={editId} editStatus={handleEditStatus} />
      )}
    </div>
  )
}
