import React from 'react'
import { Product } from '../../types'
import borrowService from '../../services/borrowservice'

import { useDispatch } from 'react-redux'
import { EmptyCart } from '../../redux/actions'

export default function SuccedCheckout(props:{inCart:Product[]}) {
  const dispatch = useDispatch()

  const user:{_id:string} = JSON.parse(localStorage.getItem("user") || '{}');
  if(user._id){
    props.inCart.forEach( prod => {
      const borrow = {
        bookId: [prod._id?prod._id:''],
        customerId: [user._id],
      }

      borrowService.postBorrow(borrow).then( res=>{
        dispatch (EmptyCart())
      })
    })
    
  }

  return <div>SuccedCheckout</div>
}
