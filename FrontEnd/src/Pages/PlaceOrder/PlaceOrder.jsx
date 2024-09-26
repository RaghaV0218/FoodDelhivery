import React, { useContext, useEffect, useState} from 'react'
import axios from 'axios'
import './PlaceOrder.css'
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../../ContextTemp/StoreContext'
const PlaceOrder = () => {
  const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext)

  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onChangeHandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value;

    setData(data=>({...data, [name]:value}))
  }
  
  const placeOrder = async (event) =>{
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    // console.log(orderItems);

    let orderData = {
      address:data,
      items: orderItems,
      amount: getTotalCartAmount()+2
    }

    let response = await axios.post(url+"/api/order/place",orderData, {headers:{token}})
    if(response.data.success){
      console.log("works");
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
    else{
      alert('Error during payment ')
    }
  }


  const navigate = useNavigate();

  useEffect(()=>{
    if(!token){
      navigate('/cart')
    }
    else if(getTotalCartAmount()===0){
      navigate('/cart')
    }
  },[token])

  return (
    <form onSubmit={placeOrder} className='PlaceOrder'>
      <div className="Place-Order-Left">
        <p className="Title">
          Delivery Information
        </p>
        <div className="Multi-Fields">
          <input required onChange={onChangeHandler} name='firstName' value={data.firstName} type="text" placeholder='FirstName'/>
          <input required onChange={onChangeHandler} name='lastName' value={data.lastName} type="text" placeholder='LastName'/>
        </div>
        <input required onChange={onChangeHandler} name='email' value={data.email} type="email" placeholder='Email address' />
        <input required onChange={onChangeHandler} name='street' value={data.street} type="text" placeholder='Street' />
        <div className="Multi-Fields">
          <input required onChange={onChangeHandler} name='city' value={data.city} type="text" placeholder='City'/>
          <input required onChange={onChangeHandler} name='state' value={data.state} type="text" placeholder='State'/>
          </div>
          <div className="Multi-Fields">
          <input required onChange={onChangeHandler} name='zipcode' value={data.zipcode} type="text" placeholder='ZipCode'/>
          <input required onChange={onChangeHandler} name='country' value={data.country} type="text" placeholder='Country'/>
        </div>
        <input required onChange={onChangeHandler} name='phone' value={data.phone} type="text" placeholder='Phone' />
      </div>
      <div className="Place-Order-Right">
      <div className="Cart-Total">
          <h2>Cart Total</h2>
          <div>
            <div className="Cart-Total-Details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="Cart-Total-Details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="Cart-Total-Details">
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
          </div>
          <button type='submit' >Proceed to Payment</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder