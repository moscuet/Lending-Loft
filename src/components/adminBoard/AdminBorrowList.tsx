import React, { useState, useEffect } from 'react'
import userService from '../../services/userService'
import borrowService from '../../services/borrowservice'
import { Borrow } from '../../types'
import Select from './Select'
import { Route, Routes as Switch } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'
import SingleBook from '../SingleBook'
import { LoaderContainer } from '../ui/StyledComponenet'
import Loader from 'react-ts-loaders'
import NotFound from '../ui/NotFound'

import './adminboard.css'
import '../userBoard/userboard.css'

export default function AdminBorrowList() {
  const [borrowList, setBorrowList] = useState<Borrow[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    userService.getAllBorrowList().then(
      (response) => {
        setBorrowList(response.data)
      },
      (error) => {
        setMessage(error.message);
      }
    ).finally(() => {
      setLoading(false)
    });
  }, [])

  const returnOtion = [
    { label: '---', value: '0' },
    { label: '2 day', value: '2' },
    { label: '5 day', value: '5' },
    { label: '7 day', value: '7' },
  ]

  const handleReturn = (borrow: Borrow) => {
    const consent = window.confirm(
      `${borrow.isReturned ? 'Book did not receive yet' : 'Book received'}`
    )


    if (consent) {
      const books = borrow.bookId.map((b) => b._id)
      const newBorrow = {
        ...borrow,
        bookId: books,
        isReturned: !borrow.isReturned,
      }
      borrowService.updateBorrow(newBorrow).then((res) => {
        userService.getAllBorrowList().then((res) => {
          setBorrowList(res.data)
        })
      })
    }
  }

  const handleReturnDate = (id: string, day: string) => {
    console.log('handle return', id, day)
    const borrow = borrowList.filter((b) => b._id === id)[0]
    const books = borrow.bookId.map((b) => b._id)
    const newReturndate = new Date(
      new Date(borrow.returnDate).getTime() + Number(day) * 24 * 3600 * 1000
    )
    console.log(newReturndate)
    const newBorrow = {
      ...borrow,
      bookId: books,
      returnDate: newReturndate,
    }
    borrowService.updateBorrow(newBorrow).then((res) => {
      userService.getAllBorrowList().then((res) => {
        setBorrowList(res.data)
      })
    })
  }

  const handleClick = (id: string) => {
    navigate(`/admin/borrows/${id}`)
  }

  return (
    <>
      {
        loading && <LoaderContainer>
          <Loader type="spinner" color="var(--loader-color)" />
        </LoaderContainer>
      }

      {!loading &&
        <div className="admin__borrowList">
          <div style={{ minWidth: '920px' }} >
            <ol>
              <li>
                <div> Book Name</div>
                <div> image</div>
                <div> borrow Date</div>
                <div>Due date</div>
                <div>status</div>
                <div>Action</div>
                <div>Extend deadline</div>
              </li>
              {borrowList.length > 0 ? borrowList.map((borrow: Borrow) => {
                const { borrowDate, returnDate, isReturned, bookId, _id } = borrow
                const getFormattedDate = (date: Date) => {
                  let d = new Date(date)
                  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
                }
                const isOverDue =
                  new Date().getTime() > new Date(returnDate).getTime()
                return (
                  <li key={`key-${_id}`}>
                    <div
                      onClick={() => handleClick(borrow._id ? bookId[0]._id : '')}
                      onKeyPress={() => handleClick(borrow._id ? borrow._id : '')}
                      role="button"
                      tabIndex={0}
                    >
                      {bookId[0].title}
                    </div>
                    <div>
                      <img src={`${bookId[0].img}`} alt="book pic" />{' '}
                    </div>
                    <div>{getFormattedDate(borrowDate)}</div>
                    <div
                      className={!isReturned && isOverDue ? 'red-text' : 'green-text'}
                    >
                      {getFormattedDate(returnDate)}
                    </div>
                    <div className={!isReturned ? 'danger-text' : ''} >{isReturned ? 'Returned' : 'Not Returned'}</div>
                    <button
                      className={!isReturned ? 'nonreturn' : 'return'}
                      onClick={() => handleReturn(borrow)}
                    >
                      {isReturned ? 'Not Returned' : 'Returned'}
                    </button>
                    <Select
                      handleReturnDate={handleReturnDate}
                      id={borrow._id}
                      opts={returnOtion}
                    />
                  </li>
                )
              })

                :
                message ? <NotFound message={'No book borrowed yet!'} />
                  :
                  <NotFound message={message} />
              }
            </ol>
            <div className="admin__borrowList__book">
              <Switch>
                <Route path={'/:id'} element={<SingleBook />} />
              </Switch>
            </div>
          </div>
        </div>
      }
    </>
  )
}
