import React, { useState, useEffect } from 'react'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { IoPersonSharp } from "react-icons/io5";


const EditClient = (props = { show: Boolean, clientName: String }) => {
    const [Data, setData] = useState();
    const [ChangeImageDialoge, setChangeImageDialoge] = useState(false);
    const [UpdatedName, setUpdatedName] = useState();
    const [UpdatedImage, setUpdatedImage] = useState();
    const [UpdatedFathersname, setUpdatedFathersname] = useState();
    const [UpdatedAdhaar, setUpdatedAdhaar] = useState();
    const [UpdatedPhone, setUpdatedPhone] = useState();
    const [modalStatus, setmodalStatus] = useState();
    const [UpdatedPrinciple, setUpdatedPrinciple] = useState(0);
    const [UpdatedInstalment, setUpdatedInstalment] = useState(0);
    const [UpdatedRemaingAmount, setUpdatedRemaingAmount] = useState(0);
    const [UpdatedTotalAmount, setUpdatedTotalAmount] = useState(0);
    const [InstallmentRecord, setInstallmentRecord] = useState([
        // {"installmentNumber":0 , "installmentAmount":0,"installmentDate" : 0}
    ]);
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

    // img handle
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
        setUpdatedImage(Base64);
        console.log(UpdatedImage);
    }

    const ChangeImage = async () => {
        const response = await axios.patch(`https://e-money-lender-back.vercel.app/client/changeImage/${Data?.name}`, {
            PassportImage: UpdatedImage
        });
        console.log("mage updated");
        console.log(UpdatedImage);
        console.log(response);
    }

    const EditInstallmentRecord = (e) => {
        switch (e.target.name) {

            case "InstallmentNumber":
                setInstallmentRecord({ ...InstallmentRecord, "installmentNumber": e.target.value })
                break;

            case "InstallmentAmount":
                setInstallmentRecord({ ...InstallmentRecord, "installmentAmount": e.target.value })
                break;

            case "InstallmentDate":
                setInstallmentRecord({ ...InstallmentRecord, "installmentDate": e.target.value })
                break;

            default:
                break;
        }
        console.log(InstallmentRecord);
        console.log(Data);
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
                        InstallmentRecord : [...Data.InstallmentRecord,InstallmentRecord]
                    })
                console.log('updated personal only');
                if (response.data.status == 202) {
                    toast.success(response.data.message);
                    setTimeout(() => {
                          closeModal();  
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
                <div className=" h-full w-3/4 mx-auto sm:w-3/4 overflow-scroll  md:overflow-hidden ">
                    <div className='flex relative justify-center py-20'>
                        <h1 className=' py-16 text-3xl font-bold text-neutral-700'>Edit Client Details</h1>
                        <div className="head absolute right-10" style={{ display: "flex", justifyContent: "end", }}>
                            <div onMouseEnter={() => setChangeImageDialoge(true)} onMouseLeave={() => setChangeImageDialoge(false)} >
                                {
                                    Data?.PassportImage ?
                                        <img src={Data?.PassportImage} alt="Profile Picture" height="200px" width="200px" style={{ border: "1px solid black", maxWidth: "100%", aspectRatio: "1/1", objectFit: "cover" }} /> :
                                        // {
                                        // UpdatedImage ? 
                                        // <img src={UpdatedImage} alt="Profile Picture" height="200px" width="200px" style={{ border: "1px solid black", borderRadius: "55%" }} /> :
                                        <IoPersonSharp size="200px" style={{ border: "1px solid black", maxWidth: "100%", aspectRatio: "1/1", objectFit: "cover" }} />
                                    // }
                                    // <IoPersonSharp size="200px" style={{ border: "1px solid black", borderRadius: "55%", }} />
                                }
                                <div className='h-48 w-48 absolute bottom-1 right-1 flex-col justify-center items-center opacity-80 bg-red-50' style={{ display: ChangeImageDialoge ? "flex" : "none" }}>
                                    <input type="file" name="PassportImage" id="passportImage" onChange={handleImg} />
                                    <button className='text-black border-2 border-zinc-400 p-2 px-4' onClick={() => ChangeImage(UpdatedImage)}>Change Image</button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <table className="w-full min-w-max table-auto text-left font-bold text-base border-slate-800 text-gray-950">
                        <tbody>

                            <tr className='h-4 border-b border-slate-800' >
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



                            <tr className='border-b border-slate-800 '>
                                <td
                                    variant="small"
                                    color="blue-gray"
                                    className=" leading-none opacity-70 px-4 old"
                                >
                                    *New Loan Amount
                                </td>
                                <td className={`${classes} border border-slate-800 old`}>
                                    <span variant="small" color="blue-gray" className=" flex items-center">{UpdatedPrinciple}</span>
                                </td>
                                <td className={`${classes} border border-slate-800`}>
                                    {/* <input className='h-10 p-3 w-full' type="number" name="" id="" placeholder="Enter Newly Taken Principle Amount" onChange={(e) => ChangeLoanDetails(e.target.value)} /> */}
                                </td>
                            </tr>


                            <tr className='border-b border-slate-800 '>
                                <td
                                    variant="small"
                                    color="blue-gray"
                                    className=" leading-none opacity-70 px-4 old"
                                >
                                    *New Total Amount (with Profit)
                                </td>
                                <td className={`${classes} border border-slate-800 old`}>
                                    <span variant="small" color="blue-gray" className=" flex items-center">{UpdatedTotalAmount}</span>
                                </td>
                                <td className={`${classes} border border-slate-800`}>
                                    {/* <input className='h-10 p-3 w-full' type="number" name="" id="" placeholder="Enter Newly Taken Principle Amount" onChange={(e) => ChangeLoanDetails(e.target.value)} /> */}
                                </td>
                            </tr>


                            <tr className='border-b border-slate-800 '>
                                <td
                                    variant="small"
                                    color="blue-gray"
                                    className=" leading-none opacity-70 px-4 old"
                                >
                                    *New Remaining Amount
                                </td>
                                <td className={`${classes} border border-slate-800 old`}>
                                    <span variant="small" color="blue-gray" className=" flex items-center">{UpdatedRemaingAmount}</span>
                                </td>
                                <td className={`${classes} border border-slate-800`}>
                                    {/* <input className='h-10 p-3 w-full' type="number" name="" id="" placeholder="Enter Newly Taken Principle Amount" onChange={(e) => ChangeLoanDetails(e.target.value)} /> */}
                                </td>
                            </tr>
                            <tr className='border-b border-slate-800 '>
                                <td
                                    variant="small"
                                    color="blue-gray"
                                    className=" leading-none opacity-70 px-4 old"
                                >
                                    *New Insatlment
                                </td>
                                <td className={`${classes} border border-slate-800 old`}>
                                    <span variant="small" color="blue-gray" className=" flex items-center">{UpdatedInstalment}</span>
                                </td>
                                <td className={`${classes} border border-slate-800`}>
                                    {/* <input className='h-10 p-3 w-full' type="number" name="" id="" placeholder="Enter Newly Taken Principle Amount" onChange={(e) => ChangeLoanDetails(e.target.value)} /> */}
                                </td>
                            </tr>


                            <tr className='border-b border-slate-800 '>

                                <td className={`${classes} border border-slate-800 old`}>
                                    <span variant="small" color="blue-gray" className=" flex items-center">Installment Number</span>
                                </td>
                                <td className={`${classes} border border-slate-800 old`}>
                                    <span variant="small" color="blue-gray" className=" flex items-center">Installment Amount</span>
                                </td>
                                <td className={`${classes} border border-slate-800 `}>
                                    <span variant="small" color="blue-gray" className=" flex items-center">Date of Installment</span>
                                </td>

                            </tr>




                            <tr className='border-b border-slate-800 '>

                                <td className={`${classes} border border-slate-800 old`}>
                                    <span variant="small" color="blue-gray" className=" flex items-center">
                                        <input className='h-10 p-3 w-full' onChange={(e) => EditInstallmentRecord(e)} type="number" name="InstallmentNumber" placeholder='Enter installment number' id="" />
                                    </span>
                                </td>
                                <td className={`${classes} border border-slate-800 old`}>
                                    <span variant="small" color="blue-gray" className=" flex items-center">
                                        <input className='h-10 p-3 w-full' onChange={(e) => EditInstallmentRecord(e)} type="number" name="InstallmentAmount" placeholder='Installment Amount' id="" />
                                    </span>
                                </td>
                                <td className={`${classes} border border-slate-800 `}>
                                    <span variant="small" color="blue-gray" className=" flex items-center">
                                        <input className='h-10 p-3 w-full' onChange={(e) => EditInstallmentRecord(e)} type="date" name="InstallmentDate" id="" />
                                    </span>
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center">
                <button className='mt-4 p-4 border border-teal-500/40 bg-indigo-500 font-medium text-md' onClick={() => patchClientUpdate()}>
                    Update Client
                </button>
                <button id={Data?._id} className='p-4 py-2 my-2 flex items-center text-xl bg-red-400' onClick={(e) => CloseAccount(e)} ><span><img src="/images/delete.png" alt="" srcset="" /></span>Delete Client</button>
            </div>
            <Toaster />
        </div>
    )
}


export default EditClient