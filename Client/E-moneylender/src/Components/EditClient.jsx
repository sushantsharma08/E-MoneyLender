import React, { useState, useEffect } from 'react'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';


const EditClient = (props = { show: Boolean, clientName: String }) => {
    const [Data, setData] = useState();
    const [UpdatedName, setUpdatedName] = useState();
    const [UpdatedFathersname, setUpdatedFathersname] = useState();
    const [UpdatedAdhaar, setUpdatedAdhaar] = useState();
    const [UpdatedPhone, setUpdatedPhone] = useState();
    const [modalStatus, setmodalStatus] = useState();
    const [UpdatedPrinciple, setUpdatedPrinciple] = useState(0);
    const [UpdatedInstalment, setUpdatedInstalment] = useState(0);
    const [UpdatedRemaingAmount, setUpdatedRemaingAmount] = useState(0);
    const [UpdatedTotalAmount, setUpdatedTotalAmount] = useState(0);
    const isLast = 3;
    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

    useEffect(() => {
        setmodalStatus(props.show);
        axios.get(`https://e-money-lender-back.vercel.app/client/searchbyname/${props.clientName}`).then((res) => {
            setData(res.data)
        });
    }, [props.clientName]);

    const closeModal = () => {
        setmodalStatus(false);
        resetpopup();
        window.location.reload();
    }

    const resetpopup = () => {
        setData(null);
    }

    const ChangeLoanDetails = (x) => {
        setUpdatedPrinciple(Data?.loanamount + Number(x));
        const newTotal = Data?.remainingamount + Number(x) * 136 / 100;
        setUpdatedRemaingAmount(newTotal);
        setUpdatedInstalment(Math.ceil(newTotal / (12 - (Data?.InstalmentsDone))));
        setUpdatedTotalAmount(Data?.totalAmount + Number(x) * 136 / 100);

        console.log(UpdatedPrinciple,
            newTotal,
            UpdatedInstalment,
            UpdatedRemaingAmount,
            UpdatedTotalAmount);
    }

    const patchClientUpdate = async () => {
        toast.loading('Updating Client', {
            duration: 2000
        });
        try {
            console.log(UpdatedPrinciple,
                UpdatedInstalment,
                UpdatedRemaingAmount,
                UpdatedTotalAmount)

            // Update Loan Amount when Extra loan Given

            if (UpdatedPrinciple != 0) {
                const response = await axios.patch(`https://e-money-lender-back.vercel.app/client/update_client_PersonalDetails/${Data?.name}`, {
                    // const response = await axios.patch(`http://localhost:3001/client/update_client_PersonalDetails/${Data?.name}`, {
                    name: UpdatedName,
                    fathername: UpdatedFathersname,
                    adhaar: UpdatedAdhaar,
                    phone: UpdatedPhone,
                    loanamount: UpdatedPrinciple,
                    Instalment: UpdatedInstalment,
                    remainingamount: UpdatedRemaingAmount,
                    totalAmount: UpdatedTotalAmount,
                });

                // const ExtraLoan = axios.post("http://localhost:3001/client/add_ExtraLoanTakers", {
                const ExtraLoan = axios.post("https://e-money-lender-back.vercel.app/client/add_ExtraLoanTakers", {
                    name: UpdatedName ? UpdatedName : Data?.name,
                    phone: UpdatedPhone ? UpdatedPhone : Data?.phone,
                    adhaar: UpdatedAdhaar ? UpdatedAdhaar : Data?.adhaar,
                    previousLoanPrinciple: Data?.loanamount,
                    previousMonthlyInstalment: Data.Instalment,
                    instalmentsDoneBeforeNewLoan: Data?.InstalmentsDone,
                    newLoanPrinciple: UpdatedPrinciple,
                    newMonthlyInstalment: UpdatedInstalment,
                    ClientId: Data?._id,
                })

                console.log('updated loan too');
                if (response.data.status == 202) {
                    toast.success(response.data.message);
                    setTimeout(() => {
                        //   closeModal();  
                    }, 2000)
                } else if (response.data.status == 400) {
                    toast.error(response.data.message)
                }
                // Only Update Personal Details
            } else {
                const response = await axios.patch
                    (`https://e-money-lender-back.vercel.app/client/update_client_PersonalDetails/${Data?.name}`, {
                        // (`http://localhost:3001/client/update_client_PersonalDetails/${Data?.name}`, {
                        name: UpdatedName,
                        fathername: UpdatedFathersname,
                        adhaar: UpdatedAdhaar,
                        phone: UpdatedPhone,

                    })
                console.log('updated personal only');
                if (response.data.status == 202) {
                    toast.success(response.data.message);
                    setTimeout(() => {
                        //   closeModal();  
                    }, 2000)
                } else if (response.data.status == 400) {
                    toast.error(response.data.message)
                }
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const CloseAccount = (e) => {
        toast.loading('Deleting Client', {
            duration: 2000,
        });
        const id = e.target.id;
        axios.delete(`https://e-money-lender-back.vercel.app/client/removeClient/${id}`);
        toast.success("deleted Successfully")
        setTimeout(() => {
            window.location.reload();
            clearTimeout()
        }, 1000);
    }

    return (

        <div className='sticky pt-2 bottom-full left-12 bg-gray-400 '
            style={{ display: modalStatus ? "block" : "none" }}>

            <button className='absolute right-4 top-4 hover:bg-rose-500' onClick={(e) => closeModal(e)} >
                <img src="/images/close.png" alt="Close" width="40px" srcset="" />
            </button>

            <div id='printablediv'>
                <div className=" h-full w-3/4 mx-auto sm:w-3/4 overflow-scroll  md:overflow-hidden  mt-28 ">
                    <div className='text-center'>
                        <h1 className=' mb-28 text-3xl font-bold text-neutral-700'>Edit Client Details</h1>
                    </div>
                    <table className="w-full min-w-max table-auto text-left font-bold text-base border-slate-800 text-gray-950">
                        <tbody>

                            <tr className='border-b border-slate-800' >
                                <td
                                    variant="small"
                                    color="blue-gray"
                                    className=" leading-none opacity-70 px-4 old"
                                >
                                    Name
                                </td>
                                <td className={`${classes} border border-slate-800 old`}>
                                    <span variant="small" color="blue-gray" className="">
                                        {Data?.name}
                                    </span>
                                </td>

                                <td className={`${classes} border border-slate-800`}>
                                    <input className='h-10 p-3 w-full' type="text" name="" id="" placeholder='Enter New Name' onChange={(e) => setUpdatedName(e.target.value.toLowerCase().trim())} />
                                </td>
                            </tr>
                            <tr className='border-b border-slate-800 '>
                                <td
                                    variant="small"
                                    color="blue-gray"
                                    className=" leading-none opacity-70 px-4 old"
                                >
                                    Father's Name
                                </td>
                                <td className={`${classes} border border-slate-800 old`}>
                                    <span variant="small" color="blue-gray" className=" flex items-center ">
                                        {Data?.fathername}</span>
                                </td>
                                <td className={`${classes} border border-slate-800`}>
                                    <input className='h-10 p-3 w-full' type="text" name="" id="" placeholder="Enter New Father's Name" onChange={(e) => setUpdatedFathersname(e.target.value)} />
                                </td>
                            </tr>
                            <tr className='border-b border-slate-800 '>
                                <td
                                    variant="small"
                                    color="blue-gray"
                                    className=" leading-none opacity-70 px-4 old"
                                >
                                    Adhaar Number
                                </td>
                                <td className={`${classes} border border-slate-800 old`}>
                                    <span variant="small" color="blue-gray" className=" flex items-center">{Data?.adhaar}</span>
                                </td>
                                <td className={`${classes} border border-slate-800`}>
                                    <input className='h-10 p-3 w-full' type="number" name="" id="" placeholder="Enter New Adhaar Number" onChange={(e) => setUpdatedAdhaar(e.target.value)} />
                                </td>

                            </tr>
                            <tr className='border-b border-slate-800 '>
                                <td
                                    variant="small"
                                    color="blue-gray"
                                    className=" leading-none opacity-70 px-4 old"
                                >
                                    Phone number
                                </td>
                                <td className={`${classes} border border-slate-800 old`}>
                                    <span variant="small" color="blue-gray" className=" flex items-center">
                                        <img src="/images/phone.png" alt="" width="12px" className='mx-1' />{Data?.phone}</span>
                                </td>
                                <td className={`${classes} border border-slate-800`}>
                                    <input className='h-10 p-3 w-full' type="number" name="" id="" placeholder="Enter New Contact Number" onChange={(e) => setUpdatedPhone(e.target.value)} />
                                </td>
                            </tr>

                            {/* Extra features */}

                            <tr className='border-b border-slate-800 '>
                                <td
                                    variant="small"
                                    color="blue-gray"
                                    className=" leading-none opacity-70 px-4 old"
                                >
                                    Previous Loan Amount
                                </td>
                                <td className={`${classes} border border-slate-800 old`}>
                                    <span variant="small" color="blue-gray" className=" flex items-center">{Data?.loanamount}</span>
                                </td>
                                <td className={`${classes} border border-slate-800`}>
                                    <input className='h-10 p-3 w-full' type="number" name="" id="" placeholder="Enter Newly Taken Principle Amount" onChange={(e) => ChangeLoanDetails(e.target.value)} />
                                </td>
                            </tr>
                            <td className={`${classes} border border-slate-800 old`}>
                                <span variant="small" color="blue-gray" className=" flex items-center">{UpdatedPrinciple}</span>
                            </td>
                            <td className={`${classes} border border-slate-800 old`}>
                                <span variant="small" color="blue-gray" className=" flex items-center">{UpdatedRemaingAmount}</span>
                            </td>
                            <td className={`${classes} border border-slate-800 old`}>
                                <span variant="small" color="blue-gray" className=" flex items-center">{UpdatedTotalAmount}</span>
                            </td>

                            {/* <tr className='border-b border-slate-800 '>
                                <td
                                    variant="small"
                                    color="blue-gray"
                                    className=" leading-none opacity-70 px-4"
                                >
                                    Total Amount
                                </td>
                                <td className={`${classes} border border-slate-800`}>
                                    <span variant="small" color="blue-gray" className=" flex items-center">
                                        {Data?.totalAmount}
                                    </span>
                                </td>
                            </tr>
                            <tr className='border-b border-slate-800 '>
                                <td
                                    variant="small"
                                    color="blue-gray"
                                    className=" leading-none opacity-70 px-4"
                                >
                                    Monthly Instalment amount
                                </td>
                                <td className={`${classes} border border-slate-800`}>
                                    <span variant="small" color="blue-gray" className=" flex items-center">{Data?.Instalment}</span>
                                </td>
                            </tr>
                            <tr className='border-b border-slate-800 '>
                                <td
                                    variant="small"
                                    color="blue-gray"
                                    className=" leading-none opacity-70 px-4"
                                >
                                    Number of Instalments done
                                </td>
                                <td className={`${classes} border border-slate-800`}>
                                    <span variant="small" color="blue-gray" className=" flex items-center">
                                        {Data?.InstalmentsDone}</span>
                                </td>
                            </tr>
                            <tr className='border-b border-slate-800 '>
                                <td
                                    variant="small"
                                    color="blue-gray"
                                    className=" leading-none opacity-70 px-4"
                                >
                                    Total Remaining Amount
                                </td>
                                <td className={`${classes} border border-slate-800`}>
                                    <span variant="small" color="blue-gray" className=" flex items-center">
                                        {Data?.remainingamount}
                                    </span>
                                </td>
                            </tr> */}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center">
                <button className='mt-4 p-4 border border-teal-500/40 bg-indigo-500 font-medium text-md' onClick={() => patchClientUpdate()}>
                    Update Client
                </button>
                <button id={Data?._id} className='p-4 py`-2 my-2 flex items-center text-xl bg-red-400' onClick={(e) => CloseAccount(e)} ><span><img src="/images/delete.png" alt="" srcset="" /></span>Delete Client</button>
            </div>
            <Toaster />
        </div>
    )
}


export default EditClient