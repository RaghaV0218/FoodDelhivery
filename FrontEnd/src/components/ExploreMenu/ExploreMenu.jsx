import React from 'react'
import './ExploreMenu.css'
import {menu_list} from '../../assets/assets'
const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='Explore-Menu' id='Explore-Menu'>
        <h1>Explore our menu</h1>
        <p className='Explore-Menu-Text'>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise . Our mission is to satisfy your cravings and elevate your dining experiences, one delicious meal at a time.</p>
        <div className="Explore-Menu-List">
            {
                menu_list.map((item,index)=>{
                    return (
                        <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='Explore-Menu-List-Item'>
                            <img className={category===item.menu_name?"Active":""} src={item.menu_image} alt="" />
                            <p>{item.menu_name}</p>
                        </div>
                    )
                })
            }
        </div>
        <hr />
    </div>
  )
}

export default ExploreMenu