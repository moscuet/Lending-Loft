/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import { USER_DATA } from '../types';
import authHeader from './authHeader';

//const dotenv = require('dotenv');

// const API_URL = 'https://library-server300.herokuapp.com/api/';
//const API_URL = "http://localhost:3002/api/";
const API_URL = process.env.REACT_APP_API_URL

const getSingleBook = (id:string|undefined) => {
  return axios.get(API_URL + `/books/${id}`);
};

const getPublicContent = () => {
  return axios.get(API_URL + "/books/all");
};


const getCustomerBoard = () => {
  return axios.get(API_URL + '/customers' , { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "/admin", { headers: authHeader() });
};

const deleteUser = (id:string) => {
  //http://localhost:3000/customers/id
  return axios.delete(API_URL + `/customers/${id}`, { headers: authHeader() });

}

const updateUser =  (user:USER_DATA, id:string) =>{
  return axios.put(API_URL + `/customers/${id}`, user)
    .then(response => {
      const userStr = (localStorage.getItem("user"));
      const oldUserData = userStr?JSON.parse(userStr):''
      const updatedUser = {...oldUserData,...user}
      localStorage.setItem("user", JSON.stringify(updatedUser));
        
      return response.data;
    });
}

const getBorrowList = (id:string) =>{
  console.log(id)
  return axios.get(`${API_URL}/borrows?customerId=${id}`, { headers: authHeader() });
}

const getAllBorrowList = () =>{
  return axios.get(`${API_URL}/borrows`, { headers: authHeader() });
}

export default {
  deleteUser,
  updateUser,
  getSingleBook ,
  getBorrowList,
  getAllBorrowList,
  getPublicContent,
  getCustomerBoard,
  getAdminBoard,
};