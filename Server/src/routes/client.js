import express from "express";
import { ClientModel } from "../models/Client.js";
import { Upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/add_client", Upload.single('img'), async (req, res) => {
    console.log(req.body.img)
    console.log(req.body)
    req.body.img = req.file.filename;
    // var file= req.file;
    var file = req.body.img;
    const {
        name,
        fathername,
        gender,
        adhaar,
        loanamount,
        Instalment,
        remainingamount,
        img,
    } = req.body;

    const client = await ClientModel.findOne({ adhaar });

    if (client) {
        return res.json({ "message": "user already exists" });
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

        // res.sendFile(`uploads/${file}`, { root: '.' })
        .then(() => res.json(newClient.img))
        .catch(err => res.json(err));
})


router.get("/image/:imagepath", async (req, res) => {
    try {
        const user = await ClientModel.findOne({ img: req.params.imagepath });
        res.sendFile(`/uploads/${user.img}`, { root: '.' })

    } catch (error) {
        res.json(error)
    }
    
    
})

router.get("/", async (req,res)=>{
    const users  = await ClientModel.find({});
    res.send(users)
})

export { router as ClientRouter }