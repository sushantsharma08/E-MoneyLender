import React,{useState} from 'react'

const Form = () => {
    const [name, setName] = useState();
    const [fathername, setFathersname] = useState();
    const [gender, setGender] = useState();
    const [loanAmount, setLoanAmount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [monthlyInstalment, setMonthlyInstalment] = useState(0);
    
    
    const setValues= (amount)=>{
        let P=amount.target.value;
        let R=18/12/100;
        let x=1+R;
        let x1 = P*R*Math.pow(x,12);
        let x2 = Math.pow(x,12)-1;
        let emi = Math.ceil(x1/x2);
            setLoanAmount(P);
            setMonthlyInstalment(emi);
            setTotalAmount(emi*12)
    }
    const showdata = ()=>{
        console.log(name,fathername,gender);
    }

  return (
    <div className='form'>
        <label htmlFor="name">Name</label> <input id='name' type="text" onChange={(e)=>{setName(e.target.value)}} />
        <br />
        <label htmlFor="fathername">Father Name</label> <input id='fathername' type="text" onChange={(e)=>{setFathersname(e.target.value)}} />
        <br />

        <label htmlFor="gender">Gender</label> 
        <select name="gender" id="gender" onClick={(e)=>{setGender(e.target.value)}}>
        <option value="" selected disabled>Select</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        </select>

        <br />

        <label htmlFor="adhaar">Adhaar Number</label> 
        <input type="number" name="AdhaarNumber" id="adhaar"/>
        <br />

        <label htmlFor="Amount">Loan Amount</label> 
        <input type="number" name="loanamount" id="Amount" onChange={(e)=>{setValues(e)}} />
        <br />

        <label htmlFor="monthlyinstalment">Monthly Installment</label> 
        <input type="number" disabled name="loanamount" id="Amountmonthlyinstalment" value={monthlyInstalment} />
        @18% per month
        <br />

        <label htmlFor="Amount">Total Amount</label> 
        <input type="number" disabled name="totalamount" id="totalAmount" value={totalAmount} />
        <br />

        <label htmlFor="missedamount">If missed installment</label> 
        <input type="number" disabled name="missed" id="missedamount"/>
        <br />

        <label htmlFor="image">Upload Image</label> 
        <input type="file" name="image" id="image"/>
        <br />

        <label htmlFor="signature">Upload Signature</label> 
        <input type="file" name="signature" id="signature"/>
        <br />

        <button onClick={showdata} >save</button>
        
    </div>
  )
}

export default Form