import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCategory } from '../services/allAPI';
import Carousel from 'react-bootstrap/Carousel';

function Category() {
    const {cat} = useParams()
    console.log(cat);

    const [rooms,setRooms] = useState([])
 
    const getRoomsbyCategory = async ()=>{

        const result = await getCategory(cat)
        console.log(result);
        setRooms(result.data)
    }
    console.log(rooms);

    useEffect(()=>{
getRoomsbyCategory()
    },[])
  return (
    <div>

    <div style={{height:"50px"}}>

    </div>
    <div style={{position:"relative"}}>

        {
            cat == "Amazing Pools" &&
            <img height={600} className='w-100' src="https://img.freepik.com/free-psd/sea-viewluxury-modern-beach-house-generative-ai_587448-2052.jpg?w=1380&t=st=1706115939~exp=1706116539~hmac=8727b91aec12d4ea1aaf92b3ade2a91b4d6f8b5caceb541cf24a9ed55f07743a" alt="" />
        }

        {
            cat == "Beach Front" &&
            
            <img height={600} className='w-100' src="https://img.freepik.com/free-photo/white-chairs-table-beach_1339-4294.jpg?w=1060&t=st=1706116458~exp=1706117058~hmac=e6eed3828f1ee46b6f9db896b79d3d1357b5ed931a9ebca0530c81d0f5d0f12d" alt="" />

        }
        {
            cat == "Cabin" &&
            
            <img height={600} className='w-100' src="https://img.freepik.com/free-photo/luxury-chill-bedroom-hotel_1150-10902.jpg?w=996&t=st=1706116628~exp=1706117228~hmac=3acd9697ca4e4ce066f34bf90d0994f67ff15743956f8cee86aabaf6d9515e74" alt="" />

        }
         {
            cat == "Islands" &&
            
            <img height={600} className='w-100' src="https://img.freepik.com/free-photo/sand-coconut-sunrise-hotel-swimming_1253-649.jpg?w=996&t=st=1706116733~exp=1706117333~hmac=baef55c1c11886d17dd7f99ea2ece29e7870add88153a91eb6a60bc5618a6904" alt="" />

        }
         {
            cat == "Deserts" &&
            
            <img height={600} className='w-100' src="https://img.freepik.com/free-photo/landscape-collage-design_23-2150335570.jpg?w=996&t=st=1706116815~exp=1706117415~hmac=0bbe11eafedb9dbb6876aff004703585de212304d85874fd777e06ad9b2c2f4f" alt="" />

        }
          {
            cat == "Arctic" &&
            
            <img height={600} className='w-100' src="https://img.freepik.com/free-photo/couple-high-fiving-snow-covered-field_107420-96498.jpg?w=996&t=st=1706117000~exp=1706117600~hmac=9f78743dadc390b2f18d1a8c9d1843ec8e7c5f4ef905373eb9820a44d1a13b50" alt="" />

        }
        {
            cat == "Tree Houses" &&
            
            <img height={600} className='w-100' src="https://img.freepik.com/free-photo/aerial-view-small-cabin-hidden-dense-forest-greenery_157027-4255.jpg?w=1060&t=st=1706117235~exp=1706117835~hmac=25707b2255a21272b68fd39e5bc14bd024d3125f90c9f184409a14b0f9f5f3bb" alt="" />

        }
         {
            cat == "Tropical" &&
            
            <img height={600} className='w-100' src="https://img.freepik.com/free-photo/spa-salon-with-beach-view_53876-31335.jpg?w=996&t=st=1706117368~exp=1706117968~hmac=211fba31c3184ad8b66f15d3cc439521b8dda8efee9aa5a32bec54262a8da6c3" alt="" />

        }
        <div style={{position:"absolute",marginTop:"-100px"}} className='d-flex w-100 justify-content-center align-items-center'>
<h1  style={{fontFamily:"Libre Baskerville",fontWeight:"bold"}}className='text-light'>{cat}</h1>
        </div>
    </div>

    <div className='row mt-4 container m-2' style={{minHeight:"700px"}}>
{
  rooms?.map((items)=>(
    <div className="col-lg-4 mt-1">


<Carousel>
      <Carousel.Item>
        
<img className='w-100' height={300} src={items.img1}/>
      </Carousel.Item>
      <Carousel.Item>
     
<img className='w-100' height={300} src={items.img2}/>
      </Carousel.Item>
      <Carousel.Item>
       
<img className='w-100' height={300} src={items.img3}/>
      </Carousel.Item>
    </Carousel>
<Link to={`/rooms/${items._id}`} style={{textDecoration:'none',color:"black"}}>
<h6 className='py-2'style={{fontFamily: "Libre Baskerville" }}>{items.name}</h6>
<h6 className=''style={{fontFamily: "Libre Baskerville",fontSize:'13px' }}>Rs. {items.price1} night</h6>
</Link>

  </div>


  ))
}
            </div>
    </div>
  )
}

export default Category