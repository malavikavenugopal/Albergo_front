import React, { useState }  from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import {  useNavigate } from 'react-router-dom'
import { loginAPI, registerAPI } from '../services/allAPI.js'

function Auth({register}) {
    const regform = register ? true : false

      //to hold the value from input box
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: ""
  })

  const navigate = useNavigate()


  console.log(userData);

  const handleRegister = async (e) => {
    e.preventDefault()

    const { username, email, password } = userData
    if (!username || !email || !password) {
      toast.info("Please Fill Form Completely")
    }
    else {
      const result = await registerAPI(userData)
      console.log(result);
      if (result.status === 200) {
        toast.success(`${username} is successfully registered`)
        setUserData({
          username: "",
          email: "",
          password: ""
        })
        //navigate to login page
        navigate('/login')
      }
      else {
        toast.error(`${result.response.data}`)
      }

    }



  }

  
  const handleLogin = async (e) => {

    //to avoid reload (otherwise data will be loses before saved)
    e.preventDefault()

    const { email, password } = userData
    if (!email || !password) {
      toast.info("Please Fill Form Completely")
    }
    else {
      const result = await loginAPI(userData)
      console.log(result);


      if (result.status === 200) {
        toast.success('Login Successfull')

        sessionStorage.setItem('existingUser', JSON.stringify(result.data.existingUser))
        sessionStorage.setItem('token', result.data.token)

        setUserData({
          username: "",
          email: "",
          password: ""
        })

        setTimeout(()=>{
          navigate('/')
        },2000)
     

      }
      else {
        toast.error(`${result.response.data}`)

      }
    }


  }
  return (
    <div>
        <section class="vh-100">
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-4 text-black">


        <div class="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-4 pt-5 pt-xl-0 mt-xl-n5">

          <form class=" mt-5" style={{width: "23rem"}}>
      {
        regform?
        <h3 class="fw-normal mt-5" style={{letterSpacing:"2px"}}>Sign up</h3>:
        <h3 class="fw-normal mt-5" style={{letterSpacing:"2px"}}>Log in</h3>
      }
            


{
    regform &&
    <div class="form-outline ">
            <label class="form-label" for="form2Example18">User name</label>
              <input type="email" id="form2Example18" class="form-control form-control-lg" value={userData.username} onChange={(e) => setUserData({ ...userData, username: e.target.value })}  />
              
            </div>

}

            <div class="form-outline mb-2">
            <label class="form-label mt-2" for="form2Example18">Email address</label>
              <input type="email" id="form2Example18" class="form-control form-control-lg" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
              
            </div>

            <div class="form-outline mb-4">
            <label class="form-label" for="form2Example28">Password</label>
              <input type="password" id="form2Example28" class="form-control form-control-lg"  value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })}/>
           
            </div>

            <div class="pt-1 mb-4">
            
              {
                regform ?
                <button class="btn btn-dark btn-lg btn-block" type="button"  onClick={handleRegister}>Register</button>:
                <button class="btn btn-dark btn-lg btn-block" type="button"  onClick={handleLogin}>Login</button>
              }
              
            </div>
{
    !regform &&
    <p class="small mb-5 pb-lg-2"><a class="text-muted" href="#!">Forgot password?</a></p>
}
           {
            regform?
            <p>Have an account? <a href="/login" class="link-dark">Login here</a></p>:
            <p>Don't have an account? <a href="/register" class="link-dark">Register here</a></p>
           }
           

          </form>

        </div>

      </div>
      <div class="col-lg-8 px-0  ">
        {
            regform?
            <img src="https://albergo.qodeinteractive.com/wp-content/uploads/2017/11/elegant-h-s-9-1100x960.jpg"
            alt="Login image" class="w-100 vh-100" style={{objectFit: "cover", objectPosition: "left"}}/>:
            <img src="https://albergo.qodeinteractive.com/wp-content/uploads/2017/11/elegant-h-s-5-1100x960.jpg"
            alt="Login image" class="w-100 vh-100" style={{objectFit: "cover", objectPosition: "left"}}/>
            
        }      
      </div>
    </div>
  </div>
</section>


<ToastContainer position='top-center' theme='colored' autoClose={2000} />

    </div>
  )
}

export default Auth