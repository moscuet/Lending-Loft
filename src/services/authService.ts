import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/";
class  AuthService {
  login  (username: string, password: string) {
    return axios
      .post(API_URL + "signin", {
        username,
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
  register (firstName: string, lastName: string, email: string, phoneNumber:string, address: string, password: string ){
    console.log('form submit request to authservice',firstName,lastName,email,phoneNumber,address,password)
    return axios
      .post('http://localhost:3001/api/auths/signup', {
        firstName,
        lastName, 
        email, 
        phoneNumber, 
        address, 
        password
      })
      
  }
  // /api/auth'/signup
  getCurrentUser () {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  }
}

export default new AuthService();