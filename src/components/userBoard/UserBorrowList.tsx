import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import './userboard.css'

import userService from '../../services/userService'
import { AppState, Borrow } from '../../types'
import { Route, Routes as Switch } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'
import SingleBook from '../SingleBook'
import { LoaderContainer } from '../ui/StyledComponenet'
import Loader from 'react-ts-loaders'
import NotFound from '../ui/NotFound'

export default function UserBorrowList() {
  const userId: string = useSelector((state: AppState) => state.auth.user._id)

  const [borrowList, setBorrowList] = useState<Borrow[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    userService
      .getBorrowList(userId)
      .then(
        (response) => {
          setBorrowList(response.data)
        },
        (error) => {
          setMessage(error.message)
        }
      )
      .finally(() => {
        setLoading(false)
      })
  }, [userId])

  const handleClick = (id: string) => {
    navigate(`/user/borrows/${id}`)
  }

  return (
    <>
      {loading && (
        <LoaderContainer>
          <Loader type="spinner" color="var(--loader-color)" />
        </LoaderContainer>
      )}

      {!loading && (
        <div className="user__borrowList">
          <div style={{ minWidth: '820px' }}>
            <ol>
              <li>
                <div> Book Name</div>
                <div> Image</div>
                <div> Borrow Date</div>
                <div>Due Date</div>
                <div>Status</div>
              </li>
              {borrowList.length > 0 ? (
                borrowList.map((borrow: Borrow, i) => {
                  const { borrowDate, returnDate, isReturned, bookId } = borrow
                  const getFormattedDate = (date: Date) => {
                    let d = new Date(date)
                    return `${d.getFullYear()}-${
                      d.getMonth() + 1
                    }-${d.getDate()}`
                  }
                  const isOverDue =
                    new Date().getTime() > new Date(returnDate).getTime()
                  return (
                    <li key={bookId[0]._id + i}>
                      <div
                        onClick={() =>
                          handleClick(borrow._id ? bookId[0]._id : '')
                        }
                        onKeyPress={() =>
                          handleClick(borrow._id ? bookId[0]._id : '')
                        }
                        role="button"
                        tabIndex={0}
                      >
                        {bookId[0].title}
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          overflow: 'hidden',
                          height: '80px',
                          width: '80%',
                        }}
                      >
                        <img
                          src={`${bookId[0].img}`}
                          alt="book pic"
                          style={{
                            height: '100%',
                            width: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      </div>

                      <div>{getFormattedDate(borrowDate)}</div>
                      <div className={isOverDue ? 'danger-text' : ''}>
                        {getFormattedDate(returnDate)}
                      </div>
                      <div
                        className={
                          !isReturned && isOverDue
                            ? 'danger-text'
                            : !isReturned
                              ? 'warn-text'
                              : ''
                        }
                      >
                        {isReturned ? 'Returned' : 'Not Returned'}
                      </div>
                    </li>
                  )
                })
              ) : message ? (
                <NotFound message={'No book borrowed yet!'} />
              ) : (
                <NotFound message={message} />
              )}
            </ol>
            <div className="admin__borrowList__book">
              <Switch>
                <Route path={'/:id'} element={<SingleBook />} />
              </Switch>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
