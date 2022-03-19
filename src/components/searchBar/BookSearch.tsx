import { Form } from 'react-bootstrap'
import React, { ChangeEvent} from 'react'
import './booksearch.css'
type Handleseacrh = (word:string) =>void

export default function BookSearc(props:{handleSearch:Handleseacrh}) {
 
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => props.handleSearch(event.currentTarget.value)
  
  return (
    <div
      className ='search-form-container' style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
    >
      <div><h3 style = { { marginRight:'20px', color:'green'}}>Pick your choice</h3></div>
      <div>
        <Form style={{ width: '350px' }}>
          <Form.Group className="mb-3" controlId="searchInput">
            {/* <Form.Label>Email address</Form.Label> */}
            <Form.Control
              type="text"
              placeholder="search by book, author, catagory"
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </div>
    </div>
  )
}