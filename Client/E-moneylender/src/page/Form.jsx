import React, { useState } from 'react';
import axios from "axios";

const Form = () => {

    const [name, setName] = useState();
    const [fathername, setFathersname] = useState();
    const [adhaar, setAdhaar] = useState(0);
    const [gender, setGender] = useState();
    const [loanAmount, setLoanAmount] = useState(0);
    const [monthlyInstalment, setMonthlyInstalment] = useState(0);
    const [missedInstalment, setMissedInstalment] = useState(0);
    const [totalAmount,setTotalAmount] = useState(0);


    const setValues = (amount) => {
        let P =Number(amount.target.value) ;
        let R = 36 ;
        let T=1;
        const interest = Math.ceil(P*R*T/100);
        let emi = Math.ceil((P+interest)/12);
        setLoanAmount(P);
        setMonthlyInstalment(emi);
        setTotalAmount(P+interest);
        setMissedInstalment(((10/100)*emi)+emi)
        console.log(P,emi,interest,totalAmount,missedInstalment);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const url="https://e-money-lender-back.vercel.app/client/add_client"
            // const url="http://localhost:3001/client/add_client"
            const response = await axios.post(url, {
                name,
                fathername,
                gender:gender,
                adhaar:adhaar,
                loanamount:loanAmount,
                Instalment:monthlyInstalment,
                InstalmentsDone:0,
                remainingamount:totalAmount,
                totalAmount
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='form'>
            <form action='/add_client' method="post" encType='multipart/form-data'>

                <label htmlFor="name">Name</label> <input id='name' type="text" onChange={(e) => { setName(e.target.value.toLowerCase()) }} />

                <br />

                <label htmlFor="fathername">Father Name</label>
                <input id='fathername' type="text" onChange={(e) => {setFathersname(e.target.value.toLowerCase())}} />
                <br />

                <label htmlFor="gender">Gender</label>
                <select name="gender" id="gender" onClick={(e) => { setGender(e.target.value) }}>
                    <option value="" selected disabled>Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>

                <br />

                <label htmlFor="adhaar">Adhaar Number</label>
                <input type="number" name="AdhaarNumber" id="adhaar" onChange={(e) => { setAdhaar(e.target.value) }} />
                <br />

                <label htmlFor="Amount">Loan Amount</label>
                <input type="number" name="loanamount" id="Amount" onChange={(e) => { setValues(e) }} />

                <br />

                <label htmlFor="monthlyinstalment">Monthly Installment</label>
                <input type="number" disabled name="loanamount" id="Amountmonthlyinstalment" value={monthlyInstalment} />
                @36% per month
                <br />

                <label htmlFor="Amount">Total Amount</label>
                <input type="number" disabled name="totalamount" id="totalAmount" value={totalAmount} />
                <br />

                <label htmlFor="missedamount">If missed installment</label>
                <input type="number" disabled name="missed" id="missedamount" value={missedInstalment} />
                <br />

                <input type='submit' onClick={onSubmit} value="save" />
            </form>
        </div>
    )
}

export default Form