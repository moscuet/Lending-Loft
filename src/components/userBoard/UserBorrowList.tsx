import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import './userboard.css'

import userService from '../../services/userService'
import { AppState, Borrow } from '../../types'
import { Route, Routes as Switch } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'
import SingleBook from '../SingleBook'

export default function UserBorrowList() {
  const userId: string = useSelector((state: AppState) => state.auth.user._id)

  const [borrowList, setBorrowList] = useState<Borrow[]>([])

  const navigate = useNavigate()

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClick = (id: string) => {
    navigate(`/user/borrows/${id}`)
  }

  return (
    <div className="user__borrowList">
      <ol>
        <li>
          <div> Book Name</div>
          <div> Image</div>
          <div> Borrow Date</div>
          <div>Due Date</div>
          <div>Status</div>
        </li>
        {borrowList.map((borrow: Borrow, i) => {
          const { borrowDate, returnDate, isReturned, bookId } = borrow
          const getFormattedDate = (date: Date) => {
            let d = new Date(date)
            return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
          }
          const isOverDue =
            new Date().getTime() > new Date(returnDate).getTime()
          return (
            <li key={bookId[0]._id + i}>
              <div
                onClick={() => handleClick(borrow._id ? bookId[0]._id : '')}
                onKeyPress={() => handleClick(borrow._id ? borrow._id : '')}
                role="button" // role and tabindex to give div functionality of button: typesript fact
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
            </li>
          )
        })}
      </ol>
      <div className="admin__borrowList__book">
        <Switch>
          <Route path={'/:id'} element = {<  SingleBook   />} /> 
        </Switch>
      </div>
    </div>
  )
}
