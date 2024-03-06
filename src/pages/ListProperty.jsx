import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { addRoomAPI, allPartnerRoomsAPI } from '../services/allAPI';
function ListProperty() {

    const [token2, setToken2] = useState("")
    const [rooms, setRooms] = useState({
        name: "",
        info: "",
        location: "",
        map: "",
        phone: "",
        category: "",
        img1: "",
        img2: "",
        img3: "",
        img4: "",
        bedroom1: "",
        bedroom1info: "",
        bedroom2: "",
        bedroom2info: "",
        bedroom3: "",
        bedroom3info: "",
        price1: "",
        price2: "",
        price3: ""


    })
    console.log(rooms);
    const navigate = useNavigate()


    useEffect(() => {

        if (sessionStorage.getItem("token2")) {
            setToken2(sessionStorage.getItem("token2"))
        }
        else {
            setToken2("")
        }

    }, [])

    console.log(token2);
    const handleAdd = async (e) => {
        e.preventDefault()

        const { name, info, location, map, phone, category, img1, img2, img3, img4, bedroom1, bedroom1info, bedroom2, bedroom2info, bedroom3, bedroom3info, price1, price2, price3 } = rooms
        if (!name || !info || !location || !map || !img1 || !phone || !category || !img2 || !img3 || !img4 || !bedroom1 || !bedroom1info || !bedroom2 || !bedroom2info || !bedroom3 || !bedroom3info || !price1 || !price2 || !price3) {
            toast.info("Please fill the form completely")
        }

        else {

            if (token2) {
                const reqHeader = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token2}`
                }

                const result = await addRoomAPI(rooms, reqHeader)
                console.log(result);
                if (result.status === 200) {
                    toast.success('Hotel Added Successfully')
                    navigate('/myproperty')
                }
                else {
                    console.log(result);
                    toast.error(result.response.data)
                }

            }



        }

    }


    return (
        <div style={{ backgroundColor: 'rgb(250, 248, 245)' }}>
            <div className=" d-flex justify-content-center align-items-center flex-column" style={{ minHeight: "700px" }} >
                <Link className='ms-auto me-5' to={'/admin'}><button className=' btn btn-dark ' style={{ letterSpacing: "2px", fontSize: "14px" }} ><i class="fa-solid fa-arrow-left"></i> Go back to home</button></Link>
                <div style={{ textAlign: "left" }}>
                    <h6 style={{ marginTop: "90px", fontFamily: "Libre Baskerville", fontWeight: "bold" }}>To get started, choose the type of property you  want to list on albergo.com</h6>
                </div>
                <div className="row w-100 container mt-3">

                    <div className="col-lg-3  d-flex justify-content-center align-items-center flex-column">
                        <img className='w-75 rounded' height={150} src='https://images.unsplash.com/photo-1673599145690-fc06d6b0fc64?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
                        <div className='d-flex'>
                            <input type='radio' value="Beach Front" onChange={(e) => setRooms({ ...rooms, category: e.target.value })} name='category' />
                            <label style={{ letterSpacing: "2px", fontSize: "14px" }} className='ms-2'>Beach Front</label>
                        </div>



                    </div>
                    <div className="col-lg-3  d-flex justify-content-center align-items-center flex-column">
                        <img className='w-75 rounded' height={150} src='https://img.freepik.com/free-photo/luxury-indoor-pool-illuminated-by-blue-lighting-generated-by-ai_24640-81395.jpg?t=st=1702976410~exp=1702980010~hmac=d9ffd83d998381f87a8b27729aaa214e71c1f0f3139c82a48358b7cd6dc34335&w=1060' />

                        <div className='d-flex'>
                            <input type='radio' value="Amazing Pools" onChange={(e) => setRooms({ ...rooms, category: e.target.value })} name='category' />
                            <label style={{ letterSpacing: "2px", fontSize: "14px" }} className='ms-2'>Amazing Pools</label>
                        </div>
                    </div>
                    <div className="col-lg-3  d-flex justify-content-center  align-items-center flex-column">
                        <img className='w-75 rounded' height={150} src='https://images.unsplash.com/photo-1682879654264-5f2a52e1ea0f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />


                        <div className='d-flex'>
                            <input type='radio' value="Deserts" onChange={(e) => setRooms({ ...rooms, category: e.target.value })} name='category' />
                            <label style={{ letterSpacing: "2px", fontSize: "14px" }} className='ms-2'>Deserts</label>
                        </div>
                    </div>
                    <div className="col-lg-3  d-flex justify-content-center align-items-center flex-column">
                        <img className='w-75 rounded' height={150} src='https://images.unsplash.com/photo-1498409505433-aff66f7ba9e6?q=80&w=1930&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />


                        <div className='d-flex'>
                            <input type='radio' value="Cabin" onChange={(e) => setRooms({ ...rooms, category: e.target.value })} name='category' />
                            <label style={{ letterSpacing: "2px", fontSize: "14px" }} className='ms-2'>Cabin</label>
                        </div>
                    </div>
                </div>
                <div className="row w-100  container mt-2">
                    <div className="col-lg-3  d-flex justify-content-center align-items-center flex-column">
                        <img className='w-75 rounded' height={150} src='https://images.unsplash.com/photo-1605538032432-a9f0c8d9baac?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />


                        <div className='d-flex'>
                            <input type='radio' value="Islands" onChange={(e) => setRooms({ ...rooms, category: e.target.value })} name='category' />
                            <label style={{ letterSpacing: "2px", fontSize: "14px" }} className='ms-2'>Islands</label>
                        </div>

                    </div>
                    <div className="col-lg-3  d-flex justify-content-center align-items-center flex-column">

                        <img className='w-75 rounded' height={150} src='https://images.unsplash.com/photo-1621004947877-b56a25e938fe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXJjdGljJTIwaG90ZWxzfGVufDB8fDB8fHww' />


                        <div className='d-flex'>
                            <input type='radio' value="Arctic" onChange={(e) => setRooms({ ...rooms, category: e.target.value })} name='category' />
                            <label style={{ letterSpacing: "2px", fontSize: "14px" }} className='ms-2'>Arctic</label>
                        </div>
                    </div>
                    <div className="col-lg-3  d-flex justify-content-center align-items-center flex-column">


                        <img className='w-75 rounded' height={150} src='https://img.freepik.com/free-photo/rustic-deck-with-patio-furniture-vegetation_23-2150698470.jpg?
      t=st=1702976716~exp=1702980316~hmac=94444550a48767acb30d2addf3e13c55e12b09dccc9c74abac39f3d18314b584&w=360' />


                        <div className='d-flex'>
                            <input type='radio' value="Tree Houses" onChange={(e) => setRooms({ ...rooms, category: e.target.value })} name='category' />
                            <label style={{ letterSpacing: "2px", fontSize: "14px" }} className='ms-2'>Tree Houses</label>
                        </div>

                    </div>
                    <div className="col-lg-3 d-flex justify-content-center align-items-center flex-column">

                        <img className='w-75 rounded' height={150} src='https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />


                        <div className='d-flex'>
                            <input type='radio' value="Tropical" onChange={(e) => setRooms({ ...rooms, category: e.target.value })} name='category' />
                            <label style={{ letterSpacing: "2px", fontSize: "14px" }} className='ms-2'>Tropical</label>
                        </div>
                    </div>
                </div>
            </div>

            <div className='m-2' style={{ minHeight: "200px" }}>

                <div className="row w-100 m-5 container">
                    <div className="col-lg-1"></div>
                    <div className="col-lg-7 ">

                        <h6 style={{ fontFamily: "Libre Baskerville", fontWeight: "bold" }} >What's the name of your place?</h6>

                        <label className='mt-2' htmlFor='name'>Property name</label>
                        <input id='name' value={rooms.name} onChange={(e) => setRooms({ ...rooms, name: e.target.value })} className='form-control w-75' />

                        <h6 className='mt-4' style={{ fontFamily: "Libre Baskerville", fontWeight: "bold" }} >About place?</h6>
                        <label className='mt-2' htmlFor='name'>Property info</label>
                        <textarea id='name' value={rooms.info} onChange={(e) => setRooms({ ...rooms, info: e.target.value })} className='form-control w-75' />
                        <label className='mt-2' htmlFor='name'>Owner Phone Number</label>
                        <input id='name' value={rooms.phone} onChange={(e) => setRooms({ ...rooms, phone: e.target.value })} className='form-control w-75' />
                    </div>
                    <div className="col-lg-4 d-flex justify-content-center align-items-center">
                        <div className="card px-3 py-3 mt-1 ">
                            <h6 ><i class="fa-regular fa-thumbs-up text-info"></i> What should I consider when choosing a name?</h6>
                            <ul className='mt-2' style={{ fontSize: "12px" }}>
                                <li>Keep it short and catchy</li>
                                <li>Avoid abbreviations</li>
                                <li>Stick to the facts</li>
                            </ul>

                        </div>

                    </div>
                </div>
            </div>


            <div className='m-2' style={{ minHeight: "200px" }}>

                <div className="row w-100 ms-5 container">
                    <div className="col-lg-1"></div>
                    <div className="col-lg-7 ">

                        <h6 style={{ fontFamily: "Libre Baskerville", fontWeight: "bold" }} >Where is the property you're listing?</h6>


                        <label className='mt-2' htmlFor='name'>Region</label>
                        <select onChange={(e) => setRooms({ ...rooms, location: e.target.value })} id='name' className='form-control w-75'>
                            <option value="Goa,India" >  Goa</option>
                            <option value="New Delhi,India" >  New Delhi</option>
                            <option value="Ernakulam,India">  Ernakulam</option>
                            <option value="Mumbai,India" > Mumbai</option>
                            <option value="Bengaluru,India" >  Bengaluru</option>
                            <option value="Jaipur,India" >  Jaipur</option>
                        </select>


                        <label className='mt-2' htmlFor='name'>Map Link</label>

                        <p style={{ fontSize: "12px" }} >* This is the location we'll show to guests on our site.</p>
                        <input id='name' value={rooms.map} onChange={(e) => setRooms({ ...rooms, map: e.target.value })} placeholder='Embeded Code' className='form-control w-75' />
                    </div>
                    <div className="col-lg-4 d-flex justify-content-center align-items-center">
                        <div className="card px-3 py-3 mt-1 ">
                            <h6><i class="fa-regular text-warning fa-lightbulb"></i> Why do I need to add my address?</h6>
                            <p style={{ fontSize: "12px" }}>Once a guest books your property, this is the address that will be shared with them. It's important that it is correct so that guests can easily find your property.</p>

                        </div>

                    </div>
                </div>
            </div>
            <div className='m-2' style={{ minHeight: "300px" }}>

                <div className="row w-100 mt-5 ms-5 container">

                    <div className="col-lg-1"></div>
                    <div className="col-lg-7 d-flex flex-column justify-content-center  ">
                        <h6 style={{ fontFamily: "Libre Baskerville", fontWeight: "bold" }} >What does your place look like?</h6>


                        <div className='d-flex w-75 mt-3 flex-column justify-content-center  align-items-center ' style={{ borderStyle: "dashed", height: "200" }}>
                            <img src={rooms.img1 ? rooms.img1 : "https://www.pngplay.com/wp-content/uploads/8/Upload-Icon-Logo-PNG-Clipart-Background.png"} className=' m-2' width={400} height={250} />
                            <input className='form-control' placeholder='image URL' style={{ marginTop: "30px", width: '150px' }} onChange={(e) => setRooms({ ...rooms, img1: e.target.value })} />

                        </div>

                    </div>
                    <div className="col-lg-4 d-flex justify-content-center align-items-center">
                        <div className="card px-3 py-3 mt-1 ">
                            <h6><i class="fa-regular fa-thumbs-up text-info"></i> What if I don't have professional photos?</h6>
                            <p style={{ fontSize: "12px" }}>No problem! You can use a smartphone or a digital camera.Here are some tips for taking great photos of your property</p>

                        </div>

                    </div>
                </div>
            </div>


            <div className='m-2' style={{ minHeight: "200px" }}>

                <div className="row w-100 m-5 container">
                    <div className="col-lg-1"></div>
                    <div className="col-lg-4 ">

                        <h6 style={{ fontFamily: "Libre Baskerville", fontWeight: "bold" }} >Upload at least 3 image urls of your property. </h6>


                        <input id='name' value={rooms.img2} onChange={(e) => setRooms({ ...rooms, img2: e.target.value })} className='form-control mt-2' placeholder='Image 1 URL' />
                        <input id='name' value={rooms.img3} onChange={(e) => setRooms({ ...rooms, img3: e.target.value })} className='form-control mt-2' placeholder='Image 2 URL' />
                        <input id='name' value={rooms.img4} onChange={(e) => setRooms({ ...rooms, img4: e.target.value })} className='form-control mt-2' placeholder='Image 3 URL' />
                    </div>
                    <div className="col-lg-7 ">
                        <div className="row">

                            <div className="col-lg-4 d-flex justify-content-center align-items-center">
                                {rooms.img2 &&
                                    <img src={rooms.img2} className='w-100' height={160} />
                                }

                            </div>
                            <div className="col-lg-4 d-flex justify-content-center align-items-center">
                                {rooms.img3 &&

                                    <img src={rooms.img3} className='w-100' height={160} />}



                            </div>
                            <div className="col-lg-4 d-flex justify-content-center align-items-center">
                                {

                                    rooms.img4 && <img src={rooms.img4} className='w-100' height={160} />
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </div>


            <div className='m-2' style={{ minHeight: "200px" }}>
                <div className="row w-100 container m-5">
                    <div className="col-lg-1"></div>

                    <div className="col-lg-11 row">

                        <div className="col-lg-4 ">

                            <label style={{ fontFamily: "Libre Baskerville" }} htmlFor='room1'>ROOM 1</label>
                            <br></br>
                            <input value={rooms.bedroom1} onChange={(e) => setRooms({ ...rooms, bedroom1: e.target.value })} className='form-control' id='room1' placeholder='URL' />

                            {

                                rooms.bedroom1 && <img src={rooms.bedroom1} className='w-100 mt-1' height={160} />
                            }
                            <h6 className='mt-3' style={{ fontFamily: "Libre Baskerville" }}>Choose the type of room</h6>
                            <select value={rooms.bedroom1info} onChange={(e) => setRooms({ ...rooms, bedroom1info: e.target.value })}>
                                <option value='Single Bed'>Single Bed</option>
                                <option value='1 Kingbed'  >1 Kingbed</option>
                                <option value='2 Kingbed'>2 Kingbed</option>
                            </select>
                            <h6 className='mt-3' style={{ fontFamily: "Libre Baskerville" }}>    How much do you want to charge per night?</h6>
                            <p style={{ fontSize: "12px", fontWeight: "bold" }}>Price guests pay</p>
                            <input onChange={(e) => setRooms({ ...rooms, price1: e.target.value })} className='form-control' placeholder='INR' type='text' value={rooms.price1} />
                            <p style={{ fontSize: "12px" }}>Including taxes, commission and charges</p>
                        </div>



                        <div className="col-lg-4">






                            <label style={{ fontFamily: "Libre Baskerville" }} htmlFor='room1'>ROOM 2</label>
                            <br></br>
                            <input value={rooms.bedroom2} onChange={(e) => setRooms({ ...rooms, bedroom2: e.target.value })} className='form-control' id='room1' placeholder='URL' />

                            {

                                rooms.bedroom2 && <img src={rooms.bedroom2} className='w-100 mt-1' height={160} />
                            }
                            <h6 className='mt-3' style={{ fontFamily: "Libre Baskerville" }}>Choose the type of room</h6>
                            <select value={rooms.bedroom2info} onChange={(e) => setRooms({ ...rooms, bedroom2info: e.target.value })}>
                                <option value='Single Bed'>Single Bed</option>
                                <option value='1 Kingbed'  >1 Kingbed</option>
                                <option value='2 Kingbed'>2 Kingbed</option>
                            </select>
                            <h6 className='mt-3' style={{ fontFamily: "Libre Baskerville" }}>    How much do you want to charge per night?</h6>
                            <p style={{ fontSize: "12px", fontWeight: "bold" }}>Price guests pay</p>
                            <input onChange={(e) => setRooms({ ...rooms, price2: e.target.value })} className='form-control' placeholder='INR' type='text' value={rooms.price2} />
                            <p style={{ fontSize: "12px" }}>Including taxes, commission and charges</p>
                        </div>
                        <div className="col-lg-4">


                            <label style={{ fontFamily: "Libre Baskerville" }} htmlFor='room1'>ROOM 3</label>
                            <br></br>
                            <input value={rooms.bedroom3} onChange={(e) => setRooms({ ...rooms, bedroom3: e.target.value })} className='form-control' id='room1' placeholder='URL' />

                            {

                                rooms.bedroom3 && <img src={rooms.bedroom3} className='w-100 mt-1' height={160} />
                            }
                            <h6 className='mt-3' style={{ fontFamily: "Libre Baskerville" }}>Choose the type of room</h6>
                            <select value={rooms.bedroom3info} onChange={(e) => setRooms({ ...rooms, bedroom3info: e.target.value })}>
                                <option value='Single Bed'>Single Bed</option>
                                <option value='1 Kingbed'  >1 Kingbed</option>
                                <option value='2 Kingbed'>2 Kingbed</option>
                            </select>
                            <h6 className='mt-3' style={{ fontFamily: "Libre Baskerville" }}>    How much do you want to charge per night?</h6>
                            <p style={{ fontSize: "12px", fontWeight: "bold" }}>Price guests pay</p>
                            <input onChange={(e) => setRooms({ ...rooms, price3: e.target.value })} className='form-control' placeholder='INR' type='text' value={rooms.price3} />
                            <p style={{ fontSize: "12px" }}>Including taxes, commission and charges</p>
                        </div>
                    </div>


                </div>

            </div>
            <div className="row ">
                <div className="col-lg-4"></div>
                <div className="col-lg-4"></div>
                <div className="col-lg-4 d-flex align-items-center justify-content-center ">
                    <button onClick={handleAdd} style={{ letterSpacing: '2px' }} className='btn btn-success w-50 '>Submit</button>
                </div>
            </div>

            <div style={{ minHeight: "70px" }}>

            </div>
            <ToastContainer position='top-center' theme='colored' autoClose={2000} />
        </div>

    )
}

export default ListProperty