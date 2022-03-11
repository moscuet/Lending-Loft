import axios from "axios";
import { Author } from "../types";

const API_URL = process.env.REACT_APP_API_URL
class  authorService {

  getAllAuthor (){
    return axios.get(API_URL +'/authors')
  }
  getAuthorById (id:string){
    return  axios.get(API_URL +'/authors/' + id)
  }
  addAuthor(formValue:{firstName:string, lastName:string,biography:string}){
    return  axios.post(API_URL +'/authors', formValue)
    
  }
  deleteAuthor(id:string){
    return  axios.delete(API_URL +'/authors/' + id)
  }
  updateAuthor(author:Author){
    return axios.put(API_URL +'/authors/' + author._id, author)
  }
}

export default new authorService();