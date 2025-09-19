import { useFetch } from "../hooks/useFetch";

const GetCursos = async (search) => {
	const verbose = "GET";
	const route = "/Course/getAllCourse";
	const query = `?search=${search}`;
	//const authToken = sessionStorage.getItem('auth')

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
	});

	return response;
};

const GetCategoriaCursos = async () => {
	const verbose = "GET";
	const route = "/Producto/getAllCategoria";
	const query = `?tipo=curso`;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
	});

	return response;
};

const GetCategoriaProductos = async () => {
	const verbose = "GET";
	const route = "/Producto/getAllCategoria";
	const query = `?tipo=producto`;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
	});

	return response;
};

const CreateMarketing = async (marketing) => {
	const verbose = "POST";
	const route = "/Marketing/createPublicidad";
	const object = marketing;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		object: object,
	});

	return response;
};

const UpdateMarketing = async (marketing) => {
	const verbose = "PUT";
	const route = "/Marketing/updatePublicidad";
	const query = `/${marketing.id}`;
	const object = marketing;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
		object: object,
	});

	return response;
};

const GetAllMarketing = async (search) => {
	const verbose = "GET";
	const route = "/Marketing/publicidadList";
	const query = `?search=${search}`;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
	});

	return response;
};

const Delete = async (ruta, objectId) => {
	const verbose = "DELETE";
	const route = ruta;
	const query = `/${objectId}`;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
	});

	return response;
};

const GetUser = async (search) => {
	const verbose = "GET";
	const route = "/Managment/getUser";
	const query = `?search=${search}`;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
	});

	return response;
};

const GetAllTeachers = async () => {
	const verbose = "GET";
	const route = "/Teacher/getAllTeacher";

	var response = await useFetch({ verbose: verbose, route: route });

	return response;
};

const GetAllCommentaries = async () => {
	const verbose = "GET";
	const route = "/Managment/getComentarios";

	var response = await useFetch({ verbose: verbose, route: route });

	return response;
};

const GetAllProducts = async (categoryId) => {
	const verbose = "GET";
	const route = "/Producto/getAllProducto";
	const query = `?tipo=producto&categoriaId=${categoryId}`;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
	});

	return response;
};

export {
	GetCategoriaCursos,
	GetCategoriaProductos,
	GetCursos,
	CreateMarketing,
	UpdateMarketing,
	GetAllMarketing,
	Delete,
	GetUser,
	GetAllTeachers,
	GetAllCommentaries,
	GetAllProducts,
};
