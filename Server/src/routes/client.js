import express from "express";
import { ClientModel } from "../models/Client.js";
import { Upload } from "../middleware/upload.js";

 const router = express.Router();

 router.post("/add_client",Upload.single('img'),async(req,res)=>{
    console.log(req.file)
    console.log(req.body)
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

    res.send(`
    <img src='${req.file.filename}' alt='image'/>
`)

 })

 router.get("/image",async(req,res)=>{
try {
    const image1 = await ClientModel.findOne({img:"uploads\\1686749304806.jpg"
});
    const imageout = image1.img
    // imageout.replace('uploads','/')
    console.log(imageout);
    // res.send({
    //    fName: image1.fathername,
    //    image: image1.img
    // }
    // )
    // res.setHeader('content-type', 'image/jpg')
    // res.send(`
    //         <img src='1686749304806' alt='image'/>
    // `)
    
} catch (error) {
    res.json(error)
}

   
 })

 export {router as ClientRouter }