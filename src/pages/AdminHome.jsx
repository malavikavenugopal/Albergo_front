import React, { useEffect, useState } from 'react'

import { allPartnerOrderAPI, allPartnerRoomsAPI, deleteRoom } from '../services/allAPI'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Adminsidebar from './Adminsidebar';
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";

function AdminHome({ partner }) {


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
  }, [])



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
  const today = new Date
  let timeStamp = new Intl.DateTimeFormat('en-US', {

    year: 'numeric',
    month: '2-digit',
    day: '2-digit',

  }).format(today)
  console.log(timeStamp); //01/16/2024
  //checkin date= 2024-01-12  

  const todayorder = order?.filter((items) =>
    items.checkin.slice(8, 10) === timeStamp.slice(3, 5) && items.checkin.slice(5, 7) === timeStamp.slice(0, 2) && items.checkin.slice(0, 4) === timeStamp.slice(6, 10)
  )

  console.log(todayorder);


  const roomname = order.map((items) => (
    items.roomdetails.name
  ))
  console.log(roomname);


  const data = [
    { name: "Customers", users: order.length },

    { name: "My Properties", users: rooms.length }
  ];
  const options = {
    title: {
      text: 'Albergo'
    },
    series: [{
      data: [2, 1, 3]
    }]
  }

  const options2 = {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Albergo vs Airbnb estimated production for 2020',
        align: 'center'
    },
    subtitle: {
        text:
            'Source: <a target="_blank" ' +
            'href="https://www.indexmundi.com/agriculture/?commodity=corn">indexmundi</a>',
        align: 'left'
    },
    xAxis: {
        categories: ['Ernakulam', 'Mumbai', 'Bengaluru', 'Goa', 'Jaipur', 'New Delhi'],
        crosshair: true,
        accessibility: {
            description: 'Countries'
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: '1000 metric tons (MT)'
        }
    },
    tooltip: {
        valueSuffix: ' (1000 MT)'
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [
        {
            name: 'Airbnb',
            data: [406292, 260000, 107000, 68300, 27500, 14500]
        },
        {
            name: 'Albergo',
            data: [51086, 136000, 5500, 141000, 107180, 77000]
        }
    ]
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
          <div className=' mt-3 d-flex justify-content-left align-items-center'>

            <i class="fa-solid homeadmin fa-house "></i>

            <h6 className='ms-2'>Dashboard</h6>

          </div>
          <div className="row " >

            <div className="col-lg-4 ">
              <div className='order d-flex justify-content-between align-items-center px-5'>

                <div className=' text-light'>
                  <h5>Today Orders</h5>
                  <h3>  {todayorder.length}</h3>
                </div>
                <i class="fa-solid fa-hotel fa-2x text-light"></i>
              </div>
            </div>
            <div className="col-lg-4 ">
              <div className='property d-flex justify-content-between align-items-center px-5'>

                <div className=' text-light'>
                  <h5>Customers</h5>
                  <h3>  {order.length}</h3>
                </div>

                <i class="fa-solid fa-users fa-2x text-light"></i>
              </div>
            </div>
            <div className="col-lg-4">
              <div className='today d-flex justify-content-between align-items-center px-5'>

                <div className=' text-light'>
                  <h5>Properties</h5>
                  <h3>  {rooms.length}</h3>
                </div>

                <i class="fa-solid fa-bed  fa-2x text-light"></i>

              </div>
            </div>
           



          </div>
          <div className="row mb-2">
              <div className="col-lg-4">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={options}
                />
               
              </div>
              <div className="col-lg-4">
                  <PieChart width={400} height={300}>
                    <Pie
                      dataKey="users"
                      isAnimationActive={false}
                      data={data}
                      cx={200}
                      cy={200}
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    />
                    <Tooltip />
                  </PieChart>
                </div>
                <div className="col-lg-4">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={options2}
                />
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default AdminHome