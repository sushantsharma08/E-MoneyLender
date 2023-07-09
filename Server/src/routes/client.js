import express from "express";
import { ClientModel } from "../models/Client.js";
const router = express.Router();

router.post("/add_client", async (req, res) => {
    const {
        name,
        fathername,
        gender,
        phone,
        adhaar,
        loanamount,
        Instalment,
        InstalmentsDone,
        remainingamount,
        totalAmount
    } = req.body;

    const client = await ClientModel.findOne({ adhaar });

    if (client) {
        return res.json({ "message": "user already exists" });
    }

    const newClient = new ClientModel({
        name,
        fathername,
        gender,
        phone,
        adhaar,
        loanamount,
        Instalment,
        InstalmentsDone,
        remainingamount,
        totalAmount
    })

    await newClient.save()

        // res.sendFile(`uploads/${file}`, { root: '.' })
        .then(() => res.json({"message":'client added'}))
        .catch(err => res.json(err));
})

router.get("/", async (req, res) => {
    try {
        const users = await ClientModel.find({});
        res.json(users)
    } catch (error) {
        res.json(error)
    }
})

router.get("/searchbyname/:username", async (req, res) => {
    try {
        const userdata = await ClientModel.findOne({name:req.params.username});
        res.json(userdata)
    } catch (error) {
        res.json(error)
    }
})

router.patch("/instalmentDone/:username",async (req,res)=>{
    const {InstalmentsDone,remainingamount}= req.body;
    const user = await ClientModel.findOneAndUpdate({name:req.params.username},req.body)
    try{
        res.json(user)
    }catch(error){
        res.json(error)
    }
})

export { router as ClientRouter }