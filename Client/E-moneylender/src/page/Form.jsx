import React, { useState,useEffect } from 'react';
import axios from "axios";
import { useGetUserId } from '../hooks/useGetUserId';
import toast, { Toaster } from 'react-hot-toast';


const Form = () => {

    // setStates for each entry

    const [name, setName] = useState();
    const [fathername, setFathersname] = useState();
    const [adhaar, setAdhaar] = useState(0);
    const [PassportImage, setPassportImage] = useState("");
    const [gender, setGender] = useState();
    const [loanAmount, setLoanAmount] = useState(0);
    const [monthlyInstalment, setMonthlyInstalment] = useState(0);
    const [missedInstalment, setMissedInstalment] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [phone, setPhone] = useState(0);
    const [Interest, setInterest] = useState();
    const LenderId = useGetUserId();


// call for current Interest Rates
    useEffect(() => {
        const getLender = axios.get(`https://e-money-lender-back.vercel.app/auth/user/${LenderId}`).then((res)=>setInterest(res.data.interestRate));
    }, [])

// loan calculations
    const setValues = (amount) => {
        let P = Number(amount.target.value);
        let T = 1;
        const interest = Math.ceil(P * Interest * T / 100);
        let emi = Math.ceil((P + interest) / 12);
        setLoanAmount(P);
        setMonthlyInstalment(emi);
        setTotalAmount(P + interest);
        setMissedInstalment(((10 / 100) * emi) + emi)
    }

    // img upload
    const ConvertToBase = (file) => {
        return new Promise((resolve, reject) => {
            const filereader = new FileReader();
            filereader.readAsDataURL(file)
            filereader.onload = () => {
                resolve(filereader.result)
            }
            filereader.onerror = (error) => {
                reject(error)
            }
        })
    }

    const handleImg = async (e) => {
        const file = e.target.files[0];
        const Base64 = await ConvertToBase(file);
        setPassportImage(Base64);
        console.log(Base64);
    }

    // submit handler
    const onSubmit = async (event) => {
        event.preventDefault();
        toast.loading('Adding Client', {
            duration: 1000
        })
        try {
            const url = "https://e-money-lender-back.vercel.app/client/add_client"
            // const url="http://localhost:3001/client/add_client"
            const response = await axios.post(url, {
                name,
                fathername,
                gender: gender,
                phone,
                adhaar,
                PassportImage,
                loanamount: loanAmount,
                Instalment: monthlyInstalment,
                InstalmentsDone: 0,
                remainingamount: totalAmount,
                totalAmount,
                LenderId,
                isOpen : true
            });
            if (response.data.status === 400) {
                toast(response.data.message, {
                    style: {
                        backgroundColor: "rgba(241, 170, 170,1)"
                    }
                })
            } else if (response.data.status === 201) {
                toast(response.data.message, {
                    style: {
                        backgroundColor: "greenyellow"
                    }
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section className='form__mainsection'>
            <div className="text-center flex items-center flex-col sm:flex-row">
                <div className='flex flex-col'>
                    <span className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl pb-14">
                        Enter client data in the form below
                    </span>
                    <p className='text-sm text-gray-500 '>This will help keep track of the borrowers and their payments</p>

                </div>
                <a href="https://storyset.com/business"><img src="/images/Uploading.gif" /></a>
            </div>
            <div className='form mx-auto my-20'>
            <div className='border-b 
            border-b-gray-400 w-full text-center text-orange-800 bg-slate-100'>*Your current interest rate is {Interest}%</div>
            <hr/>
                <span className="form_title text-xl font-bold py-2 bg-slate-200 w-full text-center">Enter Client Data</span>


                <form  action='/add_client'
                    method="post" encType='multipart/form-data'>

                    <div className="form_content">
                        <div className="Form__row">
                            <label className='label' htmlFor="name">Name</label>
                            <div className='inputField'>
                                <input id='name' type="text" className='addClient__Input' onChange={(e) => { setName(e.target.value.toLowerCase().trim()) }} />
                            </div>
                        </div>


                        <div className="Form__row">
                            <label className='label' htmlFor="fathername">Father's Name</label>
                            <div className='inputField'>
                                <input id='fathername' type="text" className='addClient__Input' onChange={(e) => { setFathersname(e.target.value.toLowerCase()) }} />
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
                        </div>


                        <div className="Form__row">
                            <label className='label' htmlFor="phone">Phone Number</label>
                            <div className='inputField'>
                                <input type="number" className='addClient__Input' name="phone" id="phone" onChange={(e) => { setPhone(e.target.value) }} />
                            </div>
                        </div>

                        <div className="Form__row">
                            <label className='label' htmlFor="adhaar">Adhaar Number</label>
                            <div className='inputField'>
                                <input type="number" className='addClient__Input' name="AdhaarNumber" id="adhaar" onChange={(e) => { setAdhaar(e.target.value) }} />
                            </div>
                        </div>
                        
                        <div className="Form__row">
                            <label className='label' htmlFor="adhaar">Client Photo</label>
                            <div className='inputField'>
                                <input type="file" className='addClient__Input' name="passportImg" id="passportImg" onChange={(e) => {handleImg(e)}} />
                            </div>
                        </div>

                        <div className="Form__row">
                            <label className='label' htmlFor="Amount">Loan Amount</label>
                            <div className='inputField'>
                                <input type="number" className='addClient__Input' name="loanamount" id="Amount" onChange={(e) => { setValues(e) }} />
                            </div>
                        </div>


                        <div className="Form__row">
                            <label className='label' htmlFor="monthlyinstalment">Monthly Installment</label>
                            <div className='inputField'>
                                <input type="number" className='addClient__Input' disabled name="loanamount" id="monthlyinstalment" value={monthlyInstalment} />
                            </div>

                            {/* @36% per month */}
                        </div>

                        <div className="Form__row">
                            <label className='label' htmlFor="totalAmount">Total Amount</label>
                            <div className='inputField'>
                                <input type="number" className='addClient__Input' disabled name="totalamount" id="totalAmount" value={totalAmount} />
                            </div>
                        </div>


                        <div className="Form__row">
                            <label className='label' htmlFor="missedamount">If missed installment</label>
                            <div className='inputField'>
                                <input type="number" className='addClient__Input' disabled name="missed" id="missedamount" value={missedInstalment} />
                            </div>
                        </div>

                        <div className='btnDiv'>
                            <button className='form__saveBtn' type='submit' onClick={onSubmit} value="save">Save</button>
                        </div>
                    </div>

                </form>

            </div>
            <Toaster />
        </section>
    )
}

export default Form