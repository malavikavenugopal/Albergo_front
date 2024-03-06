import React from 'react'
import { useState } from 'react'
import { registerPartnerAPI } from '../services/allAPI'
import { useNavigate } from 'react-router-dom'

function PartnerAccount() {
    const [partner, setPartner] = useState({
        email: "",
        fname: "",
        lname: "",
        phone: "",
        password: "",
        confirmpassword: ''
    })

    const [valid, setValid] = useState('')
    const [validCheck, setValidCheck] = useState('')
    const [email, setEmail] = useState(false)
    const [name, setName] = useState(false)
    const navigate = useNavigate()
    const handleEmail = () => {
        if (partner.email) {
            setEmail(true)
            setName(false)
        }

    }
    const handleName = () => {
        if (partner.fname && partner.lname && partner.phone) {
            setName(true)
            setEmail(false)
        }

    }
    const handleAccount = async (e) => {
        e.preventDefault();


        if (partner.password !== partner.confirmpassword) {

            if (partner.password.length < 6) {
                setValid("Your password must be at least 6 characters")
            }

            setValidCheck("The passwords you entered did not match, please try again")
        }
        else {



            console.log(partner);

            const result = await registerPartnerAPI(partner)
            console.log(result);

            if (result.status === 200) {
                alert(`${partner.fname} is successfully registered`)
                setPartner({
                    email: "",
                    fname: "",
                    lname: "",
                    phone: "",
                    password: "",
                    confirmpassword: ''
                })
                //navigate to home page
                navigate('/partnerlogin')
            }
            else {
                alert(`${result.response.data}`)
                navigate('/partnerlogin')
            }

        }
    }

    return (
        <div>

            <div className="d-flex justify-content-center align-items-center flex-column" style={{ minHeight: "600px" }}>
                <div className="row w-100">
                    <div className="col-lg-4"></div>
                    <div className="col-lg-4">
                        {/*      email */}


                        {

                            !email && !name &&
                            <div>
                                <h5  style={{fontFamily:"Libre Baskerville",fontWeight:"900"}}>Create your partner account</h5>
                                <p>Create an account to list and manage your property.</p>

                                <label htmlFor='email' >Email address</label>
                                <input value={partner.email} onChange={(e) => setPartner({ ...partner, email: e.target.value })} className='form-control' id='email' />

                                <button  style={{letterSpacing:"2px",fontSize:"14px"}} onClick={handleEmail} className='btn mt-3 btn-dark'>Continue</button>
                            </div>}


                        {/*  name & phone */}

                        {email &&
                            <div>
                                <h5  style={{fontFamily:"Libre Baskerville",fontWeight:"900"}}>Contact details</h5>
                                <p>Your full name and phone number are needed to ensure the security of your albergo.com account.</p>

                                <label htmlFor='name' >First name</label>
                                <input value={partner.fname} onChange={(e) => setPartner({ ...partner, fname: e.target.value })} className='form-control' id='name' />

                                <label htmlFor='name' >Last name</label>
                                <input value={partner.lname} onChange={(e) => setPartner({ ...partner, lname: e.target.value })} className='form-control' id='name' />


                                <label className='mt-3' htmlFor='number' >Phone Number</label>
                                <input type='number' value={partner.number} onChange={(e) => setPartner({ ...partner, phone: e.target.value })} className='form-control' id='number' />
                                <button  style={{letterSpacing:"2px",fontSize:"14px"}} onClick={handleName} className='btn mt-3 btn-dark'>Next</button>
                            </div>
                        }

                        {
                            name &&


                            <div>
                                <h5  style={{fontFamily:"Libre Baskerville",fontWeight:"900"}}>Create password</h5>
                                <p>Use a minimum of 6 characters, including uppercase letters, lowercase letters and numbers.</p>
                                <label htmlFor='name' >Password</label>
                                <input type='password' value={partner.password} onChange={(e) => setPartner({ ...partner, password: e.target.value })} className='form-control' id='name' />
                                <p style={{ color: "red", fontSize: "12px" }}>{valid}</p>

                                <label className='mt-3' htmlFor='number' >Confirm password</label>
                                <input type='password' value={partner.confirmpassword} onChange={(e) => setPartner({ ...partner, confirmpassword: e.target.value })} className='form-control' id='number' />


                                <p style={{ color: "red", fontSize: "12px" }}>{validCheck}</p>

                                <button  style={{letterSpacing:"2px",fontSize:"14px"}}onClick={handleAccount} className='btn mt-3 btn-dark'>Create Account</button>
                            </div>



                        }
                    </div>
                </div>




            </div>
        </div>
    )
}

export default PartnerAccount