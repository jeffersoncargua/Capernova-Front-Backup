import { Link } from "react-router-dom";

export const ModalPruebaDetail = ({
	showModalPruebaDetail,
	setShowModalPruebaDetail,
	matricula,
	prueba
	//GetTests
}) => {
	return (
		<div
			//id="crud-modal"
			tabIndex="-1"
			className={`${showModalPruebaDetail ? "" : "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] bg-gray-700/[0.6]`}
		>
			<div className="relative p-4 mx-auto w-full max-w-2xl max-h-full">
				{/*<!-- Modal content -->*/}
				<div className="relative bg-white my-[0.15%] rounded-lg shadow dark:bg-gray-700 mb-14">
					{/*<!-- Modal header -->*/}
					<div className="flex items-center justify-between p-4 md:p-5 dark:border-gray-600">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
							{`Prueba Capernova del curso ${matricula.curso.titulo}`}
						</h3>
						<button
							onClick={() => setShowModalPruebaDetail(false)}
							type="button"
							className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
							data-modal-toggle="crud-modal"
						>
							<svg
								className="w-3 h-3"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 14 14"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
								/>
							</svg>
							<span className="sr-only">Close modal</span>
						</button>
					</div>
					{/*<!-- Modal body -->*/}
					<div className="p-4 md:p-5">
						<div className="grid gap-4 mb-4 grid-cols-2 group text-black dark:text-white">
							<div className="col-span-2 ">
								<label
									htmlFor="titulo"
									className="block mb-2 text-sm font-medium "
								>
									Titulo
								</label>
								<input
									type="text"
									disabled
									name="titulo"
									//id="titulo"
									className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
									placeholder="Escribe el Titulo"
									required=""
									defaultValue={prueba.titulo || ""}
								/>
							</div>
							<div className="col-span-2 ">
								<label
									htmlFor="detalle"
									className="block mb-2 text-sm font-medium  "
								>
									Detalle
								</label>
								<textarea
									//id="detalle"
									disabled
									name="detalle"
									rows="17"
									className="block p-2.5 w-full text-sm  bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="Escribe la descripción del curso aquí"
									defaultValue={prueba.detalle}
								></textarea>
							</div>
						</div>
						<Link
							to={prueba.test}
							target="_blank"
							className="text-white inline-flex items-center bg-blue-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-green-700 dark:focus:ring-blue-800"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								class="bi bi-check-circle w-5 h-5 me-3 text-white"
								viewBox="0 0 16 16"
							>
								<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
								<path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
							</svg>
							Realizar Prueba
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
