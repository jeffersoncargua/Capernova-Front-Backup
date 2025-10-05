import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import { toast } from "react-toastify";
import { GetAllCourse } from "../../../apiServices/ManagmentServices/ManagmentCourseServices";
import { Videos } from "../Components";
//import { SideBar , Publicidad,Cursos, Videos, TalentoHumano,Profesor} from "./Components";
import {
	AreasCategorias,
	Cursos,
	Inscripcion,
	Pedidos,
	Productos,
	Profesor,
	Publicidad,
	SideBar,
	TalentoHumano,
	Ventas,
} from "./Components";

export const Administracion = () => {
	const [cursoList, setCursoList] = useState([]);
	const [curso, setCurso] = useState({});
	const [profesor, setProfesor] = useState({});
	const [search, setSearch] = useState(""); //permite realizar las busquedas personalizadas de los cursos

	const [showPublicidad, setShowPublicidad] = useState(false);
	const [showCursos, setShowCursos] = useState(false);
	const [showModalCourse, setShowModalCourse] = useState(false);
	const [showModalDelete, setShowModalDelete] = useState(false);
	const [showTalento, setShowTalento] = useState(false); //Permite visualizar el talento humano de la empresa
	const [showProfesor, setShowProfesor] = useState(false); //Permite visualizar los cursos que tiene y se le puede asignar a un profesor
	const [showVentas, setShowVentas] = useState(true);
	const [showPedidos, setShowPedidos] = useState(false);
	const [showVideos, setShowVideos] = useState(false);
	const [showProductos, setShowProductos] = useState(false);
	const [showAreaCategoria, setShowAreaCategoria] = useState(false);
	const [showInscripcion, setShowInscripcion] = useState(false);

	//const [response, setResponse] = useState({}); //Permite mostrar si la accion se realizo correctamente al llamar al api
	const navigate = useNavigate();

	const GetCursos = useCallback(async () => {
		try {
			const resultFromApi = await GetAllCourse(search);

			const resultFetch = await resultFromApi.json();

			if (resultFromApi.status !== 200 && resultFromApi.status !== 400) {
				throw resultFetch;
			}

			if (resultFetch.isSuccess) {
				setCursoList(resultFetch.result);
			} else {
				setCursoList([]);
			}
		} catch (error) {
			console.error(error);
			navigate("/error");
		}
	}, [search, navigate]);

	useEffect(() => {
		GetCursos();
	}, [GetCursos]);

	return (
		<div className="w-[95%] mx-auto">
			<SideBar
				setShowPublicidad={setShowPublicidad}
				setShowCursos={setShowCursos}
				setShowVentas={setShowVentas}
				setShowPedidos={setShowPedidos}
				setShowVideos={setShowVideos}
				setShowTalento={setShowTalento}
				setShowProfesor={setShowProfesor}
				setShowProductos={setShowProductos}
				//setResponse={setResponse}
				setShowAreaCategoria={setShowAreaCategoria}
				setShowInscripcion={setShowInscripcion}
			/>

			<div className="sm:ml-56">
				{showPublicidad && <Publicidad />}
				{showAreaCategoria && (
					// <AreasCategorias response={response} setResponse={setResponse} />
					<AreasCategorias />
				)}
				{/* {showCursos && <Cursos setShowCursos={setShowCursos} setShowVideos={setShowVideos} showModalCourse={showModalCourse} setShowModalCourse={setShowModalCourse} showModalDeleteCurso={showModalDeleteCurso} setShowModalDeleteCurso={setShowModalDeleteCurso} cursoList={cursoList} curso={curso} setCurso={setCurso} setSearch={setSearch} response={response} setResponse={setResponse} />} */}
				{showCursos && (
					<Cursos
						setShowCursos={setShowCursos}
						setShowVideos={setShowVideos}
						showModalCourse={showModalCourse}
						setShowModalCourse={setShowModalCourse}
						showModalDelete={showModalDelete}
						setShowModalDelete={setShowModalDelete}
						cursoList={cursoList}
						curso={curso}
						setCurso={setCurso}
						setSearch={setSearch}
						//response={response}
						//setResponse={setResponse}
						GetCursos={GetCursos}
					/>
				)}
				{showVideos && (
					<Videos
						setShowCursos={setShowCursos}
						setShowVideos={setShowVideos}
						curso={curso}
						setCurso={setCurso}
						GetCursos={GetCursos}
					/>
				)}
				{showTalento && (
					<TalentoHumano
						setShowTalento={setShowTalento}
						setShowProfesor={setShowProfesor}
						setProfesor={setProfesor}
						//response={response}
						//setResponse={setResponse}
					/>
				)}
				{showProfesor && (
					<Profesor
						profesor={profesor}
						setProfesor={setProfesor}
						cursoList={cursoList}
						setSearch={setSearch}
						// response={response}
						// setResponse={setResponse}
						GetCursos={GetCursos}
					/>
				)}
				{/* Permite asignar el/los curso/s a un profesor */}
				{showProductos && <Productos />}
				{showVentas && <Ventas />}
				{showPedidos && <Pedidos />}
				{showInscripcion && <Inscripcion />}
			</div>
		</div>
	);
};
