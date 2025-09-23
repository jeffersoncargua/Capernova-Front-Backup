import { useFetch } from "../../hooks/useFetch";

const GetAllCategories = async (search = "") => {
	const verbose = "GET";
	const route = "/Producto/getAllCategoria";
	const query = `?search=${search}`;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
	});

	return response;
};

const CreateCategory = async (category) => {
	const verbose = "POST";
	const route = "/Producto/createCategoria";
	const object = category;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		object: object,
	});

	return response;
};

const UpdateCategory = async (category) => {
	const verbose = "PUT";
	const route = "/Producto/updateCategoria";
	const query = `/${category.id}`;
	const object = category;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
		object: object,
	});

	return response;
};

export { GetAllCategories, CreateCategory, UpdateCategory };
