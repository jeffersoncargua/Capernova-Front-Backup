import { useState } from "react";

export const SideBar = ({
	setShowInformacion,
	setShowCursos,
	setShowVideos,
	setShowEstudiantes,
	setShowDeberes,
	setShowPruebas,
	setResponse,
}) => {
	const [showBar, setShowBar] = useState(false);

	return (
		<div className="relative mt-4">
			<button
				onClick={() => setShowBar(!showBar)}
				data-drawer-target="sidebar-multi-level-sidebar"
				data-drawer-toggle="sidebar-multi-level-sidebar"
				aria-controls="sidebar-multi-level-sidebar"
				type="button"
				className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
			>
				<span className="sr-only">Open sidebar</span>
				<svg
					className="w-6 h-6"
					aria-hidden="true"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						clipRule="evenodd"
						fillRule="evenodd"
						d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
					></path>
				</svg>
			</button>

			<div
				id="sidebar-multi-level-sidebar"
				className={`absolute top-0 left-0 z-40 w-[95%] min-[350px]:w-56 p-4 flex overflow-y-auto transition-transform ${!showBar ? "-translate-x-full" : ""} md:translate-x-0 bg-slate-800 dark:bg-gray-800 border border-b-2 rounded-lg border-slate-400 mt-4 `}
				tabIndex="-1"
				aria-label="Sidebar"
			>
				<button
					onClick={() => setShowBar(!showBar)}
					type="button"
					data-drawer-hide="drawer-navigation"
					aria-controls="drawer-navigation"
					className="text-gray-400 bg-transparent md:hidden hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:text-white"
				>
					<svg
						aria-hidden="true"
						className="w-5 h-5"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
							clipRule="evenodd"
						></path>
					</svg>
					<span className="sr-only">Close menu</span>
				</button>

				<div className="overflow-y-auto">
					<h5
						id="drawer-navigation-label"
						className="text-base font-semibold text-gray-300 uppercase dark:text-white"
					>
						Menu
					</h5>
					<ul className="space-y-2 text-sm font-small ">
						<li>
							<button
								onClick={() => {
									setResponse({});
									setShowInformacion(true);
									setShowCursos(false);
									setShowVideos(false);
									setShowEstudiantes(false);
									setShowDeberes(false);
									setShowPruebas(false);
								}}
								className="w-full flex items-center text-gray-300 p-2 rounded-lg dark:text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700 group"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									className="bi bi-person w-5 h-5 text-gray-500 transition duration-75 group-hover:text-black dark:group-hover:text-white"
									viewBox="0 0 16 16"
								>
									<path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
								</svg>
								<span className="ms-3 whitespace-nowrap">Tu Información</span>
							</button>
						</li>
						<li>
							<button
								onClick={() => {
									setResponse({});
									setShowInformacion(false);
									setShowCursos(true);
									setShowVideos(false);
									setShowEstudiantes(false);
									setShowDeberes(false);
									setShowPruebas(false);
								}}
								className="w-full flex items-center text-gray-300 p-2 rounded-lg dark:text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700 group "
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									className="bi bi-journal-bookmark w-5 h-5 text-gray-500 transition duration-75 group-hover:text-black dark:group-hover:text-white"
									viewBox="0 0 16 16"
								>
									<path
										fillRule="evenodd"
										d="M6 8V1h1v6.117L8.743 6.07a.5.5 0 0 1 .514 0L11 7.117V1h1v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8"
									/>
									<path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
									<path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
								</svg>
								<span className="ms-3 whitespace-nowrap">Tus Cursos</span>
							</button>
						</li>
						<li>
							<button
								onClick={() => {
									setResponse({});
									setShowInformacion(false);
									setShowCursos(false);
									setShowVideos(false);
									setShowEstudiantes(true);
									setShowDeberes(false);
									setShowPruebas(false);
								}}
								className="w-full flex items-center text-gray-300 p-2 rounded-lg dark:text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700 group "
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									className="bi bi-people-fill w-5 h-5 text-gray-500 transition duration-75 group-hover:text-black dark:group-hover:text-white"
									viewBox="0 0 16 16"
								>
									<path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
								</svg>
								<span className=" ms-3 whitespace-nowrap">Tus Estudiantes</span>
							</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};
