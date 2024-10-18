import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Certificate = () => {
    const [client, setclient] = useState();
    const [Lender,setLender]=useState();
    const [Language, setLanguage] = useState("English");
    const [EnglishCertificateState, setEnglishCertificateState] = useState(true);
    const [ButtonsStatus, setButtonsStatus] = useState(true);

    const clientId = window.localStorage.getItem("closedId");
    const lenderId = window.localStorage.getItem("userId");

    const GetData = async () => {
        await axios.get(`https://e-money-lender-back.vercel.app/client/closedclient/${clientId}`).then((res) => {
            setclient(res.data)
        });
        await axios.get(`https://e-money-lender-back.vercel.app/auth/user/${lenderId}`).then((res)=>{
        setLender(res.data);
        })
    }

    useEffect(() => {
        GetData();
    }, [])

    let length = client?.InstallmentRecord.length - 1;
    let firstInstallment = client?.InstallmentRecord[0];
    let lastInstallment = client?.InstallmentRecord[length];

    console.log(
        length
    );

    const GetDate = () => {
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        let currentDate = `${day}-${month}-${year}`;
        return currentDate;
    }
    let currentdate = GetDate();

    const ChangeLanguage = ()=>{
        if (Language=="English") {
            setLanguage("Hindi");
            setEnglishCertificateState(false);
        }else{
            setLanguage("English");
            setEnglishCertificateState(true);
        }

    }

    const PrintCertificate = async ()=>{

        setButtonsStatus(false);

        setTimeout(() => {
            print();
        }, 2000);
    }

    return (
        <div className=' border-4 absolute left-0 top-0 m-6 mx-4 p-4 h-[95vh] h-min w-[97vw]'>
            <div className="flex lg:flex-1 justify-between items-center">

                <span className="-m-1.5 p-1.5 mr-6">
                    <img className='logo' src="/images/logo.png" width="210px" alt="" />
                </span>

                <div className='ml-3 text-end text-sm'>
                    <h1 className={`text-2xl font-serif font-bold English `} style={{display : `${EnglishCertificateState?"block":"none"}`}}>Loan Completion Certificate</h1>
                    <h1 className={`text-2xl font-serif font-bold Hindi `} style={{display : `${!EnglishCertificateState?"block":"none"}`}}>ऋण समापन प्रमाणपत्र</h1>
                    Certificate Number: {client?.certificateNumber}
                </div>

            </div>

            <hr />

            <div className='ml-6 mt-16 English ' style={{display : `${EnglishCertificateState?"block":"none"}`}}>
                To Whom It May Concern,
                <br />
                This is to certify that <span className='underline'>{client?.name}</span> has successfully completed the repayment of the loan
                provided by <span className='underline'>{Lender?.name}</span>.
                <br />
                <br />
                Loan Details: <br />

                Loan Amount: {client?.loanamount} <br />
                Loan Start Date: {firstInstallment?.installmentDate} <br />
                Loan Completion Date: {lastInstallment?.installmentDate} <br />
                <br />
                Statement:
                <br /><br />
                I, <span className='underline'>{Lender?.name}</span>, confirm that the borrower, <span className='underline'>{client?.name}</span>, has repaid the entire loan amount as per the terms and conditions stated in the loan agreement. No further dues are pending from the borrower as of the completion date mentioned above.

                This certificate serves as an official acknowledgment of the full and final settlement of the loan. Both parties have retained a copy of this document for their records.

                <div className='flex justify-end mt-32 mr-12'>
                    Lender's Signature: _________________________<br />
                    Lender's Name: {Lender?.name} <br />
                    Date: {currentdate}
                </div>


            </div>

            <div className='ml-6 mt-16 text-lg ' style={{display : `${!EnglishCertificateState?"block":"none"}`}}>
                यह प्रमाणित किया जाता है कि <span className='underline'>{client?.name}</span> ने <span className='underline'>[Lender's Full Name]</span> द्वारा प्रदान किए गए ऋण का भुगतान सफलतापूर्वक पूरा कर लिया है।
                <br /><br />
                ऋण विवरण: <br /><br />
                ऋण राशि: {client?.loanamount} <br />
                ऋण आरंभ तिथि:  {firstInstallment?.installmentDate} <br />
                ऋण समाप्ति तिथि:{lastInstallment?.installmentDate} <br /> <br />

                कथन: <br /><br />

                मैं, <span className='underline'>[Lender's Full Name]</span>, पुष्टि करता हूं कि उधारकर्ता, <span className='underline'>{client?.name}</span> ने ऋण समझौते में बताए गए नियमों और शर्तों के अनुसार पूरी ऋण राशि चुका दी है। ऊपर उल्लिखित समाप्ति तिथि तक उधारकर्ता का कोई और बकाया लंबित नहीं है। यह प्रमाणपत्र ऋण के पूर्ण और अंतिम निपटान की आधिकारिक पावती के रूप में कार्य करता है। दोनों पक्षों ने अपने रिकॉर्ड के लिए इस दस्तावेज़ की एक प्रति अपने पास रख ली है। <br />


                <div className='flex justify-end mt-32 mr-12'>

                    ऋणदाता के हस्ताक्षर: __________________________ <br />
                    ऋणदाता का नाम: [ऋणदाता का पूरा नाम] <br />
                    तारीख: {currentdate}
                </div>
            </div>

            {ButtonsStatus && <div className="buttons flex flex-col items-center">
                <button className='p-1 px-2 m-1 border-2 w-max' onClick={ChangeLanguage}>{Language}</button>
                <button className='p-1 px-2 m-1 border-2 w-max' onClick={PrintCertificate}>Print</button>
            </div>}
        </div>
    )
}

export default Certificate