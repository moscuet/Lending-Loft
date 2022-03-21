import axios from "axios";
//const API_URL = process.env.REACT_APP_API_URL

class  contactService {
  sendMessage (formValue:{name:string,email:string,phone:string,message:string}){
    console.log('from cotact service', formValue)

    return axios.post('http://localhost:3002/api/email',formValue)
  }
}
  
export default new contactService();