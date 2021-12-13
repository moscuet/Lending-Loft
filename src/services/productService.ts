import axios from "axios";

const API_URL = "http://localhost:3002/api/auths/";
class  productService {
  getAllBook  () {
    console.log('from aproductservice/lgettallbooks: ')
    return axios
      .post(API_URL + "signin", {
        
      })
      .then(response => {
        console.log('accesstoke',response.data.accessToken)
        if (response.data.accessToken) {

          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  addBook (formValue:{ISBN:string,title:string,publisherName:string,author:string,publishedYear:number,genres:string,description:string,edition:string,pageCount:number, img:string}){
    console.log('from services/productservice/addbook',formValue)
    return axios.post('http://localhost:3002/api/books',formValue)
  }
}

export default new productService();