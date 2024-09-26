import React, { useContext, useState } from 'react'
import './NavBar.css'
import { assets } from '../../assets/assets'
import {Link, useNavigate} from 'react-router-dom'
import { StoreContext } from '../../ContextTemp/StoreContext'
const NavBar = ({setShowLogin}) => {

    const [menu, setMenu] = useState("Home")

    const{getTotalCartAmount,token,setToken} = useContext(StoreContext);

    const navigate = useNavigate();

    const logout = ()=>{
        localStorage.removeItem("token");
        setToken("");
        navigate("/")
    }

  return (
    <div className='Navbar'>
        <Link to={'/'}><img src={assets.logo} alt="logo" className="logo" /></Link>
        <ul className="Navbar-menu">
            <Link to='/' onClick={() =>setMenu("Home")} className={menu==="Home"?"Active":""}>Home</Link>
            <a href='#Explore-Menu' onClick={() =>setMenu("Menu")} className={menu==="Menu"? "Active": ""}>Menu</a>
            <a href='#App-Download' onClick={() =>setMenu("Mobile-App")} className={menu==="Mobile-App"? "Active": ""}>Mobile-App</a>
            <a href='#Footer' onClick={() =>setMenu("Contact us")} className={menu==="Contact us"? "Active": ""}>Contact us</a>
        </ul>
        <div className="Navbar-right">
            <img src={assets.search_icon} alt="" />
            <div className="Navbar-search-icon">
                <Link to={'/cart'}><img src={assets.basket_icon} alt="" /></Link>
                <div className={getTotalCartAmount()?"dot":""}>
                </div>
            </div>
             {!token
             ? <button onClick={()=>setShowLogin(true)}>sign in</button> 
             : <div className='NavBar-Profile'>
                <img src={assets.profile_icon} alt="" />
                <ul className="Nav-Profile-Dropdown">
                    <li onClick={()=> navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                    <hr />
                    <li onClick={logout}> <img src={assets.logout_icon} alt="" /><p>LogOut</p></li>
                </ul>
               </div>}
            
        </div>
    </div>
    
  )
}

export default NavBar