import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SideBar = ({
	setShowPlayer,
	setShowLogro,
	setShowCourses,
	setShowDeberes,
	setShowPruebas,
	setShowInformacion,
	setShowDeberDetail,
	setShowPruebaDetail,
	setShowLibrary,
	setShowCursoLive,
	setResponse,
}) => {
	const navigate = useNavigate();
	const [showBar, setShowBar] = useState(true);

	return (
		<div>
			<button
				onClick={() => setShowBar(!showBar)}
				data-drawer-target="default-sidebar"
				data-drawer-toggle="default-sidebar"
				aria-controls="default-sidebar"
				type="button"
				className={`inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600`}
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
				//id="drawer-navigation"
				className={`absolute top-0 left-0 z-40 w-[95%] min-[350px]:w-56 p-4 flex overflow-y-auto transition-transform ${showBar ? "-translate-x-full" : ""} sm:translate-x-0  bg-slate-800 dark:bg-gray-800 border-e-2 border border-b-2 rounded-lg border-slate-400 mt-4`}
				tabIndex="-1"
				//aria-labelledby="drawer-navigation-label"
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

				<div className="overflow-y-auto">
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
								onClick={() => navigate("/")}
								className="w-full flex items-center p-2 text-gray-300 rounded-lg dark:text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700 group"
							>
								<svg
									className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 18 18"
								>
									<path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
								</svg>
								<span className=" ms-3 whitespace-nowrap">Home</span>
							</button>
						</li>
						<li>
							<button
								type="button"
								onClick={() => {
									setResponse({});
									setShowCourses(false);
									setShowPlayer(false);
									setShowLogro(false);
									setShowDeberes(false);
									setShowPruebas(false);
									setShowInformacion(true);
									setShowDeberDetail(false);
									setShowPruebaDetail(false);
									setShowLibrary(false);
									setShowCursoLive(false);
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
								type="button"
								onClick={() => {
									setResponse({});
									setShowCourses(true);
									setShowPlayer(false);
									setShowLogro(false);
									setShowDeberes(false);
									setShowPruebas(false);
									setShowInformacion(false);
									setShowDeberDetail(false);
									setShowPruebaDetail(false);
									setShowLibrary(false);
									setShowCursoLive(false);
								}}
								className="w-full flex items-center p-2 text-gray-300 rounded-lg dark:text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700 group"
							>
								<svg
									className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 18 20"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 4H1m3 4H1m3 4H1m3 4H1m6.071.286a3.429 3.429 0 1 1 6.858 0M4 1h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Zm9 6.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
									/>
								</svg>
								<span className="ms-3 whitespace-nowrap">Mis Cursos</span>
							</button>
						</li>
						<li>
							<button
								type="button"
								onClick={() => {
									setResponse({});
									setShowCourses(false);
									setShowPlayer(false);
									setShowLogro(false);
									setShowDeberes(false);
									setShowPruebas(false);
									setShowInformacion(false);
									setShowDeberDetail(false);
									setShowPruebaDetail(false);
									setShowLibrary(true);
									setShowCursoLive(false);
								}}
								className="w-full flex items-center p-2 text-gray-300 rounded-lg dark:text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700 group"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 34.424 34.424"
									fill="currentColor"
									className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
								>
									<g>
										<g>
											<path d="M4.611,25.601c0,0.256,0.204,0.467,0.466,0.467h11.097c-0.377-0.265-0.72-0.573-1.019-0.93H5.078 C4.815,25.138,4.611,25.344,4.611,25.601z" />
											<path d="M20.236,26.899c-0.264,0.062-0.532,0.091-0.806,0.112c0.147,0.526,0.327,1.005,0.503,1.391H0.903 v-5.605h12.983c-0.078-0.389-0.115-0.786-0.102-1.187H0.649C0.288,21.61,0,21.903,0,22.261v6.682c0,0.359,0.288,0.653,0.649,0.653 h19.989c0.005,0,0.005,0,0.005,0c0.432,0,0.769-0.418,0.62-0.855L20.236,26.899z" />
											<path d="M0.726,20.526h13.348c0.005-0.021,0.007-0.04,0.011-0.061c0.103-0.398,0.252-0.775,0.437-1.132 H0.978v-5.608h18.813c-0.408,0.765-0.563,1.566-0.563,2.34H5.009c-0.263,0-0.465,0.21-0.465,0.466 c0,0.258,0.203,0.467,0.465,0.467h11.947c0.699-0.329,1.46-0.51,2.235-0.51c0.354,0,0.7,0.045,1.04,0.115 c-0.105-0.996,0.069-2.081,0.941-2.952c0.192-0.187,0.244-0.467,0.146-0.712c-0.102-0.242-0.339-0.4-0.604-0.4H0.726 c-0.363,0-0.65,0.292-0.65,0.651v6.684C0.075,20.233,0.362,20.526,0.726,20.526z" />
											<path d="M0.697,11.281h19.986c0.004,0,0.004,0,0.004,0c0.362,0,0.658-0.293,0.658-0.652 c0-0.159-0.057-0.305-0.151-0.415c-0.281-0.473-2.124-3.734-0.052-5.807c0.192-0.186,0.244-0.466,0.146-0.714 c-0.104-0.242-0.341-0.401-0.605-0.401H0.697c-0.364,0-0.654,0.293-0.654,0.652v6.684C0.042,10.988,0.332,11.281,0.697,11.281z M0.947,4.482H19.76c-0.409,0.763-0.563,1.565-0.563,2.337H4.977c-0.261,0-0.466,0.211-0.466,0.466 c0,0.259,0.206,0.466,0.466,0.466h14.288c0.136,0.909,0.438,1.731,0.713,2.337H0.947V4.482z" />
											<path d="M34.399,26.194L29.101,6.922c-0.002-0.004-0.002-0.004-0.002-0.004 c-0.096-0.352-0.457-0.557-0.804-0.461c-0.151,0.042-0.276,0.134-0.359,0.251c-0.378,0.4-3.036,3.042-5.585,1.591 c-0.23-0.133-0.517-0.108-0.727,0.051c-0.207,0.163-0.297,0.434-0.226,0.69l5.3,19.272c0.096,0.35,0.454,0.55,0.8,0.453 l6.443-1.772C34.288,26.9,34.498,26.544,34.399,26.194z M27.777,27.753L22.789,9.614c0.845,0.192,1.659,0.127,2.403-0.077 l3.77,13.709c0.07,0.254,0.325,0.395,0.574,0.326c0.248-0.066,0.395-0.319,0.325-0.573l-3.79-13.775 c0.842-0.373,1.553-0.883,2.063-1.306l5.046,18.349L27.777,27.753z" />
											<path d="M22.623,19.638c-1.175-1.968-3.72-2.612-5.688-1.438c-1.968,1.171-2.613,3.716-1.44,5.686 c1.091,1.832,3.374,2.516,5.275,1.654l3.125,5.591l1.352-0.74l-3.56-5.422C23.252,23.691,23.686,21.428,22.623,19.638z M20.653,24.431c-1.479,0.881-3.386,0.396-4.267-1.078c-0.88-1.478-0.395-3.386,1.081-4.264c1.475-0.88,3.385-0.396,4.265,1.079 C22.614,21.644,22.126,23.552,20.653,24.431z" />
										</g>
									</g>
								</svg>
								<span className="ms-3 whitespace-nowrap">Biblioteca</span>
							</button>
						</li>
						<li>
							<button
								type="button"
								onClick={() => {
									setResponse({});
									setShowCourses(false);
									setShowPlayer(false);
									setShowLogro(false);
									setShowDeberes(false);
									setShowPruebas(false);
									setShowInformacion(false);
									setShowDeberDetail(false);
									setShowPruebaDetail(false);
									setShowLibrary(false);
									setShowCursoLive(true);
								}}
								className="w-full flex items-center p-2 text-gray-300 rounded-lg dark:text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700 group"
							>
								<svg
									viewBox="0 -88 480 480"
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
								>
									<path d="m136 208h-56v-120c0-4.417969-3.582031-8-8-8s-8 3.582031-8 8v128c0 4.417969 3.582031 8 8 8h64c4.417969 0 8-3.582031 8-8s-3.582031-8-8-8zm0 0" />
									<path d="m408 96c4.417969 0 8-3.582031 8-8s-3.582031-8-8-8h-64c-4.417969 0-8 3.582031-8 8v128c0 4.417969 3.582031 8 8 8h64c4.417969 0 8-3.582031 8-8s-3.582031-8-8-8h-56v-48h40c4.417969 0 8-3.582031 8-8s-3.582031-8-8-8h-40v-48zm0 0" />
									<path d="m176 80c-4.417969 0-8 3.582031-8 8v128c0 4.417969 3.582031 8 8 8s8-3.582031 8-8v-128c0-4.417969-3.582031-8-8-8zm0 0" />
									<path d="m306.808594 80.503906c-1.988282-.746094-4.191406-.671875-6.125.207032-1.933594.878906-3.4375 2.492187-4.179688 4.480468l-39.816406 106.191406-33.046875-105.78125c-1.324219-4.222656-5.820313-6.566406-10.039063-5.242187-4.222656 1.324219-6.566406 5.820313-5.242187 10.039063l40 128c1.023437 3.261718 4.003906 5.507812 7.417969 5.601562h.222656c3.335938.003906 6.324219-2.066406 7.496094-5.191406l48-128c.746094-1.988282.671875-4.191406-.207032-6.125-.878906-1.933594-2.492187-3.4375-4.480468-4.179688zm0 0" />
									<path d="m440 0h-400c-22.082031.0273438-39.9726562 17.917969-40 40v224c.0273438 22.082031 17.917969 39.972656 40 40h400c22.082031-.027344 39.972656-17.917969 40-40v-224c-.027344-22.082031-17.917969-39.9726562-40-40zm24 264c0 13.253906-10.746094 24-24 24h-400c-13.253906 0-24-10.746094-24-24v-224c0-13.253906 10.746094-24 24-24h400c13.253906 0 24 10.746094 24 24zm0 0" />
								</svg>
								<span className="ms-3 whitespace-nowrap">Cursos en Vivo</span>
							</button>
						</li>
						<li>
							<button
								type="button"
								onClick={() => {
									setResponse({});
									setShowLogro(false);
									setShowPlayer(false);
									setShowCourses(false);
									setShowDeberes(true);
									setShowPruebas(false);
									setShowInformacion(false);
									setShowDeberDetail(false);
									setShowPruebaDetail(false);
									setShowLibrary(false);
									setShowCursoLive(false);
								}}
								className=" w-full flex items-center p-2 text-gray-300 rounded-lg dark:text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700 group"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									className="bi bi-book flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
									viewBox="0 0 16 16"
								>
									<path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
								</svg>
								<span className=" ms-3 whitespace-nowrap">Deberes</span>
							</button>
						</li>
						<li>
							<button
								type="button"
								onClick={() => {
									setResponse({});
									setShowLogro(false);
									setShowPlayer(false);
									setShowCourses(false);
									setShowDeberes(false);
									setShowPruebas(true);
									setShowInformacion(false);
									setShowDeberDetail(false);
									setShowPruebaDetail(false);
									setShowLibrary(false);
									setShowCursoLive(false);
								}}
								className=" w-full flex items-center p-2 text-gray-300 rounded-lg dark:text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700 group"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									className="bi bi-journal-check flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
									viewBox="0 0 16 16"
								>
									<path
										fillRule="evenodd"
										d="M10.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0"
									/>
									<path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
									<path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
								</svg>
								<span className=" ms-3 whitespace-nowrap">Pruebas</span>
							</button>
						</li>
						<li>
							<button
								type="button"
								onClick={() => {
									setResponse({});
									setShowLogro(true);
									setShowPlayer(false);
									setShowCourses(false);
									setShowDeberes(false);
									setShowPruebas(false);
									setShowInformacion(false);
									setShowDeberDetail(false);
									setShowPruebaDetail(false);
									setShowLibrary(false);
									setShowCursoLive(false);
								}}
								className=" w-full flex items-center p-2 text-gray-300 rounded-lg dark:text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700 group"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									className="bi bi-award flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
									viewBox="0 0 16 16"
								>
									<path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702z" />
									<path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1z" />
								</svg>
								<span className=" ms-3 whitespace-nowrap">Tu progreso</span>
							</button>
						</li>
						<li>
							<button
								type="button"
								onClick={() => navigate("/")}
								className="w-full flex items-center p-2 text-gray-300 rounded-lg dark:text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700 group"
							>
								<svg
									className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 18 20"
								>
									<path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
								</svg>
								<span className="ms-3 whitespace-nowrap">Comprar Cursos</span>
							</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};
