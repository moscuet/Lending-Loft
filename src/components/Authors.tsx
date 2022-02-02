import React, { useEffect, useState } from 'react'

import authorService from '../services/authorService'
import productService from '../services/productService'

import { Author }from '../types'

import EditAuthor from './EditAuthor'
import '../components/user.css'

export default function Authors() {
  
  const [ authors, setAuthors] = useState<Author[]>([])
  const [ message, setMessage] = useState('')
  const [ isEdit, setIsEdit] = useState(false)
  const [ editId, setEditId] = useState('')

  console.log(message)
  useEffect(() => {
    authorService.getAllAuthor().then(
      (response) => {
        setAuthors(response.data);
      },
      (error) => {
        const _Authors =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setMessage(_Authors);
      }
    );
  }, []);
  const handleDeleteAuthor = (id:string) =>{
    authorService.deleteAuthor(id).then(
      res =>{
        const updatAuthors = authors.filter( book =>  book._id !== id)
        setAuthors(updatAuthors)
      })
  }
  const handleEditAuthor = (id:string) =>{
    setIsEdit(true)
    setEditId(id)

    productService.deleteBook(id).then(
      res =>{
        const updatAuthor = authors.filter( author =>  author._id !== id)
        setAuthors(updatAuthor)
      })
  }


  return (
    <div>
      {
        !isEdit && (
          <div className = 'admin__booksList'>
            <ol >
              <li>
                <div> Name</div>
                <div> Id</div>
                <div>Action</div>
              </li> 
              {authors.map( author => (
                <li>
                  <div> {`${author.firstName} ${author.lastName}`}</div>
                  <div> {`${author._id}`}</div>
                  <div>
                    <button onClick = {()=>handleDeleteAuthor(author._id)}>Delete</button>
                    <button className='editButton' onClick = {()=>handleEditAuthor(author._id)}>Edit</button>
                  </div>
                </li> )
              )} 
            </ol>
         
          </div>
        )
      }
      {
        isEdit &&(<EditAuthor eId={editId} />)
      }
    </div>
  )
}

