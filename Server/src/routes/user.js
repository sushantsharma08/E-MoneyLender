import express from "express";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

import { UserModel } from "../models/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, password, name, email, phone, adhaar, panId } = req.body;

    const user = await UserModel.findOne({ adhaar, panId });
    if (user) {
        return res.json({staus:400, message: "user already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = new UserModel({ username, password: hashedPassword, name, email, phone, adhaar, panId });
    await newUser.save();
    res.json({ staus:201 ,message: "user registered successfully" });
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });

    if (!user) {
        return res.json({staus:404, message: "User Doesn't Exist!" })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);;

    if (!isPasswordValid) {
        return res.json({staus:403, message: "User Password not valid!!!" })
    }

    const token = jwt.sign({ id: user._id }, "secret");
    res.json({ token, userID: user._id })

});

export { router as UserRouter }
