//import { useCallback, useEffect, useState } from "react";
import {useEffect } from "react";
import { Link, useSearchParams,  } from "react-router-dom";
import { clearToCart } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";

// Import AOS para el fade
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..

export const ConfirmPay = () => {

  const [searchParams] = useSearchParams();
  // const { token } = useParams();
  const token = searchParams.get('token');

  const dispath = useDispatch();

  useEffect(()=>{
    AOS.init({
      offset: 120, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 2000, // values from 0 to 3000, with step 50ms
      easing: 'ease', // default easing for AOS animations
      once: false, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
      anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
    });
  },[])
  //const status = searchParams.get('status');
  // const [showLoader,setShowLoader] = useState(true);
  // const [response,setResponse] = useState({});

  //console.log(token);
  //console.log(status);


  // const fetchConfirm = useCallback( async () => {
  //   setShowLoader(true);

    


  //   try{
  //     if(token !==null){
  //       let resultFetch = await fetch(`https://localhost:7164/api/Payment/confirmPaypal?token=${token}`,{
  //         method: 'GET',
  //         credentials:"include",
  //         headers:{
  //             "Content-Type" : "application/json" ,
  //             "Accept" : "application/json",
  //         },
  //       });
  //       if (resultFetch.ok) {
  //         let result = await resultFetch.json();
  //         console.log(result);
  //         setResponse(result);
  //       }
  //       setShowLoader(false);
  //     }
  //     if(status !==null){
  //       let resultFetch = await fetch(`https://localhost:7164/api/Payment/orderConfirm?status=${status}`,{
  //         method: 'GET',
  //         credentials:"include",
  //         headers:{
  //             "Content-Type" : "application/json" ,
  //             "Accept" : "application/json",
  //         },
  //       });
  //       if (resultFetch.ok) {
  //         let result = await resultFetch.json();
  //         console.log(result);
  //         setResponse(result);
  //       }
  //       setShowLoader(false);
  //     }
  //   }catch(error){
  //     console.error(error);
  //     setShowLoader(false);
  //   }
  // },[token,status])

  

  useEffect(() => {
    dispath(clearToCart());
  },[dispath])

  return (
    <div className="w-[95%] mx-auto ">  
      
      {/* {showLoader && 
      <div className="mx-auto flex justify-center z-50 fixed top-0 left-0 right-0 md:inset-0 h-[calc(100%-1rem)] max-h-full" tabIndex='-1'>
        <div aria-label="Loading..." role="status" className="flex items-center space-x-2 my-[30%]">
          <svg className="h-20 w-20 animate-spin stroke-orange-500" viewBox="0 0 256 256">
              <line x1="128" y1="32" x2="128" y2="64" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
              <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" strokeLinecap="round" strokeLinejoin="round"
                  strokeWidth="24"></line>
              <line x1="224" y1="128" x2="192" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24">
              </line>
              <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" strokeLinecap="round" strokeLinejoin="round"
                  strokeWidth="24"></line>
              <line x1="128" y1="224" x2="128" y2="192" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24">
              </line>
              <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" strokeLinecap="round" strokeLinejoin="round"
                  strokeWidth="24"></line>
              <line x1="32" y1="128" x2="64" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
              <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24">
              </line>
          </svg>
          <span className="text-4xl font-medium text-gray-500">Loading...</span>
        </div>
      </div>
      } */}

      {/* <div className={`${showLoader===false? '':'hidden'}`}> */}
      <div data-aos="fade-up">
      {/* {response.isSuccess ?  */}
      {(token !== null && token !== '')? 
      ( /*Respuesta exitosa */
        <div className="flex flex-col gap-y-4 my-8">
          <h1 className="font-medium text-lg sm:text-2xl text-green-500 text-center">¡Gracias por tu compra!</h1>
          {/* <h3 className="font-medium text-sm sm:text-lg text-green-500 text-center">ID transacción : {response.result || ''}</h3> */}
          <h3 className="font-medium text-sm sm:text-lg text-green-500 text-center">ID transacción : {token || ''}</h3>
          <div className="mx-auto w-full flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-cart-check sm:w-96 sm:h-96 w-full text-green-500" viewBox="0 0 16 16">
              <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z"/>
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
            </svg>
          </div>
      
      
          {/* <div className="mx-auto flex justify-center items-center flex-wrap">
            <p className="text-sm md:text-lg me-2 text-green-700 ">Para ingresar a tus cursos presiona este botón</p>
            <Link to='/student' className="inline-flex text-xs sm:text-sm bg-green-500 hover:bg-green-700 px-2.5 py-2 rounded-lg text-white hover:cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-journal-check h-5 w-5 me-2" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M10.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
                <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2"/>
                <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z"/>
              </svg>
            Mis Cursos
            </Link>
          </div> */}
      
          <div className="mx-auto flex items-center">
            <Link to='/' className="inline-flex text-xs sm:text-sm bg-green-500 hover:bg-green-700 px-2.5 py-2 rounded-lg text-white hover:cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-house-fill h-5 w-5 me-2" viewBox="0 0 16 16">
                <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z"/>
                <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z"/>
              </svg>
            Volver a la página principal
            </Link>
          </div>
        </div>)
      :
      ( /*Respuesta fallida */
        <div className="flex flex-col gap-y-4 my-8">
          <h1 className="font-medium text-lg sm:text-2xl text-red-500 text-center">¡Lo sentimos, no se pudo completar tu transacción!</h1>
          <h3 className="font-medium text-sm sm:text-lg text-red-500 text-center">La solicitud de pago no se ha generado. Por favor revise sus movimientos bancarios.</h3>
          <h3 className="font-medium text-sm sm:text-lg text-red-500 text-center">Si el error persiste comuniquese con nuestros operadores a través de whatsapp</h3>
          
          
          <div className="mx-auto w-full flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-cart-x sm:w-96 sm:h-96 w-full text-red-500" viewBox="0 0 16 16">
              <path d="M7.354 5.646a.5.5 0 1 0-.708.708L7.793 7.5 6.646 8.646a.5.5 0 1 0 .708.708L8.5 8.207l1.146 1.147a.5.5 0 0 0 .708-.708L9.207 7.5l1.147-1.146a.5.5 0 0 0-.708-.708L8.5 6.793z"/>
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
            </svg>
          </div>
          
          <div className="mx-auto flex items-center justify-center">
            <Link to='/' className="inline-flex text-xs sm:text-sm bg-red-500 hover:bg-red-700 px-2.5 py-2 rounded-lg text-white hover:cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-house-fill h-5 w-5 me-2" viewBox="0 0 16 16">
                <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z"/>
                <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z"/>
              </svg>
            Volver a la página principal
            </Link>
          </div>
        </div>)}
      </div>
      
    </div>
  )
}

/*
*/