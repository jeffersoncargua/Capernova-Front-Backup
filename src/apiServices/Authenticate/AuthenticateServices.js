import { useFetch } from "../../hooks/useFetch";

const Registration = async (user) => {
	const verbose = "POST";
	const route = "/Authentication/register";
	const object = user;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		object: object,
	});

	return response;
};

const LoginPost = async (credentials) => {
	const verbose = "POST";
	const route = "/Authentication/login";
	const object = credentials;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		object: object,
	});

	return response;
};

const ForgotPasswordPost = async (email) => {
	const verbose = "POST";
	const route = "/Authentication/forgot-Password";
	const object = email;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		object: object,
	});

	return response;
};

const ConfirmEmail = async (token, email) => {
	const verbose = "GET";
	const route = "/Authentication/ConfirmEmail";
	const query = `?token=${token}&email=${email}`;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
	});

	return response;
};

const ResetPassword = async (token, email) => {
	const verbose = "GET";
	const route = "/Authentication/reset-password";
	const query = `?token=${token}&email=${email}`;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
	});

	return response;
};

const ResetPasswordPost = async (updateCredentials) => {
	const verbose = "POST";
	const route = "/Authentication/reset-password";
	const object = updateCredentials;

	var response = await useFetch({
		verbose: verbose,
		route: route,
		object: object,
	});

	return response;
};

export {
	Registration,
	LoginPost,
	ForgotPasswordPost,
	ConfirmEmail,
	ResetPassword,
	ResetPasswordPost,
};
