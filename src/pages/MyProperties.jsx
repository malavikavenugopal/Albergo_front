import React, { useContext, useEffect, useState } from 'react'
import { allPartnerRoomsAPI, deleteRoom } from '../services/allAPI'
import EditRoomDetails from './EditRoomDetails';
import Adminsidebar from './Adminsidebar';


function MyProperties() {

  const [rooms, setRooms] = useState({})

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

      <div className="row w-100 " style={{ minHeight: "100vh" }}>
        <div className="col-lg-2">
          <Adminsidebar />
        </div>
        <div className="col-lg-10 " style={{ backgroundColor: "rgb(250, 248, 245)" }}>
          <div style={{ height: "80px" }}>

          </div>

          <div className=' mt-3 d-flex justify-content-between align-items-center'>


            <div class='d-flex justify-content-center align-items-center'>
              <i class="homeadmin fa-solid  fa-bed "></i>
              <h6 class='ms-2'>My Properties</h6>
            </div>
           
          </div>


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


              )) : <div className='d-flex justify-content-center align-items-center' style={{ height: "300px" }}>

                <h2 className='text-danger'>0 Properties Found!</h2>

              </div>
          }

        </div>



      </div>
    </div>
  )
}

export default MyProperties