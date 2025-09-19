import { useState } from "react";

//export const SideBar = ({setShowEstudiantes,setShowCursos,setShowVentas}) => {
export const SideBar = ({ setShowCursos, setShowVentas, setShowPedidos }) => {
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
				id="sidebar-multi-level-sidebar"
				className={`absolute top-0 left-0 z-40 w-[95%] min-[350px]:w-64 p-4 transition-transform ${showBar ? "-translate-x-full" : ""} sm:translate-x-0 bg-slate-800 dark:bg-gray-800 border-e-2 border border-b-2 rounded-lg border-slate-400 mt-4`}
				tabIndex="-1"
				aria-labelledby="drawer-navigation-label"
			>
				<button
					onClick={() => setShowBar(!showBar)}
					type="button"
					data-drawer-hide="drawer-navigation"
					aria-controls="drawer-navigation"
					className="text-gray-400 bg-transparent sm:hidden hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
						id="drawer-navigation-label"
						className="text-base font-semibold text-gray-300 uppercase dark:text-white"
					>
						Menu
					</h5>
					<ul className="space-y-2  text-sm font-small">
						<li>
							<button
								onClick={() => {
									setShowCursos(true);
									setShowVentas(false);
									setShowPedidos(false);
								}}
								className="w-full flex items-center p-2 text-gray-300 rounded-lg dark:text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700 group"
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
								onClick={() => {
									setShowCursos(false);
									setShowVentas(true);
									setShowPedidos(false);
								}}
								className="w-full flex items-center p-2 text-gray-300 rounded-lg dark:text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700 group"
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
								onClick={() => {
									setShowCursos(false);
									setShowVentas(false);
									setShowPedidos(true);
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
					</ul>
				</div>
			</div>
		</div>
	);
};
