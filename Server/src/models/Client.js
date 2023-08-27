import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    fathername: { type: String, required: true, },
    gender: { type: String, required: true, },
    phone: { type: Number, required: true},
    adhaar: { type: Number, required: true},
    loanamount: { type: Number, required: true, },
    Instalment: { type: Number, required: true, },
    InstalmentsDone:{type:Number,required:true},
    remainingamount: { type: Number, required: true, },
    totalAmount:{ type: Number, required: true, },
    LenderId:{type:String, required: true}
});

export const ClientModel = mongoose.model("clients", ClientSchema)