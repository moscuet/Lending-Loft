import { Form } from 'react-bootstrap'
import React, { ChangeEvent, useState } from 'react'

export default function BookSearc() {
  const [value, setValue] = useState('')
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
  }
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
    >
      <Form style={{ width: '350px' }}>
        <Form.Group className="mb-3" controlId="searchInput">
          {/* <Form.Label>Email address</Form.Label> */}
          <Form.Control
            type="text"
            value = {value}
            placeholder="book/author/catagory"
            onChange={handleChange}
          />
        </Form.Group>
      </Form>
    </div>
  )
}
