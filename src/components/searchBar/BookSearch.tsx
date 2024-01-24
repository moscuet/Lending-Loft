import { Form } from 'react-bootstrap'
import React, { ChangeEvent } from 'react'
import './booksearch.css'
import styled from 'styled-components';

const ResponsiveForm = styled(Form)`
  width: 350px;

  @media (max-width: 480px) {
    width: 100%;
  }

  .form-control {
    ::placeholder {
      color: #b3b3b3;
      opacity: 1;
    }

    &:focus {
      border: none;
      outline: none;
      box-shadow: none;
    }

    :-ms-input-placeholder { 
      color: #b3b3b3;
    }

    ::-ms-input-placeholder {
      color: #b3b3b3;
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
              placeholder="book name, author, category"
              onChange={handleChange}
            />
          </Form.Group>
        </ResponsiveForm>
      </div>
    </div>
  );
}
