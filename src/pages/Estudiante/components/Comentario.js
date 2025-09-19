import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { CreateCommentary } from "../../../apiServices/StudentServices/StudentServices";

export const Comentario = ({ estudiante, matricula }) => {
	const [showButtonLoading, setShowButtonLoading] = useState(false);
	const refFeedBack = useRef();

	const handleSubmit = async (event) => {
		event.preventDefault();
		setShowButtonLoading(true);
		try {
			var resultFromApi = await CreateCommentary({
				name: estudiante.name,
				lastName: estudiante.lastName,
				photoUrl: estudiante.photoUrl,
				feedback: refFeedBack.current.value,
				titulo: matricula.curso.titulo,
			});

			const resultFetch = await resultFromApi.json();

			if (resultFromApi.status !== 200 && resultFromApi.status !== 400) {
				throw resultFetch;
			}

			resultFetch.isSuccess
				? toast.success(resultFetch.message)
				: toast.error(resultFetch.message);
			setShowButtonLoading(false);
			refFeedBack.current.value = "";
		} catch (error) {
			setShowButtonLoading(false);
			console.error(error);
			toast.error("Algo ha fallado en nuestro servidor. Inténtelo más tarde.");
		}
	};

	return (
		<div className="my-8 w-[95%] md:w-2/3 mx-auto flex flex-col sm:ml-4 justifify-center">
			<form onSubmit={handleSubmit}>
				<label
					htmlFor="message"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>
					Dejanos tu comentario
				</label>
				<textarea
					id="message"
					rows="4"
					className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					required
					placeholder="Escribe tu comentario aqui..."
					ref={refFeedBack}
				></textarea>
				{showButtonLoading ? (
					<button
						disabled
						className=" w-36 my-3 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						Cargando....
					</button>
				) : (
					<button
						type="submit"
						className=" w-36 my-3 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						Enviar
					</button>
				)}
			</form>
		</div>
	);
};
