import React, { useEffect, useState } from 'react'

import userService from '../services/userService'
import productService from '../services/productService'

import { Book }from '../types'

import '../components/user.css'

import EditBook from './EditBook'
export default function Books() {
  
  const [ books, setBooks] = useState<Book[]>([])
  const [ message, setMessage] = useState('')
  const [ isEdit, setIsEdit] = useState(false)
  const [ editId, setEditId] = useState('')
 
  console.log(message)
  useEffect(() => {
    userService.getPublicContent().then(
      (response) => {
        setBooks(response.data);
        console.log(response.data)
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
  const handleDeleteBook = (id:string) =>{
    productService.deleteBook(id).then(
      res =>{
        const updatBooks = books.filter( book =>  book._id !== id)
        setBooks(updatBooks)
      })
  }
  const handleEditBook = (id:string) =>{
    setIsEdit(true)
    setEditId(id)
  }

  const handleEditStatus = () => {
    setTimeout(() => {
      setIsEdit(!isEdit)
    }, 1000);
  }



  return (
    <div>
      {
        !isEdit && (
          <div className = 'admin__booksList'>
            <ol >
              <li>
                <div> title</div>
                <div> Cover</div>
                <div>Author</div>
                <div>Id</div>
                <div>Action</div>

          
              </li> 
              {books.map( book => (
                <li>
                  <div> {`${book.title}`}</div>
                  <div className='book__img'>
                    <div style = {{  
                      width:'100px',
                      height:'80px',
                      backgroundImage: `url(${book.img})`,
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat'
                    }}> </div>
                  </div>
                  <div> {`${book.authors[0].firstName+" " +book.authors[0].lastName}`}</div>

                  <div> {`${book._id}`}</div>
                  <div>
                    <button onClick = {()=>handleDeleteBook(book._id)}>Delete</button>
                    <button className='editButton' onClick = {()=>handleEditBook(book._id)}>Edit</button>
                  </div>
                </li> )
              )} 
            </ol>
     
          </div>
        )
      }
      {
        isEdit &&(<EditBook eId={editId} editStatus = {handleEditStatus} />)
      }

    </div>
  )
}

