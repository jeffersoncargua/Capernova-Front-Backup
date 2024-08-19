import { PayPalScriptProvider,PayPalButtons } from "@paypal/react-paypal-js"
//import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export const PaymentPaypal = () => {

     const cartList = useSelector(state => state.cartState.cartList);
     const total = useSelector(state => state.cartState.total);

     //const [token, setToken] = useState('');
     let orderId = '';
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
        const result = JSON.parse(resultFetch.result);
        console.log(result.id);       
        console.log(result.status);
        console.log(result.links);
        //setToken(result.id);
        orderId = result.id;
        //const orderId = resultFetch.order.id;

        console.log("Se esta creando un metodo de pago");
        return result.id;
    }

    const handleOnApprove = async() => {
        console.log(orderId);
        const resultFromApi = await fetch(`https://localhost:7164/api/Payment/confirmPaypal?token=${orderId}`,{
            method: 'GET',
            credentials: 'include',
            headers:{
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
            },
        });

        const resultFetch = await resultFromApi.json();
        console.log(resultFetch);
        navigate(`/confirmPay?token=${orderId}`);
    }

    const styles ={
        shape: 'rect',
        layout: "vertical",
        disableMaxWidth:true,
    }


  return (
    <div>
        
        <h1>Aqui esta paypal</h1>
        <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons 
                style={styles}
                createOrder={handleCreateOrder}
                onApprove={handleOnApprove}
                 />
        </PayPalScriptProvider>
        

    </div>
  )
}

/*
{isPending ? <div>Realizando Solicitud...</div>:null}

*/
