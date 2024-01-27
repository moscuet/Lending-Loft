import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import userService from '../../services/userService'
import productService from '../../services/productService'

import { Book } from '../../types'

import './adminboard.css'

import EditBook from '../EditBook'
export default function Books() {
  const navigate = useNavigate();

  const [books, setBooks] = useState<Book[]>([])
  const [message, setMessage] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [editId, setEditId] = useState('')

  console.log(message)
  useEffect(() => {
    userService.getPublicContent().then(
      (response) => {
        setBooks(response.data);
        console.log('books##########', response.data)
      },
      (error) => {
        const _Books =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setMessage(_Books);
      }
    );
  }, [isEdit]);
  const handleDeleteBook = (id: string) => {
    productService.deleteBook(id).then(
      res => {
        const updatBooks = books.filter(book => book._id !== id)
        setBooks(updatBooks)
      })
  }
  const handleEditBook = (id: string) => {
    setIsEdit(true)
    setEditId(id)
  }

  const handleEditStatus = () => {
    setTimeout(() => {
      setIsEdit(!isEdit)
    }, 1000);
  }

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/assets/book-placeholder.png';
  };


  return (
    <div>
      {
        !isEdit && (
          <div className='admin__booksList'>
            <ol >
              <li>
                <div> title</div>
                <div> Cover</div>
                <div>Author</div>
                <div>Action</div>

              </li>
              {books.map(book => (
                <li >
                  <div> {`${book.title}`}</div>

                  <div
                    className='book__img'
                    onClick={() => navigate(`/books/${book._id}`)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        navigate(`/books/${book._id}`);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`View details of ${book.title}`}
                  >
                    <img
                      src={book.img}
                      alt={book.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                      onError={handleImageError}
                    />
                  </div>

                  <div> {`${book?.authors[0]?.firstName + " " + book?.authors[0]?.lastName}`}</div>

                  <div>
                    <button className='deleteButton' onClick={() => handleDeleteBook(book._id)} disabled={book.title.includes('Test')}>Delete</button>
                    <button className='editButton' onClick={() => handleEditBook(book._id)} disabled={book.title.includes('Test')}>Edit</button>
                  </div>
                </li>)
              )}
            </ol>

          </div>
        )
      }
      {
        isEdit && (<EditBook eId={editId} editStatus={handleEditStatus} />)
      }

    </div>
  )
}

