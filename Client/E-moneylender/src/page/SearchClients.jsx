import React, { useEffect, useState } from 'react'
import axios from 'axios'

const SearchClients = () => {

  const [Users, setUsers] = useState()
  const [SearchName, setSearchName] = useState()


  useEffect(() => {
    axios.get(`http://localhost:3001/client/`).then(async (res) => {
      setUsers(res.data);
    })

  }, []);

  const searchUser = (e) => {
    console.log(e);
  }

  const searchUserbyName = async (e) => {
    setSearchName(e.target.value);

    axios.get(`http://localhost:3001/client/${SearchName}`).then(async (res) =>{
      
    })

  }

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>

      <div className="searchBar">
        <input type="text" onChange={e=>searchUserbyName(e)} />
      </div>

      <div className="userdatadiv" style={{ marginTop: "100px" }}>
        <table>
          <thead >
            <tr className="userDetails" style={{ display: "flex" }}>
              <td className="tabledata">index</td>
              <td className="tabledata">Name</td>
              <td className="tabledata">Fathers Name</td>
              <td className="tabledata">Loan amount</td>
            </tr>
          </thead>
          <tbody>
            {Users?.map((user, index) =>
              <tr key={index} onClick={()=>searchUser(user._id)} className="userDetails" style={{ display: "flex" }}>
                  <td className="tabledata">{index + 1}</td>
                  <td className="tabledata">{user.name}</td>
                  <td className="tabledata">{user.fathername}</td>
                  <td className="tabledata">{user.loanamount}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  )

}

export default SearchClients