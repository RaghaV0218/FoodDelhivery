import express from 'express'
import { AddFood, listFood,removeFood} from '../controllers/FoodController.js'
import multer from 'multer'

const FoodRouter = express.Router();

//Image Storage Engine

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req,file,cb) =>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

FoodRouter.post("/add", upload.single("image"), AddFood)
FoodRouter.get("/list",listFood)
FoodRouter.post("/remove",removeFood)


export default FoodRouter;