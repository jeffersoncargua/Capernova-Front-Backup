import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GetTaskGrade } from "../../../apiServices/StudentServices/StudentServices";

export const NotaDeber = ({ deber, matricula }) => {
	const [notaDeber, setNotaDeber] = useState({});

	const GetNotaDeber = useCallback(async () => {
		try {
			const resultFromApi = await GetTaskGrade(
				deber.id,
				matricula.estudianteId,
			);

			const resultFetch = await resultFromApi.json();

			if (resultFromApi.status !== 200 && resultFromApi.status !== 400) {
				throw resultFetch;
			}
			if (resultFetch.isSuccess) {
				setNotaDeber(resultFetch.result);
			}
		} catch (error) {
			console.error(error);
			toast.error("Algo ha fallado en nuestro servidor. Inténtelo más tarde");
		}
	}, [deber, matricula]);

	useEffect(() => {
		GetNotaDeber();
	}, [GetNotaDeber]);

	return (
		<>
			<td className="px-6 py-4 ">{notaDeber.estado || "Por entregar"}</td>
			<td className="px-6 py-4 ">
				{notaDeber.observacion || "No se ha encontrado un archivo"}
			</td>
			<td className="px-6 py-4 ">
				{notaDeber.calificacion || "Sin calificación"}
			</td>
		</>
	);
};
