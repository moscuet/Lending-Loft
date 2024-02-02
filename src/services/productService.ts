import axios from "axios";
type Book ={
  ISBN: string
  title: string
  publisherName: string
  authors: string
  publishedYear: number
  genres: string
  description: string
  edition: string
  pageCount: number
  img: string
  _id:string
}

const API_URL = process.env.REACT_APP_API_URL
class  productService {
  createBook(arg0: { title: string; genres: string; ISBN: string; publisherName: string; author: string; publishedYear: string; description: string; edition: string; pageCount: string; img: string; }) {
    throw new Error('Method not implemented.');
  }

  addBook (formValue:{ISBN:string,title:string,publisherName:string,author:string,publishedYear:number,genres:string,description:string,edition:string,pageCount:number, img:string}){
    return axios.post(API_URL +'/books',formValue)
  }
  
  deleteBook (id:string){
    return axios.delete(API_URL +'/books/'+id)
  }
  

  updateBook (book:Book){
    return axios.put(API_URL +'/books/'+book._id,(book._id,book))

  }

}

const newProductService = new productService();
export default newProductService 