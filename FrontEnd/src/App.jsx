import React, { useState } from 'react'
import NavBar from './components/NavBar/NavBar'
import {Route, Routes} from 'react-router-dom'
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import Footer from './components/Footer/Footer'
import LoginPopUp from './components/LoginPopUp/LoginPopUp'
import Verify from './Pages/Verify/Verify'
import MyOrders from './Pages/MyOrders/MyOrders'
const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  return (
    <>
    {showLogin?<LoginPopUp setShowLogin={setShowLogin}></LoginPopUp>:<></>}
    <div className='app'>
      <NavBar setShowLogin={setShowLogin}></NavBar>
      <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path='/cart' element = {<Cart/>} />
        <Route path='/order' element = {<PlaceOrder/>} />
        <Route path='/verify' element = {<Verify/>}/>
        <Route path='/myorders' element = {<MyOrders/>}/>
      </Routes>
    </div>
    <Footer></Footer>
    </>
  )
}

export default App