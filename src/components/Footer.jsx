import React from 'react'

function Footer() {
  return (
    <div>
      <div style={{backgroundColor:'black',color:'white'}}>
        <div className='d-flex justify-content-center align-items-center'>
 
        <h4  style={{fontFamily:"Libre Baskerville",fontWeight:"bold",fontSize:"24px"}} className='mt-5'>Albergo</h4>
        </div>
        <div className="row w-100 mt-3">
          <div className="col-lg-2"></div>
          <div className="col-lg-8  d-flex justify-content-center align-items-center ms-2">
            <div className="row w-100">
            <div style={{fontSize:'16px'}} className="col-lg-4 d-flex justify-content-center align-items-center">© Copyright www.albergo.com</div>
            <div style={{fontSize:'16px'}} className="col-lg-4 d-flex justify-content-center align-items-center flex-column  ">   Phone: 7839325678
             
   
            </div>
            <div style={{fontSize:'16px'}}className="col-lg-4 d-flex justify-content-center align-items-center">Email: albergo@gmail.com</div>
            </div>
          </div>
        </div>
        <section class="mt-5  d-flex justify-content-center align-items-center ">
   
   <a data-mdb-ripple-init class="btn btn-outline btn-floating m-1" href="#!" role="button"
     ><i class="fab fa-facebook-f text-light"></i
   ></a>


   <a data-mdb-ripple-init class="btn btn-outline btn-floating m-1" href="#!" role="button"
     ><i class="fab fa-twitter text-light"></i
   ></a>


   <a data-mdb-ripple-init class="btn btn-outline btn-floating m-1" href="#!" role="button"
     ><i class="fab fa-google text-light"></i
   ></a>

   <a data-mdb-ripple-init class="btn btn-outline btn-floating m-1" href="#!" role="button"
     ><i class="fab fa-instagram text-light"></i
   ></a>

 
 </section>

 <div className='container'>
 <hr style={{color:'white'}}></hr>
 </div>
 <div  className='d-flex justify-content-center align-items-center'>
 <a className='px-3'  style={{letterSpacing:"2px",fontSize:"14px",color:'white',textDecoration:"white"}}  href="/">HOME</a>
<a   className='px-3'style={{letterSpacing:"2px",fontSize:"14px" ,color:'white',textDecoration:"white"}}  href="/rooms">ROOMS</a>
<a  className='px-3' style={{letterSpacing:"2px",fontSize:"14px",color:'white',textDecoration:"white"}}  href="">CONTACT</a>

 </div>
 <br></br>
      </div>



    </div>
  )
}

export default Footer