export const useFetch = async ({
	verbose,
	route,
	object = null,
	authToken = null,
	query = "",
}) => {
	const apiURL = process.env.REACT_APP_API_URL;
	var response;

	let headers = {
		"Content-Type": "application/json",
		Accept: "application/json",
		Authorization: authToken !== null && `Bearer ${authToken}`,
	};

	switch (verbose) {
		case "GET":
			await fetch(`${apiURL}${route + query}`, {
				method: verbose,
				headers: headers,
			})
				.then((result) => (response = result))
				.catch((error) => console.error(error));
			break;
		default:
			await fetch(`${apiURL}${route + query}`, {
				method: verbose,
				headers: headers,
				body: JSON.stringify(object),
			})
				.then((result) => (response = result))
				//.then((response) => response.json)
				.catch((error) => console.error(error));
			break;
	}

	return response;
};
