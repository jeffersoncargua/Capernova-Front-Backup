import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { GetAllVideos } from "../../../apiServices/ManagmentServices/ManagmentCourseServices";

export const Temario = ({ capitulo }) => {
	const [temas, setTemas] = useState([]);

	const FetchVideos = useCallback(async () => {
		try {
			const resultFromApi = await GetAllVideos(capitulo.id);

			const resultFetch = await resultFromApi.json();

			if (resultFromApi.status !== 200 && resultFromApi.status !== 400) {
				throw resultFetch;
			}
			if (resultFetch.isSuccess) {
				setTemas(resultFetch.result);
			} else {
				setTemas([]);
			}
		} catch (error) {
			console.error(error);
			toast.error("Algo ha fallado en nuestro servidor. Inténtelo más tarde");
		}
	}, [capitulo]);

	useEffect(() => {
		FetchVideos();
	}, [FetchVideos]);

	return (
		<ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
			{temas.length > 0 &&
				temas.map((tema) => (
					<li key={tema.id} className="flex items-center">
						<svg
							className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
						</svg>
						{tema.titulo}
					</li>
				))}
		</ul>
	);
};
