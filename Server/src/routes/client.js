import express from "express";
import { ClientModel } from "../models/Client.js";
import { ClientExtraLoanModel } from "../models/ExtraLoan.js";
// import client from ('twilio')("AC0eabea656803bc0bd73addb3b3c845ea", "64d0a8ab1e5bf1d4efd619c4ea5bd43a");
// import * as Twilio from 'twilio';
// import * as lib from "lib";
// import lib from 'twilio';
// import * as dotenv from "dotenv";
// dotenv.config({path:"./config.env"});


// const client = lib(`${process.env.TWILIOSID}`, `${process.env.TWILIOAUTHTOKEN}`);

const router = express.Router();


// adding client
router.post("/add_client", async (req, res) => {
    const {
        name,
        fathername,
        gender,
        phone,
        adhaar,
        PassportImage,
        loanamount,
        Instalment,
        InstalmentsDone,
        remainingamount,
        totalAmount,
        LenderId
    } = req.body;

    const client = await ClientModel.findOne({ adhaar });

    if (client) {
        return res.json({ status: 400, message: "user already exists" });
    }

    const newClient = new ClientModel({
        name,
        fathername,
        gender,
        phone,
        adhaar,
        PassportImage,
        loanamount,
        Instalment,
        InstalmentsDone,
        remainingamount,
        totalAmount,
        LenderId
    })

    await newClient.save()

        // res.sendFile(`uploads/${file}`, { root: '.' })
        .then(() => res.json({ status: 201, message: 'client added' }))
        .catch(err => res.json(err));
})

router.get("/", async (req, res) => {
    try {
        // const users = await ClientModel.findOne({LenderId:req.params.LenderId})
        const users = await ClientModel.find({});
        res.json(users)
    } catch (error) {
        res.json(error);
    }
})
router.get("/loadClients/:LenderId", async (req, res) => {
    try {
        const users = await ClientModel.find({ LenderId: req.params.LenderId })
        // const users = await ClientModel.find({});
        res.json(users)
    } catch (error) {
        res.json(error);
    }
})

router.get("/searchbyname/:username", async (req, res) => {
    try {
        const userdata = await ClientModel.findOne({ name: req.params.username });
        res.json(userdata)
    } catch (error) {
        res.json(error)
    }
})

router.get("/getallloans/:userid", async (req, res) => {
    const user = await ClientModel.find({ LenderId: req.params.userid });
    const allLoanAmounts = user.map((client) => (client.loanamount)).reduce((accumulator, currentValue) => {
        return accumulator + currentValue
    }, 0);
    const sumTotal = user.map((client) => (client.totalAmount)).reduce((accumulator, currentValue) => {
        return accumulator + currentValue
    }, 0); 
    const sumTotalremaining = user.map((client) => (client.remainingamount)).reduce((accumulator, currentValue) => {
        return accumulator + currentValue
    }, 0); 

    res.json({allLoanAmounts,sumTotal,sumTotalremaining});
})

// router.post("/send_sms",async(req,res)=>{
//     // const Contactno= req.params.phoneno;
//     const {ContactNumber,Text}=req.body;
//     try {
//         const message = await client.messages.create({
//             body:Text,
//             to:ContactNumber,
//             from:'+17624754780'
//             });
//         console.log(message);
//       } catch (error) {
//         // You can implement your fallback code here
//         console.error(error);
//       }
// })

router.patch("/instalmentDone/:username", async (req, res) => {
    const { InstalmentsDone, remainingamount } = req.body;
    try {
        const user = await ClientModel.findOneAndUpdate({ name: req.params.username }, req.body)
        res.json(user)
    } catch (error) {
        res.json(error)
    }
})

router.patch("/changeImage/:username",async(req,res)=>{
    const { PassportImage } = req.body;
    try {
        const user = await ClientModel.findOneAndUpdate({ name: req.params.username }, req.body)
        res.json(user)
    } catch (error) {
        res.json(error)
    }
})

router.patch("/update_client_PersonalDetails/:username", async (req, res) => {
    const {
        name,
        fathername,
        adhaar,
        phone,
        loanamount,
        Instalment,
        remainingamount,
        totalAmount,
        InstallmentRecord,
    } = req.body;
    try {
        const user = await ClientModel.findOneAndUpdate({ name: req.params.username }, req.body)
        res.json({ status: 202, message: "Updated Successfully" })
    } catch (error) {
        res.json({ status: 400, message: error })
    }
})

router.patch("/update_client_ExtraLoan/:username", async (req, res) => {
    const { name,
        fathername,
        adhaar,
        phone,
        loanamount,
        Instalment,
        remainingamount,
        totalAmount,
    } = req.body;
    try {
        const user = await ClientModel.findOneAndUpdate({ name: req.params.username }, req.body)
        res.json({ status: 202, message: "Updated Successfully" })
    } catch (error) {
        res.json({ status: 400, message: error })
    }
})

router.patch("/updateInstallmentRecord/:clientid",async(req,res)=>{
    const {InstallmentRecord} = req.body
    try {
        const user = await ClientModel.findOneAndUpdate({_id: req.params.clientid},req.body)
        res.json({ status: 202, message: "Updated Successfully",user : user})
    } catch (error) {
        res.json({ status: 400, message: error })
    }
})

// Extra loan takers DataBase
router.post("/add_ExtraLoanTakers", async (req, res) => {
    const {
        name,
        phone,
        adhaar,
        previousLoanPrinciple,
        previousMonthlyInstalment,
        instalmentsDoneBeforeNewLoan,
        newLoanPrinciple,
        newMonthlyInstalment,
        ClientId,
    } = req.body;

    // const client = await ClientExtraLoanModel.findOne({ adhaar });

    // if (client) {
    //     return res.json({ status: 400, message: "user already exists" });
    // }

    const newClient = new ClientExtraLoanModel({
        name,
        phone,
        adhaar,
        previousLoanPrinciple,
        previousMonthlyInstalment,
        instalmentsDoneBeforeNewLoan,
        newLoanPrinciple,
        newMonthlyInstalment,
        ClientId,
    })

    await newClient.save()
        // res.sendFile(`uploads/${file}`, { root: '.' })
        .then(() => res.json({ status: 201, message: 'client added' }))
        .catch(err => res.json(err));
})


router.delete("/removeClient/:id", async (req, res) => {
    const user = await ClientModel.deleteOne({ _id: req.params.id })
})

export { router as ClientRouter }