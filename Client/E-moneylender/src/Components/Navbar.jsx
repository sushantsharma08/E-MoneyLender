import React from 'react'
import{Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <div style={{width:"100vw",display:"flex"}}>
    <h4 style={{marginLeft:"50px"}}>E-moneyLender</h4>
    <nav style={{marginLeft:"150px"}}>
    <Link className='li' to="/" >Home</Link>
    <Link className='li' to="/form" >Form</Link>
    <Link className='li' to="/search" >Search Clients</Link>
    </nav>
  </div>
  )
}

export default Navbar