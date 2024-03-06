import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from "../services/baseurl"
import { allPartnerOrderAPI, allPartnerRoomsAPI, deleteRoom } from '../services/allAPI'
import Table from 'react-bootstrap/Table';
import EditBooking from './EditBooking';
import { editBookingResponseContext } from '../Context/ContextShare';
import EditRoomDetails from './EditRoomDetails';


function PartnerHome({ partner }) {
  const [show, setShow] = useState(false);
  const { editBookingResponse, setEditBookingResponse } = useContext(editBookingResponseContext)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate()
  const [order, setOrder] = useState([])
  const getAllPartnerOrder = async () => {



    if (sessionStorage.getItem("token2")) {

      const token2 = sessionStorage.getItem("token2")
      console.log(token2);

      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token2}`
      }

      const result = await allPartnerOrderAPI(reqHeader)
      setOrder(result.data)
    }
  }
  console.log(order);


  useEffect(() => {
    getAllPartnerOrder()
  }, [editBookingResponse])



  const [rooms, setRooms] = useState({})
  const handleLogout = () => {
    sessionStorage.removeItem("existingPartner")
    sessionStorage.removeItem("token2")

    navigate('/partnerlogin')
  }
  const ListProperty = () => {
    navigate("/listproperty")
  }
  console.log(partner);

  const getPartnerRooms = async () => {


    if (sessionStorage.getItem("token2")) {

      const token2 = sessionStorage.getItem("token2")
      console.log(token2);

      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token2}`
      }


      const result = await allPartnerRoomsAPI(reqHeader)
      console.log(result);

      setRooms(result.data)
    }
  }
  console.log(rooms);
  useEffect(() => {
    getPartnerRooms()
  }, [])



  const handleDelete = async (id) => {
    const token2 = sessionStorage.getItem("token2")
    console.log(token2);

    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token2}`
    }

    const result = await deleteRoom(id, reqHeader)
    console.log(result);


    if (result.status == 200) {
      getPartnerRooms()
    }
    else {
      alert(result.response.data)
    }
  }

  return (
    <div>
      <div className=' partnerhome d-flex align-items-center' style={{ minHeight: "650px" }}>



        <div className="row ">
          <div className='col-lg-2'>

          </div>
          <div className="col-lg-8 mt-3">

            <div class="row  h-100 align-items-center justify-content-center text-center">
              <div class="col-lg-8 align-self-end">
                <h1 style={{ fontFamily: "Libre Baskerville", fontWeight: "900" }} > Welcome back, {JSON.parse(sessionStorage.getItem("existingPartner"))?.fname}!</h1>
                <button onClick={handleLogout} style={{ letterSpacing: "2px", fontSize: "14px" }} className='btn btn-danger text-light mt-2'><i class="fa-solid fa-right-from-bracket"></i> Sign out</button>

                <hr class="divider" />
              </div>
              <div class="col-lg-8 align-self-baseline">
                <h3 className='mt-2' style={{ color: "white", fontWeight: "900" }}>List your property on Booking.com and start welcoming guests in no time!</h3>
                <button onClick={ListProperty} style={{ letterSpacing: "2px", fontSize: "14px" }} className='btn btn-dark text-light mt-2'>Add new property</button>
              </div>


            </div>

          </div>
        </div>
      </div>

      {
        order.length > 0 &&
        <div className='container mt-5 px-5 py-5' >

          <h3 style={{ fontFamily: "Libre Baskerville", fontWeight: "900" }} >Customers</h3>

          <Table className='mt-3 table ' striped bordered hover  >
            <thead >
              <tr style={{ backgroindColor: "black" }}>
                <th>Booking ID</th>
                <th>Email ID</th>
                <th>Phone Number</th>
                <th>
                  Hotel
                </th>
                <th>
                  From
                </th>
                <th>
                  To
                </th>
                <th>
                  Price
                </th>
                <th>
                  Status

                </th>
                <th>
                  View
                </th>
              </tr>
            </thead>
            <tbody>
              {order?.length > 0 ?
                order.map((items) => (
                  <>
                    <tr>
                      <td>{items._id}</td>
                      <td>{items.email}</td>
                      <td>{items.phone}</td>
                      <td>{items.roomdetails.name}</td>
                      <td>{items.checkin}</td>
                      <td>{items.checkoutdate}</td>
                      <td>Rs. {items.price_for_oneroom
                        * items.No_Rooms}</td>
                      <td>
                        {
                          items.status == "CANCELLED" && <button style={{ letterSpacing: "2px", fontWeight: "600" }} className='btn btn-sm btn-danger'>{items.status}</button>
                        }
                        {
                          items.status == "ACTIVE" && <button style={{ letterSpacing: "2px", fontWeight: "600" }} className='btn btn-sm btn-success'>{items.status}</button>
                        }
                        {
                          items.status == "PENDING" && <button style={{ letterSpacing: "2px", fontWeight: "600" }} className='btn btn-sm btn-warning'>{items.status}</button>
                        }
                        {
                          items.status == "PASSIVE" && <button style={{ letterSpacing: "2px", fontWeight: "600" }} className='btn btn-sm btn-primary'>{items.status}</button>
                        }
                      </td>
                      <td>         <EditBooking items={items} /></td>
                    </tr>


                  </>
                )) : <p className='d-flex jutify-content-center align-items-center text-danger'>Sorry, No Booking still yet!</p>
              }
            </tbody>
          </Table>

        </div>

      }


      <div className='container mt-5 mb-2 px-5 py-5' style={{ backgroundColor: 'rgb(250, 248, 245)', minHeight: '500px' }}>


        <div className="row" style={{ minHeight: "200px" }}>


          <div className="col-lg-12">

            {
             rooms?.length > 0 ?

                rooms.map((items) => (
                  <div>

                    <div className="row w-100 mt-4 m-2 px-2 py-3" style={{ borderStyle: "solid", borderWidth: "0.5px", borderRadius: "10px", borderColor: "#bababa" }}>
                      <div className="col-lg-3">
                        <img className='w-100 rounded' height={200} src={items.img1} alt="image" />
                      </div>
                      <div className="col-lg-7 d-flex align-items-left justify-content-center flex-column">
                        <h5>{items.name}</h5>


                        <h6 style={{ letterSpacing: "2px" }} >Location: {items.location}</h6>
                      </div>
                      <div className="col-lg-2 d-flex flex-column  align-items-center">
                        <h5>Action</h5>

                        <div style={{ minHeight: '180px' }} className='d-flex align-items-center justify-content-center'>
                          <EditRoomDetails items={items} />

                          <button style={{ letterSpacing: "2px" }} className='btn btn-danger ms-2' onClick={() => handleDelete(items._id)}>DELETE</button>
                        </div>
                      </div>
                    </div>
                  </div>


                )) : <div className='d-flex justify-content-center align-items-center' style={{height:"300px"}}>
                  
                        <h2 className='text-danger'>0 Properties Found!</h2>
                        
                     </div>
            }
          </div>
        </div>
      </div>
    </div>

  )
}

export default PartnerHome