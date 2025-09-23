import { useFetch } from "../../hooks/useFetch";

const GetAllPedidos = async (search, startDate, endDate) => {
	const verbose = "GET";
	const route = "/Venta/getAllPedidos";
	const query = `?search=${search}&start=${JSON.stringify(startDate)}&end=${JSON.stringify(endDate)}`;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
	});

	return response;
};

const UpdatePedido = async (pedido) => {
	const verbose = "PUT";
	const route = "/Venta/updatePedido/";
	const query = `/${pedido.id}`;
	const object = pedido;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
		object: object,
	});

	return response;
};

//Este servicio permite cambiar el estado de reembolso, eliminar el shoppingCart, la matricula y el pedido en caso de ser necesario
const UpdateRefundVenta = async (ventaId) => {
	const verbose = "PUT";
	const route = "/Venta/updateVenta";
	const query = `/${ventaId}`;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
	});

	return response;
};

const GetShoppingCart = async (ventaId) => {
	const verbose = "GET";
	const route = "/Venta/getShoppingCart";
	const query = `?ventaId=${ventaId}`;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
	});

	return response;
};

const GetAllVentas = async (search, startDate, endDate) => {
	const verbose = "GET";
	const route = "/Venta/getAllVentas";
	const query = `?search=${search}&start=${JSON.stringify(startDate)}&end=${JSON.stringify(endDate)}`;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
	});

	return response;
};

export {
	GetAllPedidos,
	UpdatePedido,
	GetShoppingCart,
	GetAllVentas,
	UpdateRefundVenta,
};
