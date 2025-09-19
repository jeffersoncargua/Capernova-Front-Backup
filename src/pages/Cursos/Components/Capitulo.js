import { useState, useEffect } from "react";
import { Temario } from "../Components";
import { toast } from "react-toastify";
import { GetAllCapitulo } from "../../../apiServices/ManagmentServices/ManagmentCourseServices";

export const Capitulo = ({ curso }) => {
	const [capitulos, setCapitulos] = useState([]);
	console.log(curso);

	useEffect(() => {
		const FetchCapitulos = async () => {
			try {
				var resultFromApi = await GetAllCapitulo(curso.id);

				const resultFetch = await resultFromApi.json();

				if (resultFromApi.status !== 200 && resultFromApi.status !== 400) {
					throw resultFetch;
				}
				if (resultFetch.isSuccess) {
					setCapitulos(resultFetch.result);
				} else {
					setCapitulos([]);
				}
			} catch (error) {
				console.error(error);
				toast.error("Algo ha fallado en nuestro servidor. Inténtelo más tarde");
			}
		};

		if (Object.keys(curso).length > 0) {
			FetchCapitulos();
		}
	}, [curso]);

	return (
		<div className="mt-5">
			{capitulos.length > 0 &&
				capitulos.map((capitulo) => (
					<>
						<h2
							translate="no"
							key={capitulo.id}
							className="text-start mb-2 text-lg font-semibold text-gray-900 dark:text-white"
						>
							{capitulo.titulo}
						</h2>
						<Temario capitulo={capitulo} />
					</>
				))}
		</div>
	);
};
