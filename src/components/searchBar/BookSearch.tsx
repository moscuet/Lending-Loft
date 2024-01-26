import { Form } from 'react-bootstrap'
import React, { ChangeEvent } from 'react'
import './booksearch.css'
import styled from 'styled-components';

const ResponsiveForm = styled(Form)`
  .form-control {
    background-color: var(--placeholder-bg-color);
    border: 1px solid transparent;  // Ensures a transparent border by default
    transition: border-color 0.15s ease-in-out;  // Smooth transition for border property
    border: none;

    ::placeholder {
      color: var(--placeholder-text-color);
    }

    :-ms-input-placeholder { 
      color: var(--placeholder-text-color);
    }

    ::-ms-input-placeholder {
      color: var(--placeholder-text-color);
    }

    &:focus {
      border: none;
      box-shadow: none;
      outline: none;
    }
  }
`;



type Handleseacrh = (word: string) => void
export default function BookSearch(props: { handleSearch: Handleseacrh }) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => props.handleSearch(event.currentTarget.value);

  return (
    <div className='search-form-container' style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <div>
        <h3 style={{ marginRight: '20px', color: 'var(--form-title-text-color)' }}>Pick your choice</h3>
      </div>
      <div>
        <ResponsiveForm>
          <Form.Group className="mb-3" controlId="searchInput">
            <Form.Control
              type="text"
              placeholder="Book, Author, Category"
              onChange={handleChange}
            />
          </Form.Group>
        </ResponsiveForm>
      </div>
    </div>
  );
}
