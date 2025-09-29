import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GetCoursesStudent } from "../../../apiServices/StudentServices/StudentServices";

export const CursoLive = ({ estudiante }) => {
	const column = ["Curso", "Descripción", "Acciones"];
	const [matriculaList, setMatriculaList] = useState([]);
	const navigate = useNavigate();

	const FecthCourses = useCallback(async () => {
		try {
			const resultFromApi = await GetCoursesStudent(estudiante.id);

			const resultFetch = await resultFromApi.json();

			if (resultFromApi.status !== 200 && resultFromApi.status !== 400) {
				throw resultFetch;
			}
			if (resultFetch.isSuccess) {
				setMatriculaList(resultFetch.result);
			}
		} catch (error) {
			console.error(error);
			navigate("/error");
		}
	}, [estudiante, navigate]);

	useEffect(() => {
		FecthCourses();
	}, [FecthCourses]);

	return (
		<div>
			<h1 className="text-center font-medium text-xl dark:text-white mb-10">
				Cursos en Vivo de Capernova
			</h1>

			<div className="overflow-x-auto">
				<table className="w-full text-sm text-left rtl:text-right text-black dark:text-white">
					<thead className="text-xs text-black uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
						<tr>
							{column.map((itemHeader) => (
								<th key={Math.random()} scope="col" className="px-6 py-3">
									{itemHeader}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{matriculaList.length > 0 &&
							matriculaList.map((matricula) => (
								<tr
									key={matricula.id}
									className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
								>
									<th
										scope="row"
										className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
									>
										{matricula.curso.titulo}
									</th>
									<td className="px-6 py-4 line-clamp-2 ">
										{matricula.curso.claseUrl
											? "Cuenta con clases en vivo"
											: "No cuenta con clases en vivo"}
									</td>
									<td className="px-4 py-3">
										{matricula.curso.claseUrl ? (
											<div className="py-1 flex justify-start">
												<Link
													to={matricula.curso.claseUrl}
													target="_blank"
													className="flex items-center justify-center py-2 px-4 text-sm text-black dark:text-white bg-green-500 hover:bg-green-600 rounded-lg mr-2"
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="currentColor"
														class="bi bi-check-circle w-5 h-5 me-3 text-black dark:text-white"
														viewBox="0 0 16 16"
													>
														<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
														<path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
													</svg>
													Ir a la clase
												</Link>
											</div>
										) : null}
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
};
