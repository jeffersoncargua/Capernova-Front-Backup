import { useEffect, useState } from "react";

export const useFetchCourse = (search = null) => {
	const [data, setData] = useState(null);

	useEffect(() => {
		const fetchCurso = async () => {
			const resultFromApi = await fetch(
				`https://localhost:7164/api/Course/getAllCourse?search=${search}`,
				{
					method: "GET",
					credentials: "include",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
					},
				},
			);
			const resultFetch = await resultFromApi.json();
			setData(resultFetch.result);
		};
		fetchCurso();
	}, [search]);

	return { data };
};
