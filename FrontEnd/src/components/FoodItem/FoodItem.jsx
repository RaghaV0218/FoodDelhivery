import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../ContextTemp/StoreContext'
const FoodItem = ({id,name,price,description,image}) => {
  // const [itemCount, setItemCount] = useState(0)
  const {cartItems,  addToCart, removeFromCart,url} = useContext(StoreContext);
  return (
    <div className='Food-Item'>
        <div className="Food-Item-img-Container">
            <img className='Food-Item-image' src={url+"/images/"+image} alt="" />
            {
              !cartItems[id]
              ?<img className='Add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt='' />
              :<div className='Food-Item-Counter'>
                <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt=''></img>
                <p>{cartItems[id]}</p>
                <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
              </div>
            }
        </div>
        <div className="Food-Item-Info">
            <div className="Food-Item-Name-Rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="Food-Item-Description">{description}</p>
            <p className="Food-Item-Price">${price}</p>
        </div>
    </div>
  )
}

export default FoodItem