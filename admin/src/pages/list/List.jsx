import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import './List.css'
import '../../index.css'
const List = ({url}) => {

  const [list, setList] = useState([]);

  const fetchList = async ()=>{
    const response = await axios.get(`${url}/api/food/list`);
    // console.log(response.data);
    if(response.data.success){
      setList(response.data.data)
    }
    else{
      toast.error("Error")
    }
  }

  const removeFood = async(foodId) =>{
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
    await fetchList();
    if(response.data.success){
      toast.success(response.data.message);
    }

    else{
      toast.error("Error")
    }
  }

  useEffect(()=>{
    fetchList()
  },[])
  return (
    <div className='List Add Flex-Col'>
      <p>All Food List</p>
      <div className="List-Table">
        <div className="List-Table-Format Title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return(
            <div key={index} className='List-Table-Format'>
              <img src={`${url}/images/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p onClick={()=>removeFood(item._id)} className='Cursor'>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List