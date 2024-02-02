import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Book } from '../../types'
import { LoaderContainer } from '../ui/StyledComponenet'
import { toast } from 'react-toastify'

import userService from '../../services/userService'
import productService from '../../services/productService'

import EditBook from './EditBook'
import Loader from 'react-ts-loaders'
import NotFound from '../ui/NotFound'
import NoDataFound from '../ui/NoDataFound'
import ConfirmPopup from '../ui/deletePopup'
import '../../styles/adminboard.css'

export default function Books() {
  const navigate = useNavigate()
  const [books, setBooks] = useState<Book[]>([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [editId, setEditId] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    userService.getPublicContent().then(
      (response) => {
        setBooks(response.data)
        setLoading(false)
      },
      (error) => {
        setMessage(error.message)
        setLoading(false)
      }
    )
  }, [isEdit])

  const requestDeleteBook = (id: string) => {
    setDeleteId(id)
    setShowConfirm(true)
  }

  const confirmDeleteBook = () => {
    if (!deleteId) return
    productService
      .deleteBook(deleteId)
      .then(() => {
        setBooks((prev) => prev.filter((book) => book._id !== deleteId))
        toast.success('Successfully deleted the book')
      })
      .catch((error) => {
        toast.error('Error deleting the book: ' + error.message)
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

  const handleEditBook = (id: string) => {
    setIsEdit(true)
    setEditId(id)
  }

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/assets/book-placeholder.png'
  }

  return (
    <div>
      {loading ? (
        <LoaderContainer>
          <Loader type="spinner" color="var(--loader-color)" />
        </LoaderContainer>
      ) : isEdit ? (
        <EditBook eId={editId} editStatus={() => setIsEdit(!isEdit)} />
      ) : (
        <>
          {showConfirm && deleteId && (
            <ConfirmPopup
              message="Are you sure you want to delete this book?"
              onCancel={cancelDelete}
              onDelete={confirmDeleteBook}
            />
          )}
          <div className="admin__booksList">
            <ol>
              <li>
                <div> Title </div>
                <div> Cover </div>
                <div> Author </div>
                <div> Action </div>
              </li>
              {books.length > 0 ? (
                books.map((book) => (
                  <li key={book._id}>
                    <div>{book.title}</div>
                    <div
                      className="book__img"
                      onClick={() => navigate(`/books/${book._id}`)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          navigate(`/books/${book._id}`)
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label={`View details of ${book.title}`}
                    >
                      <img
                        src={book.img || '/assets/book-placeholder.png'}
                        alt={book.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                        onError={handleImageError}
                      />
                    </div>
                    <div>{`${book.authors
                      .map((author) => author.firstName + ' ' + author.lastName)
                      .join(', ')}`}</div>
                    <div>
                      <button
                        className="deleteButton"
                        onClick={() => requestDeleteBook(book._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="editButton"
                        onClick={() => handleEditBook(book._id)}
                      >
                        Edit
                      </button>
                    </div>
                  </li>
                ))
              ) : message ? (
                <NotFound message={message} />
              ) : (
                <NoDataFound type={'book'} />
              )}
            </ol>
          </div>
        </>
      )}
    </div>
  )
}
