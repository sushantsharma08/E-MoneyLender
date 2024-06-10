import mongoose from "mongoose";

const ClosedAccountsSchema = new mongoose.Schema({
    clientId : {type: String, required: true, },
    isOpen: { type: Boolean, required: true },
    name: { type: String, required: true, },
    fathername: { type: String, required: true, },
    gender: { type: String, required: true, },
    phone: { type: Number, required: false},
    adhaar: { type: Number, required: true},
    PassportImage : String,
    loanamount: { type: Number, required: true, },
    Instalment: { type: Number, required: true, },
    InstalmentsDone:{type:Number,required:true},
    remainingamount: { type: Number, required: true, },
    totalAmount:{ type: Number, required: true, },
    LenderId:{type:String, required: true},
    InstallmentRecord: {type:Array},
    certificateNumber:{type:String, required:true}
})

export const ClosedAccountsModel = mongoose.model("Closed Accounts",ClosedAccountsSchema);
