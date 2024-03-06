import React from 'react'
import { Link } from 'react-router-dom'

function Home() {


  return (
    <div>

      
        <>
          <div style={{ position: 'relative' }} className='home' >
            <img className='w-100 img' height={650} src='https://images.unsplash.com/photo-1469796466635-455ede028aca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
            <div className='d-flex w-100 justify-content-center align-items-center' style={{ position: 'absolute', marginTop: "-300px" }}>
              <h1 className='hometitle' style={{ textAlign: 'center', color: "white", fontFamily: "Libre Baskerville" }} ><span style={{ fontWeight: 'bold' }}>Discover a hotel</span> that defines <br></br>a new dimension of luxury</h1>


            </div>
            <div className='d-flex book w-100 justify-content-center align-items-center bookcard' style={{ position: 'absolute', marginTop: "-50px" }}>
              <div style={{ backgroundColor: 'white', width: "1000px", padding: "30px" }}>
                <div className="row">
                  <div className="col-lg-2">
                    <label style={{ letterSpacing: "2px", fontSize: "14px" }} htmlFor='checkin'>CHECK-IN</label>
                    <input  id='checkin' className='form-control' type='date' />
                  </div>
                  <div className="col-lg-2">
                    <label style={{ letterSpacing: "2px", fontSize: "14px" }} htmlFor='checkout'>CHECK-OUT</label>
                    <input id='checkout' className='form-control' type='date' />
                  </div>
                  <div className="col-lg-2">
                    <label style={{ letterSpacing: "2px", fontSize: "14px" }} htmlFor='location'>LOCATION</label>
                    <select className='form-control' id='location' >
                      <option value="Goa,India" >  Goa</option>
                      <option value="New Delhi,India">  New Delhi</option>
                      <option value="Ernakulam,India">  Ernakulam</option>
                      <option value="Mumbai,India">  Mumbai</option>
                      <option value="Bengaluru,India">  Bengaluru</option>
                      <option value="Jaipur,India">  Jaipur</option>
                    </select>
                  </div>
                  <div className="col-lg-2">
                    <label style={{ letterSpacing: "2px", fontSize: "14px" }}>ROOMS</label>
                    <select  className=' form-control' >
                      <option value="1">1</option>
                      <option value="2">2</option>

                    </select>
                  </div>
                  <div className="col-lg-2">
                    <label style={{ letterSpacing: "2px", fontSize: "14px" }}>ADULT</label>
                    <select className=' form-control' >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>


                  <div className="col-lg-2 d-flex justify-content-center align-items-center">
                    <button className='btn btn-dark w-100' style={{ letterSpacing: "2px", fontSize: "14px", marginTop: '20px' }} >BOOK</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div className="row">
            <div className="col-lg-5 d-flex justify-content-center align-items-center flex-column">
              <p style={{ letterSpacing: "2px", fontSize: "14px" }}>ROOMS AND SUITES</p>

              <h3 style={{ fontFamily: "Libre Baskerville", textAlign: "center" }}>The Art of meeting your highest expectations</h3>
              <button className='btn btn-dark' style={{ letterSpacing: "2px", fontSize: "14px" }}>BOOK</button>
            </div>
            <div className="col-lg-7 hide ">
              <img height={500} className='w-100' src='https://albergo.qodeinteractive.com/wp-content/uploads/2017/11/elegant-h-s-4-1100x960.jpg' />
            </div>
          </div>


          <div className="row w-100 mt-3">
            <h2 style={{ fontFamily: "Libre Baskerville", textAlign: "center", fontWeight: 'bold' }} className='d-flex justify-content-center align-items-center mt-3'>48 Rooms for your comfort</h2>
            <p style={{ fontFamily: "Libre Baskerville", textAlign: "center" }} className='d-flex justify-content-center align-items-center'>Experience the service you will not find anywhere else.</p>
            <div className="col-lg-6 mt-4">
              <div className='ui-card beachfront'  >

                <Link to={'/category/Beach Front'}>
                  <img height={600} className='w-100' src='https://images.unsplash.com/photo-1673599145690-fc06d6b0fc64?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='beachfront' />
                  <div className='description'>
                    <h3 style={{ color: "white", letterSpacing: "2px" }}>Beach Front</h3>
                  </div>
                </Link>

              </div>

              <div className="row mt-4">
                <div className="col-lg-6">
                  <div className='ui-card'  >
                    <Link to={'category/Amazing Pools'}>
                      <img height={300} className='w-100' src='https://img.freepik.com/free-photo/luxury-indoor-pool-illuminated-by-blue-lighting-generated-by-ai_24640-81395.jpg?t=st=1702976410~exp=1702980010~hmac=d9ffd83d998381f87a8b27729aaa214e71c1f0f3139c82a48358b7cd6dc34335&w=1060' alt='amazingpool' />
                      <div className='description'>
                        <h3 style={{ color: "white", letterSpacing: "2px" }}>Amazing Pools</h3>
                      </div></Link>
                  </div>

                </div>

                <div className="col-lg-6">
                  <div className='ui-card cards'  >

                    <Link to={'/category/Deserts'}>
                      <img height={300} className='w-100' src='https://images.unsplash.com/photo-1682879654264-5f2a52e1ea0f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='Deserts' />
                      <div className='description'>
                        <h3 style={{ color: "white", letterSpacing: "2px" }}>Deserts</h3>
                      </div></Link>
                  </div>

                </div>
              </div>
            </div>
            <div className="col-lg-6 mt-4">
              <div className="row ">
                <div className="col-lg-6">
                  <div className='ui-card cards'  >
                    <Link to={'/category/Cabin'}>
                      <img height={285} className='w-100' alt='cabin' src='https://images.unsplash.com/photo-1498409505433-aff66f7ba9e6?q=80&w=1930&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
                      <div className='description'>
                        <h3 style={{ color: "white", letterSpacing: "2px" }}>Cabin</h3>
                      </div>
                    </Link>
                  </div>

                  <div className='ui-card'  >
                    <Link to={'/category/Islands'}>
                      <img height={290} className='w-100 mt-4' alt='islands' src='https://images.unsplash.com/photo-1605538032432-a9f0c8d9baac?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
                      <div className='description'>
                        <h3 style={{ color: "white", letterSpacing: "2px" }}>Islands</h3>
                      </div>
                    </Link>
                  </div>
                  <div className='ui-card'  >

                    <Link to={'/category/Arctic'}>
                      <img height={301} className='w-100 mt-4' alt='arctic' src='https://images.unsplash.com/photo-1621004947877-b56a25e938fe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXJjdGljJTIwaG90ZWxzfGVufDB8fDB8fHww' />
                      <div className='description'>
                        <h3 style={{ color: "white", letterSpacing: "2px" }}>Arctic</h3>
                      </div>
                    </Link>
                  </div>

                </div>
                <div className="col-lg-6">
                  <div className='ui-card cards'  >

                    <Link to={'/category/Tree Houses'}>
                      <img height={600} className='w-100' alt='treehouse' src='https://img.freepik.com/free-photo/rustic-deck-with-patio-furniture-vegetation_23-2150698470.jpg?
  t=st=1702976716~exp=1702980316~hmac=94444550a48767acb30d2addf3e13c55e12b09dccc9c74abac39f3d18314b584&w=360'/>
                      <div className='description'>
                        <h3 style={{ color: "white", letterSpacing: "2px" }}>Tree Houses</h3>
                      </div>
                    </Link>
                  </div>
                  <div className='ui-card'  >

                  <Link to={'/category/Tropical'}>
                  <img height={300} className='w-100 mt-4' alt='tropical' src='https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
                    <div className='description'>
                      <h3 style={{ color: "white", letterSpacing: "2px" }}>Tropical</h3>
                    </div>
                  </Link>
                  </div>


                </div>
              </div>
            </div>
          </div></>
  

     


    </div>
  )
}

export default Home