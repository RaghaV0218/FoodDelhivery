import express from 'express'
import cors from "cors"
import { connectDB } from './config/db.js'
import FoodRouter from './routes/FoodRoutes.js'
import userRouter from './routes/UserRoute.js'
import cartRouter from './routes/CartRoutes.js'
import orderRouter from './routes/OrderRoutes.js'
import dotenv from 'dotenv';

dotenv.config();

const app  = express()
const port = process.env.PORT || 3000;


//middlewares
app.use(express.json()) //whenever we get request from FE to BE that will be parsed using this.
app.use(cors()) //this will help us in accessing backend from frontend

//DB connection

connectDB();

//API endpoint

app.use("/api/food",FoodRouter)

//basically what we have done here we have mount uploads folder means whenever we hit images end point with name of image we can see taht image
//http://localhost:3000/images/file_name
app.use("/images", express.static('uploads'))

app.use("/api/user",userRouter)

app.use("/api/cart", cartRouter)

app.use("/api/order", orderRouter)

app.get("/", (req,res)=>{
    res.send("API is working")
})

app.listen(3000, ()=>{
    console.log(`Server is running at Port ${port}.`)
})

