import express from "express";
import { ClientModel } from "../models/Client.js";
import { Upload } from "../middleware/upload.js";

 const router = express.Router();

 router.post("/add_client",Upload.single('img'),async(req,res)=>{
    req.body.img = req.file.path
    const {
        name,
        fathername,
        gender,
        adhaar,
        loanamount,
        Instalment,
        remainingamount,
        img,
} =req.body;

    const client = await ClientModel.findOne({adhaar});

    if(client){
        return res.json({"message":"user already exists"});
    }

    const newClient = new ClientModel({
        name,
        fathername,
        gender,
        adhaar,
        loanamount, 
        Instalment,
        remainingamount,
        img,
    })

    await newClient.save()
    .then(()=>res.json('user Added'))
    .catch(err=>res.json(err)); 

 })

 export {router as ClientRouter }