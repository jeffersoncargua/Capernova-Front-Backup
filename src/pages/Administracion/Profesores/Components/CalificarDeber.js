import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
	GetTaskNota,
	UpdateTaskNota,
} from "../../../../apiServices/TeacherServices/TeacherServices";

export const CalificarDeber = ({ deber, matricula }) => {
	const refCalificacionDeber = useRef();
	const [notaDeber, setNotaDeber] = useState({});
	//const [response, setResponse] = useState({});
	const [showButtonLoading, setShowButtonLoading] = useState(false);

	const GetNotaDeber = useCallback(async () => {
		try {
			const resultFromApi = await GetTaskNota(deber.id, matricula.estudianteId);

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

	const handleCalificarDeberes = async (notaDeber) => {
		setShowButtonLoading(true);
		try {
			if (notaDeber.id) {
				const resultFromApi = await UpdateTaskNota(
					notaDeber.id,
					matricula.estudianteId,
					refCalificacionDeber.current.value,
				);

				const resultFetch = await resultFromApi.json();

				if (resultFromApi.status !== 200 && resultFromApi.status !== 400) {
					throw resultFetch;
				}

				//setResponse(resultFetch);

				setShowButtonLoading(false);

				resultFetch.isSuccess
					? toast.success(resultFetch.message)
					: toast.error(resultFetch.message);
			} else {
				setShowButtonLoading(false);
				toast.error("Aún no se ha entregado el deber. Inténtelo mas tarde");
			}
		} catch (error) {
			console.error(error);
			toast.error("Algo ha fallado en nuestro servidor. Inténtelo más tarde");
			setShowButtonLoading(false);
		}
	};

	return (
		<>
			<td className="px-4 py-3">{notaDeber.observacion || "Sin archivo"}</td>
			<td className="px-4 py-3">{notaDeber.estado || "Sin entregar"}</td>
			<td className="px-4 py-3">
				<input
					type="text"
					name="calificacion"
					//id="calificacion"
					className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
					defaultValue={notaDeber.calificacion}
					ref={refCalificacionDeber}
				/>
			</td>
			<td className="px-4 py-3">
				<div className="flex justify-center space-x-3 items-center">
					<Link
						to={`https://drive.google.com/file/d/${notaDeber.fileUrl}/preview`}
						target="_blank"
						className="flex items-center justify-center py-2 px-4 text-sm text-gray-900 hover:text-white bg-green-300 hover:bg-green-400 rounded-lg mr-2"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							className="bi bi-eye h-4 w-4 mr-2"
							viewBox="0 0 16 16"
						>
							<path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
							<path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
						</svg>
						Revisar Deber
					</Link>
					{showButtonLoading ? (
						<button
							type="button"
							disabled
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
							Calificando Deber...
						</button>
					) : (
						<button
							type="button"
							onClick={() => {
								handleCalificarDeberes(notaDeber);
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
							Calificar Deber
						</button>
					)}
				</div>
			</td>
		</>
	);
};
