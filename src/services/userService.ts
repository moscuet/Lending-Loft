/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:api/books/';

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getCustomerBoard = () => {
  return axios.get(API_URL + "customer", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

export default {
  getPublicContent,
  getCustomerBoard,
  getAdminBoard,
};