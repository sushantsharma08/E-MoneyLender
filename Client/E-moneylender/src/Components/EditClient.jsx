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

    const patchClientUpdate = async () => {
        toast.loading('Updating Client', {
            duration: 2000
        });
        setData({ ...Data, name: UpdatedName, fathername: UpdatedFathersname, adhaar: UpdatedAdhaar, phone: UpdatedPhone });
        try {
            const response = await axios.patch(`https://e-money-lender-back.vercel.app/client/update_client/${Data?.name}`, {
                // const response= await axios.patch(`http://localhost:3001/client/update_client/${Data?.name}`, {
                name: UpdatedName,
                fathername: UpdatedFathersname,
                adhaar: UpdatedAdhaar,
                phone: UpdatedPhone
            });

            if (response.data.status == 202) {
                toast.success(response.data.message)
            } else if (response.data.status == 400) {
                toast.error(response.data.message)
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

        <div className='sticky py-32 bottom-28 left-12 bg-gray-400 '
            style={{ display: modalStatus ? "block" : "none" }}>

            <button className='absolute right-4 top-4 hover:bg-rose-500' onClick={(e) => closeModal(e)} >
                <img src="/images/close.png" alt="Close" width="40px" srcset="" />
            </button>

            <div id='printablediv'>
                <div className=" h-full w-3/4 mx-auto sm:w-3/4 overflow-scroll  md:overflow-hidden  mt-28 ">
                    <div className='text-center'>
                        <h1 className=' mb-28 text-3xl font-bold text-neutral-700'>Edit Client Details</h1>
                    </div>
                    <table className="tabled w-full min-w-max table-auto text-left font-bold text-base border-slate-800 text-gray-950">
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
                                    <input className='h-10 p-3 w-full' type="text" name="" id="" placeholder='Enter New Name' onChange={(e) => setUpdatedName(e.target.value)} />
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
                            {/* <tr className='border-b border-slate-800 '>
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