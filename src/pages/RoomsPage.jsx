import React, { useEffect, useState } from 'react'
import { allRoomsAPI } from '../services/allAPI'
import { Link } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel';


function RoomsPage() {

  const [searchKey, setSearchKey] = useState("")
  console.log(searchKey);
  const [allRooms, setAllRooms] = useState([])

  const getAllRooms = async () => {
    const result = await allRoomsAPI(searchKey)
    setAllRooms(result.data)
  }
  console.log(allRooms);
  useEffect(() => {
    getAllRooms()
  }, [searchKey])

  return (
    <div>
      <div style={{ minHeight: "70px" }}>

      </div>

      <div style={{ backgroundColor: 'rgb(250, 248, 245)', minHeight: '800px' }}>
        <div className="row">
          <div className="col-lg-1"></div>
          <div className="col-lg-10 " style={{ backgroundColor: 'white', minHeight: '800px' }}>
            <div className='  mt-3 d-flex align-items-center justify-content-between text-light' style={{ backgroundColor: "black", minHeight: "80px" }}>
              <a href="/rooms" className='px-2' style={{ letterSpacing: "2px", fontSize: "14px", textDecoration: 'none', color: "white" }}>DEFAULT</a>



              <div class="form px-2" style={{ width: "300px" }}>
                <i class="fa fa-search"></i>
                <input onChange={(e) => setSearchKey(e.target.value)} type="text" class="form-control form-input w-100" placeholder="Search by location..." />
                <span class="left-pan"><i class="fa fa-microphone"></i></span>
              </div>

            </div>

            <div className='row mt-3'>
       
               { allRooms?.map((items) => (
              <div className="col-lg-4 mt-1">


                <Carousel>
                  <Carousel.Item>

                    <img className='w-100' height={300} src={items.img1} />
                  </Carousel.Item>
                  <Carousel.Item>

                    <img className='w-100' height={300} src={items.img2} />
                  </Carousel.Item>
                  <Carousel.Item>

                    <img className='w-100' height={300} src={items.img3} />
                  </Carousel.Item>
                </Carousel>
                <Link to={`/rooms/${items._id}`} style={{ textDecoration: 'none', color: "black" }}>
                  <h6 className='py-2' style={{ fontFamily: "Libre Baskerville" }}>{items.name}</h6>
                  <h6 className='' style={{ fontFamily: "Libre Baskerville", fontSize: '13px' }}>Rs. {items.price1} night</h6>
                </Link>

              </div>


              ))
}
            </div>
               

            {/* <div class='d-flex justify-content-center align-items-center'>
                              <img src="http://www.umid.co.in/Res/Images/no_result.gif" />
              
            </div> */}
          </div>
        </div>
      </div>

    </div>
  )
}

export default RoomsPage