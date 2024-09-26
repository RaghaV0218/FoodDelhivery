import React from 'react'
import './Orders.css'
import { useState } from 'react';
import axios from 'axios'
import {toast} from 'react-toastify'
import { useEffect } from 'react';
import {assets} from '../../assets/assets'
const Order = ({url}) => {

  const [orders,setOrders] = useState([]);
  const fetchAllOrders = async () => {
    const response  = await axios.get(url+"/api/order/list");
    if(response.data.success){
      setOrders(response.data.data);
      console.log(response.data.data);
    }
    else{
      toast.error("Error")
    }
  }

  const statusHandler = async (event, orderId) =>{
    const response = await axios.post(url+"/api/order/status", {orderId,
      status: event.target.value
    })
    if(response.data.success){
      await fetchAllOrders();
    }
  }

  useEffect(()=>{
    fetchAllOrders();
  },[])
  return (
    <div className='Order Add'>
      <h3>Order Page</h3>
      <div className="OrderList">
        {orders.map((order,index)=>(
          <div key={index} className='OrderItem'>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='Order-Item-Food'>
                {order.items.map((item, index)=>{
                  if(index==order.items.length-1){
                    return item.name + "x" + item.quantity
                  }
                  else{
                    return item.name + "x" + item.quantity + ", "
                  }
                })}
              </p>
              <p className='Order-Item-Name'></p>
                {order.address.firstName+" "+order.address.lastName}
                <div className="Order-Item-Addres">
                  <p>{order.address.city+", "}</p>
                  <p>{ order.address.state+", "+order.address.country+", "+ order.address.zipcode}</p>
                </div>
                <p className="Order-Item-Phone">{order.address.phone}</p>
            </div>
            <p>Item: {order.items.length}</p>
            <p>${order.amount}</p>
            <select onChange={(event)=>statusHandler(event,order._id)} name="" id="" value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Order