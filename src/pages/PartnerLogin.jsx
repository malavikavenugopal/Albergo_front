import React from 'react'
import { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { loginPartnerAPI } from '../services/allAPI';




function PartnerLogin() {
  const [partner, setPartner] = useState({
    email: "",
    password: ""
  })
  const navigate = useNavigate()
  const handleLogin = async (e) => {
    //to avoid reload (otherwise data will be loses before saved)
    e.preventDefault()
    const { email, password } = partner
    if (!email || !password) {
      toast.info("Please Fill Form Completely")
    }
    else {

      const result = await loginPartnerAPI(partner)
      console.log(result);


      if (result.status === 200) {
        toast.success('Login Successfull')
        navigate('/admin')

        sessionStorage.setItem('existingPartner', JSON.stringify(result.data.existingPartner))
        sessionStorage.setItem('token2', result.data.token2)

        setPartner({

          email: "",
          password: ""
        })

        setTimeout(() => {

        }, 2000)


      }
      else {
        toast.error(`${result.response.data}`)

      }



    }
  }
  return (
    <div >
      {/* Sign up and start welcoming guests today! */}
      <div style={{ minHeight: "50px" }}>

      </div>
      {
        !JSON.parse(sessionStorage.getItem("existingPartner")) ?
          <div>
            <div className="row w-100 d-flex  align-items-center" style={{ minHeight: "600px" }}>
              <div className="col-lg-1"></div>
              <div className="col-lg-4 ms-2">

                <h4 style={{ fontFamily: "Libre Baskerville", fontWeight: "900" }}>Sign in to manage your property</h4>



                <label htmlFor='email' >Email</label>
                <input id='email' className='form-control' value={partner.email} onChange={(e) => setPartner({ ...partner, email: e.target.value })} />
                <label htmlFor='pass' className='mt-3'>Password</label>
                <input id='pass' className='form-control' value={partner.password} onChange={(e) => setPartner({ ...partner, password: e.target.value })} />

                <buttton style={{ letterSpacing: "2px", fontSize: "14px" }} onClick={handleLogin} className='btn btn-dark mt-3'>Login</buttton>

                <br></br>

                <hr></hr>
                <p style={{ fontSize: "12px" }}>Do you have questions about your property or the extranet? Visit Partner Help or ask another question on the Partner Community.</p>
                <Link to={'/account'}><button style={{ letterSpacing: "2px", fontSize: "14px" }} className='btn btn-success w-100'> Create your partner account</button> </Link>
              </div>
<div className="col-lg-2"></div>
              <div class='col-lg-4 hide '>
                <div className='d-flex'>
                  <img height={280} width={250} src='https://albergo.qodeinteractive.com/wp-content/uploads/2017/11/cuty-home-slider-13.jpg' />
                  <img style={{marginTop:"100px",marginLeft:"-80px"}} height={350} width={300} src='https://albergo.qodeinteractive.com/wp-content/uploads/2017/11/cuty-home-slider-12.jpg' />
                  <img style={{marginTop:"280px",marginLeft:"-600px"}} height={260} width={370} src='https://albergo.qodeinteractive.com/wp-content/uploads/2017/11/cuty-home-slider-14.jpg' />



                </div>
              </div>
            </div>
            <ToastContainer position='top-center' theme='colored' autoClose={2000} />

          </div> : null
      }
    </div>

  )
}

export default PartnerLogin










