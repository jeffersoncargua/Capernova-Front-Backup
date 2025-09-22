import { useState } from "react";

export const SideBar = ({
	setShowPublicidad,
	setShowCursos,
	setShowVentas,
	setShowPedidos,
	setShowVideos,
	setShowTalento,
	setShowProfesor,
	setShowProductos,
	//setResponse,
	setShowAreaCategoria,
	setShowInscripcion,
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
				className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
				//id="sidebar-multi-level-sidebar"
				className={`absolute top-0 left-0 z-40 w-[95%] min-[350px]:w-56 p-4 flex overflow-y-auto  transition-transform ${showBar ? "-translate-x-full" : ""} sm:translate-x-0 bg-slate-800 dark:bg-gray-800 border border-b-2 rounded-lg border-slate-400 mt-4`}
				tabIndex="-1"
				//aria-label="Sidebar"
			>
				<button
					onClick={() => setShowBar(!showBar)}
					type="button"
					data-drawer-hide="drawer-navigation"
					aria-controls="drawer-navigation"
					className="text-gray-400 bg-transparent sm:hidden hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:text-white"
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

				<div className="overflow-y-auto ">
					<h5
						//id="drawer-navigation-label"
						className="text-base font-semibold text-gray-300 uppercase dark:text-white"
					>
						Menu
					</h5>
					<ul className="space-y-2 text-sm font-small">
						<li>
							<button
								type="button"
								onClick={() => {
									setShowPublicidad(true);
									setShowCursos(false);
									setShowVentas(false);
									setShowPedidos(false);
									setShowVideos(false);
									setShowTalento(false);
									setShowProfesor(false);
									setShowProductos(false);
									setShowAreaCategoria(false);
									setShowInscripcion(false);
									//setResponse({});
								}}
								className="w-full flex items-center text-gray-300 p-2 rounded-lg dark:text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700 group"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									className="bi bi-megaphone w-5 h-5 text-gray-500 transition duration-75 group-hover:text-black dark:group-hover:text-white"
									viewBox="0 0 16 16"
								>
									<path d="M13 2.5a1.5 1.5 0 0 1 3 0v11a1.5 1.5 0 0 1-3 0v-.214c-2.162-1.241-4.49-1.843-6.912-2.083l.405 2.712A1 1 0 0 1 5.51 15.1h-.548a1 1 0 0 1-.916-.599l-1.85-3.49-.202-.003A2.014 2.014 0 0 1 0 9V7a2.02 2.02 0 0 1 1.992-2.013 75 75 0 0 0 2.483-.075c3.043-.154 6.148-.849 8.525-2.199zm1 0v11a.5.5 0 0 0 1 0v-11a.5.5 0 0 0-1 0m-1 1.35c-2.344 1.205-5.209 1.842-8 2.033v4.233q.27.015.537.036c2.568.189 5.093.744 7.463 1.993zm-9 6.215v-4.13a95 95 0 0 1-1.992.052A1.02 1.02 0 0 0 1 7v2c0 .55.448 1.002 1.006 1.009A61 61 0 0 1 4 10.065m-.657.975 1.609 3.037.01.024h.548l-.002-.014-.443-2.966a68 68 0 0 0-1.722-.082z" />
								</svg>
								<span className=" ms-3 whitespace-nowrap">Publicidad</span>
							</button>
						</li>
						<li>
							<button
								type="button"
								onClick={() => {
									setShowPublicidad(false);
									setShowCursos(false);
									setShowVentas(false);
									setShowPedidos(false);
									setShowVideos(false);
									setShowTalento(false);
									setShowProfesor(false);
									setShowProductos(false);
									setShowAreaCategoria(true);
									setShowInscripcion(false);
									//setResponse({});
								}}
								className="w-full flex items-center text-gray-300 p-2 rounded-lg dark:text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700 group"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 511 511"
									className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-black dark:group-hover:text-white"
								>
									<g>
										<path d="M503.5,272h-312c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h312c4.142,0,7.5-3.358,7.5-7.5S507.642,272,503.5,272z" />
										<path d="M503.5,224h-312c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h312c4.142,0,7.5-3.358,7.5-7.5S507.642,224,503.5,224z" />
										<path d="M119.5,184h-96C10.542,184,0,194.542,0,207.5v96C0,316.458,10.542,327,23.5,327h96c12.958,0,23.5-10.542,23.5-23.5v-96 C143,194.542,132.458,184,119.5,184z M128,303.5c0,4.687-3.813,8.5-8.5,8.5h-96c-4.687,0-8.5-3.813-8.5-8.5v-96 c0-4.687,3.813-8.5,8.5-8.5h96c4.687,0,8.5,3.813,8.5,8.5V303.5z" />
										<path d="M503.5,96h-312c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h312c4.142,0,7.5-3.358,7.5-7.5S507.642,96,503.5,96z" />
										<path d="M191.5,63h312c4.142,0,7.5-3.358,7.5-7.5s-3.358-7.5-7.5-7.5h-312c-4.142,0-7.5,3.358-7.5,7.5S187.358,63,191.5,63z" />
										<path d="M119.5,8h-96C10.542,8,0,18.542,0,31.5v96C0,140.458,10.542,151,23.5,151h96c12.958,0,23.5-10.542,23.5-23.5v-96 C143,18.542,132.458,8,119.5,8z M128,127.5c0,4.687-3.813,8.5-8.5,8.5h-96c-4.687,0-8.5-3.813-8.5-8.5v-96 c0-4.687,3.813-8.5,8.5-8.5h96c4.687,0,8.5,3.813,8.5,8.5V127.5z" />
										<path d="M503.5,448h-312c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h312c4.142,0,7.5-3.358,7.5-7.5S507.642,448,503.5,448z" />
										<path d="M503.5,400h-312c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h312c4.142,0,7.5-3.358,7.5-7.5S507.642,400,503.5,400z" />
										<path d="M119.5,360h-96C10.542,360,0,370.542,0,383.5v96C0,492.458,10.542,503,23.5,503h96c12.958,0,23.5-10.542,23.5-23.5v-96 C143,370.542,132.458,360,119.5,360z M128,479.5c0,4.687-3.813,8.5-8.5,8.5h-96c-4.687,0-8.5-3.813-8.5-8.5v-96 c0-4.687,3.813-8.5,8.5-8.5h96c4.687,0,8.5,3.813,8.5,8.5V479.5z" />
									</g>
								</svg>
								<span className="ms-3 whitespace-nowrap">
									Áreas y Categorias
								</span>
							</button>
						</li>
						<li>
							<button
								type="button"
								onClick={() => {
									setShowPublicidad(false);
									setShowCursos(true);
									setShowVentas(false);
									setShowPedidos(false);
									setShowVideos(false);
									setShowTalento(false);
									setShowProfesor(false);
									setShowProductos(false);
									setShowAreaCategoria(false);
									setShowInscripcion(false);
									//setResponse({});
								}}
								className="w-full flex items-center text-gray-300 p-2 rounded-lg dark:text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700 group"
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
								<span className="ms-3 whitespace-nowrap">Cursos</span>
							</button>
						</li>
						<li>
							<button
								type="button"
								onClick={() => {
									setShowPublicidad(false);
									setShowCursos(false);
									setShowVentas(false);
									setShowPedidos(false);
									setShowVideos(false);
									setShowTalento(false);
									setShowProfesor(false);
									setShowProductos(true);
									setShowAreaCategoria(false);
									setShowInscripcion(false);
									//setResponse({});
								}}
								className="w-full flex items-center text-gray-300 p-2 rounded-lg dark:text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700 group"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-black dark:group-hover:text-white"
									viewBox="0 0 56 56"
								>
									<g>
										<path d="M42.53,21.152l-8-5C34.371,16.053,34.188,16,34,16h-0.038c-0.037-0.181-0.107-0.353-0.235-0.489 c-0.829-0.878-1.364-2.648-1.364-4.511c0-1.552,0.368-3.033,0.976-4h1.152C36.426,7,38,5.43,38,3.5S36.426,0,34.491,0H22.509 C20.574,0,19,1.57,19,3.5S20.574,7,22.509,7h1.152c0.608,0.967,0.976,2.448,0.976,4c0,1.862-0.535,3.633-1.364,4.511 c-0.128,0.136-0.198,0.309-0.235,0.489h-0.009c-0.17,0-0.336,0.043-0.484,0.125l-9.029,5c-0.337,0.187-0.537,0.551-0.514,0.935 l1.633,26.947C14.868,52.863,18.197,56,22.057,56h11.887c3.858,0,7.188-3.137,7.422-6.992l1.633-26.947 C43.021,21.694,42.841,21.346,42.53,21.152z M15.972,38.005l24.649-9.778l-0.301,4.968l-24.057,9.623L15.972,38.005z M21,3.5 C21,2.673,21.677,2,22.509,2h11.982C35.323,2,36,2.673,36,3.5S35.323,5,34.491,5h-1.665h-8.652h-1.665C21.677,5,21,4.327,21,3.5z M25.896,7h5.208c-0.475,1.153-0.74,2.549-0.74,4c0,1.925,0.453,3.712,1.241,5h-6.209c0.788-1.288,1.241-3.075,1.241-5 C26.637,9.55,26.371,8.154,25.896,7z M23.288,18H24h9h0.713l7.253,4.533l-0.213,3.515c-0.041,0.01-0.082,0.006-0.122,0.022 l-24.787,9.833l-0.808-13.334L23.288,18z M33.943,54H22.057c-2.821,0-5.255-2.294-5.426-5.113l-0.24-3.966l23.795-9.518 l-0.817,13.484C39.197,51.706,36.764,54,33.943,54z" />
									</g>
								</svg>
								<span className="ms-3 whitespace-nowrap">Productos</span>
							</button>
						</li>
						<li>
							<button
								type="button"
								onClick={() => {
									setShowPublicidad(false);
									setShowCursos(false);
									setShowVentas(true);
									setShowPedidos(false);
									setShowVideos(false);
									setShowTalento(false);
									setShowProfesor(false);
									setShowProductos(false);
									setShowAreaCategoria(false);
									setShowInscripcion(false);
									//setResponse({});
								}}
								className="w-full flex items-center text-gray-300 p-2 rounded-lg dark:text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700 group"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									className="bi bi-cash-coin w-5 h-5 text-gray-500 transition duration-75 group-hover:text-black dark:group-hover:text-white"
									viewBox="0 0 16 16"
								>
									<path
										fillRule="evenodd"
										d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0"
									/>
									<path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195z" />
									<path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083q.088-.517.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z" />
									<path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 6 6 0 0 1 3.13-1.567" />
								</svg>
								<span className="ms-3 whitespace-nowrap">Ventas</span>
							</button>
						</li>
						<li>
							<button
								type="button"
								onClick={() => {
									setShowPublicidad(false);
									setShowCursos(false);
									setShowVentas(false);
									setShowPedidos(true);
									setShowVideos(false);
									setShowTalento(false);
									setShowProfesor(false);
									setShowProductos(false);
									setShowAreaCategoria(false);
									setShowInscripcion(false);
									//setResponse({});
								}}
								className="w-full flex items-center text-gray-300 p-2 rounded-lg dark:text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700 group"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									className="bi bi-box-seam-fill w-5 h-5 text-gray-500 transition duration-75 group-hover:text-black dark:group-hover:text-white"
									viewBox="0 0 16 16"
								>
									<path
										fillRule="evenodd"
										d="M15.528 2.973a.75.75 0 0 1 .472.696v8.662a.75.75 0 0 1-.472.696l-7.25 2.9a.75.75 0 0 1-.557 0l-7.25-2.9A.75.75 0 0 1 0 12.331V3.669a.75.75 0 0 1 .471-.696L7.443.184l.01-.003.268-.108a.75.75 0 0 1 .558 0l.269.108.01.003zM10.404 2 4.25 4.461 1.846 3.5 1 3.839v.4l6.5 2.6v7.922l.5.2.5-.2V6.84l6.5-2.6v-.4l-.846-.339L8 5.961 5.596 5l6.154-2.461z"
									/>
								</svg>
								<span className="ms-3 whitespace-nowrap">Pedidos</span>
							</button>
						</li>
						<li>
							<button
								type="button"
								onClick={() => {
									setShowPublicidad(false);
									setShowCursos(false);
									setShowVentas(false);
									setShowPedidos(false);
									setShowVideos(false);
									setShowTalento(true);
									setShowProfesor(false);
									setShowProductos(false);
									setShowAreaCategoria(false);
									setShowInscripcion(false);
									//setResponse({});
								}}
								className="w-full flex items-center text-gray-300 p-2 rounded-lg dark:text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700 group"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									className="bi bi-people-fill w-5 h-5 text-gray-500 transition duration-75 group-hover:text-black dark:group-hover:text-white"
									viewBox="0 0 16 16"
								>
									<path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
								</svg>
								<span className=" ms-3 whitespace-nowrap">Talento Humano</span>
							</button>
						</li>
						<li>
							<button
								type="button"
								onClick={() => {
									setShowPublicidad(false);
									setShowCursos(false);
									setShowVentas(false);
									setShowPedidos(false);
									setShowVideos(false);
									setShowTalento(false);
									setShowProfesor(false);
									setShowProductos(false);
									setShowAreaCategoria(false);
									setShowInscripcion(true);
									//setResponse({});
								}}
								className="w-full flex items-center text-gray-300 p-2 rounded-lg dark:text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700 group"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									className="bi bi-people-fill w-5 h-5 text-gray-500 transition duration-75 group-hover:text-black dark:group-hover:text-white"
									viewBox="0 0 16 16"
								>
									<path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917z" />
									<path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466z" />
								</svg>
								<span className=" ms-3 whitespace-nowrap">Inscripciones</span>
							</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};
