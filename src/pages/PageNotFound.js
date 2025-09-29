import { useNavigate } from "react-router-dom";

export const PageNotFound = () => {
	const navigate = useNavigate();

	return (
		<div className="w-[95%] mx-auto flex  flex-col items-align mt-10 group text-black dark:text-white space-y-8 mb-10">
			<h1 className="self-center text-3xl md:text-5xl text-center">
				Opps! Página no encontrada!!!
			</h1>
			<h1 className="self-center text-4xl md:text-6xl">Error 404!!!</h1>
			<div className="w-full flex justify-center">
				<img
					src={`https://drive.google.com/thumbnail?id=1CjG6zjh5dgt7DzMFkZXAyPKaYQJTpU3T`}
					alt="aqui va la imagen"
				/>
			</div>
			<div className="self-center mb-10">
				<button
					type="button"
					onClick={() => navigate("/")}
					className="flex items-align rounded-lg px-3 py-2.5 text-black dark:text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 hover:dark:bg-blue-800"
				>
					Regresar Página de Inicio
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						className="bi bi-house-door-fill w-5 h-5 ms-2 "
						viewBox="0 0 16 16"
					>
						<path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
					</svg>
				</button>
			</div>
		</div>
	);
};
