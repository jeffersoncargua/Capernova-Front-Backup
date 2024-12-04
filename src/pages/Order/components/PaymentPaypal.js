import { PayPalScriptProvider,PayPalButtons } from "@paypal/react-paypal-js"
//import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/userSlice";
//import { toast } from "react-toastify";
//import {ModalError} from '../components'

// Import AOS para el fade
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..



export const PaymentPaypal = ({cartList,total,isValid,setError,setShowModal,hiddenPaypal,setHiddenPaypal}) => {

    //  const cartList = useSelector(state => state.cartState.cartList);
    //  const total = useSelector(state => state.cartState.total);

    const dispath = useDispatch();

    const user = useSelector(state => state.userState.user);

    const order = useSelector(state => state.orderState.order);
    //console.log(order);


    let orderId = ''; //permite almacenar la orden que se emite desde paypal para realizar las transacciones
    let TransaccionId = '';
    const navigate = useNavigate();

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

    // const [{isPending}] = usePayPalScriptReducer(); // permite obtener el estado de paypal en la que se encuentra en ese momento de la solicitud de pedido

    const initialOptions ={
        clientId: process.env.REACT_APP_PAYPAL, //Esto se debe reemplazar con el clientId que se genere de Paypal revisar el archivo .env
        //clientId:'test',
        //components:"buttons",
        //currency: "USD",
        //intent: "capture",
        //buyerCountry : "EC"
    }

    const handleCreateOrder = async() => {
        try {
            const resultFromApi = await fetch(`${process.env.REACT_APP_API_URL}/Payment/paypalCard`,{
                method: 'POST',
                credentials: 'include',
                headers:{
                    'Content-Type' : 'application/json',
                    'Accept' : 'application/json'
                },
                body: JSON.stringify({
                    productos : JSON.stringify(cartList),
                    total: String(total)
                }),            
            });
    
            const resultFetch = await resultFromApi.json();

            if (resultFromApi.status !== 200) {
                throw resultFetch;
            }

            //console.log(resultFetch);
            if (resultFetch.isSuccess) {
                const result = JSON.parse(resultFetch.result);
            // console.log(result.id);       
            // console.log(result.status);
            // console.log(result.links);
            //setToken(result.id);
                orderId = result.id;
                return result.id;
            }

            //console.log(resultFetch.message);
            setError(resultFetch.message);
            setShowModal(true);
            setHiddenPaypal(false);
        } catch (error) {
            console.error(error);
            setShowModal(true);
            setError('No se ha podido completar tu compra. Por favor, revise su conexión a internet e inténtelo nuevamente');
            setHiddenPaypal(false);
        }

            
            //console.log("Se esta creando un metodo de pago");
        
    }

    const handleOnApprove = async() => {
        //console.log(orderId);
        try {
            const resultFromApi = await fetch(`${process.env.REACT_APP_API_URL}/Payment/confirmPaypal?token=${orderId}`,{
                method: 'GET',
                credentials: 'include',
                headers:{
                    'Content-Type' : 'application/json',
                    'Accept' : 'application/json'
                }
            });
    
            const resultFetch = await resultFromApi.json();

            if (resultFromApi.status !== 200) {
                throw resultFetch;
            }
            //console.log(orderId);
            //console.log(resultFetch);
            TransaccionId= resultFetch.result;
            if(resultFetch.isSuccess){
                const resultAPI = await fetch(`${process.env.REACT_APP_API_URL}/Payment/createOrder`,{
                    method: 'POST',
                    credentials: 'include',
                    headers:{
                        'Content-Type' : 'application/json',
                        'Accept' : 'application/json'
                    },
                    body:JSON.stringify({
                        productos : JSON.stringify(cartList),
                        total: String(total),
                        orden: JSON.stringify(order),
                        identifierName : user.nameIdentifier,
                        transaccionId : TransaccionId
                    })
                });
                const resultFetch = await resultAPI.json();
                //console.log(resultFetch);
                if(resultFetch.isSuccess){
                    localStorage.removeItem('shoppingcart');
                    dispath(logout()); //permite cerrar la session
                    navigate(`/confirmPay?token=${TransaccionId}`);
                    
                }            
            }else{
                navigate(`/cancelPay`);
            }
        } catch (error) {
            console.error(error);
            setShowModal(true);
            setError('No se ha podido completar tu compra. Por favor, revise su conexión a internet e inténtelo nuevamente');  
            setHiddenPaypal(false);
        }
        
        
    }

    const handleOnError= async() => {
        //console.log('Ha ocurrido un error durante su transacción');
        setShowModal(true);
        setError('Ha ocurrido un error durante la transacción. Inténtelo nuevamente');
        setHiddenPaypal(false);
    }

    const handleOnCancel= async() => {        
        localStorage.removeItem('shoppingcart');
        navigate('/cancelPay');
    }

    // const onShippingAddressChange = (data, actions) =>{
    //    return actions.reject();
    // }

    

    const styles ={
        shape: 'rect',
        layout: "vertical",
        disableMaxWidth:true,
    }


  return (
    <div className={``}>

        {isValid && (
            <div className={`${!hiddenPaypal ? 'relative -z-10':''}`} data-aos="fade-up" >
                <h1 className="font-medium text-center text-xl my-10 dark:text-white">Escoge la forma de pago:</h1>
                <PayPalScriptProvider options={initialOptions}  >
                    <PayPalButtons 
                        style={styles}
                        createOrder={handleCreateOrder}
                        onApprove={handleOnApprove}
                        onError={handleOnError}
                        onCancel={handleOnCancel}
                        
                        //displayOnly={"vaultable"}
                        />
                </PayPalScriptProvider>
                
            </div>
        )}
        
    </div>
  )
}

/*
{isPending ? <div>Realizando Solicitud...</div>:null}

*/

