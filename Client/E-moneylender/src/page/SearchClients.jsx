import React,{useEffect,useState} from 'react'
import axios from 'axios'

const SearchClients = () => {

  const [Users, setUsers] = useState()


  useEffect(() => {
  //  axios.get("http://localhost:3001/client/").then(
  //    res=>{
  //          setUsers(res.data[0]);
  //         console.log(res.data[0]);  
  //         // return res.data
  //       })
    axios.get(`http://localhost:3001/client/`).then(async(res) => {
     setUsers(res.data);

     console.log("duh");
     console.log(Users);
    })

  }, [])
  

  return (
    <div>

      <div className="searchBar">
        <input type="text" />
      </div>

      {/* <div>{Users}</div> */}


    </div>
  )
}

export default SearchClients