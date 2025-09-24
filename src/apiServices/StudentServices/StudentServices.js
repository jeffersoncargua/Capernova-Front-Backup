import { useFetch } from "../../hooks/useFetch";

const GetStudent = async (studentIdentifier) => {
	const verbose = "GET";
	const route = "/Student/getEstudiante";
	const query = `?id=${studentIdentifier}`;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
	});

	return response;
};

const GetCoursesStudent = async (studentId) => {
	const verbose = "GET";
	const route = "/Student/getCursos";
	const query = `?id=${studentId}`;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
	});

	return response;
};

const GetTasksStudent = async (cursoId) => {
	const verbose = "GET";
	const route = "/Student/getDeberes";
	const query = `?id=${cursoId}`; //cursoId permite identificar el id del curso para encontrar las tareas

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
	});

	return response;
};

const GetTaskGrade = async (taskId, studentId) => {
	const verbose = "GET";
	const route = "/Student/getNotaDeber";
	const query = `?id=${taskId}&studentId=${studentId}`;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
	});

	return response;
};

const GetTestGrade = async (testId, studentId) => {
	const verbose = "GET";
	const route = "/Student/getNotaPrueba";
	const query = `?id=${testId}&studentId=${studentId}`;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
	});

	return response;
};

const GetAllTests = async (cursoId) => {
	const verbose = "GET";
	const route = "/Student/getPruebas";
	const query = `?id=${cursoId}`;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
	});

	return response;
};

const GetVideos = async (capituloId) => {
	const verbose = "GET";
	const route = "/Student/getVideos";
	const query = `/${capituloId}`;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
	});

	return response;
};

const GetVideosCourse = async (studentId, cursoId) => {
	const verbose = "GET";
	const route = "/Student/getViewVideos";
	const query = `?studentId=${studentId}&cursoId=${cursoId}`;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
	});

	return response;
};

const GetAllCapitulos = async (cursoId) => {
	const verbose = "GET";
	const route = "/Student/getCapitulos";
	const query = `/${cursoId}`;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
	});

	return response;
};

const GetCertificate = async (studentId, cursoId) => {
	const verbose = "GET";
	const route = "/Student/getCertificate";
	const query = `?studentId=${studentId}&cursoId=${cursoId}`;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
	});

	return response;
};

const CreateCommentary = async (studentCommentary) => {
	const verbose = "POST";
	const route = "/Student/createComentario";
	const object = studentCommentary;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		object: object,
	});

	return response;
};

const UpdateStudent = async (student) => {
	const verbose = "PUT";
	const route = "/Student/updateStudent";
	const query = `?id=${student.id}`;
	const object = student;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
		object: object,
	});

	return response;
};

const UpdateStateMatricula = async (matricula) => {
	const verbose = "PUT";
	const route = "/Student/updateMatricula";
	const query = `/${matricula.id}`;
	const object = matricula;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
		object: object,
	});

	return response;
};

const CreateViewVideo = async (studentViewVideo) => {
	const verbose = "POST";
	const route = "/Student/createViewVideo";
	const object = studentViewVideo;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		object: object,
	});

	return response;
};

export {
	GetStudent,
	GetCoursesStudent,
	GetTasksStudent,
	GetTaskGrade,
	GetTestGrade,
	GetAllTests,
	GetVideos,
	GetVideosCourse,
	GetAllCapitulos,
	GetCertificate,
	CreateCommentary,
	CreateViewVideo,
	UpdateStudent,
	UpdateStateMatricula,
};
