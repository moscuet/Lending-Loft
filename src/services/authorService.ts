import axios from "axios";

const API_URL = "http://localhost:3002/api/";
class  authorService {

  getAllAuthor (){
    return axios.get(API_URL +'authors')
  }
  getAuthorById (id:string){
    return  axios.get(API_URL +'authors/' + id)
  }
  addAuthor(formValue:{firstName:string, lastName:string,biography:string}){
    return  axios.post(API_URL +'authors', formValue)
    
  }
  deleteAuthor(id:string){
    return  axios.delete(API_URL +'authors/' + id)
  }
}

export default new authorService();