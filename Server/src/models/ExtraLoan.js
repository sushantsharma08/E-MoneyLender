import mongoose from "mongoose";

const ClientExtraLoanSchema =  new mongoose.Schema({
    name:{type:String,required:true},
    phone: { type: Number, required: true},
    adhaar: { type: Number, required: true},
    previousLoanPrinciple:{type:Number,required:true},
    previousMonthlyInstalment:{type:Number,required:true},
    instalmentsDoneBeforeNewLoan:{type:Number,required:true},
    newLoanPrinciple:{type:Number,required:true},
    newMonthlyInstalment:{type:Number,required:true},
    ClientId:{type:String,required:true}
});

export const ClientExtraLoanModel = mongoose.model("clientExtraLoanDetails",ClientExtraLoanSchema);