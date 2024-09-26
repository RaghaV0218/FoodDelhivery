import React, { useContext, useState } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/assets'
import { useEffect } from 'react'
import { StoreContext } from '../../ContextTemp/StoreContext'
import axios from 'axios'


const LoginPopUp = ({setShowLogin}) => {

    const {url,setToken} = useContext(StoreContext)

    const [curState, setCurState] = useState("Sign up")
    const [data, setData] = useState({
        name:"",
        email:"",
        password:""
    })

    const onChangeHandler = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const onLogin = async(event) =>{
        event.preventDefault()
        let newUrl = url;
        if(curState==="Login"){
            newUrl+= "/api/user/login"
        }
        else{
            newUrl+="/api/user/register"
        }

        const response = await axios.post(newUrl,data);
        if( response.data.success){
            setToken(response.data.token)
            localStorage.setItem("token", response.data.token)
            setShowLogin(false)
        }
        else{
            alert(response.data.message)
        }
    }

  return (
    <div className='Login-Pop-Up'>
        <form onSubmit={onLogin} className="Login-Popup-Container">
            <div className="Login-Popup-Title">
                <h2>{curState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="Login-Popup-Inputs">
                {curState==="Login"?<></>:<input name = 'name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Enter your name' required />}
                <input name = 'email' onChange={onChangeHandler} value = {data.email} type="email" placeholder='Enter your email' required />
                <input name = 'password' onChange={onChangeHandler} value = {data.password} type="password" placeholder='Enter Password' required />
            </div>
            <button type='submit'>{curState==="Sign up"?"Create account":"Login"}</button>
            <div className="Login-Popup-Condition">
                <input type="checkbox" required/>
                <p>By continuing, I agreee to the terms of use & privacy policy.</p>
            </div>
            {curState==="Login"
            ?<p>Create a new account? <span onClick={()=>setCurState("Sign up")}>Click here</span></p>
            :<p>Already have an account? <span onClick={()=>setCurState("Login")}>Login here</span></p>}
        </form>
    </div>
  )
}

export default LoginPopUp