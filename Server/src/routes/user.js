import express from "express";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

import { UserModel } from "../models/User.js";

const router = express.Router();
router.get("/user/:uid",async (req,res)=>{
    const user = await UserModel.findById(req.params.uid);
    if (user) {
        res.json(user);
    }
})

router.post("/register", async (req, res) => {
    const { username, password, name, email, phone, adhaar, panId, interestRate, totalCapital } = req.body;

    const user = await UserModel.findOne({ adhaar, panId });
    if (user) {
        return res.json({status:400, message: "user already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = new UserModel({ username, password: hashedPassword, name, email, phone, adhaar, panId, interestRate, totalCapital });
    await newUser.save();
    res.json({ status:201 ,message: "user registered successfully" });
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });

    if (!user) {
        return res.json({status:404, message: "User Doesn't Exist!" })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);;

    if (!isPasswordValid) {
        return res.json({status:403, message: "User Password not valid!!!" })
    }

    const token = jwt.sign({ id: user._id }, "secret");
    res.json({ token, userID: user._id })

});

export { router as UserRouter }
