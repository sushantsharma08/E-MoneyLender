import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Popup from './Popup';


const SearchClients = () => {

  const [Users, setUsers] = useState()
  const [SearchName, setSearchName] = useState()
  const [showModal, setShowModal] = useState(false)
  let [UserList, setUserList] = useState([])


  const searchUserbyName = async (e) => {
    setSearchName(e.target?.value);
    // console.log(SearchName);
    // axios.get(`http://localhost:3001/client/searchbyname/${SearchName}`).then(async (res) =>{
    //   setUserList(res.data)
    // })

    // console.log(...UserList);

    setUserList([])
    Users?.map(user => {
      let name = user.name
      console.log(UserList);
      console.log(inArray(user, UserList));

      if (name.includes(SearchName) && !inArray(user, UserList)) {

        // setUserList(user)
        console.log(name);
        setUserList([...UserList, user])
        // console.log(...UserList,UserList);
      }
    })

  }

  function inArray(user, UserList) {
    var count = UserList.length;
    for (var i = 0; i < count; i++) {
      if (UserList[i] === user) { return true; }
    }
    return false;
  }

  const searchUser = (e) => {
    setSearchName(e);
    setShowModal(true)
  }

  useEffect(() => {
    axios.get(`https://e-money-lender-back.vercel.app/client/`).then(async (res) => {
      setUsers(res.data);
      setUserList(res.data);
    })
  }, []);

  return (
    <section id='client' style={{position:"relative"}}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>

        <div className="searchBar">
          <input type="text" onChange={e => searchUserbyName(e)} />
          {/* <select name="users" id="userlist">
          <option default disabled selected>select</option>
          {UserList?.map((users,index)=>
          {updatelist(users)}
              // <option style={{display:users.name.includes(SearchName)?"block":"none"}}  value={users.name}>{users.name}</option>
          // {if(users.includes(SearchName)){
          // }}
          )}
        </select>  */}
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
              {UserList?.map((user, index) =>
                <tr key={index} onClick={() => searchUser(user.name)} className="userDetails" style={{ display: "flex" }}>
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
      <Popup show={showModal}clientName={SearchName} />

    </section>
  )
  
}

export default SearchClients