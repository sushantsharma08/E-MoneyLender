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

  if (isLoading) return     <section id='client' style={{position:"relative"}}>
  <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
  <div className="userdatadiv"> 
  <h2>Loading...</h2></div></div></section>

  if (error) return 'An error has occurred: ' + error.message
  console.log(data);

  // const searchUserbyName = async (e)=>{setSearchName(e.target?.value);}

  const searchUser = (e) => {
    setSearchName(e);
    setShowModal(true)
  }

  return (
    <section id='client' style={{position:"relative"}}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>

        {/* <div className="searchBar">
          <input type="text" onChange={e => searchUserbyName(e)} />
        </div> */}
        <div className="userdatadiv">
          <table>
            <thead style={{position:"sticky",top:"0px",backgroundColor:"burlywood",fontStyle:"oblique",fontWeight:"600"}}>
              <tr className="userDetailsHeader" style={{ display: "flex",alignItems:"center", }}>
                <td className="tabledata index">Index</td>
                <td className="tabledata">Name</td>
                <td className="tabledata">Fathers Name</td>
                <td className="tabledata">Loan amount</td  >
                <td>Status</td>
              </tr>
            </thead>
            <tbody style={{overflow:"scroll"}}>
              {data?.map((user, index) =>
                <tr key={index} onClick={() => searchUser(user.name)} className="userDetails" style={{ display: "flex" }}>
                  <td className="tabledata index">{index + 1}</td>
                  <td className="tabledata personal "><span className='name'>{user.name}</span><br /><span className='phone'>{user.adhaar}</span></td>
                  <td className="tabledata FatherName">{user.fathername}</td>
                  <td className="tabledata LoanDetails">
                    <span>
                    <b>{user.loanamount}</b>
                    </span>
                  <span style={{color:"red",alignSelf:"flex-end",marginRight:"0.3rem"}}>
                    <i><u>Remaining</u></i>
                    <br />
                    <b>{user.remainingamount}</b></span></td>
                    <td className="tabledata status" style={{color:user.remainingamount>0?"green":"red",textAlign:"center"}}>
                      <span style={{
                       backgroundColor:user.remainingamount>0?"rgba(147, 209, 147, 0.359)":"rgba(241, 170, 170, 0.753);",
                      }}>
                      {user.remainingamount>0?"Active":<button>Close Account</button>}
                      </span>
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
      <QueryClientProvider client={queryClient}><Popup show={showModal}clientName={SearchName} /></QueryClientProvider>

    </section>
  )
  
}

export default SearchClients