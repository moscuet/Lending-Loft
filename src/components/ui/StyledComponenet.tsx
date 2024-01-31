import { Form } from "formik";
import styled from "styled-components";


const CONTAINER = styled.div`
  background: var(--form-bg-color);
  color: var(--text-color);
  border-radius: 3px;
  height: auto;
  width: 90%;
  margin: 2rem auto;
  padding: 20px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  @media(max-width: 420px) {
    width: 95%;
    margin: 0.5rem auto;
  }
  @media(min-width: 786px) {
    width: 60%;
  }
  h3 {
    text-align: center;
    color: var(--form-title-text-color);
    padding-top: .5em;
  }
  .form-group label {
    color: var(--text-color);
    margin-bottom: 0.5em;
  }
  .alert.alert-danger {
    color: var(--alert-color);
    background-color: transparent;
    border: none;
    margin: 0;
    padding: 0; 
  }
`;


const MYFORM = styled(Form)`
  text-align: left;
  padding-top: 1em;
  padding-bottom: 1em;

  .form-control {
    background-color: var(--placeholder-bg-color);
    color: var(--text-color);
    border: 1px solid #ced4da;

    ::placeholder {
      color: var(--placeholder-color);
      opacity: .5;
    }

    &:focus {
      outline: none;  
      box-shadow: none
    }

    :-ms-input-placeholder { 
      color: var(--placeholder-color);
    }

    ::-ms-input-placeholder {
      color: var(--placeholder-color);
    }
  }

  .form-group {
    margin-bottom: 1em; 

    &:last-child {
      margin-bottom: 0;
    }
  }

  .alert.alert-danger {
    color: var(--alert-color);
    background-color: transparent;
    border: none;
    margin: 0;
    margin-top: 0.5em;
    padding: 0.0em;
    font-size: 0.85em;
  }
`;

const BUTTON = styled.button`
  background: var(--button-primary-bg-color);
  color: var(--button-primary-text-color);
  border: none;
  border-radius: 4px;
  padding: 8px 20px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: var(--link-hover-color);
  }

  &:active {
    background: var(--button-primary-bg-color);
  }

  &:disabled {
    background: var(--button-disabled-bg-color, #cccccc); 
    color: var(--button-disabled-text-color, #666666);
    cursor: not-allowed;
    opacity: 0.7; 
    &:hover {
      background: var(--button-disabled-bg-color, #cccccc); 
    }
  }

  margin-right: 1em;
  a {
    color: inherit; 
    text-decoration: none; 
    display: inline-block; 
  }
`;


const SECONDARYBUTTON = styled.button`
  background: var(--accent-color);
  color: var(--button-primary-text-color);
  border: none;
  border-radius: 4px;
  padding: 8px 20px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: var(--link-hover-color);
  }

  &:active {
    background: var(--button-primary-bg-color);
  }

  margin-right: 1em;
`;


const CANCELBUTTON = styled.button`
  background: var(--button-secondary-bg-color);
  color: var(--button-secondary-text-color);
  border: none;
  border-radius: 4px;
  padding: 8px 20px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;

  &:hover {
    background-color: var(--hover-bg-color);
    cursor: pointer; 
   }

  &:active {
    background: var(--button-primary-bg-color);
  }

  margin-right: 1em;
`;



const FormRow = styled.div`
  display: flex;
  flex-direction: column;

  @media(min-width: 768px) {
    flex-direction: row;

    .form-group {
      flex: 1;
      &:not(:last-child) {
        margin-right: 1em;
      }
    }
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 200px);
`;


export { CONTAINER, MYFORM, FormRow, BUTTON, CANCELBUTTON, LoaderContainer,SECONDARYBUTTON }