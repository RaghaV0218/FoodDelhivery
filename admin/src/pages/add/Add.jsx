import React, {  useState } from 'react'
import './Add.css'
import axios from 'axios';
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify';
const Add = ({url}) => {

    const [image, setImage] = useState(false);
    const [data, setdata] = useState({
        name:"",
        description:"",
        price:"",
        category:"Salad",
    })
    const onChangeHandler = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setdata(data=>({...data,[name]:value}))
    }

    const onSubmitHandler = async (event) =>{
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("price", Number(data.price))
        formData.append("category", data.category)
        formData.append("image", image)
        const response = await axios.post(`${url}/api/food/add` ,formData);
        if(response.data.success){
            setdata({
                name:"",
                description:"",
                price:"",
                category:"Salad",
            })
            setImage(false)
            toast.success(response.data.message)
        }
        else{
            toast.error(response.data.message)
        }
    }
  return (
    <div className='Add'>
        <form className='Flex-Col' onSubmit={onSubmitHandler}>
            <div className="Add-Img-Upload Flex-Col ">
                <p>Upload Image</p>
                <label htmlFor="Image">
                    <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=>setImage(e.target.files[0])}type="file" id='Image' hidden required />
            </div>
            <div className="Add-Prod-Name  Flex-Col" >
                <p>Product Name</p>
                <input onChange={onChangeHandler} value = {data.name} type="text" name='name' placeholder='Type here' />
            </div>
            <div className="Add-Prod-Description Flex-Col">
                <p>Product Description</p>
                <textarea onChange={onChangeHandler} value = {data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
            </div>
            <div className="Add-Category-Price">
                <div className="Add-Category Flex-Col">
                    <p>Product Category</p>
                    <select onChange={onChangeHandler}  name="category" >
                        <option value="Salad">Salad</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Desert">Desert</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="Pure Veg">Pure Veg</option>
                        <option value="Cake">Cake</option>
                        <option value="Paasta">Paasta</option>
                        <option value="Noodles">Noodles</option>
                    </select>
                </div>
                <div className="Add-Price Flex-Col">
                    <p>Product Price</p>
                    <input onChange={onChangeHandler} value={data.price} type="number" name="price" placeholder='$20' />
                </div>
            </div>
            <button type='submit' className='Add-Btn'> ADD</button>
        </form>
    </div>
  )
}

export default Add