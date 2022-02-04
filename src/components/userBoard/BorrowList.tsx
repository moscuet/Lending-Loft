import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import './userboard.css'

import userService from '../../services/userService'
import borrowService from '../../services/borrowservice'
import { AppState, Borrow } from '../../types'
import Select from './Select'

export default function BorrowList() {
  const userId: string = useSelector((state: AppState) => state.auth.user._id)

  const [borrowList, setBorrowList] = useState<Borrow[]>([])

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
  }, [])

  const returnOtion = [ {label:'---', value:'0'} ,{label:'twoDay', value:'2'} , {label:'fiveDay', value:'5'},{label:'SevenDay', value:'7'} ]

  const handleReturn = (borrow: Borrow, opts?:string) => {
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

  const handleClick = (id: string) => {
    window.location.pathname = `/user/borrow/${id}`
  }

  return (
    <div className="user__borrowList">
      <ol>
        <li>
          <div> Book Name</div>
          <div> image</div>
          <div> borrow Date</div>
          <div>Return date</div>
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
            new Date(returnDate).getTime() > new Date(borrowDate).getTime()
          console.log(isOverDue)
          return (
            <li>
              <div
                onClick={() => handleClick(borrow._id ? borrow._id : '')}
                onKeyPress={() => handleClick('hh')}
                role="button"
                tabIndex={0}
              >
                {bookId[0].title}{' '}
              </div>
              <div>
                <img src={`${bookId[0].img}`} alt="boom pic" />{' '}
              </div>
              <div>{getFormattedDate(borrowDate)}</div>
              <div>{getFormattedDate(returnDate)}</div>
              <div>{isReturned ? 'Returned' : 'Not Returned'}</div>
              <button
                className={isOverDue && !isReturned ? 'overdue' : 'nonoverdue'}
                onClick={() => handleReturn(borrow)}
              >
                {isReturned ? 'Not Returned' : 'Returned'}
              </button>
              <Select   opts = {returnOtion}/>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
