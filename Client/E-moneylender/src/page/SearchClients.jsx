import React, { useState } from 'react';
import axios from 'axios';
import Popup from './Popup';
import { useGetUserId } from '../hooks/useGetUserId';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueries
} from '@tanstack/react-query'
import EditClient from '../Components/EditClient';
import { Toaster, toast } from 'react-hot-toast';
import ClosedAccounts from './ClosedAccounts';

const queryClient = new QueryClient()

const SearchClients = () => {

  // Hooks

  const [SearchName, setSearchName] = useState()
  const [Active, setActive] = useState(true)
  const [showClientDetailsModal, setShowClientDetailsModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const userID = useGetUserId();

  //dynamic UI from useQuery output

  const [ActiveClientsQuery, ClosedClientsQuery] = useQueries({
    queries: [
      {
        queryKey: ['Open'],
        queryFn: () =>
          axios
            .get(`https://e-money-lender-back.vercel.app/client/loadClients/${userID}`)
            .then((res) => res.data),
      },
      {
        queryKey: ['Closed'],
        queryFn: () =>
          axios
            .get(`https://e-money-lender-back.vercel.app/client/loadClosedClients/${userID}`)
            .then((res) => res.data),
      },
    ]
  })

  if (ActiveClientsQuery.isLoading && ClosedClientsQuery.isLoading) return (
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

  if (ActiveClientsQuery.error && ClosedClientsQuery.error) return <section id='client' style={{ position: "relative" }}>
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <div className="userdatadiv">
        <h2>An error has occurred: <b>{ActiveClientsQuery.error.message}</b></h2>
      </div>
    </div>
  </section>

  // // console.log(ActiveClientsQuery);
  // console.log(ClosedClientsQuery);


  // Functions

  const OpenUserDetails = (e) => {
    setSearchName(e);
    setShowClientDetailsModal(true)
  }

  const OpenClientEdit = (e) => {
    setSearchName(e);
    setShowEditModal(true)
  }

  const CloseAccount = async (e) => {
    // toast.loading('Deleting Client', {
    //   duration: 1000,
    // });
    const id = e.target.id;
    const Client_To_Be_Closed = Data[id];
    const Id_Of_Client_To_Be_Closed = Data[id]._id;
    // console.log(Id_Of_Client_To_Be_Closed);
    window.localStorage.setItem("closedId", id);
    PatchClientData(Client_To_Be_Closed);
    window.open("https://e-money-lender.vercel.app/certificate");

  }

  const PatchClientData = async (client) => {
    await axios.post(`https://e-money-lender-back.vercel.app/client/closedAccounts`, {
      clientId: client._id,
      name: client.name,
      fathername: client.fathername,
      gender: client.gender,
      phone: client.phone,
      adhaar: client.adhaar,
      PassportImage: client.PassportImage,
      loanamount: client.loanamount,
      Instalment: client.Instalment,
      InstalmentsDone: client.InstalmentsDone,
      remainingamount: client.remainingamount,
      totalAmount: client.totalAmount,
      LenderId: client.LenderId,
      InstallmentRecord: client.InstallmentRecord,
      isOpen: false,
      certificateNumber: client._id,
    }).then(res => {
      if (res.data.status == 201) { DeleteClient(client._id) }
      else {
        console.log(res.data);
      }
    })
  }

  const DeleteClient = (id) => {
    axios.delete(`https://e-money-lender-back.vercel.app/client/removeClient/${id}`).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
    // console.log(id);
  }

  const ShowClosedAccounts = () => {
    setActive(false)
  }

  const ShowActiveAccounts = () => {
    setActive(true);
  }

  // determin which clients to show
  let Data = Active ? ActiveClientsQuery.data : ClosedClientsQuery.data;

  return (
    <div id='client' className='w-screen sm:w-[95vw] mx-auto'  >
      <div className='flex justify-center my-4'>
        <button className=' border-b-2 p-2' style={{ borderColor: Active ? 'greenYellow' : 'grey', transition: '1s' }} onClick={ShowActiveAccounts} >Active Accounts</button>
        <button className=' border-b-2 p-2' style={{ borderColor: Active ? 'grey' : 'red', transition: '1s' }} onClick={ShowClosedAccounts}>Closed Accounts</button>
      </div>

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

            {Data?.map((user, index) => {
              const isLast = index === Data?.length;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

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
                      {(user.remainingamount > 0 && user.isOpen == true)
                        ? <span onClick={() => OpenUserDetails(user.name)}
                          className="hover:text-lg" style={{ backgroundColor: "rgba(147, 209, 147, 0.359)" }}>Active</span>
                        : <span className="hover:text-lg" style={{ backgroundColor: "rgba(241, 170, 170, 0.753)" }} id={index} onClick={(e) => CloseAccount(e)}>Close Account</span>
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

      <Popup show={showClientDetailsModal} clientName={SearchName} />
      <EditClient show={showEditModal} clientName={SearchName} />
      <Toaster />

    </div>
  )

}

export default SearchClients