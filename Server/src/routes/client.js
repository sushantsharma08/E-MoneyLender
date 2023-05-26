import express from "express";
import { ClientModel } from "../models/Client.js";
 const router = express.Router();

 router.post("/add_client",async(req,res)=>{
    const {
        name,
        fathername,
        gender,
        adhaar,
        loanamount,
        Instalment,
        remainingamount,
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
        remainingamount
    })

    await newClient.save(); 

 })

 export {router as ClientRouter }