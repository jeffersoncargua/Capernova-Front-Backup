//import { useEffect } from "react"

import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
//import { baseURL } from "../endpoints";

export const ConfirmationEmail = () => {


    const [response,setResponse] = useState({});
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    token.replace(' ','+');
    const email =searchParams.get('email');


    useEffect(()=>{  
      
      try {
        const fetchConfirm = async() =>{
          let resultFetch = await fetch(`https://localhost:7164/api/Authentication/ConfirmEmail?token=${token}&email=${email}`,{
                method:'GET',
                headers:{
                  "Content-Type" : "application/json",
                  "Accept" : "application/json",
                },
          });

          let result= await resultFetch.json();
          setResponse(result);
          console.log(result);
        }
        fetchConfirm();
          
        } catch (error) {
          console.log(error);
        }
    },[token,email]);

  return (
    <div>
        <h1>{response.message}</h1>
        {response.isSuccess && <p>navega por nuestro sitio web y conoce acerca de nosotros asi como de nuestros productos</p>}
        
    </div>
  )
}
