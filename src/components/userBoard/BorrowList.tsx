import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import './userboard.css'

import userService from '../../services/userService'
import { AppState, Borrow} from '../../types'
export default function BorrowList() {

  const userId:string= useSelector( (state:AppState) =>state.auth.user._id)

  const [borrowList, setBorrowList] = useState<Borrow[]>([])

  useEffect(() => {
    userService.getBorrowList(userId).then(
      (response) => {
        console.log('responsed borrowlist',response.data);
        setBorrowList(response.data)
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(_content)

      }
    );
  }, []);
  //const { borrowDate, returndate,isreturned} =  borrowList
  console.log('borrowList', borrowList)
  return (
    <div className = 'user__borrowList'>
      <ol >
        <li>
          <div> Book Name</div>
          <div> image</div>
          <div> borrow Date</div>
          <div>Return date</div>
          <div>status</div>
        </li> 
        {borrowList.map( (borrow:Borrow )=> {
          const { borrowDate, returnDate,isReturned, bookId} =  borrow
           
          const getFormattedDate = (date:Date) =>{
            let d= new Date(date)
            return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
          }
          return <li>
            <div>{bookId[0].title} </div>
            <div>  <img src= {`${bookId[0].img}`} alt="boom pic" />  </div>
            <div>{getFormattedDate(borrowDate)}</div>
            <div>{getFormattedDate(returnDate)}</div>
            <div>{isReturned? 'Returned' : 'Not Returned'}</div>
          </li> 
        }
        )} 
      </ol>
     
    </div>
  )
} 
