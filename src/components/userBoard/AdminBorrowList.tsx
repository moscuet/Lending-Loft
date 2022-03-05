import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import './userboard.css'

import userService from '../../services/userService'
import borrowService from '../../services/borrowservice'
import { AppState, Borrow } from '../../types'
import Select from './Select'
import { Route, Switch } from 'react-router-dom'

import { useHistory } from 'react-router-dom'
import SingleBook from '../SingleBook'

export default function AdminBorrowList() {
  const userId: string = useSelector((state: AppState) => state.auth.user._id)

  const [borrowList, setBorrowList] = useState<Borrow[]>([])

  const history = useHistory()

  useEffect(() => {
    userService.getBorrowList(userId).then(
      (response) => {
        setBorrowList(response.data)
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        console.log(_content)
      }
    )
  })

  const returnOtion = [
    { label: '---', value: '0' },
    { label: 'twoDay', value: '2' },
    { label: 'fiveDay', value: '5' },
    { label: 'SevenDay', value: '7' },
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
        userService.getBorrowList(userId).then((res) => {
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
      userService.getBorrowList(userId).then((res) => {
        setBorrowList(res.data)
      })
    })
  }

  const handleClick = (id: string) => {
    //window.location.pathname = `/admin/${id}`
    history.push(`/admin/${id}`)
  }

  return (
    <div className="admin__borrowList">
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
        {borrowList.map((borrow: Borrow) => {
          const { borrowDate, returnDate, isReturned, bookId } = borrow
          const getFormattedDate = (date: Date) => {
            let d = new Date(date)
            return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
          }
          const isOverDue =
            new Date().getTime() > new Date(returnDate).getTime()
          console.log('now, overdue', new Date(), isOverDue)
          return (
            <li>
              <div
                onClick={() => handleClick(borrow._id ? bookId[0]._id : '')}
                onKeyPress={() => handleClick(borrow._id ? borrow._id : '')}
                role="button"
                tabIndex={0}
              >
                {bookId[0].title}{' '}
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
              <div>{isReturned ? 'Returned' : 'Not Returned'}</div>
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
        })}
      </ol>
      <div className="admin__borrowList__book">
        <Switch>
          <Route exact path={'/admin/:id'} component={SingleBook} />
        </Switch>
      </div>
    </div>
  )
}
