import axios from "axios";

const API_URL = "http://localhost:3002/api/";
class  productService {

  addBook (formValue:{ISBN:string,title:string,publisherName:string,author:string,publishedYear:number,genres:string,description:string,edition:string,pageCount:number, img:string}){
    return axios.post(API_URL +'books',formValue)
  }
  
  deleteBook (id:string){
    return axios.delete(API_URL +'books/'+id)
  }
  

}

export default new productService();