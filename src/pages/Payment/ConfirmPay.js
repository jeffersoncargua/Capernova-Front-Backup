import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { clearToCart } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";

// Import AOS para el fade
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..

export const ConfirmPay = () => {
	const [searchParams] = useSearchParams();
	const token = searchParams.get("token");

	const dispath = useDispatch();

	useEffect(() => {
		AOS.init({
			offset: 120, // offset (in px) from the original trigger point
			delay: 0, // values from 0 to 3000, with step 50ms
			duration: 2000, // values from 0 to 3000, with step 50ms
			easing: "ease", // default easing for AOS animations
			once: false, // whether animation should happen only once - while scrolling down
			mirror: false, // whether elements should animate out while scrolling past them
			anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
		});
	}, []);
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
	}, [dispath]);

	return (
		<div className="w-[95%] mx-auto ">
			{/* <div className={`${showLoader===false? '':'hidden'}`}> */}
			<div data-aos="fade-up">
				{/* {response.isSuccess ?  */}
				{token !== null && token !== "" ? (
					/*Respuesta exitosa */
					<div className="flex flex-col gap-y-4 my-8">
						<h1 className="font-medium text-lg sm:text-2xl text-green-500 text-center">
							¡Gracias por tu compra!
						</h1>
						{/* <h3 className="font-medium text-sm sm:text-lg text-green-500 text-center">ID transacción : {response.result || ''}</h3> */}
						<h3 className="font-medium text-sm sm:text-lg text-green-500 text-center">
							ID transacción : {token || ""}
						</h3>
						<div className="mx-auto w-full flex justify-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								className="bi bi-cart-check sm:w-96 sm:h-96 w-full text-green-500"
								viewBox="0 0 16 16"
							>
								<path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z" />
								<path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
							</svg>
						</div>

						<div className="mx-auto flex items-center">
							<Link
								to="/"
								className="inline-flex text-xs sm:text-sm bg-green-500 hover:bg-green-700 px-2.5 py-2 rounded-lg text-white hover:cursor-pointer"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									className="bi bi-house-fill h-5 w-5 me-2"
									viewBox="0 0 16 16"
								>
									<path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z" />
									<path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z" />
								</svg>
								Volver a la página principal
							</Link>
						</div>
					</div>
				) : (
					/*Respuesta fallida */
					<div className="flex flex-col gap-y-4 my-8">
						<h1 className="font-medium text-lg sm:text-2xl text-red-500 text-center">
							¡Lo sentimos, no se pudo completar tu transacción!
						</h1>
						<h3 className="font-medium text-sm sm:text-lg text-red-500 text-center">
							La solicitud de pago no se ha generado. Por favor revise sus
							movimientos bancarios.
						</h3>
						<h3 className="font-medium text-sm sm:text-lg text-red-500 text-center">
							Si el error persiste comuniquese con nuestros operadores a través
							de whatsapp
						</h3>

						<div className="mx-auto w-full flex justify-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								className="bi bi-cart-x sm:w-96 sm:h-96 w-full text-red-500"
								viewBox="0 0 16 16"
							>
								<path d="M7.354 5.646a.5.5 0 1 0-.708.708L7.793 7.5 6.646 8.646a.5.5 0 1 0 .708.708L8.5 8.207l1.146 1.147a.5.5 0 0 0 .708-.708L9.207 7.5l1.147-1.146a.5.5 0 0 0-.708-.708L8.5 6.793z" />
								<path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
							</svg>
						</div>

						<div className="mx-auto flex items-center justify-center">
							<Link
								to="/"
								className="inline-flex text-xs sm:text-sm bg-red-500 hover:bg-red-700 px-2.5 py-2 rounded-lg text-white hover:cursor-pointer"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									className="bi bi-house-fill h-5 w-5 me-2"
									viewBox="0 0 16 16"
								>
									<path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z" />
									<path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z" />
								</svg>
								Volver a la página principal
							</Link>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
