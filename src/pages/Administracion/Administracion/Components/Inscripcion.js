import { useRef, useState, useEffect } from "react";
import { ModalInscripcion } from "../Components";
import { ModalDelete } from "../../Components";
import { toast } from "react-toastify";
import { GetMatricula } from "../../../../apiServices/ManagmentServices/ManagmentStudentServices";
import { GetUser } from "../../../../apiServices/GeneralServices";

export const Inscripcion = () => {
	const [user, setUser] = useState({});
	const [matriculaList, setMatriculaList] = useState([]);
	const [response, setResponse] = useState({});
	const [responseSearch, setResponseSearch] = useState({});
	const [showMessage, setShowMessage] = useState(false);
	const [showModalInscripcion, setShowModalInscripcion] = useState(false);
	const [showModalDelete, setShowModalDelete] = useState(false);
	const [objeto, setObjeto] = useState({});
	const [tipo, setTipo] = useState("");
	const refUser = useRef();

	useEffect(() => {
		const fetchMatricula = async () => {
			if (user.id) {
				var result = await GetMatricula(user.id);

				const resultFetch = await result.json();

				if (resultFetch.isSuccess) {
					setMatriculaList(resultFetch.result);
				} else {
					setMatriculaList([]);
				}
			}
		};

		fetchMatricula();

		response.isSuccess
			? toast.success(response.message)
			: toast.error(response.message);
	}, [user, response]);

	const handleSearchUser = async (e) => {
		e.preventDefault();
		try {
			var resultFromApi = await GetUser(refUser.current.value);

			const resultFetch = await resultFromApi.json();

			if (resultFromApi.status !== 200 && resultFromApi.status !== 400) {
				throw resultFetch;
			}

			if (resultFetch.isSuccess) {
				setShowMessage(true);
				setResponseSearch(resultFetch);
				setUser(resultFetch.result);
			} else {
				setShowMessage(true);
				setResponseSearch({});
				setUser({});
			}
		} catch (error) {
			toast.error(
				"Error. Algo ocurrió en nuestros servidores. Inténtelo nuevamente!!!",
			);
		}
	};

	const handleDelete = (matricula) => {
		setObjeto(matricula);
		setTipo("matricula");
		setShowModalDelete(true);
		setResponse({});
	};

	const handleChange = (e) => {
		e.preventDefault();
		if (refUser.current.value.length <= 0) {
			setShowMessage(false);
			setResponse({});
			setResponseSearch({});
			setUser({});
			setMatriculaList([]);
		}
	};

	return (
		<div className="">
			{showModalInscripcion && (
				<ModalInscripcion
					showModalInscripcion={showModalInscripcion}
					setShowModalInscripcion={setShowModalInscripcion}
					setResponse={setResponse}
					user={user}
				/>
			)}
			{showModalDelete && (
				<ModalDelete
					showModalDelete={showModalDelete}
					setShowModalDelete={setShowModalDelete}
					objeto={objeto}
					setObjeto={setObjeto}
					setResponse={setResponse}
					tipo={tipo}
					setTipo={setTipo}
				/>
			)}

			<h1 className="text-center font-medium text-xl dark:text-white mb-10">
				Inscripciones Capernova
			</h1>
			<div className="w-[95%] mx-auto">
				<form onSubmit={handleSearchUser} className="flex justify-center">
					<label htmlFor="user"></label>
					<input
						onChange={handleChange}
						id="user"
						name="user"
						type="text"
						placeholder="Buscar usuario por correo, nombre o apellido"
						className="w-96 rounded-lg right-2 focus:ring-blue-400 dark:bg-slate-800 dark:text-white"
						required
						ref={refUser}
					/>
					<button
						type="submit"
						className="bg-blue-700 hover:bg-green-700 px-2 py-2 flex items-center rounded-lg ms-3 group "
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							className="bi bi-search w-5 h-5 text-black group-hover:text-white"
							viewBox="0 0 16 16"
						>
							<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
						</svg>
						<span className="ms-3 text-black group-hover:text-white">
							Buscar
						</span>
					</button>
				</form>

				{showMessage && (
					<h1
						className={`${responseSearch.isSuccess ? "text-green-400" : "text-red-400"} mt-6 flex items-center`}
					>
						<span
							className={`${responseSearch.isSuccess ? "bg-green-400" : "bg-red-400"} flex w-3 h-3 me-3 rounded-full`}
						></span>{" "}
						{responseSearch.isSuccess
							? "Usuario registrado"
							: "No existe registros del usuario"}
					</h1>
				)}

				{responseSearch.isSuccess && (
					<div class="relative overflow-x-auto mt-6">
						<div className="flex justify-between items-center my-5">
							<h1 className="text-center font-medium text-xl dark:text-white ">
								Registros del Estudiante
							</h1>
							<button
								onClick={() => setShowModalInscripcion(true)}
								className="bg-green-700 hover:bg-green-500 px-2 py-2 flex items-center rounded-lg ms-3 text-black group "
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									className="bi bi-plus-circle h-4 w-4 mr-2 group-hover:text-white"
									viewBox="0 0 16 16"
								>
									<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
									<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
								</svg>
								<span className="group-hover:text-white">Agregar</span>
							</button>
						</div>

						<table class="w-full text-sm text-left rtl:text-right text-black dark:text-white">
							<thead class="text-xs text-black uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
								<tr>
									<th scope="col" className="px-6 py-3">
										Curso
									</th>
									<th scope="col" className="px-6 py-3">
										Código
									</th>
									<th scope="col" className="px-6 py-3">
										Acciones
									</th>
								</tr>
							</thead>
							<tbody>
								{matriculaList.length > 0 ? (
									matriculaList.map((matricula) => (
										<tr
											key={matricula.id}
											className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
										>
											<td className="px-6 py-4">{matricula.curso.titulo}</td>
											<td className="px-6 py-4">{matricula.curso.codigo}</td>
											<td className="px-6 py-4">
												<button
													onClick={() => handleDelete(matricula)}
													className="flex items-center justify-center py-2 px-4 text-sm text-gray-900 hover:text-white bg-red-500 hover:bg-red-600 rounded-lg"
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="currentColor"
														className="bi bi-trash3 w-4 h-4 mr-2"
														viewBox="0 0 16 16"
													>
														<path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
													</svg>
													Eliminar
												</button>
											</td>
										</tr>
									))
								) : (
									<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
										<td className="px-6 py-4">
											No existen registros del estudiante ....
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
	);
};
