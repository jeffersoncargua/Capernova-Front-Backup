import { useFetch } from "../../hooks/useFetch";

const GetTeacherAuthenticate = async (teacherIdentifier) => {
	const verbose = "GET";
	const route = "/Teacher/getTeacher";
	const query = `?id=${teacherIdentifier}`;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
	});

	return response;
};

const GetTeacherCourse = async (teacherIdentifier, search) => {
	const verbose = "GET";
	const route = "/Teacher/getAllCourse";
	const query = `?id=${teacherIdentifier}&search=${search}`;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
	});

	return response;
};

const GetAllTest = async (cursoId) => {
	const verbose = "GET";
	const route = "/Prueba/getAllPruebas";
	const query = `/${cursoId}`;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
	});

	return response;
};

const GetAllTask = async (cursoId) => {
	const verbose = "GET";
	const route = "/Deber/getAllDeberes";
	const query = `/${cursoId}`;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
	});

	return response;
};

const GetAllStudents = async (cursoId, searchUser, startDate, endDate) => {
	const verbose = "GET";
	const route = "/Teacher/getStudents";
	const query = `?cursoId=${cursoId}&search=${searchUser}&start=${JSON.stringify(startDate)}&end=${JSON.stringify(endDate)}`;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
	});

	return response;
};

const GetTestNota = async (pruebaId, matriculaStudentId) => {
	const verbose = "GET";
	const route = "/Student/getNotaPrueba";
	const query = `?id=${pruebaId}&studentId=${matriculaStudentId}`;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
	});

	return response;
};

const GetTaskNota = async (taskId, matriculaStudentId) => {
	const verbose = "GET";
	const route = "/Student/getNotaDeber";
	const query = `?id=${taskId}&studentId=${matriculaStudentId}`;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
	});

	return response;
};

const CreateTest = async (test) => {
	const verbose = "POST";
	const route = "/Prueba/createPrueba";
	const object = test;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		object: object,
	});

	return response;
};

const UpdateTest = async (test) => {
	const verbose = "PUT";
	const route = "/Prueba/updatePrueba";
	const query = `/${test.id}`;
	const object = test;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
		object: object,
	});

	return response;
};

const CreateTask = async (task) => {
	const verbose = "POST";
	const route = "/Deber/createDeber";
	const object = task;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		object: object,
	});

	return response;
};

const UpdateTask = async (task) => {
	const verbose = "PUT";
	const route = "/Deber/updateDeber";
	const query = `/${task.id}`;
	const object = task;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
		object: object,
	});

	return response;
};

const UpdateMatriculaNota = async (matriculaId, grade) => {
	const verbose = "PUT";
	const route = "/Teacher/updateMatriculaNota";
	const query = `/${matriculaId}`;
	const object = grade; //Nota final del curso

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
		object: object,
	});

	return response;
};

const UpdateTeacher = async (teacher) => {
	const verbose = "PUT";
	const route = "/Teacher/updateTeacher";
	const query = `?id=${teacher.id}`;
	const object = teacher;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
		object: object,
	});

	return response;
};

const UpsertTestNota = async (pruebaId, matriculaStudentId, grade) => {
	const verbose = "PUT";
	const route = "/Teacher/upsertNotaPrueba";
	const query = `?id=${pruebaId}&studentId=${matriculaStudentId}`;
	const object = grade; //Nota de la prueba

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
		object: object,
	});

	return response;
};

const UpdateTaskNota = async (taskId, matriculaStudentId, grade) => {
	const verbose = "PUT";
	const route = "/Teacher/updateNotaDeber";
	const query = `?id=${taskId}&studentId=${matriculaStudentId}`;
	const object = grade; //Nota de la tarea o deber

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
		object: object,
	});

	return response;
};

const UpdateMatriculaEstado = async (matriculaId, matriculaStudentId, isActive) => {
	const verbose = "PUT";
	const route = "/Teacher/updateMatriculaEstado";
	const query = `/${matriculaId}/${matriculaStudentId}`;
	const object = isActive; //Estado de la matricula del estudiante

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
		object: object,
	});

	return response;
};

export {
	GetTeacherAuthenticate,
	GetTeacherCourse,
	GetAllTest,
	CreateTest,
	UpdateTest,
	CreateTask,
	UpdateTask,
	UpdateMatriculaNota,
	UpdateTeacher,
	GetAllStudents,
	GetAllTask,
	GetTestNota,
	UpsertTestNota,
	GetTaskNota,
	UpdateTaskNota,
	UpdateMatriculaEstado
};
