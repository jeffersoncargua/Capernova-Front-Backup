import { useFetch } from "../../hooks/useFetch";

const GetAllCourse = async (search = "") => {
	const verbose = "GET";
	const route = "/Course/getAllCourse";
	const query = `?search=${search}`;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
	});

	return response;
};

const CreateCourse = async (curso) => {
	const verbose = "POST";
	const route = "/Course/createCourse";
	const object = curso;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		object: object,
	});

	return response;
};

const UpdateCourse = async (curso) => {
	const verbose = "PUT";
	const route = "/Course/updateCourse";
	const query = `/${curso.id}`;
	const object = curso;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
		object: object,
	});

	return response;
};

const AssigmentTeacherCourse = async (cursoId, teacherId) => {
	const verbose = "PUT";
	const route = "/Managment/assigmentCourse";
	const query = `/${cursoId}`;
	const object = teacherId;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
		object: object,
	});

	return response;
};

const DeleteAssigmentTeacherCourse = async (cursoId, teacherId) => {
	const verbose = "PUT";
	const route = "/Managment/deleteAssigmentCourse";
	const query = `/${cursoId}`;
	const object = teacherId;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
		object: object,
	});

	return response;
};

const CreateCapitulo = async (capitulo) => {
	const verbose = "POST";
	const route = "/Capitulo/createCapitulo";
	const object = capitulo;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		object: object,
	});

	return response;
};

const UpdateCapitulo = async (capitulo) => {
	const verbose = "PUT";
	const route = "/Capitulo/updateCapitulo";
	const query = `/${capitulo.id}`;
	const object = capitulo;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
		object: object,
	});

	return response;
};

const GetAllVideos = async (capituloId) => {
	const verbose = "GET";
	const route = "/Video/getAllVideos";
	const query = `/${capituloId}`;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
	});

	return response;
};

const CreateVideo = async (video) => {
	const verbose = "POST";
	const route = "/Video/createVideo";
	const object = video;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		object: object,
	});

	return response;
};

const UpdateVideo = async (video) => {
	const verbose = "PUT";
	const route = "/Video/updateVideo";
	const query = `/${video.id}`;
	const object = video;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
		object: object,
	});

	return response;
};

const GetProductCode = async (cursoCod) => {
	const verbose = "GET";
	const route = "/Producto/getProductoCode";
	const query = `?codigo=${cursoCod}`;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
	});

	return response;
};

const GetAllCourseCategory = async (categoriaId, search = "") => {
	const verbose = "GET";
	const route = "/Producto/getAllProducto";
	const query = `?search=${search}&tipo=curso&categoriaId=${categoriaId}`;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
	});

	return response;
};

const GetAllCapitulo = async (cursoId) => {
	const verbose = "GET";
	const route = "/Capitulo/getAllCapitulo";
	const query = `/${cursoId}`;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
	});

	return response;
};

export {
	GetAllCourse,
	CreateCourse,
	AssigmentTeacherCourse,
	DeleteAssigmentTeacherCourse,
	CreateCapitulo,
	UpdateCourse,
	UpdateCapitulo,
	CreateVideo,
	UpdateVideo,
	GetAllVideos,
	GetProductCode,
	GetAllCapitulo,
	GetAllCourseCategory,
};
