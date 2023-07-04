import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    fathername: { type: String, required: true, },
    gender: { type: String, required: true, },
    adhaar: { type: Number, required: true, length: 12 },
    loanamount: { type: Number, required: true, },
    Instalment: { type: Number, required: true, },
    InstalmentsDone:{type:Number,required:true},
    remainingamount: { type: Number, required: true, },
    totalAmount:{ type: Number, required: true, }
});

export const ClientModel = mongoose.model("clients", ClientSchema)