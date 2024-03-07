import axios from 'axios'
type Borrow = {
  bookId: string[]
  customerId: string[]
  borrowDate?: Date
  returnDate?: Date
  isReturned?: Boolean
  _id?: string
}

const API_URL = process.env.REACT_APP_API_URL

class borrowService {
  getAllBorrowList() {
    throw new Error('Method not implemented.')
  }
  deleteBorrow(_id: string) {
    axios.delete(API_URL + '/borrows/' + _id)
  }

  updateBorrow(borrow: Borrow) {
    console.log('borrow from borrowservice', borrow)
    return axios.put(API_URL + '/borrows/' + borrow._id, borrow)
  }
  postBorrow(borrow: Borrow) {
    console.log('borrow from borrowservice', borrow)
    return axios.post(API_URL + '/borrows/', borrow)
  }
  getSingleBorrow(id: string) {
    return axios.get(API_URL + '/borrows/' + id)
  }
}

const newborrowService = new borrowService()

export default newborrowService
