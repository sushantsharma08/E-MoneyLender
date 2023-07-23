import React, { useState, useEffect } from 'react'
import axios from 'axios'
import "./Popup.css"
import {
    useQuery,
} from '@tanstack/react-query'

const Popup = (props = { show: Boolean, clientName: String }) => {
    const [Data, setData] = useState();
    const [modalStatus, setmodalStatus] = useState();
    const [text, setText] = useState();
    // const { isLoading, error,6data } = useQuery({
    //     queryKey: ['clientData'],
    //     queryFn: () =>
    //         fetch(`https://e-money-lender-back.vercel.app/client/searchbyname/${props?.clientName}`).then(
    //             (res) => res.json()
    //         ),
    // })
    // useEffect(() => {
    //     console.log(props.show);
    //     setmodalStatus(props.show);
    //     if (modalStatus===false) {
    //         setData();
    //     }else{

    //     }
    // }, [props.clientName])

    // if (isLoading) return <div className='popup_forClientDetails'
    //     style={{ display: modalStatus ? "block" : "none" }}>{console.log(isLoading)}
    //     Loading...
    // </div>

    // if (error) return 'An error has occurred: ' + error.message

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
        axios.patch(`https://e-money-lender-back.vercel.app/client/instalmentDone/${Data?.name}`, {
            InstalmentsDone: Data?.InstalmentsDone + 1,
            remainingamount: Data?.remainingamount - (1 * Data?.Instalment)
        });
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

        <div className='popup_forClientDetails'
            style={{ display: modalStatus ? "block" : "none" }}>
            <button className='popup__btn popup__closebtn' style={{ position: "absolute", right: "5px", top: "5px" }} onClick={(e) => closeModal(e)} ><img src="/images/close.png" alt="Close" width="40px" srcset="" /></button>
            <div id='printablediv' className="table">
                <h1 style={{ marginTop: "50px", color: "ghostwhite" }}>Client Details</h1>
                <table className='popup_table'>
                    <tbody>
                        <tr>
                            <td className="popup__tabledata">Name :</td>
                            <td className="popup__tabledata">{Data?.name}</td>
                        </tr>

                        <tr>
                            <td className="popup__tabledata">Father's Name :</td>
                            <td className="popup__tabledata">{Data?.fathername}</td>
                        </tr>

                        <tr>
                            <td className="popup__tabledata">Adhaar No. :</td>
                            <td className="popup__tabledata">{Data?.adhaar}</td>
                        </tr>

                        <tr>
                            <td className="popup__tabledata">Loan Amount :</td>
                            <td className="popup__tabledata">{Data?.loanamount}</td>
                        </tr>

                        <tr>
                            <td className="popup__tabledata">Total Amount :</td>
                            <td className="popup__tabledata">{Data?.totalAmount}</td>
                        </tr>

                        <tr>
                            <td className="popup__tabledata">Monthly Instalment :</td>
                            <td className="popup__tabledata">{Data?.Instalment}</td>
                        </tr>

                        <tr>
                            <td className="popup__tabledata">Instalments Done :</td>
                            <td className="popup__tabledata">{Data?.InstalmentsDone}</td>
                        </tr>

                        <tr style={{ backgroundColor: Data?.remainingamount <= 0 ? "red" : "" }}>
                            <td className="popup__tabledata">Remaining Amount :</td>
                            <td className="popup__tabledata">{Data?.remainingamount}</td>
                        </tr>

                    </tbody>
                </table>
            </div>
            <div className="popup__btns">
                <button className='popup__btn instalmentDone popup__instalmentbtn' onClick={() => patchInstalment()}>
                    {Data?.remainingamount > 0 ? `Instalment for month ${Data?.InstalmentsDone + 1} Done` : "Loan complete"}
                </button>
                <button className='popup__btn popup__printBtn' onClick={printData}><span><img height="20px" src="/images/print.png" alt="" srcset="" /></span>Print</button>
            </div>
        </div>
    )
}

export default Popup