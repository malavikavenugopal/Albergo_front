import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from "../services/baseurl"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { editPartnerProfile } from '../services/allAPI';
function Adminsidebar() {
  const navigate = useNavigate()
  const handleLogout = () => {
    sessionStorage.removeItem("existingPartner")
    sessionStorage.removeItem("token2")

    navigate('/partnerlogin')
  }

  const [partner, setPartner] = useState({
    email: "",
    fname: "",
    lname: "",
    phone: "",
    password: "",
    confirmpassword: "",
    profile: ""
  })
  //to store existing image
  const [existingImage, setExistingImage] = useState("")

  useEffect(() => {
    const partnerinfo = JSON.parse(sessionStorage.getItem("existingPartner"))

    setPartner({ ...partner, email: partnerinfo.email, fname: partnerinfo.fname, lname: partnerinfo.lname, phone: partnerinfo.phone, password: partnerinfo.password, confirmpassword: partnerinfo.confirmpassword, profile: partnerinfo.profile })

    setExistingImage(partnerinfo.profile)
  }, [])
  console.log(partner);


  //to display uploaded image
  const [preview, setPreview] = useState("")


  useEffect(() => {

    if (partner.profile) {
      setPreview(URL.createObjectURL(partner.profile))
    }
    else {
      setPreview("")
    }
  }, [partner.profile])

  const [token,setToken] = useState("")
  useEffect(() => {
    if (sessionStorage.getItem("token2")) {
        setToken(sessionStorage.getItem("token2"))
    }
    else {
        setToken("")
    }
}
    , [])



    
    const handleProfileUpdate = async () => {

      const { email, fname, lname,  phone, password, confirmpassword , profile } = partner


          const reqBody = new FormData()

         
          reqBody.append("email", email)
          reqBody.append("fname", fname)
          reqBody.append("lname", lname)
          reqBody.append("phone", phone)
          reqBody.append("password", password)
          reqBody.append("confirmpassword", confirmpassword)
          preview ? reqBody.append("profile", profile) : reqBody.append("profile", existingImage)





          if (preview) {

              const reqHeader = {
                  "Content-Type": "multipart/form-data",
                  "Authorization": `Bearer ${token}`
              }
              const result = await editPartnerProfile(reqBody, reqHeader)
              console.log(result);

              if (result.status == 200) {
                  toast.success('Profile upodates successfully')
                 
              }
              else {
                  toast.error(result.response.data)
              }

          }
          else {
              const reqHeader = {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`
              }

              const result = await editPartnerProfile(reqBody, reqHeader)
              console.log(result);

              if (result.status == 200) {
                  toast.success('Profile upodates successfully')
          
              }
              else {
                  toast.error(result.response.data)
              }

          }
     

  }

  return (
    <div>

      <div style={{ height: "50px" }}>

      </div>
      <div className=' px-2 d-flex justify-content-between align-items-center mt-5' style={{ height: "70px", margin: "5px", backgroundColor: "black", borderRadius: '10px', color: "white" }}>

        <label htmlFor='profile'>
          <input id="profile" type='file' style={{ display: "none" }} onChange={(e) => setPartner({ ...partner, profile: e.target.files[0] })} />
          
              <img style={{borderRadius:"50%"}} height={50} width={50} src={preview ? preview : "https://th.bing.com/th/id/R.c3631c652abe1185b1874da24af0b7c7?rik=XBP%2fc%2fsPy7r3HQ&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fpng-user-icon-circled-user-icon-2240.png&ehk=z4ciEVsNoCZtWiFvQQ0k4C3KTQ6wt%2biSysxPKZHGrCc%3d&risl=&pid=ImgRaw&r=0"} alt="" />
              

        </label>
        <h6 className='ms-2'>Welcome back, {JSON.parse(sessionStorage.getItem("existingPartner"))?.fname}</h6>

       
      </div>

      <div className=' d-flex px-2 flex-column mt-3'>
        <Link to={"/admin"} style={{ color: "black", textDecoration: "none" }}>
          <div className='d-flex align-items-center   linkhover justify-content-between'>
            <h6 style={{ letterSpacing: "2px" }}>Dashboard</h6>
            <i class="fa-solid fa-house ms-5"></i>
          </div>
        </Link>

        <Link to={"/listproperty"} style={{ color: "black", textDecoration: "none" }}>

          <div className='d-flex  linkhover mt-2 align-items-center   justify-content-between'>
            <h6 style={{ letterSpacing: "2px" }}>New Property</h6>
            <i class="fa-solid fa-plus  ms-5"></i>
          </div>
        </Link>
        <Link to={"/customer"} style={{ color: "black", textDecoration: "none" }}>
          <div className='d-flex  linkhover mt-2 align-items-center   justify-content-between'>
            <h6 style={{ letterSpacing: "2px" }}>Customers</h6>
            <i class="fa-solid fa-address-book  ms-5"></i>
          </div>
        </Link>
        <Link to={"/myproperty"} style={{ color: "black", textDecoration: "none" }}>
          <div className='d-flex align-items-center  linkhover mt-2 justify-content-between'>
            <h6 style={{ letterSpacing: "2px" }}>My Properties</h6>
            <i class="fa-solid fa-bed  ms-5"></i>
          </div>

        </Link>

        <button onClick={handleLogout} style={{ letterSpacing: "2px" }} className='btn linkhover d-flex mt-2 justify-content-between align-items-center  '> <h6>Logout</h6>
          <i class="fa-solid fa-power-off   ms-5"></i></button>


      </div>
      <ToastContainer position='top-center' theme='colored' autoClose={2000} />

    </div>
  )
}

export default Adminsidebar