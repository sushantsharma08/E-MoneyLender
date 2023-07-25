import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
import "./Popup.css"

const Popup = (props = { show: Boolean, clientName: String }) => {
    const [Data, setData] = useState();
    const [modalStatus, setmodalStatus] = useState();
    const [text, setText] = useState();
    const isLast = 3;
    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

    useEffect(() => {
        setmodalStatus(props.show);
        axios.get(`https://e-money-lender-back.vercel.app/client/searchbyname/${props.clientName}`).then((res) => {
            setData(res.data)
        });

        if (Data?.remainingamount <= 0) {
            setText('Loan Complete please close account')
        } else {
            setText(`Instalment for month ${Data?.InstalmentsDone + 1} Done`);
        }

    }, [props.clientName]);

    const closeModal = () => {
        setmodalStatus(false);
        resetpopup();
        window.location.reload();
    }

    const resetpopup = () => {
        setData(null);
    }

    const patchInstalment = () => {
        toast.loading("Adding Instalment",{
            duration:1000
        })
        try {
            axios.patch(`https://e-money-lender-back.vercel.app/client/instalmentDone/${Data?.name}`, {
                InstalmentsDone: Data?.InstalmentsDone + 1,
                remainingamount: Data?.remainingamount - (1 * Data?.Instalment)
            });
            setTimeout(() => {
                toast.success("Instalment Done Successfully")
            }, 1000);
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

        <div className='sticky bottom-10 left-12 bg-slate-300 '
            style={{ display: modalStatus ? "block" : "none" }}>

            <button className='absolute right-4 top-4 hover:bg-rose-500' onClick={(e) => closeModal(e)} >
                <img src="/images/close.png" alt="Close" width="40px" srcset="" />
            </button>

            <div id='printablediv'>
                <div className=" h-full w-3/4 mx-auto sm:w-1/2 overflow-scroll  md:overflow-hidden  mt-28 ">
                    <div className='text-center'>
                        <h1 className='mt-14 mb-6 text-3xl font-bold text-neutral-700'>Client Details</h1>
                    </div>
                    <table className="tabled w-full min-w-max table-auto text-left font-bold text-base border-slate-800 text-gray-950">
                        <tbody>

                            <tr className='border-b border-slate-800 ' >

                                <td
                                    variant="small"
                                    color="blue-gray"
                                    className=" leading-none opacity-70 px-4"
                                >
                                    Name
                                </td>
                                <td className={`${classes} border border-slate-800`}>
                                    <span variant="small" color="blue-gray" className="">
                                        {Data?.name}
                                    </span>
                                </td>
                            </tr>
                            <tr className='border-b border-slate-800 '>
                                <td
                                    variant="small"
                                    color="blue-gray"
                                    className=" leading-none opacity-70 px-4"
                                >
                                    Father's Name
                                </td>
                                <td className={`${classes} border border-slate-800`}>
                                    <span variant="small" color="blue-gray" className=" flex items-center">
                                        {Data?.fathername}</span>
                                </td>
                            </tr>
                            <tr className='border-b border-slate-800 '>
                                <td
                                    variant="small"
                                    color="blue-gray"
                                    className=" leading-none opacity-70 px-4"
                                >
                                    Adhaar Number
                                </td>
                                <td className={`${classes} border border-slate-800`}>
                                    <span variant="small" color="blue-gray" className=" flex items-center">{Data?.adhaar}</span>
                                </td>
                            </tr>
                            <tr className='border-b border-slate-800 '>
                                <td
                                    variant="small"
                                    color="blue-gray"
                                    className=" leading-none opacity-70 px-4"
                                >
                                    Phone number
                                </td>
                                <td className={`${classes} border border-slate-800`}>
                                    <span variant="small" color="blue-gray" className=" flex items-center">
                                        <img src="/images/phone.png" alt="" width="12px" className='mx-1' />{Data?.phone}</span>
                                </td>
                            </tr>
                            <tr className='border-b border-slate-800 '>
                                <td
                                    variant="small"
                                    color="blue-gray"
                                    className=" leading-none opacity-70 px-4"
                                >
                                    Loan Principle Amount
                                </td>
                                <td className={`${classes} border border-slate-800`}>
                                    <span variant="small" color="blue-gray" className=" flex items-center">{Data?.loanamount}</span>
                                </td>
                            </tr>
                            <tr className='border-b border-slate-800 '>
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
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center">
                <button className='mt-4 p-4 border border-teal-500/40 bg-indigo-500 font-medium text-md' onClick={() => patchInstalment()}>
                    {Data?.remainingamount > 0 ? `Instalment for month ${Data?.InstalmentsDone + 1} Done` : "Loan complete"}
                </button>
                <button className='p-4 my-2 flex items-center text-xl bg-slate-400' onClick={printData}><span><img className='h-8' src="/images/print.png" alt="" srcset="" /></span>Print</button>
            </div>
            <Toaster/>
        </div>
    )
}

export default Popup