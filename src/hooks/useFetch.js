export const useFetch = async ({
	verbose,
	route,
	object = null,
	authToken = null,
	query = "",
}) => {
	const apiURL = process.env.REACT_APP_API_URL;
	var response;

	const headers = {
		"Content-Type": "application/json;charset=utf-8",
		Accept: "application/json",
		"Access-Control-Allow-Origin": `${apiURL}`,
		Authorization: authToken !== null && `Bearer ${authToken}`,
	};

	switch (verbose) {
		case "GET":
			await fetch(`${apiURL}${route + query}`, {
				method: verbose,
				headers: headers,
			})
				.then((result) => {
					response = result;
				})
				.catch((error) => console.error(error));
			break;
		default:
			await fetch(`${apiURL}${route + query}`, {
				method: verbose,
				headers: headers,
				body: JSON.stringify(object),
			})
				.then((result) => {
					response = result;
				})
				//.then((response) => response.json)
				.catch((error) => console.error(error));
			break;
	}

	return response;
};
