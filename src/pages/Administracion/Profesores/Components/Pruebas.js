import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ModalDelete } from "../../Components";
//import {ModalPrueba, ModalDeletePrueba, ModalSuccess} from '../Components'
import { ModalPrueba, ModalSuccess } from "../Components";
import { GetAllTest } from "../../../../apiServices/TeacherServices/TeacherServices";

export const Pruebas = ({
	setShowCursos,
	setShowVideos,
	curso,
	//setCurso,
	//setShowDeberes,
	//setShowPruebas,
}) => {
	const [pruebas, setPruebas] = useState([]);
	const [prueba, setPrueba] = useState({});
	const [showModalPrueba, setShowModalPrueba] = useState(false);
	const [showModalDelete, setShowModalDelete] = useState(false);
	const [showModalSuccess, setShowModalSuccess] = useState(false);
	const [response, setResponse] = useState({});
	const [tipo, setTipo] = useState("");
	const [objeto, setObjeto] = useState({});

	const GetPruebas = useCallback(async () => {
		try {
			const resultFromApi = await GetAllTest(curso.id);

			const resultFetch = await resultFromApi.json();

			if (resultFromApi.status !== 200 && resultFromApi.status !== 400) {
				throw resultFetch;
			}
			if (resultFetch.isSuccess) {
				setPruebas(resultFetch.result);
			} else {
				setPruebas([]);
			}
		} catch (error) {
			console.error(error);
			toast.error("Algo ha fallado en nuestro servidor. Inténtelo más tarde");
		}
	}, [curso]);

	useEffect(() => {
		GetPruebas();
	}, [GetPruebas]);

	const handleEditPrueba = (test) => {
		setShowModalPrueba(true);
		setPrueba(test);
	};

	const handleDeletePrueba = (test) => {
		setShowModalDelete(!showModalDelete);
		setObjeto(test);
		setTipo("prueba");
	};

	//Esta funcion permite enviar la informacion para editar el curso en la base de datos
	// const handleCursoEdit = async() => {
	//   setShowButtonLoading(true);
	//   try {
	//     const result = await fetch(`https://localhost:7164/api/Course/updateCourse/${curso.id}`,{
	//       method: 'PUT',
	//       credentials:'include',
	//       headers:{
	//         'Content-Type' : 'application/json',
	//         'Accept' : 'application/json'
	//       },
	//       body:(JSON.stringify({
	//         id: curso.id,
	//         imageUrl: curso.imageUrl,
	//         titulo: curso.titulo,
	//         descripcion: curso.descripcion,
	//         state: curso.state,
	//         deberes: JSON.parse(curso.deberes),
	//         pruebas: pruebas,
	//         notaFinal : curso.notaFinal,
	//         teacherId: curso.teacherId,
	//         price: curso.price,
	//         isActive: curso.isActive,
	//         capituloList: JSON.parse(curso.capitulos)
	//       }))
	//     });
	//     const resultFetch =await result.json();
	//     setResponse(resultFetch);
	//     console.log(resultFetch);
	//     setShowButtonLoading(false);
	//     setShowModalSuccess(true);
	//   } catch (error) {
	//     setShowButtonLoading(false);
	//     console.error(error);
	//   }
	// }

	return (
		<div className="w-[95%] mx-auto">
			<h1 className="text-center font-medium text-xl dark:text-white">
				Pruebas Capernova
			</h1>
			{/*Se muestran los modales para la generacion, edicion y eliminacion de los capitulos y videos del curso */}
			{showModalPrueba && (
				<ModalPrueba
					showModalPrueba={showModalPrueba}
					setShowModalPrueba={setShowModalPrueba}
					prueba={prueba}
					setPrueba={setPrueba}
					curso={curso}
					// setResponse={
					// 	setResponse
					// } /*pruebas={pruebas} setPruebas={setPruebas}*/
					GetPruebas={GetPruebas}
				/>
			)}

			{showModalDelete && (
				<ModalDelete
					showModalDelete={showModalDelete}
					setShowModalDelete={setShowModalDelete}
					objeto={objeto}
					setObjeto={setObjeto}
					//setResponse={setResponse}
					tipo={tipo}
					setTipo={setTipo}
					getFunction={GetPruebas}
				/>
			)}
			{showModalSuccess && (
				<ModalSuccess
					showModalSuccess={showModalSuccess}
					setShowModalSuccess={setShowModalSuccess}
					response={response}
					setResponse={setResponse}
					setShowCursos={setShowCursos}
					setShowVideos={setShowVideos}
					//setShowDeberes={setShowDeberes}
					//setShowPruebas={setShowPruebas}
				/>
			)}

			<div className="w-[95%] mx-auto mt-5 flex justify-between">
				<div className="group dark:text-white">
					<label className="mr-2 font-medium" htmlFor="titulo">
						Curso:{" "}
					</label>
					<input
						type="text"
						className="rounded-lg bg-transparent dark:bg-slate-900 border-0"
						name="titulo"
						i //d="titulo"
						defaultValue={curso.titulo}
					/>
				</div>
				<div>
					<button
						type="button"
						onClick={() => {
							setShowModalPrueba(true);
							setPrueba({});
						}}
						className="bg-green-500 hover:bg-green-700 hover:text-white hover:cursor-pointer flex items-center px-4 py-2 rounded-lg"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							className="bi bi-plus-circle h-4 w-4 mr-2"
							viewBox="0 0 16 16"
						>
							<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
							<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
						</svg>
						Agregar Prueba
					</button>
				</div>
			</div>

			{/*Aqui va la tabla con el contenido del capitulo */}
			<div className="w-[95%] mx-auto border-2 border-gray-400 my-10 rounded-lg">
				{/*tabla con la informacion de los deberes */}
				<div className="overflow-x-auto">
					<table className="w-full text-sm text-left dark:text-white">
						<thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
							<tr>
								{/* <th scope="col" className="px-4 py-3">Id</th> */}
								<th scope="col" className="px-4 py-3">
									Titulo
								</th>
								<th scope="col" className="px-4 py-3 ">
									Descripcion
								</th>
								<th scope="col" className="px-4 py-3 ">
									Test
								</th>
								<th scope="col" className="px-4 py-3">
									Editar/Eliminar
								</th>
							</tr>
						</thead>
						<tbody>
							{pruebas.length > 0 ? (
								pruebas.map((test) => (
									<tr key={test.id} className="border-b dark:border-gray-700">
										{/* <td className="px-4 py-3">{test.Id}</td> */}
										<td className="px-4 py-3">{test.titulo}</td>
										<td className="px-4 py-3 line-clamp-2">{test.detalle}</td>
										<td className="px-4 py-3">{test.test.slice(0, 43)}...</td>
										<td className="px-4 py-3">
											<div className="py-1 flex justify-start">
												<button
													type="button"
													onClick={() => handleEditPrueba(test)}
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
													Editar
												</button>
												<button
													type="button"
													onClick={() => handleDeletePrueba(test)}
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
											</div>
										</td>
									</tr>
								))
							) : (
								<tr className="border-b dark:border-gray-700">
									<td className="font-medium text-xl mb-10 p-5">
										No se han encontrado registros...
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>

			{/* <div className="flex justify-end my-10">
        {showButtonLoading ? 
        (<button disabled className="flex items-center px-4 py-2 bg-blue-400 hover:bg-blue-600 text-gray 900 hover:text-white text-sm rounded-lg hover:scale-125">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-floppy w-5 h-5 mr-2" viewBox="0 0 16 16">
            <path d="M11 2H9v3h2z"/>
            <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z"/>
          </svg>
          ...Procensando
        </button>)
        :
        (<button onClick={()=> handleCursoEdit()} className="flex items-center px-4 py-2 bg-gray-400 hover:bg-gray-600 text-gray 900 hover:text-white text-sm rounded-lg hover:scale-125">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-floppy w-5 h-5 mr-2" viewBox="0 0 16 16">
            <path d="M11 2H9v3h2z"/>
            <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z"/>
          </svg>
          Guardar
        </button>)
        }
        
      </div> */}
		</div>
	);
};
