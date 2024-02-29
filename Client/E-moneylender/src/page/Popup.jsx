import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
import "./Popup.css"
import { IoPersonSharp } from "react-icons/io5";

const Popup = (props = { show: Boolean, clientName: String }) => {
    const [Data, setData] = useState();
    const [modalStatus, setmodalStatus] = useState();
    const [UpdatedInstalment, setUpdatedInstalment] = useState();
    const [ShowEditBtn, setShowEditBtn] = useState();




    useEffect(() => {
        setmodalStatus(props.show);
        axios.get(`https://e-money-lender-back.vercel.app/client/searchbyname/${props.clientName}`).then(async (res) => {
            setData(res.data);
            console.log("loaded", res.data);
        });
    }, [props.clientName]);

    const deleteEntry = (e) => {
        setUpdatedInstalment(Data?.InstallmentRecord)
        console.log(e.target.id);
        console.log(UpdatedInstalment);
        console.log("before", UpdatedInstalment);
        setUpdatedInstalment(UpdatedInstalment.splice(e.target.id, 1))
        console.log({ clientid: Data._id });
        updateRecord();
        console.log("after", UpdatedInstalment);
    }

    const updateRecord = () => {
        axios.patch(`https://e-money-lender-back.vercel.app/client/updateInstallmentRecord/${Data._id}`,{
        // axios.patch(`http://localhost:3001/client/updateInstallmentRecord/${Data._id}`, {
            InstallmentRecord: UpdatedInstalment
        }).then((res) => console.log(res, InstallmentRecord))
        setTimeout(()=>{
            closeModal();
        },2000)
    }

    const closeModal = () => {
        setmodalStatus(false);
        resetpopup();
        window.location.reload();
    }

    const resetpopup = () => {
        setData(null);
    }

    const patchInstalment = () => {
        toast.loading("Adding Instalment", {
            duration: 1000,
            style: { position: "absolute", top: "40px" }
        })
        try {
            axios.patch(`https://e-money-lender-back.vercel.app/client/instalmentDone/${Data?.name}`, {
                InstalmentsDone: Data?.InstalmentsDone + 1,
                remainingamount: Data?.remainingamount - (1 * Data?.Instalment)
            });
            setTimeout(() => {
                closeModal();
                toast.success("Instalment Done Successfully")
            }, 2000);
        } catch (error) {
            toast.error(error.message)
        }
    }

    const printData = () => {
        let printContents = document.getElementById('printablediv').innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload();
    }

    return (

        <div className='sticky bottom-full left-12 bg-neutral-100 border-2 border-neutral-950 pb-16'
            style={{ display: modalStatus ? "block" : "none" }}>

            <button className='absolute right-4 top-4 hover:bg-rose-500' onClick={(e) => closeModal(e)} >
                <img src="/images/close.png" alt="Close" width="40px" srcset="" />
            </button>

            <div id='printablediv'>
                <div className=" h-full w-3/4 mx-auto sm:w-1/2 overflow-scroll  md:overflow-hidden mt-16">
                    <h1 className=' text-center mt-14 mb-6 text-4xl font-bold text-neutral-700'>Client Details</h1>

                    {/* <hr className='border border-slate-500'/> */}
                    <div className=" my-16 bg-slate-50">
                        <div className="p-1 border-2 border-slate-900">



                            <div className="personalData flex ">
                                <div className="data border flex-1 border-slate-900">
                                    <div className='flex bg-orange-300 border border-slate-950 ' >
                                        <span
                                            variant="small"
                                            color="blue-gray"
                                            className="heading p-2 border-r-2 border-stone-900 w-40"
                                        >
                                            Name
                                        </span>
                                        <span variant="small" color="blue-gray" className="p-2 semi-heading">
                                            {Data?.name}
                                        </span>
                                    </div>
                                    <div className='flex border border-slate-950 '>
                                        <span
                                            variant="small"
                                            color="blue-gray"
                                            className="heading p-2 border-r-2 border-stone-900 w-40"
                                        >
                                            Father's Name
                                        </span>
                                        <span  >
                                            <span variant="small" color="blue-gray" className="p-2 semi-heading flex items-center">
                                                {Data?.fathername}</span>
                                        </span>
                                    </div>
                                    <div className='flex bg-indigo-200 border border-slate-950 '>
                                        <span
                                            variant="small"
                                            color="blue-gray"
                                            className="heading p-2 border-r-2 border-stone-900 w-40"
                                        >
                                            Adhaar Number
                                        </span>
                                        <span  >
                                            <span variant="small" color="blue-gray" className="p-2 semi-heading flex items-center">{Data?.adhaar}</span>
                                        </span>
                                    </div>
                                    <div className='flex border border-slate-950 '>
                                        <span
                                            variant="small"
                                            color="blue-gray"
                                            className="heading p-2 border-r-2 border-stone-900 w-40"
                                        >
                                            Phone number
                                        </span>
                                        <span  >
                                            <span variant="small" color="blue-gray" className="p-2 semi-heading flex items-center">
                                                <img src="/images/phone.png" alt="" width="12px" className='mx-1' />{Data?.phone}</span>
                                        </span>
                                    </div>
                                    <div className='flex border border-slate-950 '>
                                        <span
                                            variant="small"
                                            color="blue-gray"
                                            className="heading border-r-2 border-stone-900 w-40 px-2 py-1"
                                        >
                                            Interest Rate
                                        </span>
                                        <span  >
                                            <span variant="small" color="blue-gray" className="p-1 semi-heading flex items-center">
                                                {Data?.rate}%</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="profilePic border-b-2 w-68 border-slate-900 p-1  ">
                                    <span className="head ">
                                        {
                                            Data?.PassportImage ?
                                                <img src={Data?.PassportImage} alt="Profile Picture" height="200px" width="200px" style={{ border: "2px solid black", minWidth: "200px", aspectRatio: "1/1", objectFit: "cover" }} /> :
                                                <IoPersonSharp size="200px" style={{ border: "1px solid black", maxWidth: "100%", aspectRatio: "1/1", objectFit: "cover" }} />
                                        }
                                    </span>
                                </div>
                            </div>

                            <div className="loanDetails">
                                <div className='flex border border-slate-800 bg-slate-300'>
                                    <span
                                        variant="small"
                                        color="blue-gray"
                                        className="  w-1/4 heading p-2 text-center border-x border-slate-800"
                                    >
                                        Loan Principle Amount
                                    </span>
                                    <span
                                        variant="small"
                                        color="blue-gray"
                                        className="  w-1/4 heading p-2 text-center border-x border-slate-800"
                                    >
                                        Total Amount
                                    </span>
                                    <span
                                        variant="small"
                                        color="blue-gray"
                                        className="  w-1/4 heading p-2 text-center border-x border-slate-800"
                                    >
                                        Monthly Installment amount
                                    </span>
                                    <span
                                        variant="small"
                                        color="blue-gray"
                                        className="  w-1/4 heading p-2 text-center border-x border-slate-800"
                                    >
                                        Total Remaining Amount
                                    </span>


                                </div>
                                <div className='flex border border-slate-800 bg-slate-200'>

                                    <span className={`w-1/4 text-center p-2 border-x border-slate-800`}>
                                        {Data?.loanamount}
                                    </span>
                                    <span className={`w-1/4 text-center p-2 border-x border-slate-800`}>

                                        {Data?.totalAmount}

                                    </span>
                                    <span className={`w-1/4 text-center p-2 border-x border-slate-800`}>
                                        {Data?.Instalment}</span>

                                    <span className={`w-1/4 text-center p-2 border-x border-slate-800`}>

                                        {Data?.remainingamount}

                                    </span>
                                </div>
                            </div>

                            <div className="border border-slate-800 p-4">
                                <span></span>
                            </div>

                            <div className="InstallmentChart border border-slate-800 bg-sky-200 flex">
                                <span className='text-center heading w-1/3 p-2 border-x border-slate-900'>Installments</span>
                                <span className='text-center heading w-1/3 p-2 border-x border-slate-900'>Amount</span>
                                <span className='text-center heading w-1/3 p-2 border-x border-slate-900'>Date</span>
                                <span className='text-center heading w-1/3 p-2 border-x border-slate-900'>edit</span>
                            </div>
                            { Data?.InstallmentRecord?.map((q, id) =>
                                <div className="relative">
                                    <div className="InstallmentChart border border-slate-800  flex " id={id} >
                                        <span className='text-center  w-1/3 p-1 border-x border-slate-900'>{q.installmentNumber}</span>
                                        <span className='text-center  w-1/3 p-1 border-x border-slate-900'>{q.installmentAmount}</span>
                                        <span className='text-center  w-1/3 p-1 border-x border-slate-900'>{q.installmentDate}</span>
                                        <span className='text-center  w-1/3 p-1 border-x border-slate-900'>
                                            <button id={id} className=' border-2 hover:border-red-600 ' onClick={(e) =>{deleteEntry(e)}} >delete</button>
                                        </span>
                                    </div>
                                </div>
                            )}

                        </div>
                        {/* <table className=" w-full min-w-max table-auto text-left font-bold text-base border-slate-800 text-gray-950">
                            <tbody>



                                <tr className='border border-slate-800 '>
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
                                <tr className='border border-slate-800 '>

                                </tr>
                            </tbody>
                        </table> */}

                    </div>

                </div>
            </div>
            <div className="flex flex-col justify-center items-center">
                <button className='mt-4 p-4 border border-teal-500/40 bg-indigo-500 font-medium text-md' onClick={() => patchInstalment()}>
                    {Data?.remainingamount > 0 ? `Instalment for month ${Data?.InstalmentsDone + 1} Done` : "Loan complete"}
                </button>
                <button className='p-4 my-2 flex items-center text-xl bg-slate-400' onClick={printData}><span><img className='h-8' src="/images/print.png" alt="" srcset="" /></span>Print</button>
            </div>
            <Toaster />
        </div>
    )
}

export default Popup