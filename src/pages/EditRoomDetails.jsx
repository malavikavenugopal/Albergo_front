import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { editRooms } from '../services/allAPI';

function EditRoomDetails({ items }) {

    console.log(items);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [token, setToken] = useState("")

    const [update,setUpdate] = useState({
        id:items._id,
        name: items.name,
        info: items.info,
        location: items.location,
        map: items.map,
        phone:items.phone,
        category: items.category,
        img1: items.img1,
        img2: items.img2,
        img3: items.img3,
        img4: items.img4,
        bedroom1: items.bedroom1,
        bedroom1info: items.bedroom1info,
        bedroom2: items.bedroom2,
        bedroom2info: items.bedroom2info,
        bedroom3: items.bedroom3,
        bedroom3info: items.bedroom3info,
        price1: items.price1,
        price2: items.price2,
        price3: items.price3,
       

    })
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
    const result = await editRooms(id, update, reqHeader)
    console.log(result);



    if (result.status == 200) {
        console.log(result.data);
        toast.success('Rooms Deatils Updated ')
        handleClose() 
    }
    else {
        console.log(result.response.data);
    }
}
    return (
        <div>

            <button onClick={handleShow}  style={{ letterSpacing: "2px" }} className='btn btn-success '>EDIT</button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >




                <Modal.Body>
                    <div>
                    
                <label className='mt-2 fw-bold' htmlFor='name'>Property name</label>
                <input id='name' value={update.name} onChange={(e) => setUpdate({ ...update, name: e.target.value })} className='form-control w-75' />

                        <label className='mt-2 fw-bold' htmlFor='name'>Property info</label>
                        <textarea id='name' value={update.info} onChange={(e) => setUpdate({ ...update, info: e.target.value })} className='form-control w-75'/>
                        <label className='mt-2 fw-bold' htmlFor='name'>Owner Phone Number</label>
                        <input id='name' value={update.phone} onChange={(e) => setUpdate({ ...update, phone: e.target.value })} className='form-control w-75' />

                        <div className='mt-2'>
                        <label style={{ fontFamily: "Libre Baskerville" }} htmlFor='room1'>ROOM 1</label>
                            <br></br>
                            <input value={update.bedroom1} onChange={(e) => setUpdate({ ...update, bedroom1: e.target.value })} className='form-control' id='room1' placeholder='URL' />

                           
                            <h6 className='mt-3' style={{ fontFamily: "Libre Baskerville" }}>Choose the type of room</h6>
                            <select value={update.bedroom1info} onChange={(e) => setUpdate({ ...update, bedroom1info: e.target.value })}>
                                <option value='Single Bed'>Single Bed</option>
                                <option value='1 Kingbed'  >1 Kingbed</option>
                                <option value='2 Kingbed'>2 Kingbed</option>
                            </select>
                            <h6 className='mt-3' style={{ fontFamily: "Libre Baskerville" }}>    How much do you want to charge per night?</h6>
                            <p style={{ fontSize: "12px", fontWeight: "bold" }}>Price guests pay</p>
                            <input onChange={(e) => setUpdate({ ...update, price1: e.target.value })} className='form-control' placeholder='INR' type='text' value={update.price1} />
                            <p style={{ fontSize: "12px" }}>Including taxes, commission and charges</p>
                        </div>

                        <div className='mt-2'>
                        <label style={{ fontFamily: "Libre Baskerville" }} htmlFor='room1'>ROOM 2</label>
                            <br></br>
                            <input value={update.bedroom2} onChange={(e) => setUpdate({ ...update, bedroom2: e.target.value })} className='form-control' id='room1' placeholder='URL' />

                           
                            <h6 className='mt-3' style={{ fontFamily: "Libre Baskerville" }}>Choose the type of room</h6>
                            <select value={update.bedroom2info} onChange={(e) => setUpdate({ ...update, bedroom2info: e.target.value })}>
                                <option value='Single Bed'>Single Bed</option>
                                <option value='1 Kingbed'  >1 Kingbed</option>
                                <option value='2 Kingbed'>2 Kingbed</option>
                            </select>
                            <h6 className='mt-3' style={{ fontFamily: "Libre Baskerville" }}>    How much do you want to charge per night?</h6>
                            <p style={{ fontSize: "12px", fontWeight: "bold" }}>Price guests pay</p>
                            <input onChange={(e) => setUpdate({ ...update, price2: e.target.value })} className='form-control' placeholder='INR' type='text' value={update.price2} />
                            <p style={{ fontSize: "12px" }}>Including taxes, commission and charges</p>
                        </div>
                        <div className='mt-2'>
                        <label style={{ fontFamily: "Libre Baskerville" }} htmlFor='room1'>ROOM 3</label>
                            <br></br>
                            <input value={update.bedroom3} onChange={(e) => setUpdate({ ...update, bedroom3: e.target.value })} className='form-control' id='room1' placeholder='URL' />

                           
                            <h6 className='mt-3' style={{ fontFamily: "Libre Baskerville" }}>Choose the type of room</h6>
                            <select value={update.bedroom3info} onChange={(e) => setUpdate({ ...update, bedroom3info: e.target.value })}>
                                <option value='Single Bed'>Single Bed</option>
                                <option value='1 Kingbed'  >1 Kingbed</option>
                                <option value='2 Kingbed'>2 Kingbed</option>
                            </select>
                            <h6 className='mt-3' style={{ fontFamily: "Libre Baskerville" }}>    How much do you want to charge per night?</h6>
                            <p style={{ fontSize: "12px", fontWeight: "bold" }}>Price guests pay</p>
                            <input onChange={(e) => setUpdate({ ...update, price3: e.target.value })} className='form-control' placeholder='INR' type='text' value={update.price3} />
                            <p style={{ fontSize: "12px" }}>Including taxes, commission and charges</p>
                        </div>
                    </div>
              
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{ letterSpacing: "2px" }} variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={handleUpdate}  style={{ letterSpacing: "2px" }} variant="success" >
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>





            <ToastContainer position='top-center' theme='colored' autoClose={2000} />

        </div>
    )
}

export default EditRoomDetails