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
  const [UserList, setUserList] = useState([]);
  const userID = useGetUserId();


  const { isLoading, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch(`https://e-money-lender-back.vercel.app/client/loadClients/${userID}`).then(
      // fetch(`http://localhost:3001/client/loadClients/${userID}`).then(
        (res) => res.json(),
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

  console.log(userID);

  //dynamic UI from useQuery output

  if (isLoading) return <section id='client' style={{ position: "relative" }}>
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", paddingTop: "100px" }}>
      <div className="userdatadiv">
        <div class="boxes">
          <div class="box">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div class="box">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div class="box">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div class="box">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>


      </div>
      <h2>Loading...</h2>
    </div>
  </section>

  if (error) return <section id='client' style={{ position: "relative" }}>
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <div className="userdatadiv">
        <h2>An error has occurred: <b>{error.message}</b></h2>
      </div>
    </div>
  </section>

  // Main 

  return (
    <section id='client' >

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>

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
              {data?.map((user, index) =>
                <tr key={index} className="userDetails" style={{ display: "flex"}}>
                  <td className="tabledata index index_data">{index + 1}</td>
                  <td className="tabledata personal"><span className='name'>{user.name}</span><br /><span className='phone'><img src="/images/phone.png" alt="" width="12px" />{user?.phone}</span></td>
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
                    <span style={{ color: "red", alignSelf: "flex-end", marginRight: "0.3rem" }}>
                      <i><u>Remaining</u></i>
                      <br />
                      <b>{user.remainingamount}</b></span></td>
                  <td className="tabledata status" style={{ color: user.remainingamount > 0 ? "green" : "red", textAlign: "center" }}>
                    {user.remainingamount > 0 ?
                      <span onClick={() => OpenUserDetails(user.name)} style={{ backgroundColor: "rgba(147, 209, 147, 0.359)" }}>Active</span>
                      : <span style={{ backgroundColor: "rgba(241, 170, 170, 0.753)" }} id={user._id} onClick={(e) => CloseAccount(e)}>Close Account</span>
                    }
                  </td>
                  <td className="tabledata Edit" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><span className='EditBtnSpan' onClick={OpenClientEdit}>Edit</span></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
      <QueryClientProvider client={queryClient}>
        <Popup show={showClientDetailsModal} clientName={SearchName} />
      </QueryClientProvider>

    </section>
  )

}

export default SearchClients