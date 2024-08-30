//import { useState } from "react";
import { useSelector } from "react-redux";
import PagandoCuenta from '../../../assets/MujerPagando.png';
import {PaymentPaypal} from '../components';
import { useEffect, useState } from "react";
import { cancelOrder } from "../../../redux/orderSlice";
import { useDispatch } from "react-redux";

//import { SkeletonPayment } from "../components";

//import PaypalLogo from '../../../assets/pagospaypal.png';
//import PayCardLogo from '../../../assets/pagosTarjeta.png';

export const PaymentInfo = ({isValid,cartList,setError,setShowModal,hiddenPaypal, setHiddenPaypal}) => {

    //const [showButtonLoading, setShowButtonLoading] = useState(false);
    //const [response,setResponse] = useState({});

    const dispatch = useDispatch();

    const [cursoList, setCursoList] = useState([]);
    const [productoList, setProductoList] = useState([]);

    
    
    
    const total = useSelector(state => state.cartState.total);

    const order = useSelector(state => state.orderState.order);
    console.log(order);

    

    
    // const handlePaypal = async (event) =>{
    //     event.preventDefault();
    //     setShowButtonLoading(true);
    //     try {
    //         let resultFetch = await fetch('https://localhost:7164/api/Payment/paypal',{
    //             method: 'POST',
    //             credentials:"include",
    //             headers:{
    //                 "Content-Type" : "application/json" ,
    //                 "Accept" : "application/json",
    //             },
    //             body: JSON.stringify({
    //                 productos : JSON.stringify(cartList),
    //                 total: String(total),
    //             }) 
    //         });
    //         let result = await resultFetch.json();
    //         console.log(result);
    //         if(result.isSuccess){
    //             //se convierte a un objeto legible para react (Javascript) mediante el metodo parse
    //             var dataJson = JSON.parse(result.result);
    //             console.log(dataJson);
    //             //Se obtiene los link de la respuesta que contienen para dirigirnos a la pagina de paypal
    //             var links = dataJson.links;
    //             console.log(links);
    //             //Se obtiene el link para poder dirifirnos a la pagina de paypal
    //             var resultado = links.find(item => item.rel === 'approve');
    //             console.log(resultado);
    //             //si es satisfactoria la peticion se redirigira a la pagina de Paypal para realizar el pago
    //             window.location.href = resultado.href;
    //         }else{
    //             //se agrega un modal para cuando sea una respuesta negativa
    //         }
            
    //         setShowButtonLoading(false); 
            
    //     } catch (error) {
    //         setShowButtonLoading(false);
    //         console.error(error);
    //     }
    // }

    // const handlePaypalCard = async (event) =>{
    //     event.preventDefault();
    //     setShowButtonLoading(true);
    //     try {
    //         let resultFetch = await fetch('https://localhost:7164/api/Payment/paypalCard',{
    //             method: 'POST',
    //             credentials:"include",
    //             headers:{
    //                 "Content-Type" : "application/json" ,
    //                 "Accept" : "application/json",
    //             },
    //             body: JSON.stringify({
    //                 productos : JSON.stringify(cartList),
    //                 total: String(total),
    //             }) 
    //         });
    //         let result = await resultFetch.json();
    //         console.log(result);
    //         if(result.isSuccess){
    //             //se convierte a un objeto legible para react (Javascript) mediante el metodo parse
    //             var dataJson = JSON.parse(result.result);
    //             console.log(dataJson);
    //             //Se obtiene los link de la respuesta que contienen para dirigirnos a la pagina de paypal
    //             var links = dataJson.links;
    //             console.log(links);
    //             //Se obtiene el link para poder dirifirnos a la pagina de paypal
    //             var resultado = links.find(item => item.rel === 'approve');
    //             console.log(resultado); 
    //             //const url = new URL(resultado.href);
    //             // console.log(url.searchParams.get('token'));
    //             // const token = url.searchParams.get('token'); 
    //             // const urlCard = new URL(`https://www.sandbox.paypal.com/checkoutweb/signup?token=${token}&ssrt=1723592703757&rcache=1&useraction=PAY&country.x=EC&locale.x=es_XC&locale.x=es_EC&country.x=EC`)
    //             // console.log(urlCard);
    //             //si es satisfactoria la peticion se redirigira a la pagina de Paypal para realizar el pago
    //             window.location.href = resultado.href;
    //         }else{
    //             //se agrega un modal para cuando sea una respuesta negativa
    //         }
            
    //         setShowButtonLoading(false); 
            
    //     } catch (error) {
    //         setShowButtonLoading(false);
    //         console.error(error);
    //     }
    // }

    // const handlePayCard = async (event) => {
    //     event.preventDefault();
    //     setShowButtonLoading(true);
    //     try{
    //         let resultFetch = await fetch('https://localhost:7164/api/Payment/paymentCard',{
    //             method:"POST",
    //             headers:{
    //                 "Content-Type" : 'application/json',
    //                 "Accept" : 'application/json',
    //             },
    //             body: JSON.stringify(),
    //         });
    //         let result = await resultFetch.json();
    //         console.log(result);
    //         setShowButtonLoading(false);
    //         window.location.href = result.result;

    //     }catch(error){
    //         console.error(error);
    //         setShowButtonLoading(false);
    //     }
    // }

    useEffect(()=>{
        const onlyCursos = cartList.filter(itemCart => itemCart.tipo === 'curso');
        setCursoList(onlyCursos);
        const onlyProductos = cartList.filter(itemCart => itemCart.tipo === 'producto');
        setProductoList(onlyProductos);
        if (onlyProductos.length === 0) {
            dispatch(cancelOrder());
        }
    },[cartList,dispatch])


  return (
    <div className="w-[95%] flex flex-col mb-5 md:my-12 mx-auto">

   


        {/*Info con el metodo de pafo con tarjeta */}
        
        <div className=" w-full md:max-w-xl" >
            {(cursoList.length > 0 && productoList.length > 0) && (<div className='mb-10'>
                <img src={PagandoCuenta} alt="Imagen de Pago" className='w-[80%] md:max-w-sm h-60 mx-auto rounded-lg' />
            </div>)}
            {(cursoList.length === 0 && productoList.length > 0) ? (<div className='mb-10'>
                <img src={PagandoCuenta} alt="Imagen de Pago" className='w-[80%] md:max-w-sm h-60 mx-auto rounded-lg' />
            </div>)
            :
            (< >
                {/* <img src={PagandoCuenta} alt="Imagen de Pago" className='w-[80%] md:max-w-sm h-60 mx-auto rounded-lg' /> */}
            </>)}

            <h1 className="font-medium text-center text-xl mb-5 dark:text-white capitalize">El detalle de tu carrito</h1>
                            
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-black dark:text-white">
                    <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Detalle
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Cantidad
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Precio
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartList.map((item) => (
                            <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.titulo}
                                </th>
                                <td className="px-6 py-4">
                                    {item.cantidad}
                                </td>
                                <td className="px-6 py-4">
                                    ${item.precio}
                                </td>
                            </tr>
                        ) )}
                        
                    </tbody>
                    <tfoot>
                        <tr className="font-semibold text-black bg-gray-50 dark:bg-gray-700 dark:text-white">
                            <th></th>
                            <th scope="row" className="px-6 py-3 text-base">Total</th>
                            <td className="px-6 py-3">${total}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            
            <PaymentPaypal cartList={cartList} total={total} isValid={isValid} setError={setError} setShowModal={setShowModal} hiddenPaypal={hiddenPaypal} setHiddenPaypal={setHiddenPaypal} />
             
        </div>
    </div>
  )
}


/*

//Este metodo funciona con stripe y paypal por separado

<div className="w-[95] flex flex-col md:ms-4">
        {/*Info con el metodo de pafo con tarjeta 
        <div className="">
            <h1 className="font-medium text-2xl mb-10 dark:text-white">Pago con tarjeta de Crédito o Débito:</h1>
            {checkCard ? 
            // (<form onSubmit={handlePayCard} className="border w-80 shadow-lg shadow-gray-500 rounded-t-lg mx-auto " >
            (<form onSubmit={handlePaypalCard} className="border w-80 shadow-lg shadow-gray-500 rounded-t-lg mx-auto " >
                <div className="relative">
                    <img src={PayCardLogo} className="w-[19rem] h-36 mx-auto mt-2 rounded-lg" alt="Imagen para cobrar" />
                    <div className="flex justify-around items-center">
                        <span className="font-semibold text-lg dark:text-white">
                            Total:
                        </span>
                        <span className="text-3xl text-pink-500">
                            ${total}
                        </span>
                    </div>
                </div>
                {showButtonLoading ? (<button disabled type="button" className="w-full text-gray-900 bg-[#15803d] hover:bg-[#15803d]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium text-sm px-5 py-2.5 text-center inline-flex justify-center items-center dark:focus:ring-[#F7BE38]/50 ">
                    <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                    </svg>
                Procesando...
                </button>)
                :
                (<button type="submit" className="w-full text-gray-900 bg-[#15803d] hover:bg-[#15803d]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium text-sm px-5 py-2.5 text-center inline-flex justify-center items-center dark:focus:ring-[#F7BE38]/50 ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-credit-card w-4 h-4 me-2 -ms-1" viewBox="0 0 16 16">
                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
                        <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
                    </svg>
                    Paga con tu tarjeta preferida
                </button>)
                }
            </form>)
            :
            (<SkeletonPayment />)}
            
            
        </div>

        <div className="">
            <h1 className="font-medium text-2xl my-10 dark:text-white">Pago con Paypal:</h1>
            {/*Infor con el metodo de pago con paypal 
            {checkPaypal ? 
            (<form onSubmit={handlePaypal} className="border w-80 shadow-lg shadow-gray-500 rounded-t-lg mx-auto ">
                <div className="relative">
                    <img src={PaypalLogo} className="w-[19rem] h-36 mx-auto mt-2 rounded-lg" alt="Imagen para cobrar" />
                    <div className="flex justify-around items-center">
                        <span className="font-semibold text-lg dark:text-white">
                            Total:
                        </span>
                        <span className="text-3xl text-pink-500">
                            ${total}
                        </span>
                    </div>
                </div>
                {showButtonLoading ? (<button disabled type="button" className="w-full text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium text-sm px-5 py-2.5 text-center inline-flex justify-center items-center dark:focus:ring-[#F7BE38]/50 ">
                    <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                    </svg>
                Procesando...
                </button>)
                :
                (<button type="submit" className="w-full text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium text-sm px-5 py-2.5 text-center inline-flex justify-center items-center dark:focus:ring-[#F7BE38]/50 ">
                    <svg className="w-4 h-4 me-2 -ms-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="paypal" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4 .7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9 .7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z"></path></svg>
                    Realiza tu compra con PayPal
                </button>)
                }
                
            </form>)
            :
            (<SkeletonPayment />)}   
        </div>  
    </div>

*/
