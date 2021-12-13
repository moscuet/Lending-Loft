/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:3002/api';

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
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const deleteUser = (id:string) => {
  //http://localhost:3000/customers/id

  return axios.delete(API_URL + `/customers/${id}`, { headers: authHeader() });

}
export default {
  deleteUser,
  getSingleBook ,
  getPublicContent,
  getCustomerBoard,
  getAdminBoard,
};