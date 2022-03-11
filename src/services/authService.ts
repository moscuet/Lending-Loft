import axios from "axios";
//import { USER_DATA } from "../types";
const API_URL = process.env.REACT_APP_API_URL;
class  AuthService {
  login  (useremail: string, password: string) {
    console.log('from authservice/login: ', useremail, password)
    return axios
      .post(API_URL + "/auths/signin", {
        useremail,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout () {
    localStorage.removeItem("user");
  }
  
  register (firstName: string, lastName: string, useremail: string, phoneNumber:string, address: string, password: string ){
    return axios
      .post(API_URL + '/auths/signup', {
        firstName,
        lastName, 
        useremail, 
        phoneNumber, 
        address, 
        password
      })
      
  }

  // /api/auth'/signup
  getCurrentCustomer () {
    const userStr = localStorage.getItem("user");
    console.log('user from authservice/auths/getCurrentcustomer', userStr )
    if (userStr ) return JSON.parse(userStr );
    return null;
  }
}

export default new AuthService();