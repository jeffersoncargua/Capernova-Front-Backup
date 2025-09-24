import { useCallback, useEffect, useState } from "react";
import { Capitulo } from "../Components";
import { toast } from "react-toastify";
import { GetProductCode } from "../../../apiServices/ManagmentServices/ManagmentCourseServices";

export const Contenido = ({ codigo }) => {
	const [curso, setCurso] = useState({});

	const FetchCapitulos = useCallback(async () => {
		try {
			const resultFromApi = await GetProductCode(codigo);

			const resultFetch = await resultFromApi.json();

			if (resultFromApi.status !== 200 && resultFromApi.status !== 400) {
				throw resultFetch;
			}
			if (resultFetch.isSuccess) {
				setCurso(resultFetch.result);
			} else {
				toast.error(resultFetch.message);
			}
		} catch (error) {
			console.error(error);
			toast.error("Algo ha fallado en nuestro servidor. Inténtelo más tarde");
		}
	}, [codigo]);

	useEffect(() => {
		FetchCapitulos();
	}, [FetchCapitulos]);

	return (
		<div>
			<Capitulo curso={curso} />
		</div>
	);
};
