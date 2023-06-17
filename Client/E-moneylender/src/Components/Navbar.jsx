import React from 'react'
import{Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
    <nav>
    <Link className='li' to="/" >home</Link>
    <Link className='li' to="/form" >form</Link>
    <Link className='li' to="/search" >Search Clients</Link>
    </nav>
  </div>
  )
}

export default Navbar