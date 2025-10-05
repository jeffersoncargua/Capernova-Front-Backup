import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GetCategoriaCursos } from "../../../apiServices/GeneralServices";
import {
	GetAllCapitulo,
	GetProductCode,
	UpdateCourse,
} from "../../../apiServices/ManagmentServices/ManagmentCourseServices";
import {
	ModalCapitulo,
	ModalDelete,
	ModalVideo,
	VideoCard,
} from "../Components";
//import { ModalCapitulo,ModalVideo,ModalDeleteCapitulo,ModalDeleteVideo,ModalSuccess ,VideoCard} from "../Components"; //son componentes de la carpeta administracion/profesor/components
import { ModalSuccess } from "../Profesores/Components"; //son componentes de la carpeta administarcion/components

export const Videos = ({
	setShowCursos,
	setShowVideos,
	curso,
	// setCurso,
	// setShowDeberes,
	// setShowPruebas,
	GetCursos,
}) => {
	const [capitulos, setCapitulos] = useState([]);
	const [capitulo, setCapitulo] = useState({});
	const [videos, setVideos] = useState([]);
	const [video, setVideo] = useState({});
	const [objeto, setObjeto] = useState({}); //es el objeto que se va a eliminar el cual puede ser video o capitulo
	const [tipo, setTipo] = useState(""); //es el objeto que contiene el tipo sea video, capitulo, deber o prueba a eliminar
	const [showModalCapitulo, setShowModalCapitulo] = useState(false);
	//const [showModalDeleteCapitulo, setShowModalDeleteCapitulo] = useState(false);
	const [showModalVideo, setShowModalVideo] = useState(false);
	//const [showModalDeleteVideo, setShowModalDeleteVideo] = useState(false);
	const [showModalDelete, setShowModalDelete] = useState(false);
	const [showModalSuccess, setShowModalSuccess] = useState(false);
	const [showButtonLoading, setShowButtonLoading] = useState(false);
	const [response, setResponse] = useState({});
	const [categoriaList, setCategoriaList] = useState([]);
	const [producto, setProducto] = useState({});

	const navigate = useNavigate();

	const refTitulo = useRef();
	const refDescripcion = useRef();
	const refPrice = useRef();
	const refImageUrl = useRef();
	const refFolder = useRef();
	const refCodigo = useRef();
	const refCategoria = useRef();
	const refBiblioteca = useRef();
	const refClasesUrl = useRef();

	// useEffect(()=>{
	//   const FetchCategoriaCurso = async()=>{
	//     try {
	//         //Falta agregar la autorizacion mediante bearer --Mucho ojo!!!
	//         const result = await fetch(`${process.env.REACT_APP_API_URL}/Producto/getAllCategoria?tipo=${'curso'}`,{
	//             method:'GET',
	//             credentials: 'include',
	//             headers:{
	//                 'Content-Type' : 'application/json',
	//                 'Accept' : 'application/json',
	//             },

	//         });
	//         const resultFetch = await result.json();

	//         //console.log(resultFetch);
	//         //console.log(result.status);
	//         if (result.status !== 200 && result.status !== 400) {
	//             throw resultFetch;
	//         }

	//         if (resultFetch.isSuccess) {
	//           setCategoriaList(resultFetch.result);
	//         }else{
	//           setCategoriaList([]);
	//         }

	//     } catch (error) {
	//       console.error(error);
	//       //toast.error('Algo ha fallado en nuestro servidor. Inténtelo más tarde');
	//       navigate('/error');
	//     }
	//   }
	//   FetchCategoriaCurso();
	// },[producto,navigate])

	const FetchProducto = useCallback(async () => {
		try {
			const result = await GetProductCode(curso.codigo);

			const resultFetch = await result.json();

			if (result.status !== 200 && result.status !== 400) {
				throw resultFetch;
			}

			if (resultFetch.isSuccess) {
				setProducto(resultFetch.result);
			} else {
				setProducto({});
			}
		} catch (error) {
			console.error(error);
			//toast.error('Algo ha fallado en nuestro servidor. Inténtelo más tarde');
			navigate("/error");
		}
	}, [curso, navigate]);

	const FetchCategoriaCurso = useCallback(async () => {
		try {
			const result = await GetCategoriaCursos();

			const resultFetch = await result.json();

			if (result.status !== 200 && result.status !== 400) {
				throw resultFetch;
			}

			if (resultFetch.isSuccess) {
				setCategoriaList(resultFetch.result);
			} else {
				setCategoriaList([]);
			}
		} catch (error) {
			console.error(error);
			//toast.error('Algo ha fallado en nuestro servidor. Inténtelo más tarde');
			navigate("/error");
		}
	}, [navigate]);

	const GetCapitulos = useCallback(async () => {
		try {
			const resultFromApi = await GetAllCapitulo(curso.id);

			const resultFetch = await resultFromApi.json();

			if (resultFromApi.status !== 200 && resultFromApi.status !== 400) {
				throw resultFetch;
			}
			if (resultFetch.isSuccess) {
				setCapitulos(resultFetch.result);
			} else {
				setCapitulos([]);
			}
		} catch (error) {
			console.error(error);
			//toast.error('Algo ha fallado en nuestro servidor. Inténtelo más tarde');
			setCapitulos([]);
			navigate("/error");
		}
	}, [curso, navigate]);

	useEffect(() => {
		FetchProducto();
		FetchCategoriaCurso();
		GetCapitulos();
	}, [FetchProducto, FetchCategoriaCurso, GetCapitulos]);

	const handleEditCap = (cap) => {
		setShowModalCapitulo(true);
		setCapitulo(cap);
	};

	const handleDeleteCap = (cap) => {
		setShowModalDelete(true);
		//setCapitulo(cap);
		setObjeto(cap);
		setTipo("capitulo");
	};

	const handleAddVideo = (cap) => {
		setShowModalVideo(true);
		setCapitulo(cap);
		setVideo({});
		//setVideos(cap.Videos);
	};

	//Esta funcion permite enviar la informacion para editar el curso en la base de datos
	const handleCursoEdit = async () => {
		setShowButtonLoading(true);
		try {
			const result = await UpdateCourse({
				id: curso.id,
				codigo: refCodigo.current.value,
				imagenUrl: refImageUrl.current.value,
				titulo: refTitulo.current.value,
				detalle: refDescripcion.current.value,
				// state: curso.state,
				// deberes: JSON.parse(curso.deberes),
				// pruebas: JSON.parse(curso.pruebas),
				// notaFinal : curso.notaFinal,
				teacherId: curso.teacherId,
				precio: refPrice.current.value,
				//isActive: curso.isActive,
				//capituloList: capitulos
				folderId: refFolder.current.value,
				categoriaId: refCategoria.current.value,
				bibliotecaUrl: refBiblioteca.current.value,
				claseUrl: refClasesUrl.current.value,
			});

			const resultFetch = await result.json();

			if (result.status !== 200 && result.status !== 400) {
				throw resultFetch;
			}

			setResponse(resultFetch);
			//console.log(resultFetch);
			setShowButtonLoading(false);
			setShowModalSuccess(true);

			GetCursos();

			resultFetch.isSuccess
				? toast.success(resultFetch.message)
				: toast.error(resultFetch.message);
		} catch (error) {
			setShowButtonLoading(false);
			console.error(error);
			//setResponse({});
			//console.log(resultFetch);
			setShowButtonLoading(false);
			setShowModalSuccess(true);
			toast.error("Algo ha fallado en nuestro servidor. Inténtelo más tarde");
		}
	};

	// const handleChange = ()  => {
	//   console.log(refCategoria.current.value);
	//   console.log(typeof(refCategoria.current.value));
	// }

	return (
		<div className="w-[95%] mx-auto">
			{/*Se muestran los modales para la generacion, edicion y eliminacion de los capitulos y videos del curso */}
			{showModalCapitulo && (
				<ModalCapitulo
					showModalCapitulo={showModalCapitulo}
					setShowModalCapitulo={setShowModalCapitulo}
					capitulo={capitulo}
					setCapitulo={setCapitulo}
					curso={curso}
					// setResponse={
					// 	setResponse
					// } /*capitulos={capitulos} setCapitulos={setCapitulos}*/
					GetCapitulos={GetCapitulos}
				/>
			)}

			{showModalVideo && (
				<ModalVideo
					showModalVideo={showModalVideo}
					setShowModalVideo={setShowModalVideo}
					video={video}
					setVideo={setVideo}
					videos={videos}
					setVideos={setVideos}
					capitulo={capitulo}
					setCapitulo={setCapitulo}
					// setResponse={
					// 	setResponse
					// } /*capitulos={capitulos} setCapitulos={setCapitulos}*/
					GetCapitulos={GetCapitulos}
				/>
			)}

			{showModalDelete && (
				<ModalDelete
					showModalDelete={showModalDelete}
					setShowModalDelete={setShowModalDelete}
					objeto={objeto}
					setObjeto={setObjeto}
					//setResponse={setResponse}
					tipo={tipo}
					setTipo={setTipo}
					getFunction={GetCapitulos}
				/>
			)}
			{showModalSuccess && (
				<ModalSuccess
					showModalSuccess={showModalSuccess}
					setShowModalSuccess={setShowModalSuccess}
					response={response}
					setResponse={setResponse}
					setShowCursos={setShowCursos}
					setShowVideos={setShowVideos}
				/>
			)}

			<div className="w-[95%] mx-auto mt-5 flex justify-between">
				<div className="group dark:text-white">
					<label className="mr-2 font-medium" htmlFor="titulo">
						Curso:{" "}
					</label>
					<input
						type="text"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
						placeholder="Escribe el titulo del curso aquí"
						name="titulo"
						//id="titulo"
						defaultValue={curso.titulo}
						ref={refTitulo}
					/>
				</div>
				<div className="group dark:text-white">
					<label className="mr-2 font-medium" htmlFor="titulo">
						Codigo:{" "}
					</label>
					<input
						type="text"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
						placeholder="Escribe el código del curso aquí"
						name="codigo"
						//id="codigo"
						defaultValue={curso.codigo}
						ref={refCodigo}
					/>
				</div>
				<div>
					<button
						type="button"
						onClick={() => {
							setShowModalCapitulo(true);
							setCapitulo({});
						}}
						className="bg-green-500 hover:bg-green-700 hover:text-white hover:cursor-pointer flex items-center px-4 py-2 rounded-lg"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							className="bi bi-plus-circle h-4 w-4 mr-2"
							viewBox="0 0 16 16"
						>
							<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
							<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
						</svg>
						Agregar Capitulo
					</button>
				</div>
			</div>
			<div className="w-[95%] mx-auto mt-5">
				<label
					className="block mb-2 font-medium text-gray-900 dark:text-white"
					htmlFor="imageUrl"
				>
					ID Imagen:{" "}
				</label>
				<input
					type="text"
					className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
					placeholder="Coloca la URL de la imagen aquí"
					name="imageUrl"
					//id="imageUrl"
					defaultValue={curso.imagenUrl}
					ref={refImageUrl}
				/>
			</div>
			<div className="w-[95%] mx-auto mt-5 flex justify-between space-x-4">
				<div className="w-[95%] mx-auto my-5">
					<label
						htmlFor="price"
						className="block mb-2 font-medium text-gray-900 dark:text-white"
					>
						Precio:
					</label>
					<input
						type="text"
						pattern="\d+(\.\d{0,2})?"
						name="price"
						//id="price"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
						placeholder="Coloca el precio del producto. Ejemplo: $100,50"
						required=""
						defaultValue={curso.precio}
						ref={refPrice}
					/>
				</div>
				<div className="w-[95%] mx-auto mt-5">
					<label
						className="block mb-2 font-medium text-gray-900 dark:text-white"
						htmlFor="folderId"
					>
						Carpeta:{" "}
					</label>
					<input
						type="text"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
						placeholder="Coloca el ID de la carpeta de deberes del curso aquí"
						name="folderId"
						//id="folderId"
						defaultValue={curso.folderId}
						ref={refFolder}
					/>
				</div>
			</div>
			<div className="w-[95%] mx-auto mt-5 flex justify-between space-x-4">
				<div className="w-[95%] mx-auto my-5">
					<label
						htmlFor="biblioteca"
						className="block mb-2 font-medium text-gray-900 dark:text-white"
					>
						Biblioteca:
					</label>
					<input
						type="text"
						name="biblioteca"
						//id="biblioteca"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
						placeholder="Coloca la URL de la biblioteca del curso aquí"
						defaultValue={curso.bibliotecaUrl}
						ref={refBiblioteca}
					/>
				</div>
				<div className="w-[95%] mx-auto mt-5">
					<label
						className="block mb-2 font-medium text-gray-900 dark:text-white"
						htmlFor="clasesEnVivo"
					>
						Clases en vivo:{" "}
					</label>
					<input
						type="text"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
						placeholder="Coloca la URL de las clases en vivo del curso aquí"
						name="clasesEnVivo"
						//id="clasesEnVivo"
						defaultValue={curso.claseUrl}
						ref={refClasesUrl}
					/>
				</div>
			</div>
			<div className="w-[95%] mx-auto mt-5">
				<label
					htmlFor="tipo"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>
					Tipo de Categoría:
				</label>
				{producto.id && (
					<select
						//id="tipo"
						name="tipo"
						className="text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						defaultValue={producto.categoriaId || 0}
						ref={refCategoria}
					>
						<option value={0}>---Seleccione el tipo de Categoría---</option>
						{categoriaList.length > 0 &&
							categoriaList.map((categoria) => (
								<option key={categoria.id} value={categoria.id}>
									{categoria.name}
								</option>
							))}
					</select>
				)}
			</div>
			<div className="w-[95%] mx-auto mt-5">
				<label
					htmlFor="descripcion"
					className="block mb-2 font-medium text-gray-900 dark:text-white"
				>
					Descripción:
				</label>
				<textarea
					//id="descripcion"
					name="descripcion"
					rows="4"
					className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Escribe la descripción del curso aquí"
					defaultValue={curso.detalle}
					ref={refDescripcion}
				></textarea>
			</div>

			{/*Aqui va la tabla con el contenido del capitulo */}
			<div className="w-[95%] mx-auto border-2 border-gray-400 my-10 rounded-lg">
				{/*curso.capituloList*/}
				{capitulos.length > 0 ? (
					capitulos.map((cap) => (
						<div key={cap.id}>
							<div className="flex justify-around items-center my-4">
								<div className="group dark:text-white">
									<label className="mr-2 font-medium" htmlFor="titulo">
										Capitulo:{" "}
									</label>
									<span
										className="rounded-lg bg-transparent dark:bg-slate-900 border-0"
										name="titulo"
										//id="titulo"
									>
										{cap.titulo}
									</span>
								</div>
								<div className="flex">
									<button
										type="button"
										onClick={() => handleAddVideo(cap)}
										className="bg-orange-400 hover:bg-orange-600 hover:text-white hover:cursor-pointer flex items-center px-4 py-2 text-sm rounded-lg mr-2"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="currentColor"
											className="bi bi-plus-circle h-4 w-4 mr-2"
											viewBox="0 0 16 16"
										>
											<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
											<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
										</svg>
										Agregar Videos
									</button>
									<button
										type="button"
										onClick={() => handleEditCap(cap)}
										className="flex items-center py-2 px-4 text-sm text-gray-900 hover:text-white bg-cyan-400 hover:bg-cyan-600 rounded-lg mr-2"
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
										Editar Capitulo
									</button>
									<button
										type="button"
										onClick={() => handleDeleteCap(cap)}
										className="flex items-center py-2 px-4 text-sm text-gray-900 hover:text-white bg-red-400 hover:bg-red-600 rounded-lg"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="currentColor"
											className="bi bi-trash3 w-4 h-4 mr-2"
											viewBox="0 0 16 16"
										>
											<path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
										</svg>
										Eliminar Capitulo
									</button>
								</div>
							</div>
							{/*tabla con la informacion de los videos */}
							<div className="overflow-x-auto">
								<table className="w-full text-sm text-left  dark:text-white">
									<thead className="text-xs  uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
										<tr>
											{/* <th scope="col" className="px-4 py-3">Código</th> */}
											<th scope="col" className="px-4 py-3">
												Titulo
											</th>
											<th scope="col" className="px-4 py-3">
												VideoURL
											</th>
											<th scope="col" className="px-4 py-3">
												Orden de Reproducción
											</th>
											{/* <th scope="col" className="px-4 py-3">Visto</th> */}
											<th scope="col" className="px-4 py-3">
												Editar/Eliminar
											</th>
										</tr>
									</thead>
									<tbody>
										{/* <VideoCard cap={cap} setShowModalVideo={setShowModalVideo} setShowModalDeleteVideo={setShowModalDeleteVideo} setVideo={setVideo} /> */}
										<VideoCard
											cap={cap}
											setShowModalVideo={setShowModalVideo}
											setShowModalDelete={setShowModalDelete}
											setVideo={setVideo}
											setObjeto={setObjeto}
											setTipo={setTipo}
										/>
										{/*{(cap.Videos.map((video) => (
                  <tr key={video.id} className="border-b dark:border-gray-700">
                    {/* <td className="px-4 py-3">{video.Codigo}</td>
                    <td className="px-4 py-3">{video.titulo}</td>
                    <td className="px-4 py-3">{video.videoUrl}</td>
                    <td className="px-4 py-3">{video.ordenReproduccion}</td>
                    {/* <td className="px-4 py-3">{String(video.Visto)}</td> */}
										{/*<td className="px-4 py-3">
                      <div className="py-1 flex justify-start">
                        <button onClick={() => handleEditVideo(video)} className="flex items-center justify-center py-2 px-4 text-sm text-gray-900 hover:text-white bg-yellow-300 hover:bg-yellow-400 rounded-lg mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-pencil-square h-4 w-4 mr-2" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                          </svg>
                          Editar
                        </button>
                        <button onClick={() => handleDeleteVideo(video)} className="flex items-center justify-center py-2 px-4 text-sm text-gray-900 hover:text-white bg-red-500 hover:bg-red-600 rounded-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-trash3 w-4 h-4 mr-2" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                          </svg>
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))): (null)} */}
									</tbody>
								</table>
							</div>
						</div>
					))
				) : (
					<div className="border-b dark:border-gray-700 group text-black dark:text-white">
						<span className="font-medium text-xl mb-10 p-5">
							No existen capitulos registrados para este curso...
						</span>
					</div>
				)}
			</div>

			<div className="flex justify-end my-10">
				{showButtonLoading ? (
					<button
						type="button"
						disabled
						className="flex items-center px-4 py-2 bg-blue-400 hover:bg-blue-600 text-gray 900 hover:text-white text-sm rounded-lg hover:scale-125"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							className="bi bi-floppy w-5 h-5 mr-2"
							viewBox="0 0 16 16"
						>
							<path d="M11 2H9v3h2z" />
							<path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z" />
						</svg>
						...Procensando
					</button>
				) : (
					<button
						type="button"
						onClick={() => handleCursoEdit()}
						className="flex items-center px-4 py-2 bg-gray-400 hover:bg-gray-600 text-gray 900 hover:text-white text-sm rounded-lg hover:scale-125"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							className="bi bi-floppy w-5 h-5 mr-2"
							viewBox="0 0 16 16"
						>
							<path d="M11 2H9v3h2z" />
							<path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z" />
						</svg>
						Guardar
					</button>
				)}
			</div>
		</div>
	);
};

/*


*/
