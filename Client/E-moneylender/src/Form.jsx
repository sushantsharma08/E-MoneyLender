import React from 'react'

const Form = () => {
  return (
    <div className='form'>
        <label htmlFor="name">Name</label> <input id='name' type="text" />
        <br />
        <label htmlFor="fathername">Father Name</label> <input id='fathername' type="text" />
        <br />
        <label htmlFor="mothername">Mother Name</label> <input id='mothername' type="text" />
        <br />

        <label htmlFor="gender">Gender</label> 
        <select name="gender" id="gender">
        <option value="" default disabled>Select</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        </select>

        <br />

        <label htmlFor="adhaar">Adhaar Number</label> 
        <input type="number" name="AdhaarNumber" id="adhaar"/>
        <br />

        <label htmlFor="Amount">Loan Amount</label> 
        <input type="number" name="loanamount" id="Amount"/>
        <br />

        <label htmlFor="Amount">Monthly Installment</label> 
        <input type="number" name="loanamount" id="Amount"/>
        @18% per month
        <br />

        <label htmlFor="Amount">Total Amount</label> 
        <input type="number" name="totalamount" id="totalAmount"/>
        <br />

        <label htmlFor="missedamount">If missed installment</label> 
        <input type="number" name="missed" id="missedamount"/>
        <br />

        <label htmlFor="image">Upload Image</label> 
        <input type="file" name="image" id="image"/>
        <br />

        <label htmlFor="signature">Upload Signature</label> 
        <input type="file" name="signature" id="signature"/>
        <br />
        
    </div>
  )
}

export default Form