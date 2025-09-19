import { useFetch } from "../../hooks/useFetch";

const CreateProduct = async (product) => {
	const verbose = "POST";
	const route = "/Producto/createProducto";
	const object = product;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		object: object,
	});

	return response;
};

const UpdateProduct = async (product) => {
	const verbose = "PUT";
	const route = "/Producto/updateProducto";
	const query = `/${product.id}`;
	const object = product;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
		object: object,
	});

	return response;
};

const GetAllProducts = async (search, categoriaId = 0) => {
	const verbose = "GET";
	const route = "/Producto/getAllProducto";
	const query = `?search=${search}&tipo=producto&categoriaId=${categoriaId}`;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
	});

	return response;
};

const GetProduct = async (productId) => {
	const verbose = "GET";
	const route = "/Producto/getProducto";
	const query = `/${productId}`;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
	});

	return response;
};

export { CreateProduct, UpdateProduct, GetAllProducts, GetProduct };
