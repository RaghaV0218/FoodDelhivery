import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className='SideBar'>
      <div className="SideBar-Options">
        <NavLink to='/add' className="SideBar-Option ">
          <img src={assets.add_icon}  />
          <p>Add Items</p>
        </NavLink>
        <NavLink to='/List' className="SideBar-Option">
          <img src={assets.order_icon}  />
          <p>List Items</p>
        </NavLink>
        <NavLink to='/Order' className="SideBar-Option">
          <img src={assets.order_icon}  />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar