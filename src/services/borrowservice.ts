
// http://localhost:3002/api/borrows/:id
import axios from "axios";
type Borrow ={
    bookId: string[]
    customerId: string[]
    borrowDate?: Date
    returnDate?: Date
    isReturned?: Boolean
    _id?:string
}

const API_URL = process.env.REACT_APP_API_URL


class  borrowService {
  
  updateBorrow(borrow:Borrow){
    console.log('borrow from borrowservice', borrow)
    return axios.put(API_URL+ '/borrows/'+ borrow._id, borrow)
  }
  postBorrow(borrow:Borrow){
    console.log('borrow from borrowservice', borrow)
    return axios.post(API_URL+ '/borrows/', borrow)
  }
  getSingleBorrow(id:string){
    return axios.get(API_URL+ '/borrows/'+id)
  }


}

export default new borrowService();


/*

PUT http://localhost:3002/api/borrows/61ba974f03eba85093c74984 HTTP/1.1
content-type: application/json

{
    "bookId": ["61b09ce2b2e6de6bcdf29eef"],
    "customerId": ["283f04bf-0780-4017-981f-683d45f0daf2"],
    "returnDate": "2021-12-23T01:25:56.648Z",
    "isReturned": false,
    "_id": "61ba974f03eba85093c74984",
    "borrowDate": "2021-12-16T01:33:03.888Z"
}

*/