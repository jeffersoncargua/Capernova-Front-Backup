import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import {
	GetTestNota,
	UpsertTestNota,
} from "../../../../apiServices/TeacherServices/TeacherServices";

export const CalificarPrueba = ({ prueba, matricula, GetNotaPruebas }) => {
	const refCalificacionPrueba = useRef();
	const [notaPrueba, setNotaPrueba] = useState({});
	//const [response, setResponse] = useState({});
	const [showButtonLoading, setShowButtonLoading] = useState(false);

	const GetNotaPrueba = useCallback(async () => {
		try {
			const resultFromApi = await GetTestNota(
				prueba.id,
				matricula.estudianteId,
			);

			const resultFetch = await resultFromApi.json();

			if (resultFromApi.status !== 200 && resultFromApi.status !== 400) {
				throw resultFetch;
			}

			if (resultFetch.isSuccess) {
				setNotaPrueba(resultFetch.result);
			}
		} catch (error) {
			console.error(error);
			toast.error("Algo ha fallado en nuestro servidor. Inténtelo más tarde");
		}
	}, [prueba, matricula]);

	useEffect(() => {
		GetNotaPrueba();
	}, [GetNotaPrueba]);

	const handleCalificarPrueba = async (_notaPrueba) => {
		setShowButtonLoading(true);
		try {
			const resultFromApi = await UpsertTestNota(
				prueba.id || 0,
				matricula.estudianteId,
				refCalificacionPrueba.current.value,
			);

			const resultFetch = await resultFromApi.json();

			if (resultFromApi.status !== 200 && resultFromApi.status !== 400) {
				throw resultFetch;
			}

			//setResponse(resultFetch);

			resultFetch.isSuccess
				? toast.success(resultFetch.message)
				: toast.error(resultFetch.message);

			GetNotaPrueba();
			GetNotaPruebas();

			setShowButtonLoading(false);
		} catch (error) {
			console.error(error);
			toast.error("Ha ocurrido un error en el servidor");
			setShowButtonLoading(false);
		}
	};

	return (
		<>
			<td className="px-4 py-3">{notaPrueba.observacion || "Sin revisar"}</td>
			<td className="px-4 py-3">{notaPrueba.estado || "Sin calificar"}</td>
			<td className="px-4 py-3">
				<input
					type="text"
					name="calificacion"
					//id="calificacion"
					className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
					defaultValue={notaPrueba.calificacion}
					ref={refCalificacionPrueba}
				/>
			</td>
			<td className="px-4 py-3">
				<div className="flex justify-center space-x-3 items-center">
					{showButtonLoading ? (
						<button
							type="button"
							className="flex items-center justify-center py-2 px-4 text-sm text-gray-900 hover:text-white bg-yellow-300 hover:bg-yellow-400 rounded-lg mr-2"
						>
							<svg
								aria-hidden="true"
								//role="status"
								className="inline w-4 h-4 me-3 text-white animate-spin"
								viewBox="0 0 100 101"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
									fill="#E5E7EB"
								/>
								<path
									d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
									fill="currentColor"
								/>
							</svg>
							Calificando Prueba ...
						</button>
					) : (
						<button
							type="button"
							onClick={() => {
								handleCalificarPrueba(notaPrueba);
							}}
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
							Calificar Prueba
						</button>
					)}
				</div>
			</td>
		</>
	);
};
