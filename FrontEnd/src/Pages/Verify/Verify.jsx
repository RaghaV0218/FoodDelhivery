import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../ContextTemp/StoreContext';
import axios from 'axios';
const Verify = () => {

    const [searchParams, setsearchParams ] = useSearchParams();
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const {url} = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        const response  = await axios.post(url+"/api/order/verify",{success,orderId})
        if(response.data.success){
            console.log(success);
            navigate("/myorders")
        }
        else{
            console.log(success);
            console.log("gdbad")
            navigate("/")
        }
    }

    useEffect(()=>{
        verifyPayment();
    },[])

  return (
    <div className='Verify'>
        <div className="Spinner"> verify</div>
    </div>
  )
}

export default Verify