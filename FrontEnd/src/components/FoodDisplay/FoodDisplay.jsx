import React, { useContext } from 'react'
import {StoreContext} from '../../ContextTemp/StoreContext'
import './FoodDisplay.css'
import FoodItem from '../FoodItem/FoodItem'
const FoodDisplay = ({category}) => {
    const {food_list} = useContext(StoreContext)
  return (
    <div className="Food-Display" id='Food-Display'>
        <h2>Top dishes near you</h2>
        <div className="Food-Display-List">
            {food_list.map((item,index)=>{
              if(category==="All" || category===item.category)
                return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}></FoodItem>
            })}
        </div>
    </div>
  )
}

export default FoodDisplay