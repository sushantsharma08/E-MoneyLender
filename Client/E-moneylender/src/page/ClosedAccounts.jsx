import React from 'react';
import axios from 'axios';


const ClosedAccounts = () => {
  return (
    <div>

      <div className="tabled  w-full overflow-scroll">
        <table className=" w-full min-w-max table-auto text-left">
          <thead>
            <tr className='bg-orange-300 text-md text-center font-bold sticky top-0'>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 border-r p-4">
                <span
                  variant="small"
                  color="blue-gray"
                  className=" leading-none opacity-70"
                >
                  Index
                </span>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <span
                  variant="small"
                  color="blue-gray"
                  className=" leading-none opacity-70"
                >
                  Name
                </span>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <span
                  variant="small"
                  color="blue-gray"
                  className=" leading-none opacity-70"
                >
                  Contact Number
                </span>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <span
                  variant="small"
                  color="blue-gray"
                  className=" leading-none opacity-70"
                >
                  Father's Name
                </span>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 ">
                <span
                  variant="small"
                  color="blue-gray"
                  className=" leading-none opacity-70 "
                >
                  Adhaar Number
                </span>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <span
                  variant="small"
                  color="blue-gray"
                  className=" leading-none opacity-70"
                >
                  Loan Amount
                </span>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 ">
                <span
                  variant="small"
                  color="blue-gray"
                  className=" leading-none opacity-70"
                >
                  Remaining Amount
                </span>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 ps-8">
                <span
                  variant="small"
                  color="blue-gray"
                  className=" leading-none opacity-70"
                >
                  Status
                </span>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <span
                  variant="small"
                  color="blue-gray"
                  className=" leading-none opacity-70"
                >
                  Edit client details
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {lenderClients.map((user, index) => {
              const isLast = index === lenderClients?.length;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
              // const classes =  "p-4 border-b border-blue-gray-50";
              return (
                <tr key={index} className='border-b text-center hover:bg-gray-100' >
                  <td className={`${classes} border-r`}>
                    <span variant="small" color="blue-gray" className="font-normal">
                      {index + 1}
                    </span>
                  </td>
                  <td className={`${classes} bg-slate-100`}>
                    <span variant="small" color="blue-gray" className="font-normal">
                      {user.name}
                    </span>
                  </td>
                  <td className={classes}>
                    <span variant="small" color="blue-gray" className="font-normal flex items-center">
                      <img src="/images/phone.png" alt="" width="12px" className='mx-1' />{user?.phone}</span>
                  </td>
                  <td className={`${classes} bg-blue-gray-50/50`}>
                    <span variant="small" color="blue-gray" className="font-normal">
                      {user.fathername}
                    </span>
                  </td>
                  <td className={`${classes} id`}>
                    <span variant="small" color="blue-gray" className="font-normal">
                      {user.adhaar}
                    </span>
                  </td>
                  <td className={classes}>
                    <span variant="small" color="blue-gray" className="font-normal ">
                      <b>{user.loanamount}</b>
                    </span>
                  </td>
                  <td className={`${classes} LoanDetails`}>
                    <span variant="small" color="blue-gray" className="font-normal text-red-500 ">
                      <b>{user.remainingamount}</b>
                    </span>
                  </td>
                  <td className={classes}>
                    <span variant="small" color="blue-gray" className="font-normal status w-20  h-9  " style={{ marginInline: "auto", color: user.remainingamount > 0 ? "green" : "red", textAlign: "center" }}>
                      {user.remainingamount > 0
                        ? <span onClick={() => OpenUserDetails(user.name)}
                          className="hover:text-lg" style={{ backgroundColor: "rgba(147, 209, 147, 0.359)" }}>Active</span>
                        : <span className="hover:text-lg" style={{ backgroundColor: "rgba(241, 170, 170, 0.753)" }} id={user._id} onClick={(e) => CloseAccount(e)}>Close Account</span>
                      }
                    </span>
                  </td>
                  <td className={classes}>
                    <span variant="small" color="blue-gray" className="font-normal">
                      <span className='EditBtnSpan' onClick={() => OpenClientEdit(user.name)}>Edit</span>
                    </span>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default ClosedAccounts