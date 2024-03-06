import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'
//to create contextapi we use the method - createContext()


export const editBookingResponseContext = createContext()
export const bookingDetails = createContext()

function ContextShare({children}) {

 
    
    const [editBookingResponse,setEditBookingResponse] = useState({})
    const [bookDetails,setBookDetails] = useState({})


  return (
    //children is a predefined props used to share data between all components

    <>
    

    <editBookingResponseContext.Provider value={{editBookingResponse,setEditBookingResponse}}>
      <bookingDetails.Provider value={{bookDetails,setBookDetails}} >

  
      {children}
      </bookingDetails.Provider>
    
   </editBookingResponseContext.Provider>
   


    </>
  )
}

export default ContextShare