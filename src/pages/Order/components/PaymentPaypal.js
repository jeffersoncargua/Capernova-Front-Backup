import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
// Import AOS para el fade
import AOS from "aos";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../redux/userSlice";
import "aos/dist/aos.css"; // You can also use <link> for styles
import {
	ConfirmPayByPayPal,
	CreateOrder,
	PaymentByPayPal,
} from "../../../apiServices/PaymentServices/PaymentServices";
// ..

export const PaymentPaypal = ({
	cartList,
	total,
	isValid,
	setError,
	setShowModal,
	hiddenPaypal,
	setHiddenPaypal,
}) => {
	const dispath = useDispatch();

	const user = useSelector((state) => state.userState.user);

	const order = useSelector((state) => state.orderState.order);

	let orderId = ""; //permite almacenar la orden que se emite desde paypal para realizar las transacciones
	let TransaccionId = "";
	const navigate = useNavigate();

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

	// const [{isPending}] = usePayPalScriptReducer(); // permite obtener el estado de paypal en la que se encuentra en ese momento de la solicitud de pedido

	const initialOptions = {
		clientId: process.env.REACT_APP_PAYPAL, //Esto se debe reemplazar con el clientId que se genere de Paypal revisar el archivo .env
		//clientId:'test',
		//components:"buttons",
		//currency: "USD",
		//intent: "capture",
		//buyerCountry : "EC"
	};

	const handleCreateOrder = async () => {
		try {
			const resultFromApi = await PaymentByPayPal({
				productos: JSON.stringify(cartList),
				total: String(total),
			});

			const resultFetch = await resultFromApi.json();

			console.log(resultFetch);

			if (resultFromApi.status !== 200) {
				throw resultFetch;
			}

			if (resultFetch.isSuccess) {
				const result = JSON.parse(resultFetch.result);
				orderId = result.id;
				return result.id;
			}

			setError(resultFetch.message);
			setShowModal(true);
			setHiddenPaypal(false);
		} catch (error) {
			console.error(error);
			setShowModal(true);
			setError(
				"No se ha podido completar tu compra. Por favor, revise su conexión a internet e inténtelo nuevamente",
			);
			setHiddenPaypal(false);
		}
	};

	const handleOnApprove = async () => {
		try {
			const resultFromApi = await ConfirmPayByPayPal(orderId);

			const resultFetch = await resultFromApi.json();

			if (resultFromApi.status !== 200) {
				throw resultFetch;
			}

			TransaccionId = resultFetch.result;
			if (resultFetch.isSuccess) {
				const resultAPI = await CreateOrder({
					productos: JSON.stringify(cartList),
					total: String(total),
					orden: JSON.stringify(order),
					identifierName: user.nameIdentifier,
					transaccionId: TransaccionId,
				});

				const resultFetch = await resultAPI.json();
				if (resultFetch.isSuccess) {
					localStorage.removeItem("shoppingcart");
					dispath(logout()); //permite cerrar la session
					navigate(`/confirmPay?token=${TransaccionId}`);
				}
			} else {
				navigate(`/cancelPay`);
			}
		} catch (error) {
			console.error(error);
			setShowModal(true);
			setError(
				"No se ha podido completar tu compra. Por favor, revise su conexión a internet e inténtelo nuevamente",
			);
			setHiddenPaypal(false);
		}
	};

	const handleOnError = async () => {
		setShowModal(true);
		setError(
			"Ha ocurrido un error durante la transacción. Inténtelo nuevamente",
		);
		setHiddenPaypal(false);
	};

	const handleOnCancel = async () => {
		localStorage.removeItem("shoppingcart");
		navigate("/cancelPay");
	};

	// const onShippingAddressChange = (data, actions) =>{
	//    return actions.reject();
	// }

	const styles = {
		shape: "rect",
		layout: "vertical",
		disableMaxWidth: true,
	};

	return (
		<div className={``}>
			{isValid && (
				<div
					className={`${!hiddenPaypal ? "relative -z-10" : ""}`}
					data-aos="fade-up"
				>
					<h1 className="font-medium text-center text-xl my-10 dark:text-white">
						Escoge la forma de pago:
					</h1>
					<PayPalScriptProvider options={initialOptions}>
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

			<div className="mt-4 text-black dark:text-white" data-aos="fade-up">
				<div className="flex flex-row items-center justify-center">
					<hr className="border-0.5 border-black dark:border-white w-[45%]" />
					<span className="text-center w-[10%]">ó</span>
					<hr className="border-0.5 border-black dark:border-white w-[45%]" />
				</div>

				<div className="flex flex-col justify-center">
					<p className="text-justify">
						También puedes realizar el pago por transferencia. Para ayudarte
						contactános a nuestro Whatsapp 0987203469.
					</p>
					<img
						src="https://img.unocero.com/2019/03/mobile_payment.gif"
						className="w-full md:w-64 md:h-56 self-center mt-2"
						alt="Paying whit transfer"
					/>
				</div>
			</div>
		</div>
	);
};

/*
{isPending ? <div>Realizando Solicitud...</div>:null}

*/
