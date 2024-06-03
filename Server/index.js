import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';
import * as dotenv from "dotenv";

// const cors=require("cors");
const corsOptions = {
   origin: '*',
   credentials: true,            //access-control-allow-credentials:true
   optionSuccessStatus: 200,
}


import { UserRouter } from "./src/routes/user.js";
import { ClientRouter } from "./src/routes/client.js";

const app = express();
dotenv.config({path:"./vars/config.env"});
app.use(express.json());
app.use(cors(corsOptions))
// app.use(cors());

app.use("/auth", UserRouter)
app.use("/client", ClientRouter)

const port =process.env.PORT||3001;

mongoose.connect(`mongodb+srv://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@moneylender.ejybvtr.mongodb.net/?retryWrites=true&w=majority`)


app.listen(port,()=>{
   console.log("Server Up!");
})