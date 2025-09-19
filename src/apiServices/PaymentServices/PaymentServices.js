import { useFetch } from "../../hooks/useFetch";

const PaymentByPayPal = async (payment) => {
	const verbose = "POST";
	const route = "/Payment/paypalCard";
	const object = payment;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		object: object,
	});

	return response;
};

const ConfirmPayByPayPal = async (orderId) => {
	const verbose = "GET";
	const route = "/Payment/confirmPaypal";
	const query = `?token=${orderId}`;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
	});

	return response;
};

const CreateOrder = async (order) => {
	const verbose = "POST";
	const route = "/Payment/createOrder";
	const object = order;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		object: object,
	});

	return response;
};

export { PaymentByPayPal, ConfirmPayByPayPal, CreateOrder };
