import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { addCheckoutAPI, allRoomsAPI } from '../services/allAPI'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom'
import { bookingDetails } from '../Context/ContextShare';

function Rooms() {
  const { id } = useParams()
  console.log(id);
  
  const [allRooms, setAllRooms] = useState([])
  const [success, setSuccess] = useState(false)
  const getAllRooms = async () => {
    const result = await allRoomsAPI()
    setAllRooms(result.data)
  }
  console.log(allRooms);


  useEffect(() => {
    getAllRooms()
  }, [])


  const navigate = useNavigate()
  var room = allRooms.find((item) => item._id == id)
  console.log(room);

  const [message, setMessage] = useState("")
  console.log(message);

  const [messageKid, setMessageKid] = useState("")
  console.log(messageKid);
  //to store token
  const [token, setToken] = useState("")

  const [reserve, setReserve] = useState({
    email: "",
    phone: "",
    checkin: "",
    checkoutdate:  "",
    Room_type: "",
    No_Rooms:"",
    adults:"",
    children: "",
    extra_services: "",
    price_for_oneroom: "",
    partner_id:"",
    roomdetails:{},
    status:"PENDING"
  })

  
    const dates = reserve.checkoutdate.slice(8, 10) - reserve.checkin.slice(8, 10)
   
  

  const getPrice = () => {

    if (dates || reserve.Room_type) {


      if (reserve.Room_type == room.bedroom1info) {
        setReserve({ ...reserve, price_for_oneroom: room?.price1 * dates })
      }


      if (reserve.Room_type == room.bedroom2info) {
        setReserve({ ...reserve, price_for_oneroom: room?.price2 * dates })
      }
      if (reserve.Room_type == room.bedroom3info) {

        setReserve({ ...reserve, price_for_oneroom: room?.price3 * dates })
      }

    }
    

  }

  const getroomno = () => {

    if (reserve.No_Rooms == "1") {
      if (reserve.adults == "3" || reserve.adults == "4" || reserve.adults == "5" || reserve.adults == "6") {
        setMessage(`${room?.name} dont usually allow 3 or more people staying in a Single Room`)
      }
      else {
        setMessage("")
      }

    }

    if (reserve.No_Rooms == "2") {
      if (reserve.adults == "5" || reserve.adults == "6") {
        setMessage("Only 4 people allowed for 2 Rooms")
      }
      else {
        setMessage("")
      }
    }


    if (reserve.No_Rooms == "1") {
      if (reserve.children == "4" || reserve.children == "3") {
        setMessageKid("Max 2 Children allowed ")
      }
      else {
        setMessageKid("")
      }
    }
    if (reserve.No_Rooms == "2") {
      if (reserve.children == "5" || reserve.children == "6") {
        setMessageKid("Max 4 Children allowed ")
      }
      else {
        setMessageKid("")
      }
    }


  }
  useEffect(() => {

    if (room) {
      setReserve({ ...reserve, partner_id: room.userId
      })
    }

  }, [reserve.Room_type, reserve.No_Rooms, reserve?.price_for_oneroom, reserve.checkin, reserve.checkoutdate])

  useEffect(() => {
    getPrice()
   
  }, [reserve.Room_type, reserve.No_Rooms, reserve?.price_for_oneroom, reserve.checkin, reserve.checkoutdate])

  useEffect(() => {
    getroomno()
    if (room) {
      setReserve({ ...reserve, roomdetails: room })
    }
  }, [reserve.adults, reserve.No_Rooms, reserve.children])
  console.log(reserve);



  useEffect(() => {

    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
    }
    else {
      setToken("")
    }
    
  }, [])


  const handleAdd = async (e) => {
    e.preventDefault()



    const {
      email, phone, checkin, checkoutdate, Room_type, No_Rooms, adults, children, extra_services, price_for_oneroom, room_id
    } = reserve
    if (!email || !phone || !checkin || !checkoutdate || !Room_type || !No_Rooms || !adults || !children || !price_for_oneroom) {
      toast.info("Please fill the form completely")
    }
    else if (!token) {

      toast.info("Please Login to Reserving Hotel Rooms")
      setTimeout(() => {
        navigate('/login')

      }, 2000)
    }

    else {



      if (token) {
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }

        const result = await addCheckoutAPI(reserve, reqHeader)
        console.log(result);
        if (result.status === 200) {
          toast.success('Successfully Reserved')

          setSuccess(true)
        }
        else {
          console.log(result);
          toast.error(result.response.data)
        }

      }

    }

  }

  return (
    <div>

      {
          !success ?
          <>
            <div style={{ position: 'relative' }}>
              <img height={400} className='w-100' src='https://images.unsplash.com/photo-1609766975297-92f28e2db184?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
              <div className='d-flex justify-content-center px-5 align-items-center w-100' style={{ position: 'absolute' }}>
                <h1 className='roomtitle' style={{ color: "white", marginTop: "-150px", fontFamily: "Libre Baskerville" }}>Online Hotel Booking</h1>
              </div>

            </div>

            <div style={{ backgroundColor: 'rgb(250, 248, 245)', minHeight: '800px' }}>
              <div className="row">
                <div className="col-lg-1"></div>
                <div className="col-lg-10 " style={{ backgroundColor: 'white', minHeight: '800px' }}>
                  <div className='m-3   d-flex justify-content-between align-items-center text-light' style={{ backgroundColor: "black", minHeight: "80px" }}>


                    <h6 className='roomtitle px-4' style={{ color: "white", fontFamily: "Libre Baskerville" }}>{room?.name} </h6>

                    <h6 className='roomtitle px-4 ' style={{ color: "white", fontFamily: "Libre Baskerville" }}>{room?.location} </h6>

                  </div>
                  <div>
                    <div className="row m-2">
                      <div className="col-lg-8">
                        <img className='w-100' height={550} src={room?.img1} />
                        <div className="row ">
                          <div className="col-lg-4">
                            <img className='w-100 mt-4' height={200} src={room?.img2} />
                          </div>
                          <div className="col-lg-4">
                            <img className='w-100 mt-4' height={200} src={room?.img3} />
                          </div>
                          <div className="col-lg-4">
                            <img className='w-100 mt-4' height={200} src={room?.img4} />
                          </div>
                        </div>

                        <h6 className='mt-3' style={{ letterSpacing: "2px", fontSize: "16px" }}  >ROOMS DETAILS</h6>
                        <p style={{ fontSize: "14px", color: 'grey' }}> {room?.info}</p>
                      </div>
                      <div className="col-lg-4">
                        <div style={{ border: 'solid', minHeight: '600px', borderWidth: "0.5px", borderColor: "#bababa" }}>
                          <div className='m-4' >
                            <h5 style={{ fontFamily: "Libre Baskerville", fontWeight: '500' }}>Your Reservation</h5>

                            <label className='mt-3' style={{ letterSpacing: "2px", fontSize: "14px" }} htmlFor='email'>EMAIL</label>




                            <input value={reserve.email} onChange={(e) => setReserve({ ...reserve, email: e.target.value })} className='form-control' id='email' type='email' />

                            <label className='mt-3' style={{ letterSpacing: "2px", fontSize: "14px" }} htmlFor='email'>PHONE NO:</label>
                            <input value={reserve.phone} onChange={(e) => setReserve({ ...reserve, phone: e.target.value })} className='form-control' id='email' type='number' />

                         
                              <label className='mt-3' style={{ letterSpacing: "2px", fontSize: "14px" }} htmlFor='in'>CHECK IN</label>
                            <input value={reserve.checkin} onChange={(e) => setReserve({ ...reserve, checkin: e.target.value })} className='form-control' id='in' type='date' />


                            <label className='mt-3' style={{ letterSpacing: "2px", fontSize: "14px" }} htmlFor='out'>CHECK OUT</label>
                           
                            <input value={reserve.checkoutdate} onChange={(e) => setReserve({ ...reserve, checkoutdate: e.target.value })} className='form-control' id='out' type='date' />
                            

                          

                            <label className='mt-3' style={{ letterSpacing: "2px", fontSize: "14px" }} htmlFor='rooms'>ROOMS:</label>
                            <select onChange={(e) => setReserve({ ...reserve, Room_type: e.target.value })} id='rooms' className=' form-control' >
                              <option value={room?.bedroom1info}>{room?.bedroom1info}</option>
                              <option value={room?.bedroom2info}>{room?.bedroom2info}</option>
                              <option value={room?.bedroom3info}>{room?.bedroom3info}</option>
                            </select>


                         
                              <label className='mt-3' style={{ letterSpacing: "2px", fontSize: "14px" }} htmlFor='rooms'>NO OF ROOMS:</label>
                            <select onChange={(e) => setReserve({ ...reserve, No_Rooms: e.target.value })} id='rooms' className=' form-control' >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>

                            </select>
                             

                              <label className='mt-3' style={{ letterSpacing: "2px", fontSize: "14px" }} htmlFor='rooms'>ADULTS:</label>
                            <select onChange={(e) => setReserve({ ...reserve, adults: e.target.value })} id='rooms' className=' form-control' >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>

                            </select>
                            <p style={{ color: "red", fontSize: "12px" }}>{message}</p>

                            <label className='mt-3' style={{ letterSpacing: "2px", fontSize: "14px" }} htmlFor='rooms'>CHILDREN:</label>
                            <select onChange={(e) => setReserve({ ...reserve, children: e.target.value })} id='rooms' className=' form-control' >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                            </select>
                            <p style={{ color: "red", fontSize: "12px" }}>{messageKid}</p>
                            <label className='mt-3' style={{ letterSpacing: "2px", fontSize: "14px" }} >EXTRA SERVICES:</label>

                            <div className="d-flex px-3">
                              <input value="Air Conditioner" onChange={(e) => setReserve({ ...reserve, extra_services: e.target.value })} name='services' id='ac' type='radio' />
                              <label className=" px-2" style={{ fontSize: "14px", color: 'grey' }} htmlFor='ac'>Air Conditioner</label>
                            </div>


                            <div className="d-flex px-3">
                              <input value="Free Internet" onChange={(e) => setReserve({ ...reserve, extra_services: e.target.value })} name='services' id='ac' type='radio' />
                              <label className=" px-2" style={{ fontSize: "14px", color: 'grey' }} htmlFor='ac'>Free Internet</label>
                            </div>

                            <div className="d-flex px-3">
                              <input value="LCD television" onChange={(e) => setReserve({ ...reserve, extra_services: e.target.value })} name='services' id='ac' type='radio' />
                              <label className=" px-2" style={{ fontSize: "14px", color: 'grey' }} htmlFor='ac'>LCD television</label>
                            </div>

                            <div className="d-flex px-3">
                              <input value="Microwave" onChange={(e) => setReserve({ ...reserve, extra_services: e.target.value })} name='services' id='ac' type='radio' />
                              <label className=" px-2" style={{ fontSize: "14px", color: 'grey' }} htmlFor='ac'>Microwave</label>
                            </div>

                            <p className='mt-3' style={{ letterSpacing: "2px", fontSize: "16px", fontWeight: "bold" }} >PRICE : {reserve.price_for_oneroom * reserve?.No_Rooms}( for {dates} days)   {reserve.extra_services && <> + {reserve.extra_services} Charges</>}</p>

                            <button onClick={handleAdd} className='btn btn-dark mt-3 w-10' style={{ letterSpacing: "2px", fontSize: "14px" }}>RESERVE</button>
                          </div>

                        </div>
                        <div className='m-3' >

                          <h5 className='mt-2' style={{ letterSpacing: "2px", fontWeight: '500', fontSize: "16px" }}>EXTRA SERVICES</h5>
                          <div className='d-flex flex-column justify-content-between'>
                            <p style={{ fontSize: "12px", color: 'grey' }}>Air Conditioner		+ Rs. 350 to price (per night)</p>
                            <p style={{ fontSize: "12px", color: 'grey' }}>Free Internet		+ Rs.100 to price (per night)</p>
                            <p style={{ fontSize: "12px", color: 'grey' }}>LCD television		+ Rs.200 to price (per night)</p>
                            <p style={{ fontSize: "12px", color: 'grey' }}>Microwave		+ Rs.300 to price (per night)
                            </p>
                          </div>



                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="row m-1">
                        <div className="col-lg-4">

                          <div className='ui-card'  >
                            <img height={290} className='w-100 mt-4 ' src={room?.bedroom1} />
                            <div className='description'>
                              <h4 style={{ color: "white", letterSpacing: "2px", fontSize: "30px", fontWeight: "bold" }}>{room?.bedroom1info}</h4>
                              <h3 style={{ color: "white", letterSpacing: "2px", fontSize: "17px" }}>Rs. {room?.
                                price1}/per Night</h3>
                            </div>
                          </div>

                        </div>
                        <div className="col-lg-4">

                          <div className='ui-card'  >
                            <img height={290} className='w-100 mt-4 ' src={room?.bedroom2} />
                            <div className='description'>
                              <h4 style={{ color: "white", letterSpacing: "2px", fontSize: "30px", fontWeight: "bold" }}>{room?.bedroom2info}</h4>
                              <h3 style={{ color: "white", letterSpacing: "2px", fontSize: "17px" }}>Rs. {room?.
                                price2}/per Night</h3>
                            </div>
                          </div>

                        </div>
                        <div className="col-lg-4">

                          <div className='ui-card'  >
                            <img height={290} className='w-100 mt-4 ' src={room?.bedroom3} />
                            <div className='description'>
                              <h4 style={{ color: "white", letterSpacing: "2px", fontSize: "30px", fontWeight: "bold" }}>{room?.bedroom3info}</h4>
                              <h3 style={{ color: "white", letterSpacing: "2px", fontSize: "17px" }}>Rs. {room?.
                                price3}/per Night</h3>
                            </div>
                          </div>

                        </div>
                      </div>





                      <iframe src={room?.map} className='w-100 mt-4' height="450" style={{ border: "0" }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
          :
          <div>
            <div style={{ height: "60px" }}>

            </div>
            <div className='d-flex justify-content-center align-items-center' style={{ minHeight: "700px" }}>

              <div className='m-5' style={{ borderStyle: "double", minHeight: '600px', borderWidth: "2.5px", borderColor: "#bababa", width: "1000px" }}>
                <h2 className='px-3 py-4' style={{ fontFamily: "Libre Baskerville", fontWeight: "bold" }}>Awesome,booking confirmed.</h2>

                <div className='px-3 py-4 mt-2'>
                  <h5 style={{ color: "green" }}><i>Thank you, Your order has been received.</i></h5>
                  <div className="row mt-4 w-100">
                    <div className="col-lg-3 d-flex justify-content-center align-items-left flex-column">
                      <p style={{ letterSpacing: "2px" }}>HOTEL NAME</p>
                      <h6>{room?.name},{room?.location}</h6>

                    </div>
                    <div className="col-lg-3">

                      <p style={{ letterSpacing: "2px" }}>EMAIL</p>
                      <h6>{reserve?.email}</h6>

                    </div>
                    <div className="col-lg-3">


                      <p style={{ letterSpacing: "2px" }}>TOTAL</p>
                      <h6>Rs.{reserve?.price_for_oneroom * reserve.No_Rooms}</h6>
                    </div>
                    <div className="col-lg-3">

                      <p style={{ letterSpacing: "2px" }}>PAYMENT METHOD</p>
                      <h6>Pay on Arrival</h6>
                    </div>

                    <p className='mt-4' style={{ letterSpacing: "2px" }}>CHECK IN : <b>{reserve?.checkin}</b> </p>

                    <p style={{ letterSpacing: "2px" }}>CHECK OUT: <b>{reserve?.checkoutdate}</b></p>

                    <h2 className='px-3 py-4 mt-3' style={{ fontFamily: "Libre Baskerville", fontWeight: "bold" }}>Order details</h2>
                    <div className="d-flex justify-content-between">
                      <h5 style={{ letterSpacing: "2px" }}>PRODUCT</h5>
                      <h5 style={{ letterSpacing: "2px" }}>TOTAL</h5>
                    </div>
                    <hr className='ms-2'></hr>
                    <div className="d-flex mt-3 justify-content-between">
                      <h6 >{reserve?.Room_type} </h6>
                      <h6 style={{ letterSpacing: "2px" }}>Rs. {reserve?.price_for_oneroom}</h6>
                    </div>
                    <hr className='ms-2'></hr>

                    <div className="d-flex mt-3 justify-content-between">
                      <h6>NO OF ROOMS:</h6>
                      <h6 style={{ letterSpacing: "2px" }}>{reserve?.No_Rooms} </h6>
                    </div>
                    <hr className='ms-2'></hr>
                    <div className="d-flex mt-3 justify-content-between">
                      <h6 >SUBTOTAL:</h6>
                      <h6 style={{ letterSpacing: "2px" }}>Rs. {reserve?.price_for_oneroom * reserve?.No_Rooms} </h6>
                    </div>
                    <hr className='ms-2'></hr>

                    <div className="d-flex mt-3 hide justify-content-between ">
                      <h6 >PAYMENT METHOD:</h6>
                      <h6 style={{ letterSpacing: "2px" }}>Pay on Arrival </h6>
                    </div>
                    <hr className='ms-2 hide'></hr>

                    <div className="d-flex mt-3  justify-content-between">
                      <h6 style={{ color: "green" }}>TOTAL:</h6>
                      <h4 style={{ letterSpacing: "2px" }}>Rs. {reserve?.price_for_oneroom * reserve?.No_Rooms} </h4>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>


      }
      <ToastContainer position='top-center' theme='colored' autoClose={2000} />

    </div>
  )
}

export default Rooms