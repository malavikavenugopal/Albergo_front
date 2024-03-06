import { BASE_URL } from "./baseurl"
import { commonAPI } from "./commonAPI.js"


//register  api
export const registerAPI = async (user)=>{
   return await commonAPI ('POST',`${BASE_URL}/user/register`,user,"")
}


//login api
export const loginAPI = async (user)=>{
   return await commonAPI ('POST',`${BASE_URL}/user/login`,user,"")
}


//get rooms api
export const allRoomsAPI = async (searchKey)=>{
   return await commonAPI ('GET',`${BASE_URL}/rooms?search=${searchKey}`)
}


//register partner api
export const registerPartnerAPI = async (partner)=>{
   return await commonAPI ('POST',`${BASE_URL}/partner/register`,partner,"")
}

//login partner api
export const loginPartnerAPI = async (partner)=>{
   return await commonAPI ('POST',`${BASE_URL}/partner/login`,partner,"")
}


//room add api
export const addRoomAPI = async (reqBody,reqHeader)=>{
   return await commonAPI ('POST',`${BASE_URL}/rooms/add`,reqBody,reqHeader)
}


//get rooms api
export const allPartnerRoomsAPI = async (reqHeader)=>{
   return await commonAPI ('GET',`${BASE_URL}/partner_rooms`,"",reqHeader)
}



//post checkout api
export const addCheckoutAPI = async (reqBody,reqHeader)=>{
   return await commonAPI ('POST',`${BASE_URL}/checkout`,reqBody,reqHeader)
}



//get all order api
export const allOrderAPI = async (reqHeader)=>{
   return await commonAPI ('GET',`${BASE_URL}/reserve/user`,"",reqHeader)
}


//get partner rooms api
export const allPartnerOrderAPI = async (reqHeader)=>{
   return await commonAPI ('GET',`${BASE_URL}/reserve`,"",reqHeader)
}

//edit booking status api
export const editBookingStatus = async (id,reqBody,reqHeader)=>{
   return await commonAPI ('PUT',`${BASE_URL}/update/${id}`,reqBody,reqHeader)
}

//delete Rooms api
export const deleteRoom = async (id,reqHeader)=>{
   return await commonAPI ('DELETE',`${BASE_URL}/room/remove/${id}`,{},reqHeader)
}


//edit rooms by partner api
export const editRooms = async (id,reqBody,reqHeader)=>{
   return await commonAPI ('PUT',`${BASE_URL}/updateroom/${id}`,reqBody,reqHeader)
}
//edit partner profile
export const editPartnerProfile = async (reqBody,reqHeader)=>{
   return await commonAPI ('PUT',`${BASE_URL}/partner/edit`,reqBody,reqHeader)
}

//get category

export const getCategory = async(searchKey) =>{

   //query parameter =path?key=value
   return await commonAPI ('GET',`${BASE_URL}/category?search=${searchKey}`,"")
}