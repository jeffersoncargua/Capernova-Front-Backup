import { PayPalScriptProvider,PayPalButtons } from "@paypal/react-paypal-js"
//import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/userSlice";
//import {ModalError} from '../components'


export const PaymentPaypal = ({cartList,total,isValid,setError,setShowModal,hiddenPaypal,setHiddenPaypal}) => {

    //  const cartList = useSelector(state => state.cartState.cartList);
    //  const total = useSelector(state => state.cartState.total);

    const dispath = useDispatch();

    const user = useSelector(state => state.userState.user);

    const order = useSelector(state => state.orderState.order);
    console.log(order);


    let orderId = ''; //permite almacenar la orden que se emite desde paypal para realizar las transacciones
    const navigate = useNavigate();

    // const [{isPending}] = usePayPalScriptReducer(); // permite obtener el estado de paypal en la que se encuentra en ese momento de la solicitud de pedido

    const initialOptions ={
        clientId: "AZiCGcfCQdlpvwPzJGoyLURcKroZ-zSI8B-HX-2Gu7LZVcoiTCADxSMY8h7-SY1EnGwaYJ3b--4kpfGP",
        //clientId:'test',
        //components:"buttons",
        //currency: "USD",
        //intent: "capture",
    }

    const handleCreateOrder = async() => {

        
            const resultFromApi = await fetch(`https://localhost:7164/api/Payment/paypalCard`,{
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
            console.log(resultFetch);
            if (resultFetch.isSuccess) {
                const result = JSON.parse(resultFetch.result);
            // console.log(result.id);       
            // console.log(result.status);
            // console.log(result.links);
            //setToken(result.id);
            orderId = result.id;
            return result.id;
            }

            console.log(resultFetch.message);
            setError(resultFetch.message);
            setShowModal(true);
            setHiddenPaypal(false);
            
            //console.log("Se esta creando un metodo de pago");
        
    }

    const handleOnApprove = async() => {
        console.log(orderId);
        const resultFromApi = await fetch(`https://localhost:7164/api/Payment/confirmPaypal?token=${orderId}`,{
            method: 'GET',
            credentials: 'include',
            headers:{
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
            }
        });

        const resultFetch = await resultFromApi.json();
        console.log(resultFetch);
        if(resultFetch.isSuccess){
            const resultAPI = await fetch(`https://localhost:7164/api/Payment/createOrder`,{
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
                    //token: orderId
                })
            });
            const resultFetch = await resultAPI.json();
            console.log(resultFetch);
            if(resultFetch.isSuccess){
                localStorage.removeItem('shoppingcart');
                dispath(logout()); //permite cerrar la session
                navigate(`/confirmPay?token=${orderId}`);
                
            }            
        }else{
            navigate(`/cancelPay`);
            
        }
        
    }


    const handleOnError= async() => {
        console.log('Ha ocurrido un error durante su transacción');
    }

    const handleOnCancel= async() => {        
        localStorage.removeItem('shoppingcart');
        navigate('/cancelPay');
    }

    const styles ={
        shape: 'rect',
        layout: "vertical",
        disableMaxWidth:true,
    }


  return (
    <div className={``}>

        {isValid && (
            <div className={`${!hiddenPaypal ? 'relative -z-10':''}`}>
                <h1 className="font-medium text-center text-xl my-10 dark:text-white">Escoge la forma de pago:</h1>
                <PayPalScriptProvider options={initialOptions}>
                    <PayPalButtons 
                        style={styles}
                        createOrder={handleCreateOrder}
                        onApprove={handleOnApprove}
                        onError={handleOnError}
                        onCancel={handleOnCancel}
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

