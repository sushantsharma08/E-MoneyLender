import React, { useState } from 'react';
import axios from 'axios';
import Popup from './Popup';
import { useGetUserId } from '../hooks/useGetUserId';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

const SearchClients = () => {

  // Hooks

  const [SearchName, setSearchName] = useState()
  const [showClientDetailsModal, setShowClientDetailsModal] = useState(false)
  const userID = useGetUserId();


  const { isLoading, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch(`https://e-money-lender-back.vercel.app/client/loadClients/${userID}`).then(
        // fetch(`http://localhost:3001/client/loadClients/${userID}`).then(
        (res) => res.json()
      ),
  });

  // Functions

  const OpenUserDetails = (e) => {
    setSearchName(e);
    setShowClientDetailsModal(true)
  }
  const OpenClientEdit = (e) => {
    // setSearchName(e);
  }

  const CloseAccount = (e) => {
    const id = e.target.id;
    axios.delete(`https://e-money-lender-back.vercel.app/client/removeClient/${id}`);
    setTimeout(() => {
      window.location.reload();
      clearTimeout()
    }, 1000);
  }

  //dynamic UI from useQuery output

  if (isLoading) return (
    <section id='client' style={{ position: "relative" }}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", paddingTop: "100px" }}>
        <div className="userdatadiv">
          <div id="wifi-loader">
            <svg className="circle-outer" viewBox="0 0 86 86">
              <circle className="back" cx="43" cy="43" r="40"></circle>
              <circle className="front" cx="43" cy="43" r="40"></circle>
              <circle className="new" cx="43" cy="43" r="40"></circle>
            </svg>
            <svg className="circle-middle" viewBox="0 0 60 60">
              <circle className="back" cx="30" cy="30" r="27"></circle>
              <circle className="front" cx="30" cy="30" r="27"></circle>
            </svg>
            <svg className="circle-inner" viewBox="0 0 34 34">
              <circle className="back" cx="17" cy="17" r="14"></circle>
              <circle className="front" cx="17" cy="17" r="14"></circle>
            </svg>
            <div className="text" data-text="Loading..."></div>
          </div>
        </div>
      </div>
    </section>
  )

  if (error) return <section id='client' style={{ position: "relative" }}>
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <div className="userdatadiv">
        <h2>An error has occurred: <b>{error.message}</b></h2>
      </div>
    </div>
  </section>

  // Main 
  console.log(data?.length);

  return (
    <div id='client' className='w-screen sm:w-[95vw] mx-auto' >

      {/* <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>

        <div className="userdatadiv">
          <table>
            <thead style={{ position: "sticky", top: "0px", backgroundColor: "burlywood", fontStyle: "oblique", fontWeight: "600" }}>
              <tr className="userDetailsHeader" style={{ display: "flex", alignItems: "center", }}>
                <td className="tabledata index">Index</td>
                <td className="tabledata">Name</td>
                <td className="tabledata">Fathers Name</td>
                <td className="tabledata">Adhaar No.</td>
                <td className="tabledata">Loan amount</td  >
                <td className="tabledata">Status</td>
              </tr>
            </thead>
            <tbody>
              {data.map((user, index) =>
                <tr key={index} className="userDetails" style={{ display: "flex" }}>
                  <td className="tabledata index index_data">{index + 1}</td>
                  <td className="tabledata personal"><span className='name'>{user.name}</span>
                    <span className='phone flex items-center justify-end pt-2'><img src="/images/phone.png" alt="" width="12px" className='mx-1' />{user?.phone}</span></td>
                  <td className="tabledata FatherName personal2"><span>{user.fathername}</span><br /></td>
                  <td className="tabledata adhaar">
                    <span className="id">
                      <img src="/images/id.png" alt="" width="20px" />
                      {user.adhaar}</span>
                  </td>
                  <td className="tabledata LoanDetails">
                    <span>
                      <b>{user.loanamount}</b>
                    </span>
                    <span className='flex flex-col items-end text-red-500'>
                      <span>
                        <i><u>Remaining</u></i>
                      </span>

                      <b>{user.remainingamount}</b>
                    </span>
                  </td>
                  <td className="tabledata status" style={{ color: user.remainingamount > 0 ? "green" : "red", textAlign: "center" }}>
                    {user.remainingamount > 0 ?
                      <span onClick={() => OpenUserDetails(user.name)}
                        className="hover:text-lg" style={{ backgroundColor: "rgba(147, 209, 147, 0.359)" }}>Active</span>
                      : <span className="hover:text-lg" style={{ backgroundColor: "rgba(241, 170, 170, 0.753)" }} id={user._id} onClick={(e) => CloseAccount(e)}>Close Account</span>
                    }
                  </td>
                  <td className="tabledata Edit" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><span className='EditBtnSpan' onClick={OpenClientEdit}>Edit</span></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div> */}

      <div className=" h-full w-full overflow-scroll">
        <table className="tabled w-full min-w-max table-auto text-left">
          <thead>
            <tr className='bg-orange-300 text-md text-center font-bold'>
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
            {data.map((user, index) => {
              const isLast = index === data?.length;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
              // const classes =  "p-4 border-b border-blue-gray-50";
              return (
                <tr key={index} className='border-b text-center' >
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
                    <span variant="small" color="blue-gray" className="font-normal status w-20  h-9  " style={{ marginInline:"auto",color: user.remainingamount > 0 ? "green" : "red", textAlign: "center" }}>
                      {user.remainingamount > 0
                        ? <span onClick={() => OpenUserDetails(user.name)}
                          className="hover:text-lg" style={{ backgroundColor: "rgba(147, 209, 147, 0.359)" }}>Active</span>
                        : <span className="hover:text-lg" style={{ backgroundColor: "rgba(241, 170, 170, 0.753)" }} id={user._id} onClick={(e) => CloseAccount(e)}>Close Account</span>
                      }
                    </span>
                  </td>
                  <td className={classes}>
                    <span variant="small" color="blue-gray" className="font-normal">
                      <span className='EditBtnSpan' onClick={OpenClientEdit}>Edit</span>
                    </span>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>


      <QueryClientProvider client={queryClient}>
        <Popup show={showClientDetailsModal} clientName={SearchName} />
      </QueryClientProvider>

    </div>
  )

}

export default SearchClients