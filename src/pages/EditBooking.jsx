import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { editBookingResponseContext } from '../Context/ContextShare';
import { editBookingStatus } from '../services/allAPI';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
function EditBooking({ items }) {
    const { editBookingResponse, setEditBookingResponse } = useContext(editBookingResponseContext)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [token, setToken] = useState("")
    const [update, setUpdate] = useState(
        {

            id: items._id,
            email: items.email,
            phone: items.phone,
            checkin: items.checkin,
            checkoutdate: items.checkoutdate,
            Room_type: items.Room_type,
            No_Rooms: items.No_Rooms,
            adults: items.adults,
            children: items.children,
            extra_services: items.extra_services,
            price_for_oneroom: items.price_for_oneroom,
            partner_id: items.partner_id,
            roomdetails: items.roomdetails,
            status: ""

        }
    )
    console.log(update);




    useEffect(() => {

        if (sessionStorage.getItem("token2")) {
            setToken(sessionStorage.getItem("token2"))
        }
        else {
            setToken("")
        }

    }, [])


    const handleUpdate = async () => {

        const { id } = update

        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        const result = await editBookingStatus(id, update, reqHeader)
        console.log(result);



        if (result.status == 200) {
            console.log(result.data);
            toast.success('Booking Status Updated ')
            handleClose()
            setEditBookingResponse(result.data)

        }
        else {
            console.log(result.response.data);
        }
    }
    const dates =items.checkoutdate.slice(8, 10) - items.checkin.slice(8, 10)

    return (
        <div>
            <button onClick={handleShow} style={{ letterSpacing: "2px", fontWeight: "600" }} className='btn btn-sm btn-outline-dark'>VIEW</button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >




                <Modal.Body>
                    <div className='m-2 px-3 py-2' >
                    <div className="row">
                        <div className=' rounded bg-dark text-light'>

                            <div className="d-flex  justify-content-between ">
                                <div>
                                <h5  >{items.roomdetails.name}</h5>
                                <p>{items.roomdetails.location}</p>
                                </div>
                             <div>
                             <h4>Rs.  {items.price_for_oneroom
                                    * items.No_Rooms} </h4>   
                                 
                             </div>
                             
                            </div>
                            <div className="d-flex  justify-content-between ">
                                <h6>CHECK IN: {items.checkin}</h6>
                                <h6>CHECK OUT: {items.checkoutdate}</h6>
                            </div>


                        </div>

                    </div><br></br>
                   <div >
                   <h6> Email ID  : <i>{items.email}</i> </h6>
                   <br></br>
                    <h6 className='mt-2'> Phone No: <i>{items.phone}</i> </h6>
                <br></br>
                    <h6> Room Category: <i>{items.Room_type}</i> </h6>
                    <br></br>
                    <h6> No of Rooms: <i>{items.No_Rooms}</i> </h6>

                   </div>
<br></br>
                    <div className='d-flex'>
                        <h6><label htmlFor='status'>Select the status:</label></h6>


                        <select id='status' className='form-control ms-2 mb-1 w-25' onChange={(e) => setUpdate({ ...update, status: e.target.value })}>
                            <option  >STATUS</option>
                            <option value="CANCELLED">CANCEL</option>
                            <option value='PENDING'>PENDING</option>
                            <option value='ACTIVE'>ACTIVE</option>
                            <option value='PASSIVE' >PASSIVE</option>
                        </select>
                    </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{ letterSpacing: "2px" }} variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={handleUpdate} style={{ letterSpacing: "2px" }} variant="success" >
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer position='top-center' theme='colored' autoClose={2000} />

        </div>
    )
}

export default EditBooking