import { useFetch } from "../../hooks/useFetch";

const Registration = async (user) => {
	const verbose = "POST";
	const route = "/Managment/registration";
	const object = user;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		object: object,
	});

	return response;
};

const GetTalent = async (searchRole, searchUser) => {
	const verbose = "GET";
	const route = "/Managment/getTalent";
	const query = `?searchRole=${searchRole}&searchName=${searchUser}`;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
	});

	return response;
};

export { GetTalent, Registration };
