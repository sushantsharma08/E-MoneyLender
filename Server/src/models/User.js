import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true,minLength:8},
    name:{type:String,required:true,maxLength:225},
    email:{type:String,required:true},
    phone:{type:Number,required:true,length:10},
    adhaar:{type:Number,required:true,length:12,unique:true},
    panId:{type:String,required:true,unique:true},
    interestRate:{type:Number,required:true},
    totalCapital:{type:Number,required:true} 
});

export const UserModel = mongoose.model("users",UserSchema)