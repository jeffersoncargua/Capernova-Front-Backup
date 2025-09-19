import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
	PaymentInfo,
	PaymentOrder,
	PaymentMethod,
	ModalError,
} from "./components";
import { useNavigate } from "react-router-dom";

// Import AOS para el fade
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..

export const Order = () => {
	const navigate = useNavigate();
	const [productList, setProducList] = useState([]);
	const [cursoList, setCursoList] = useState([]);
	const cartList = useSelector((state) => state.cartState.cartList);

	const [showModal, setShowModal] = useState(false);
	const [error, setError] = useState("");
	const [hiddenPaypal, setHiddenPaypal] = useState(true); //permite colocar los botones de paypal atras del modal en caso de error

	const [isValid, setIsValid] = useState(false); //permite activar la forma de pago

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

	useEffect(() => {
		if (cartList.length > 0) {
			const onlyProductos = cartList.filter(
				(itemCart) => itemCart.tipo === "producto",
			);
			setProducList(onlyProductos);
			const onlyCursos = cartList.filter(
				(itemCart) => itemCart.tipo === "curso",
			);
			setCursoList(onlyCursos);
		} else {
			navigate("/cart");
		}
	}, [cartList, navigate]);

	return (
		<div className="w-95% flex flex-wrap justify-around mx-auto mb-10 ">
			{showModal && (
				<ModalError
					error={error}
					setShowModal={setShowModal}
					setHiddenPaypal={setHiddenPaypal}
				/>
			)}
			{/*Apartado para solicitar la informacion para el pedido en el caso de tener productos */}
			<div
				className="w-full md:w-[50%] flex flex-col items-center border-gray-300"
				data-aos="fade-up"
			>
				{productList.length > 0 && <PaymentOrder setIsValid={setIsValid} />}
				{cursoList.length > 0 && productList.length === 0 && (
					<PaymentMethod setIsValid={setIsValid} />
				)}
			</div>
			{/* Apartado para el pago por paypal o el ingreso del numero de la tarjeta */}
			<div
				className="w-full md:w-[50%] flex flex-col items-center"
				data-aos="fade-up"
			>
				<PaymentInfo
					isValid={isValid}
					cartList={cartList}
					setError={setError}
					setShowModal={setShowModal}
					hiddenPaypal={hiddenPaypal}
					setHiddenPaypal={setHiddenPaypal}
				/>
			</div>
		</div>
	);
};

/*

//Este apartado funciona son stripe y paypal por separado
const [checkCard, setCheckCard] = useState(false);
  const [checkPaypal, setCheckPayPal] = useState(false);

  return (
    <div className="w-95% flex flex-wrap justify-around mx-auto mb-10 md:my-20">
        {/*Apartado para escoger el metodo de pago }
        <div className="w-full md:w-[50%] flex flex-col items-center md:border-r-2 border-gray-300">
          <PaymentMethod checkCard={checkCard} setCheckCard={setCheckCard} checkPaypal={checkPaypal} setCheckPayPal={setCheckPayPal} />
        </div>
        {/*Apartado para el pago por paypal o el ingreso del numero de la tarjeta }
        <div className="w-full md:w-[50%] flex flex-col items-center">
          <PaymentInfo checkCard={checkCard} checkPaypal={checkPaypal}  />
        </div>
    </div>

*/
