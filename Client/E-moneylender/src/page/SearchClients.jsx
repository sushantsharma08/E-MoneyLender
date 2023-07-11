import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Popup from './Popup';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

const SearchClients = () => {

  // const [Users, setUsers] = useState()
  const [SearchName, setSearchName] = useState()
  const [showModal, setShowModal] = useState(false)
  const [UserList, setUserList] = useState([])

  const { isLoading, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('https://e-money-lender-back.vercel.app/client/').then(
        (res) => res.json(),
      ),
  });

  if (isLoading) return <section id='client' style={{ position: "relative" }}>
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <div className="userdatadiv">
        <h2>Loading...</h2>
      </div>
    </div>
  </section>

  if (error) return <section id='client' style={{ position: "relative" }}>
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <div className="userdatadiv">
        <h2>An error has occurred: <b>{error.message}</b></h2>
      </div>
    </div>
  </section>
  console.log(data);

  // const searchUserbyName = async (e)=>{setSearchName(e.target?.value);}

  const searchUser = (e) => {
    setSearchName(e);
    setShowModal(true)
  }
  const checkName = (e) => {
    const id = e.target.id;
    axios.delete(`https://e-money-lender-back.vercel.app/client/removeClient/${id}`)
  }

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
                <tr key={index} className="userDetails" style={{ display: "flex", cursor: "pointer" }}>
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
                    {user.remainingamount > 0 ? <span onClick={() => searchUser(user.name)} style={{ backgroundColor: "rgba(147, 209, 147, 0.359)" }}>Active</span> : <span style={{ backgroundColor: "rgba(241, 170, 170, 0.753)" }} id={user._id} onClick={(e) => checkName(e)}>Close Account</span>
                    }
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
      <QueryClientProvider client={queryClient}>
        <Popup show={showModal} clientName={SearchName}/>
      </QueryClientProvider>

    </section>
  )

}

export default SearchClients