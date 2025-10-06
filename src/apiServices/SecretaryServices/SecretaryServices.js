import { useFetch } from "../../hooks/useFetch";

const UpdateVenta = async (ventaId) => {
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

const UpdatePedido = async (pedido) => {
	const verbose = "PUT";
	const route = "/Venta/updatePedido";
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

const GetAllCourse = async (search = "") => {
	const verbose = "GET";
	const route = "/Managment/getAllCourse";
	const query = `?search=${search}`;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
	});

	return response;
};

export { UpdateVenta, UpdatePedido, GetAllCourse};
