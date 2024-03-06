import React, { useEffect, useState } from 'react'
import { allOrderAPI} from '../services/allAPI'


function Order() {

    const[order,setOrder] = useState([])
   

    const getAllUserOrder = async () => {

        
    
      if (sessionStorage.getItem("token")) {

        const token = sessionStorage.getItem("token")
        console.log(token);
  
        const reqHeader={
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
      }

        const result = await allOrderAPI(reqHeader)
        setOrder(result.data)
    }
      }
      console.log(order);


      useEffect(() => {
        getAllUserOrder()
      }, [])
      




  return (
    <div className='container'>
        <div style={{minHeight:"80px"}}>

        </div>
        
        <div className='m-5' style={{minHeight:"650px"}}>

            <h3  style={{fontFamily:"Libre Baskerville",fontWeight:"bold"}}>Bookings & Trips</h3>

            <div>
              <div className="row w-100 mt-5">

               
          {
            order?.length>0 ?
            
            order.map((items)=>(
<div className="col-lg-12 px-3 py-2  m-2">
<h5 className=''>{ items.roomdetails.location}</h5>
<p>{items.checkin} - {items.checkoutdate}</p>

<div className='card' style={{boxShadow:"0px 2px grey"}}>
<div className="row">
<div className="col-lg-3 px-4 py-3">
  <img className='w-100 ms-2 rounded' height={150} src={items.roomdetails.img1} />
</div>
<div className="col-lg-7 px-3 py-3 d-flex flex-column justify-content-center align-items-left">
<h5>{items.roomdetails.name}</h5>
<p className=''>{ items.roomdetails.location}</p>

</div>
<div className="col-lg-2 px-3 py-3">
<h3>Rs. {items?.price_for_oneroom *items?.No_Rooms}</h3>


<h6>{items.status == "CANCEL" ?<> Cancelled</> : null}</h6>
</div>
</div>
</div>
</div>
            )):
            <>
            <h4>No trips booked ... yet!</h4>
            <h6>Time to dust off your bags and start planning your next adventure</h6>
            <button style={{width:"200px"}} className='btn btn-outline-dark rounded-5 px-3 py-2 mt-4'>Start Searching</button>
            </>
          }
              </div>
            </div>
            </div>        
     </div>
  )
}

export default Order