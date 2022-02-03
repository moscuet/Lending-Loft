import axios from "axios";
type Book ={
  ISBN: string
  title: string
  publisherName: string
  author: string[]
  publishedYear: number
  genres: string[]
  description: string
  edition: string
  pageCount: number
  img: string
  _id:string
}
const API_URL = "http://localhost:3002/api/";
class  productService {

  addBook (formValue:{ISBN:string,title:string,publisherName:string,author:string,publishedYear:number,genres:string,description:string,edition:string,pageCount:number, img:string}){
    return axios.post(API_URL +'books',formValue)
  }
  
  deleteBook (id:string){
    return axios.delete(API_URL +'books/'+id)
  }
  

  updateBook (book:Book){
    return axios.put(API_URL +'books/'+book._id,(book._id,book))

  }

}

export default new productService();