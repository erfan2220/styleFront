
import axios from 'axios';


// const API_ADDRESS="http://localhost:5000"


const API_URL=`${process.env.NEXT_PUBLIC_API_ADDRESS}/api/products`;



export const getProducts = async ()=>
{
    const  response=await axios.get(API_URL)
    return response.data;
}

export const getProductById = async (id:string)=>
{
    const response=await axios.get(`${API_URL}/${id}`);
    return response.data;
}