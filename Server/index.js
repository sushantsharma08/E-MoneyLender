import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
app.use(cors());

const port = 3001;

mongoose.connect(`mongodb+srv://sushantsharmadev:moneylenderkapassword@moneylender.ejybvtr.mongodb.net/?retryWrites=true&w=majority`) 


app.listen(port,()=>{console.log("Server up!!!");})