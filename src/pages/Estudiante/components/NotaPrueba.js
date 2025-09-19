import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GetTaskGrade } from "../../../apiServices/StudentServices/StudentServices";

export const NotaPrueba = ({ test, matricula }) => {
	const [notaPrueba, setNotaPrueba] = useState({});

	useEffect(() => {
		const GetNotaPrueba = async () => {
			try {
				var resultFromApi = await GetTaskGrade(test.id, matricula.estudianteId);

				const resultFetch = await resultFromApi.json();

				if (resultFromApi.status !== 200) {
					throw resultFetch;
				}
				if (resultFetch.isSuccess) {
					setNotaPrueba(resultFetch.result);
				}
			} catch (error) {
				if (error.statusCode !== 400) {
					console.error(error);
					toast.error(
						"Algo ha fallado en nuestro servidor. Inténtelo más tarde",
					);
				}
			}
		};

		GetNotaPrueba();
	}, [test, matricula]);

	return (
		<>
			<td className="px-6 py-4 ">{notaPrueba.estado || "Por realizar"}</td>
			<td className="px-6 py-4 ">
				{notaPrueba.observacion || "No existe registro"}
			</td>
			<td className="px-6 py-4 ">
				{notaPrueba.calificacion || "Sin calificación"}
			</td>
		</>
	);
};
