import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../ContextTemp/StoreContext';
import { useNavigate } from 'react-router-dom';
const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);

  const navigate = useNavigate();
  return (
    <div className='Cart'>
      <div className="Cart-Items">
        <div className="Cart-Items-Title">
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>  {/* Add a unique key prop here */}
                <div className='Cart-Items-Title Cart-Items-Item'>
                  <img src={url + "/images/" + item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className='Cross'>X</p>
                </div>
                <hr />
              </div>
            );
          }
        })}

      </div>
      <div className="Cart-Bottom">
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
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="Cart-Total-Details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>Proceed to CHECKOUT</button>
        </div>
        <div className="Cart-Promo-Code">
          <div>
            <p>If you have a promo code enter it here</p>
            <div className="Card-Promo-Code-Input">
              <input type="text" placeholder='promocode' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart