import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='Footer' id='Footer'>
        <div className="Footer-Content">
            <div className="Footer-Content-Left">
                <img src={assets.logo} alt="" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, omnis. Suscipit itaque quidem totam distinctio iste molestias vero accusantium consequatur. Neque eum quaerat, a adipisci magni corporis placeat deserunt laborum!</p>
                <div className="Footer-Social-Icon">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="Footer-Content-Center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className="Footer-Content-Right">
                <h2>Get In Touch</h2>
                <ul>
                    <li>+91-74539-43290</li>
                    <li>conatct@tomato.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="Footer-Copyright"> Copyright © 2024 Tomato.com . All rights reserved.</p>
    </div>
  )
}

export default Footer