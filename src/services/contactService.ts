import axios from "axios";
import message from "../redux/reducers/message";
const API_URL = process.env.REACT_APP_API_URL

class  contactService {
  sendMessage (formValue:{name:string,email:string,mobile:string,message:string}){
    console.log('from cotact service', formValue)
    const value = {neme:`${formValue?.name},${formValue.email}`, email:'mos.cuet@gmail.com', mobile:formValue.mobile, message:formValue?.message }
    return axios.post(API_URL+'/send-email',formValue)
  }
}

const newContactService = new contactService()

export default newContactService