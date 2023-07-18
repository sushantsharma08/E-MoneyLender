import React from 'react'
import { Link} from 'react-router-dom'
import { useGetUserId } from '../hooks/useGetUserId';
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"


const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const userID = useGetUserId();
  const navigate = useNavigate();


  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userId");
    navigate("/auth_login")
  }

  return (
    <div style={{ display: "flex" }}>
      <h4 style={{ marginLeft: "50px" }}>E-moneyLender</h4>

      {!cookies.access_token ?
        <nav style={{ marginLeft: "150px" }}>
          <Link className='li' to="/auth_login" >Login</Link>
          <Link className='li' to="/auth_register" >Register</Link>
        </nav>
        :
        <nav style={{ marginLeft: "150px" }}>
          <Link className='li' to="/" >Home</Link>
          <Link className='li' to="/form" >Add Client</Link>
          <Link className='li' to="/search" >Search Clients</Link>
          <button className='logout' onClick={logout}>Logout</button>
        </nav>}

    </div>
  )
}

export default Navbar