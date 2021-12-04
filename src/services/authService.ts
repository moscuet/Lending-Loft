import axios from "axios";

const API_URL = "http://localhost:3002/api/auths/";
class  AuthService {
  login  (useremail: string, password: string) {
    console.log('from authservice/login: ', useremail, password)
    return axios
      .post(API_URL + "signin", {
        useremail,
        password
      })
      .then(response => {
        console.log('accesstoke',response.data.accessToken)
        if (response.data.accessToken) {

          localStorage.setItem("customer", JSON.stringify(response.data));
          console.log('#### successful login oobject return', JSON.stringify(response.data._doc))
        }
        return response.data;
      });
  }

  logout () {
    localStorage.removeItem("user");
  }
  
  register (firstName: string, lastName: string, useremail: string, phoneNumber:string, address: string, password: string ){
    console.log('form submit request to authservice',firstName,lastName,useremail,phoneNumber,address,password)
    return axios
      .post('http://localhost:3002/api/auths/signup', {
        firstName,
        lastName, 
        useremail, 
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