import { useEffect, useState } from "react";
import { NotaDeber, ModalDeber } from "../components";
import { toast } from "react-toastify";
import { GetTasksStudent } from "../../../apiServices/StudentServices/StudentServices";

export const DeberDetail = ({ matricula }) => {
	const [deberList, setDeberList] = useState([]);
	const [deber, setDeber] = useState({});
	const [showModalDeber, setShowModalDeber] = useState(false);
	const [response, setResponse] = useState({});
	const column = ["Deber", "Descripción", "Estado", "File", "Nota", "Acciones"];

	useEffect(() => {
		const FecthDeberes = async () => {
			try {
				var resultFromApi = await GetTasksStudent(matricula.cursoId);

				const resultFetch = await resultFromApi.json();

				if (resultFromApi.status !== 200 && resultFromApi.status !== 400) {
					throw resultFetch;
				}
				if (resultFetch.isSuccess) {
					setDeberList(resultFetch.result);
				} else {
					setDeberList([]);
				}
			} catch (error) {
				console.error(error);
				toast.error("Algo ha fallado en nuestro servidor. Inténtalo más tarde");
				setDeberList([]);
			}
		};

		FecthDeberes();
		response.isSuccess
			? toast.success(response.message)
			: toast.error(response.message);
	}, [matricula, response]);

	const handleSelectedDeber = (deber) => {
		setShowModalDeber(true);
		setDeber(deber);
	};

	return (
		<div className="w-[95%] mx-auto">
			<h1 className="text-center font-medium text-xl dark:text-white mb-10">
				Deberes Curso {matricula.curso.titulo}
			</h1>

			{showModalDeber && (
				<ModalDeber
					showModalDeber={showModalDeber}
					setShowModalDeber={setShowModalDeber}
					matricula={matricula}
					deber={deber}
					setResponse={setResponse}
				/>
			)}
			<div className="overflow-x-auto">
				<table className="w-full text-sm text-left rtl:text-right text-black dark:text-white">
					<thead className="text-xs text-black uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
						<tr>
							{column.map((itemHeader, index) => (
								<th key={index} scope="col" className="px-6 py-3">
									{itemHeader}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{deberList.length > 0 ? (
							deberList.map((deber) => (
								<tr
									key={deber.id}
									className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
								>
									<th
										scope="row"
										className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
									>
										{deber.titulo}
									</th>
									<td className="px-6 py-4 line-clamp-2 ">{deber.detalle}</td>
									<NotaDeber deber={deber} matricula={matricula} />
									<td className="px-4 py-3">
										<div className="py-1 flex justify-start">
											<button
												onClick={() => handleSelectedDeber(deber)}
												className="flex items-center justify-center py-2 px-4 text-sm text-gray-900 hover:text-white bg-yellow-300 hover:bg-yellow-400 rounded-lg mr-2"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="currentColor"
													className="bi bi-pencil-square h-4 w-4 mr-2"
													viewBox="0 0 16 16"
												>
													<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
													<path
														fillRule="evenodd"
														d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
													/>
												</svg>
												Ver Deber
											</button>
										</div>
									</td>
								</tr>
							))
						) : (
							<tr className="border-b dark:border-gray-700">
								<td className="font-medium text-md mb-10 p-5">
									No se han encontrado deberes registrados...
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};
