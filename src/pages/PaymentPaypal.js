import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	ConfirmPayByPayPal,
	PaymentByPayPal,
} from "../apiServices/PaymentServices/PaymentServices";

export const PaymentPaypal = () => {
	const cartList = useSelector((state) => state.cartState.cartList);
	const total = useSelector((state) => state.cartState.total);

	let orderId = "";
	const navigate = useNavigate();

	// const [{isPending}] = usePayPalScriptReducer(); // permite obtener el estado de paypal en la que se encuentra en ese momento de la solicitud de pedido

	const initialOptions = {
		clientId:
			"AZiCGcfCQdlpvwPzJGoyLURcKroZ-zSI8B-HX-2Gu7LZVcoiTCADxSMY8h7-SY1EnGwaYJ3b--4kpfGP",
		//clientId:'test',
		//components:"buttons",
		//currency: "USD",
		//intent: "capture",
	};

	const handleCreateOrder = async () => {
		var resultFromApi = await PaymentByPayPal({
			productos: JSON.stringify(cartList),
			total: String(total),
		});

		const resultFetch = await resultFromApi.json();
		const result = JSON.parse(resultFetch.result);
		orderId = result.id;

		console.log("Se esta creando un metodo de pago");
		return result.id;
	};

	const handleOnApprove = async () => {
		var resultFromApi = await ConfirmPayByPayPal(orderId);

		const resultFetch = await resultFromApi.json();
		if (resultFetch.isSuccess) {
			navigate(`/confirmPay?token=${orderId}`);
		} else {
			navigate(`/cancelPay`);
		}
	};

	const styles = {
		shape: "rect",
		layout: "vertical",
		disableMaxWidth: true,
	};

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
	);
};

/*
{isPending ? <div>Realizando Solicitud...</div>:null}

*/
