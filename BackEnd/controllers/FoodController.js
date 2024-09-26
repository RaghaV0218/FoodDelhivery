import FoodModel from "../models/FoodModel.js";
import fs from 'fs'

const AddFood = async (req,res) =>{
    
    let image_filename = `${req.file.filename}`;
    const food = new FoodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })
    try {
        await food.save();
        res.json({success:true, message: "Food Added"})
    }
    catch (error) {
        console.log("error")
        res.json({success:false, message: "Error while saving product"})
    }
}

// all food list
const listFood = async (req,res) =>{
try{
    const foods = await FoodModel.find({})
    res.json({success:true, data: foods})
}
catch(error){
    console.log(error);
    res.json({success: false, message:" error in listing food"})
}
}

// remove function

const removeFood = async (req,res) =>{
    try {
        const food = await FoodModel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`, ()=>{})

        await FoodModel.findByIdAndDelete(req.body.id);

        res.json({success:true, message: "Food removed successfully"})
    } catch (error) {
        console.log("error")
        res.json({success:false, message: "Error while removing product"})
    }
}

export {AddFood,listFood,removeFood}
