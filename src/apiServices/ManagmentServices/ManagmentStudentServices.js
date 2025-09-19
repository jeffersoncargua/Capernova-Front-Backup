import { useFetch } from "../../hooks/useFetch";

const GetMatricula = async (id) => {
	const verbose = "GET";
	const route = "/Managment/getMatricula";
	const query = `?userId=${id}`;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
	});

	return response;
};

const GetStudents = async (search) => {
	const verbose = "GET";
	const route = "/Managment/getStudents";
	const query = `?search${search}`;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
	});

	return response;
};

const CreateMatricula = async (student) => {
	const verbose = "POST";
	const route = "/Managment/createMatricula";
	const object = student;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		object: object,
	});

	return response;
};

export { GetMatricula, CreateMatricula, GetStudents };
