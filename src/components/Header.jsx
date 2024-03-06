import React from 'react'

import { useEffect } from 'react';
import {  useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom'
function Header() {
  const navigate = useNavigate()

 

const handleLogout =()=>{
  sessionStorage.removeItem("existingUser")
  sessionStorage.removeItem("token")
 
  navigate('/login')
}
  return (
    <div>

<Navbar expand="lg w-100 "  style={{background:"white",zIndex:'1',position:'fixed',padding:"15px"}}>
      <Container>
        <Navbar.Brand href="/" style={{fontFamily:"Libre Baskerville",fontWeight:"bold",fontSize:"24px"}}>Albergo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="w-100">
            <div className="row w-100">
              <div className="col-lg-8 d-flex">
              <Nav.Link style={{letterSpacing:"2px",fontSize:"14px"}}href="/">HOME</Nav.Link>
              <Nav.Link style={{letterSpacing:"2px",fontSize:"14px"}}href="/rooms">ROOM</Nav.Link>

          {/* <NavDropdown style={{letterSpacing:"2px",fontSize:"14px"}} title="ROOMS" id="basic-nav-dropdown">
            
            <NavDropdown.Item style={{letterSpacing:'0px'}}href="/rooms">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item style={{letterSpacing:'0px'}} href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item style={{letterSpacing:'0px'}} href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown> */}
          <Nav.Link  style={{letterSpacing:"2px",fontSize:"14px"}} href="/contact">CONTACT</Nav.Link>
              </div>
              <div className="col-lg-4 d-flex justify-content-between">
              <Nav.Link  style={{letterSpacing:"2px",fontSize:"14px"}} href={sessionStorage.getItem("token2")?"/admin":"/partnerlogin"}>LIST YOUR PROPERTY</Nav.Link>

{
  JSON.parse(sessionStorage.getItem("existingUser")) ?
  
  <NavDropdown style={{letterSpacing:"2px",fontSize:"14px"}} className='signup' title="MY ACCOUNT" id="basic-nav-dropdown">
              
  <NavDropdown.Item style={{letterSpacing:'0px'}}>
   <h6>Hi, {JSON.parse(sessionStorage.getItem("existingUser"))?.username} </h6>
  </NavDropdown.Item>
  <NavDropdown.Item style={{letterSpacing:'0px'}} href="">
    
    <a  onClick={()=>navigate('/order')} ><i class="fa-solid fa-bag-shopping"></i> Bookings & Trips</a>
  </NavDropdown.Item>
  <NavDropdown.Item style={{letterSpacing:'0px'}} href="">
    
    <a  onClick={handleLogout} ><i class="fa-solid fa-arrow-right-from-bracket"></i> Sign out</a>
  </NavDropdown.Item>

</NavDropdown>:

<NavDropdown style={{letterSpacing:"2px",fontSize:"14px"}} className='signup' title="SIGN UP/LOG IN" id="basic-nav-dropdown">
              
<NavDropdown.Item style={{letterSpacing:'0px'}}href="/register">
 <Link to={'/register'} style={{color:'black',textDecoration:'none'}}>Sign up</Link>
</NavDropdown.Item>
<NavDropdown.Item style={{letterSpacing:'0px'}} href="/login"><Link  style={{color:'black',textDecoration:'none'}} to={'/login'}>Log in</Link></NavDropdown.Item>


</NavDropdown>
}

          
              </div>
            </div>
          
           
          </Nav>
        </Navbar.Collapse>
    
      </Container>
    </Navbar>
    </div>
  )
}

export default Header







