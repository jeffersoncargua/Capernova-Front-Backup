import { Link } from "react-router-dom";
import { useState, useEffect, useRef, useId } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout, signIn } from "../redux/userSlice";
import { JWTDecode } from "../hooks/JWTDecode";
import { search } from "../redux/searchProductSlice";
import { DropDownCursos, DropDownProductos } from "./index";

import CaperNova2 from "../assets/Capernova2.png";
import CapernovaOscuro from "../assets/CapernovaOscuro_preview_rev_1.png";

export const Header = () => {
	const navigate = useNavigate();
	const refSearch = useRef();
	const [hidden, setHidden] = useState(true); //permite ocultar el menu que se desplega cuando se hace pequeña la pantalla (cuando es responsiva)
	const [showDrop, setShowDrop] = useState(true); //permite mostrar u ocultar el dropdownlist cuando se presiona el boton  de Cursos
	const [showDropProductos, setShowDropProductos] = useState(true); //permite mostrar u ocultar el dropdownlist cuando se presiona el boton  de Cursos
	const [darkMode, setDarkMode] = useState(
		JSON.parse(localStorage.getItem("darkMode")) || true,
	);
	const dispatch = useDispatch();
	const navbarSearch = useId();
	const dropdownNavbar = useId();
	const themeToggle = useId();

	//Esta seccion permite utilizar redux con el usuario para mantener el inicio de sesion
	const user = useSelector((state) => state.userState.user);
	const isAuth = useSelector((state) => state.userState.isAuth);

	//Esta seccion permite utilizar redux con el usuario para mantener el inicio de sesion
	const cartList = useSelector((state) => state.cartState.cartList);
	//console.log(cartList);

	//Esta seccion permite verificar si las busquedas de los cursos se realizan mediante redux
	//Aqui se verifica si se actualiza la variable para realizar la busqueda de cursos
	//const searchProduct = useSelector(state => state.searchState.searchProduct);
	//console.log(searchProduct);

	useEffect(() => {
		localStorage.setItem("darkMode", JSON.stringify(darkMode));
		if (darkMode) {
			document.documentElement.classList.remove("dark");
		} else {
			document.documentElement.classList.add("dark");
		}
		const token = sessionStorage.getItem("auth");
		//Funcion para decodificar el token y acceder a su informacion para el inicio de sesion
		if (token !== null && token !== "" && token !== undefined) {
			const objet = JWTDecode(token);
			//Se guarda la sesion
			//Permite almacenar el inicio de sesion de un usuario que se ha logeado de forma exitosa
			dispatch(signIn(objet));
		}
	}, [darkMode, dispatch]);

	const handleLogout = () => {
		//Permite quitar de la sessionStorage para que deba logearse de nuevo
		sessionStorage.setItem("auth", "");
		dispatch(logout());
		//console.log(user);
		navigate("/");
	};

	const handleSubmitSearch = (event) => {
		event.preventDefault();
		dispatch(search(refSearch.current.value));
		//console.log(refSearch.current.value);
		setShowDrop(true);
		setShowDropProductos(true);
		navigate("/products");
	};

	return (
		<header className="border-b-[1px] border-slate-400 rounded-lg dark:bg-gray-900">
			<div className="w-[90%] mx-auto py-[30px] flex justify-center">
				<Link
					onClick={() => {
						setShowDrop(true);
						setShowDropProductos(true);
					}}
					to="/"
					className="flex items-center justify-center space-x-3 rtl:space-x-reverse h-[160px] w-[429px]"
				>
					{darkMode ? (
						<img src={CaperNova2} className="" alt="Capernova Logo" />
					) : (
						<img src={CapernovaOscuro} className="" alt="Capernova Logo" />
					)}
				</Link>
			</div>

			<nav className=" w-[95%] bg-white border-gray-200 dark:bg-gray-900 mx-auto">
				<div className="flex flex-wrap min-[880px]:flex-nowrap items-center min-[880px]:justify-between mx-auto p-4 justify-end">
					<div className="flex min-[880px]:order-2  min-[880px]:w-80">
						<button
							onClick={() => setDarkMode(!darkMode)}
							id={themeToggle}
							data-tooltip-target="tooltip-toggle"
							type="button"
							className="min-[880px]:hidden text-gray-500 inline-flex items-center justify-center dark:text-gray-400  w-10 h-10 rounded-lg text-sm p-2.5 "
						>
							{darkMode ? (
								<svg
									className="w-6 h-6"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 18 20"
								>
									<path d="M17.8 13.75a1 1 0 0 0-.859-.5A7.488 7.488 0 0 1 10.52 2a1 1 0 0 0 0-.969A1.035 1.035 0 0 0 9.687.5h-.113a9.5 9.5 0 1 0 8.222 14.247 1 1 0 0 0 .004-.997Z"></path>
								</svg>
							) : (
								<svg
									className="w-6 h-6 dark:text-white"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path d="M10 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-11a1 1 0 0 0 1-1V1a1 1 0 0 0-2 0v2a1 1 0 0 0 1 1Zm0 12a1 1 0 0 0-1 1v2a1 1 0 1 0 2 0v-2a1 1 0 0 0-1-1ZM4.343 5.757a1 1 0 0 0 1.414-1.414L4.343 2.929a1 1 0 0 0-1.414 1.414l1.414 1.414Zm11.314 8.486a1 1 0 0 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.414-1.414l-1.414-1.414ZM4 10a1 1 0 0 0-1-1H1a1 1 0 0 0 0 2h2a1 1 0 0 0 1-1Zm15-1h-2a1 1 0 1 0 0 2h2a1 1 0 0 0 0-2ZM4.343 14.243l-1.414 1.414a1 1 0 1 0 1.414 1.414l1.414-1.414a1 1 0 0 0-1.414-1.414ZM14.95 6.05a1 1 0 0 0 .707-.293l1.414-1.414a1 1 0 1 0-1.414-1.414l-1.414 1.414a1 1 0 0 0 .707 1.707Z"></path>
								</svg>
							)}
						</button>

						<div className="group block min-[880px]:hidden">
							<Link
								to="/cart"
								className="relative w-10 h-10 flex items-center text-gray-500 group-hover:text-blue-600 dark:text-white"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									className="bi bi-cart3 w-7 h-7 "
									viewBox="0 0 16 16"
								>
									<path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
								</svg>
								<span
									className={`absolute top-0 right-0 w-5 h-5 bg-gray-500 ${cartList.length > 0 ? "group-hover:bg-green-500" : "group-hover:bg-red-500"} text-white rounded-full flex items-center justify-center text-xs`}
								>
									{cartList.length}
								</span>
							</Link>
						</div>
						<div className="relative hidden min-[880px]:block w-full ">
							<form onSubmit={handleSubmitSearch}>
								<button type="submit">
									<div className="absolute inset-y-0 end-2 flex items-center ps-3 ">
										<svg
											className="w-4 h-4 text-gray-500 dark:text-white hover:text-blue-500 dark:hover:text-blue-500"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 20 20"
										>
											<path
												stroke="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
											/>
										</svg>
										<span className="sr-only">Search icon</span>
									</div>
								</button>
								<input
									type="text"
									className="w-full p-2 ps-2 text-sm text-gray-900 rounded-lg bg-gray-50 hover:border-blue-300 focus:outline-none focus:ring-inset focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="Buscar Productos..."
									ref={refSearch}
								/>
							</form>
						</div>
						<button
							onClick={() => {
								setHidden(!hidden);
								setShowDrop(true);
								setShowDropProductos(true);
							}}
							data-collapse-toggle={navbarSearch}
							type="button"
							className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg min-[880px]:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
							aria-controls={navbarSearch}
							aria-expanded="false"
						>
							<span className="sr-only">Open main menu</span>
							<svg
								className="w-5 h-5 dark:text-white"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 17 14"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M1 1h15M1 7h15M1 13h15"
								/>
							</svg>
						</button>
					</div>

					<div className="items-center min-[880px]:order-3 hidden min-[880px]:flex justify-between">
						<button
							onClick={() => {
								setDarkMode(!darkMode);
								setShowDrop(true);
								setShowDropProductos(true);
							}}
							id={themeToggle}
							data-tooltip-target="tooltip-toggle"
							type="button"
							className="text-gray-500 inline-flex items-center justify-center dark:text-gray-400  w-10 h-10   rounded-lg text-sm p-2 "
						>
							{darkMode ? (
								<svg
									className="w-6 h-6 hover:text-blue-700"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 18 20"
								>
									<path d="M17.8 13.75a1 1 0 0 0-.859-.5A7.488 7.488 0 0 1 10.52 2a1 1 0 0 0 0-.969A1.035 1.035 0 0 0 9.687.5h-.113a9.5 9.5 0 1 0 8.222 14.247 1 1 0 0 0 .004-.997Z"></path>
								</svg>
							) : (
								<svg
									className="w-6 h-6 hover:text-blue-700 dark:text-white"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path d="M10 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-11a1 1 0 0 0 1-1V1a1 1 0 0 0-2 0v2a1 1 0 0 0 1 1Zm0 12a1 1 0 0 0-1 1v2a1 1 0 1 0 2 0v-2a1 1 0 0 0-1-1ZM4.343 5.757a1 1 0 0 0 1.414-1.414L4.343 2.929a1 1 0 0 0-1.414 1.414l1.414 1.414Zm11.314 8.486a1 1 0 0 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.414-1.414l-1.414-1.414ZM4 10a1 1 0 0 0-1-1H1a1 1 0 0 0 0 2h2a1 1 0 0 0 1-1Zm15-1h-2a1 1 0 1 0 0 2h2a1 1 0 0 0 0-2ZM4.343 14.243l-1.414 1.414a1 1 0 1 0 1.414 1.414l1.414-1.414a1 1 0 0 0-1.414-1.414ZM14.95 6.05a1 1 0 0 0 .707-.293l1.414-1.414a1 1 0 1 0-1.414-1.414l-1.414 1.414a1 1 0 0 0 .707 1.707Z"></path>
								</svg>
							)}
						</button>

						{isAuth ? (
							<button
								type="button"
								onClick={() => {
									handleLogout();
									setShowDrop(true);
									setShowDropProductos(true);
								}}
								className="py-[10px] flex items-center px-3 mx-2 rounded bg-blue-600 hover:bg-blue-700 min-[880px]:hover:text-gray-50 dark:text-white min-[880px]:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white min-[880px]:dark:hover:bg-transparent dark:border-gray-700"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									className="bi bi-box-arrow-left inline-block mr-3"
									viewBox="0 0 16 16"
								>
									<path
										fillRule="evenodd"
										d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"
									/>
									<path
										fillRule="evenodd"
										d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"
									/>
								</svg>
								Cerrar Sesión
							</button>
						) : (
							<div className="flex items-center">
								<Link
									onClick={() => {
										setShowDrop(true);
										setShowDropProductos(true);
									}}
									to="register"
									className="block py-2 px-3 mx-2 text-gray-900 rounded hover:bg-gray-100 hover:underline min-[880px]:hover:bg-transparent min-[880px]:hover:text-blue-700 min-[880px]:p-0 dark:text-white min-[880px]:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white min-[880px]:dark:hover:bg-transparent dark:border-gray-700"
								>
									Registrarse
								</Link>
								<Link
									onClick={() => {
										setShowDrop(true);
										setShowDropProductos(true);
									}}
									to="login"
									className="py-[10px] flex items-center px-3 mx-2 rounded bg-blue-600 hover:bg-blue-700 min-[880px]:hover:text-gray-50 dark:text-white min-[880px]:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white min-[880px]:dark:hover:bg-transparent dark:border-gray-700"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										className="bi bi-box-arrow-right inline-block mr-3"
										viewBox="0 0 16 16"
									>
										<path
											fillRule="evenodd"
											d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
										/>
										<path
											fillRule="evenodd"
											d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
										/>
									</svg>
									Iniciar Sesión
								</Link>
							</div>
						)}
						{/*Esta seccion es para el carrito de compras */}
						<div className="group">
							<Link
								to="/cart"
								className="relative w-10 h-10 flex items-center text-gray-500 group-hover:text-blue-600 dark:text-white"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									className="bi bi-cart3 w-7 h-7  "
									viewBox="0 0 16 16"
								>
									<path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
								</svg>
								<span
									className={`absolute top-0 right-0 w-5 h-5 bg-gray-500 ${cartList.length > 0 ? "group-hover:bg-green-500" : "group-hover:bg-red-500"} text-white rounded-full flex items-center justify-center text-xs`}
								>
									{cartList.length}
								</span>
							</Link>
						</div>
					</div>

					<div
						className={`${hidden ? "hidden" : ""} items-center justify-between w-full min-[880px]:flex min-[880px]:w-auto min-[880px]:order-1 min-[880px]:mr-4 flex-none`}
						id={navbarSearch}
					>
						<ul className="flex flex-col p-4 min-[880px]:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 min-[880px]:space-x-6 rtl:space-x-reverse min-[880px]:flex-row min-[880px]:mt-0 min-[880px]:border-0 min-[880px]:bg-white dark:bg-gray-800 min-[880px]:dark:bg-gray-900 dark:border-gray-700">
							<li>
								<Link
									onClick={() => {
										setHidden(!hidden);
										setShowDrop(true);
										setShowDropProductos(true);
									}}
									to="/"
									className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 min-[880px]:hover:bg-transparent min-[880px]:hover:text-blue-700 min-[880px]:p-0 min-[880px]:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white min-[880px]:dark:hover:bg-transparent dark:border-gray-700"
									aria-current="page"
								>
									Inicio
								</Link>
							</li>
							<li>
								<Link
									onClick={() => {
										setHidden(!hidden);
										setShowDrop(true);
										setShowDropProductos(true);
									}}
									to="/nosotros"
									className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 min-[880px]:hover:bg-transparent min-[880px]:hover:text-blue-700 min-[880px]:p-0 min-[880px]:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white min-[880px]:dark:hover:bg-transparent dark:border-gray-700"
								>
									Nosotros
								</Link>
							</li>
							<li>
								<button
									type="button"
									onClick={() => {
										setShowDrop(!showDrop);
										setShowDropProductos(true);
									}}
									data-dropdown-toggle={dropdownNavbar}
									className="flex items-center justify-between w-full py-2 px-3 text-gray-900 hover:bg-gray-100 min-[880px]:hover:bg-transparent min-[880px]:border-0 min-[880px]:hover:text-blue-700 min-[880px]:p-0 min-[880px]:w-auto dark:text-white min-[880px]:dark:hover:text-blue-500 dark:focus:text-white dark:hover:bg-gray-700 min-[880px]:dark:hover:bg-transparent"
								>
									Cursos
									<svg
										className="w-2.5 h-2.5 ms-2.5"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 10 6"
									>
										<path
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="m1 1 4 4 4-4"
										/>
									</svg>
								</button>
								{/*<!-- Dropdown menu de cursos -->*/}
								<div
									id={dropdownNavbar}
									className={`${showDrop ? "hidden" : ""} min-[880px]:absolute z-50 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow min-[880px]:w-44 dark:bg-gray-700 dark:divide-gray-600`}
								>
									<DropDownCursos
										setShowDrop={setShowDrop}
										setHidden={setHidden}
										setShowDropProductos={setShowDropProductos}
										hidden={hidden}
									/>
								</div>
							</li>
							<li>
								<button
									type="button"
									onClick={() => {
										setShowDropProductos(!showDropProductos);
										setShowDrop(true);
									}}
									data-dropdown-toggle={dropdownNavbar}
									className="flex items-center justify-between w-full py-2 px-3 text-gray-900 hover:bg-gray-100 min-[880px]:hover:bg-transparent min-[880px]:border-0 min-[880px]:hover:text-blue-700 min-[880px]:p-0 min-[880px]:w-auto dark:text-white min-[880px]:dark:hover:text-blue-500 dark:focus:text-white dark:hover:bg-gray-700 min-[880px]:dark:hover:bg-transparent"
								>
									Productos
									<svg
										className="w-2.5 h-2.5 ms-2.5"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 10 6"
									>
										<path
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="m1 1 4 4 4-4"
										/>
									</svg>
								</button>
								{/*<!-- Dropdown menu de productos-->*/}
								<div
									id={dropdownNavbar}
									className={`${showDropProductos ? "hidden" : ""} min-[880px]:absolute z-50 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow min-[880px]:w-44 dark:bg-gray-700 dark:divide-gray-600`}
								>
									<DropDownProductos
										setShowDrop={setShowDrop}
										setHidden={setHidden}
										setShowDropProductos={setShowDropProductos}
										hidden={hidden}
									/>
								</div>
							</li>
							{/*Se debe colocar el link para cada rol de administración: Profesor, Secretaria y Administrador, Tambien se puede colocar el enlace a los cursos del estudiante*/}
							{user.role === process.env.REACT_APP_ROLE_MAIN && (
								<li>
									<Link
										onClick={() => {
											setHidden(!hidden);
											setShowDrop(true);
											setShowDropProductos(true);
										}}
										to="admin"
										className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 min-[880px]:hover:bg-transparent min-[880px]:hover:text-blue-700 min-[880px]:p-0 min-[880px]:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white min-[880px]:dark:hover:bg-transparent dark:border-gray-700"
									>
										Administración
									</Link>
								</li>
							)}
							{user.role === process.env.REACT_APP_ROLE_CAPERNOVA && (
								<li>
									<Link
										onClick={() => {
											setHidden(!hidden);
											setShowDrop(true);
											setShowDropProductos(true);
										}}
										to="teacher"
										className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 min-[880px]:hover:bg-transparent min-[880px]:hover:text-blue-700 min-[880px]:p-0 min-[880px]:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white min-[880px]:dark:hover:bg-transparent dark:border-gray-700"
									>
										Profesor
									</Link>
								</li>
							)}
							{user.role === process.env.REACT_APP_ROLE_ASISTANT && (
								<li>
									<Link
										onClick={() => {
											setHidden(!hidden);
											setShowDrop(true);
											setShowDropProductos(true);
										}}
										to="secretary"
										className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 min-[880px]:hover:bg-transparent min-[880px]:hover:text-blue-700 min-[880px]:p-0 min-[880px]:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white min-[880px]:dark:hover:bg-transparent dark:border-gray-700"
									>
										Secretaria
									</Link>
								</li>
							)}
							{user.role === process.env.REACT_APP_ROLE_STUDENT && (
								<li>
									<Link
										onClick={() => {
											setHidden(!hidden);
											setShowDrop(true);
											setShowDropProductos(true);
										}}
										to="student"
										className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 min-[880px]:hover:bg-transparent min-[880px]:hover:text-blue-700 min-[880px]:p-0 min-[880px]:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white min-[880px]:dark:hover:bg-transparent dark:border-gray-700"
									>
										Mis Cursos
									</Link>
								</li>
							)}
							{isAuth ? (
								<li className="min-[880px]:hidden">
									<button
										type="button"
										onClick={() => {
											handleLogout();
											setShowDrop(true);
											setShowDropProductos(true);
										}}
										className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 min-[880px]:hover:bg-transparent min-[880px]:hover:text-blue-700 min-[880px]:p-0 dark:text-white min-[880px]:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white min-[880px]:dark:hover:bg-transparent dark:border-gray-700"
									>
										Logout
									</button>
								</li>
							) : (
								<>
									<li className="min-[880px]:hidden">
										<Link
											onClick={() => {
												setHidden(true);
												setShowDrop(true);
												setShowDropProductos(true);
											}}
											to="register"
											className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 min-[880px]:hover:bg-transparent min-[880px]:hover:text-blue-700 min-[880px]:p-0 dark:text-white min-[880px]:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white min-[880px]:dark:hover:bg-transparent dark:border-gray-700"
										>
											Registrarse
										</Link>
									</li>
									<li className="min-[880px]:hidden">
										<Link
											onClick={() => {
												setHidden(true);
												setShowDrop(true);
												setShowDropProductos(true);
											}}
											to="login"
											className=" block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 min-[880px]:hover:bg-transparent min-[880px]:hover:text-blue-700 min-[880px]:p-0 dark:text-white min-[880px]:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white min-[880px]:dark:hover:bg-transparent dark:border-gray-700"
										>
											Iniciar Sesión
										</Link>
									</li>
								</>
							)}
						</ul>
					</div>
				</div>
			</nav>
		</header>
	);
};
