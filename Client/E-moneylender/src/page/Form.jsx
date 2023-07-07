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
    const [totalAmount, setTotalAmount] = useState(0);
    const [phone,setPhone]=useState(0);


    const setValues = (amount) => {
        let P = Number(amount.target.value);
        let R = 36;
        let T = 1;
        const interest = Math.ceil(P * R * T / 100);
        let emi = Math.ceil((P + interest) / 12);
        setLoanAmount(P);
        setMonthlyInstalment(emi);
        setTotalAmount(P + interest);
        setMissedInstalment(((10 / 100) * emi) + emi)
        console.log(P, emi, interest, totalAmount, missedInstalment);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const url = "https://e-money-lender-back.vercel.app/client/add_client"
            // const url="http://localhost:3001/client/add_client"
            const response = await axios.post(url, {
                name,
                fathername,
                gender: gender,
                phone,
                adhaar: adhaar,
                loanamount: loanAmount,
                Instalment: monthlyInstalment,
                InstalmentsDone: 0,
                remainingamount: totalAmount,
                totalAmount
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section className='form__mainsection'>
            <div className="image">
                <img src="/images/lenderIcon.png" alt="" srcset="" />
            </div>
            <div className='form'>
                <form action='/add_client' method="post" encType='multipart/form-data'>

                    <div className="Form__row">
                        <label className='label' htmlFor="name">Name</label>
                        <div className='inputField'>
                            <input id='name' type="text" onChange={(e) => { setName(e.target.value.toLowerCase().trim()) }} />
                        </div>
                    </div>


                    <div className="Form__row">
                        <label className='label' htmlFor="fathername">Father Name</label>
                        <div className='inputField'>
                            <input id='fathername' type="text" onChange={(e) => { setFathersname(e.target.value.toLowerCase()) }} />
                        </div>
                    </div>


                    <div className="Form__row">
                        <label className='label' htmlFor="gender">Gender</label>
                        <div className='inputField'>
                            <span className="gender" >
                                <input
                                    onClick={(e) => { setGender(e.target.value) }}
                                    style={{ height: "20px" }}
                                    type="radio" name="gender" value="male" id="Gender_male" />
                                <label htmlFor="Gender_male">Male</label>
                            </span>
                            <span className="gender">
                                <input
                                    onClick={(e) => { setGender(e.target.value) }}
                                    style={{ height: "20px" }}
                                    type="radio" name="gender" id="Gender_female" value="female" />
                                <label htmlFor="Gender_female">Female</label>
                            </span>
                        </div>
                        {/* <select name="gender" id="gender" onClick={(e) => { setGender(e.target.value) }}>
                    <option value="" selected disabled>Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select> */}
                    </div>


                    <div className="Form__row">
                        <label className='label' htmlFor="phone">Phone Number</label>
                        <div className='inputField'>
                            <input type="number" name="phone" id="phone" onChange={(e) => { setPhone(e.target.value) }} />
                        </div>
                    </div>

                    <div className="Form__row">
                        <label className='label' htmlFor="adhaar">Adhaar Number</label>
                        <div className='inputField'>
                            <input type="number" name="AdhaarNumber" id="adhaar" onChange={(e) => { setAdhaar(e.target.value) }} />
                        </div>
                    </div>


                    <div className="Form__row">
                        <label className='label' htmlFor="Amount">Loan Amount</label>
                        <div className='inputField'>
                            <input type="number" name="loanamount" id="Amount" onChange={(e) => { setValues(e) }} />
                        </div>
                    </div>


                    <div className="Form__row">
                        <label className='label' htmlFor="monthlyinstalment">Monthly Installment</label>
                        <div className='inputField'>
                            <input type="number" disabled name="loanamount" id="monthlyinstalment" value={monthlyInstalment} />
                        </div>

                        {/* @36% per month */}
                    </div>

                    <div className="Form__row">
                        <label className='label' htmlFor="totalAmount">Total Amount</label>
                        <div className='inputField'>
                            <input type="number" disabled name="totalamount" id="totalAmount" value={totalAmount} />
                        </div>
                    </div>


                    <div className="Form__row">
                        <label className='label' htmlFor="missedamount">If missed installment</label>
                        <div className='inputField'>
                            <input type="number" disabled name="missed" id="missedamount" value={missedInstalment} />
                        </div>
                    </div>

                    <div className='btnDiv'>
                        <button className='form__saveBtn' type='submit' onClick={onSubmit} value="save">Save</button>
                    </div>

                </form>
            </div>
        </section>
    )
}

export default Form