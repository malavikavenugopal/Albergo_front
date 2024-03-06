import React, { useContext, useEffect, useState } from 'react'
import { allPartnerOrderAPI } from '../services/allAPI'
import Table from 'react-bootstrap/Table';
import EditBooking from './EditBooking';
import { editBookingResponseContext } from '../Context/ContextShare';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'

import Adminsidebar from './Adminsidebar';



function CustomersDetails({ partner }) {

    const { editBookingResponse, setEditBookingResponse } = useContext(editBookingResponseContext)


    const [order, setOrder] = useState([])
    const getAllPartnerOrder = async () => {



        if (sessionStorage.getItem("token2")) {

            const token2 = sessionStorage.getItem("token2")
            console.log(token2);

            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token2}`
            }

            const result = await allPartnerOrderAPI(reqHeader)
            setOrder(result.data)
        }
    }
    console.log(order);


    useEffect(() => {
        getAllPartnerOrder()
    }, [editBookingResponse])


    const generatePDF = () => {
        var doc = new jsPDF("p", "pt");
        doc.text(20, 20, "My Properties");
        doc.addFont("helvetica", "normal");
        autoTable(doc, { html: '#my-table' })
    
        // Or use javascript directly:
        autoTable(doc, {
          head: [['ID', 'Email ID','Phone Number','Hotel','From','To','Amount']],
          body: order.map(row => [row._id, row.email,row.phone,row.roomdetails.name,row.checkin,row.checkoutdate,row.price_for_oneroom
            * row.No_Rooms]),
        })
        doc.save("properties.pdf");
      }



    return (
        <div>
            <div className="row w-100  " style={{ minHeight: "100vh" }}>
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
            <button style={{ letterSpacing: "2px" }} class='btn btn-dark' onClick={generatePDF} type="primary">
              Download PDF
            </button>
          </div>
                    {
                        order.length > 0 &&
                        <div className='container mt-5 px-5 py-5' >

                            <h3 style={{ fontFamily: "Libre Baskerville", fontWeight: "900" }} >Customers</h3>

                            <Table className='mt-3 table ' striped bordered hover  >
                                <thead >
                                    <tr style={{ backgroindColor: "black" }}>
                                        <th>Booking ID</th>
                                        <th>Email ID</th>
                                        <th>Phone Number</th>
                                        <th>
                                            Hotel
                                        </th>
                                        <th>
                                            From
                                        </th>
                                        <th>
                                            To
                                        </th>
                                        <th>
                                            Price
                                        </th>
                                        <th>
                                            Status

                                        </th>
                                        <th>
                                            View
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order?.length > 0 ?
                                        order.map((items) => (
                                            <>
                                                <tr>
                                                    <td>{items._id}</td>
                                                    <td>{items.email}</td>
                                                    <td>{items.phone}</td>
                                                    <td>{items.roomdetails.name}</td>
                                                    <td>{items.checkin}</td>
                                                    <td>{items.checkoutdate}</td>
                                                    <td>Rs. {items.price_for_oneroom
                                                        * items.No_Rooms}</td>
                                                    <td>
                                                        {
                                                            items.status == "CANCELLED" && <button style={{ letterSpacing: "2px", fontWeight: "600" }} className='btn btn-sm btn-danger'>{items.status}</button>
                                                        }
                                                        {
                                                            items.status == "ACTIVE" && <button style={{ letterSpacing: "2px", fontWeight: "600" }} className='btn btn-sm btn-success'>{items.status}</button>
                                                        }
                                                        {
                                                            items.status == "PENDING" && <button style={{ letterSpacing: "2px", fontWeight: "600" }} className='btn btn-sm btn-warning'>{items.status}</button>
                                                        }
                                                        {
                                                            items.status == "PASSIVE" && <button style={{ letterSpacing: "2px", fontWeight: "600" }} className='btn btn-sm btn-primary'>{items.status}</button>
                                                        }
                                                    </td>
                                                    <td>         <EditBooking items={items} /></td>
                                                </tr>


                                            </>
                                        )) : <p className='d-flex jutify-content-center align-items-center text-danger'>Sorry, No Booking still yet!</p>
                                    }
                                </tbody>
                            </Table>

                        </div>

                    }
                </div>
            </div>
        </div>
    )
}


export default CustomersDetails