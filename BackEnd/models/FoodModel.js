import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    category:{
        type:String,
        required:true
    }
})

//Basically whenever we run this file it will create a new model again so to avoid this we are using mongoose.models.food if it is already there then it will use it otherwise it will create a new model

const FoodModel = mongoose.models.Food || mongoose.model("Food", FoodSchema)
export default FoodModel