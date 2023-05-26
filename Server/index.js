import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';

import { UserRouter } from "./src/routes/user.js";
import { ClientRouter } from "./src/routes/client.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth",UserRouter)
app.use("/client",ClientRouter)

const port = 3001;

mongoose.connect(`mongodb+srv://sushantsharmadev:moneylenderkapassword@moneylender.ejybvtr.mongodb.net/?retryWrites=true&w=majority`) 


app.listen(port,()=>{console.log("Server up!!!");})