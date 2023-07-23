import React, { useState } from 'react';
import axios from "axios";
import { useGetUserId } from '../hooks/useGetUserId';
import toast, { Toaster } from 'react-hot-toast';


const Form = () => {

    const [name, setName] = useState();
    const [fathername, setFathersname] = useState();
    const [adhaar, setAdhaar] = useState(0);
    const [gender, setGender] = useState();
    const [loanAmount, setLoanAmount] = useState(0);
    const [monthlyInstalment, setMonthlyInstalment] = useState(0);
    const [missedInstalment, setMissedInstalment] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [phone, setPhone] = useState(0);
    const LenderId = useGetUserId();



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
    }

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
                adhaar: adhaar,
                loanamount: loanAmount,
                Instalment: monthlyInstalment,
                InstalmentsDone: 0,
                remainingamount: totalAmount,
                totalAmount,
                LenderId
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
                <span className="form_title text-xl font-bold py-2 ">Enter Client Data</span>

                
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
                            <label className='label' htmlFor="fathername">Father Name</label>
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

                {/* <div class="relative overflow-x-auto shadow-md sm:rounded-lg p-6">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <tbody>
                            <tr class="border-b border-gray-200 ">
                                <th scope="row" class="py-4 px-14 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white bg-black/60 text-lg">
                                    Name
                                </th>
                                <td class="py-4 px-14 bg-gray-50 bg-black/60 text-lg">
                                    <input id='name' type="text" className='addClient__Input' onChange={(e) => { setName(e.target.value.toLowerCase().trim()) }} />
                                </td>
                            </tr>
                            <tr class="border-b border-gray-200 ">
                                <th scope="row" class="py-4 px-14 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white bg-black/60 text-lg">
                                    Microsoft Surface Pro
                                </th>
                                <td class="py-4 px-14 bg-gray-50 bg-black/60 text-lg">
                                    Laptop PC
                                </td>
                            </tr>
                            <tr class="border-b border-gray-200 ">
                                <th scope="row" class="py-4 px-14 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white bg-black/60 text-lg">
                                    Magic Mouse 2
                                </th>
                                <td class="py-4 px-14 bg-gray-50 bg-black/60 text-lg">
                                    Accessories
                                </td>
                            </tr>
                            <tr class="border-b border-gray-200 ">
                                <th scope="row" class="py-4 px-14 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white bg-black/60 text-lg">
                                    Google Pixel Phone
                                </th>
                                <td class="py-4 px-14 bg-gray-50 bg-black/60 text-lg">
                                    Phone
                                </td>
                            </tr>
                            <tr>
                                <th scope="row" class="py-4 px-14 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white bg-black/60 text-lg">
                                    Apple Watch 5
                                </th>
                                <td class="py-4 px-14 bg-gray-50 bg-black/60 text-lg">
                                    Wearables
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div> */}

            </div>
            <Toaster />
        </section>
    )
}

export default Form