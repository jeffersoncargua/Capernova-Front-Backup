//import { useEffect } from "react"

import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
//import { baseURL } from "../endpoints";

export const ConfirmationEmail = ({children}) => {


    const [response,setResponse] = useState({});
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    token.replace(' ','+');
    const email =searchParams.get('email');

    const navigate = useNavigate();


    useEffect(()=>{  
      
      
      const FetchConfirm = async() =>{
        try {
          const resultFromApi = await fetch(`${process.env.REACT_APP_API_URL}/Authentication/ConfirmEmail?token=${token}&email=${email}`,{
                method:'GET',
                headers:{
                  "Content-Type" : "application/json",
                  "Accept" : "application/json",
                },
          });

          const resultFetch = await resultFromApi.json();

          if (resultFromApi.status !== 200) {
            throw resultFetch;
          }

          setResponse(resultFetch);

          } catch (error) {
            console.log(error);
            navigate('/error');
          }
        
      }
      FetchConfirm();
          
       
    },[token,email,navigate]);

  return (
    <div className="w-[95%] mx-auto mt-10 group text-black dark:text-white">
        <h1 className="text-xl text-green-500 dark:text-green-400 mb-4">{response.message}!!!!!</h1>
        {response.isSuccess && <p className="text-sm">Navega por nuestro sitio web y conoce acerca más sobre nosotros y de nuestros cursos y productos</p>}
        {children}
    </div>
  )
}

