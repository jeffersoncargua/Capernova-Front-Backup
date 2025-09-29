import { useCallback, useEffect, useState } from "react";
import {
	PlayerVideo,
	SideBar,
	Logros,
	Courses,
	Informacion,
	Deberes,
	Pruebas,
	Comentario,
	DeberDetail,
	PruebaDetail,
	Biblioteca,
	CursoLive,
} from "./components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetStudent } from "../../apiServices/StudentServices/StudentServices";

export const Estudiante = () => {
	const [showPlayer, setShowPlayer] = useState(false);
	const [showLogro, setShowLogro] = useState(false);
	const [showCourses, setShowCourses] = useState(false);
	const [showDeberes, setShowDeberes] = useState(false);
	const [showPruebas, setShowPruebas] = useState(false);
	const [showLibrary, setShowLibrary] = useState(false);
	const [showCursoLive, setShowCursoLive] = useState(false);
	const [showInformacion, setShowInformacion] = useState(true);
	const [showDeberDetail, setShowDeberDetail] = useState(false);
	const [showPruebaDetail, setShowPruebaDetail] = useState(false);
	const [estudiante, setEstudiante] = useState({});
	//const [response, setResponse] = useState({});
	const [matricula, setMatricula] = useState({});

	const navigate = useNavigate();

	const userStudent = useSelector((state) => state.userState.user);

	const FetchEstudiante = useCallback(async () => {
		try {
			const resultFromApi = await GetStudent(userStudent.nameIdentifier);

			const resultFetch = await resultFromApi.json();

			if (resultFromApi.status !== 200) {
				throw resultFetch;
			}

			if (resultFetch.isSuccess) {
				setEstudiante(resultFetch.result);
			}
		} catch (error) {
			console.error(error);
			navigate("/error");
		}
	}, [userStudent, navigate]);

	useEffect(() => {
		FetchEstudiante();
	}, [FetchEstudiante]);

	return (
		<div className="relative w-[95%] mx-auto">
			{/*Barra lateral de navegacion del estudiante */}

			<SideBar
				setShowPlayer={setShowPlayer}
				setShowLogro={setShowLogro}
				setShowCourses={setShowCourses}
				setShowDeberes={setShowDeberes}
				setShowPruebas={setShowPruebas}
				setShowInformacion={setShowInformacion}
				setShowDeberDetail={setShowDeberDetail}
				setShowPruebaDetail={setShowPruebaDetail}
				setShowLibrary={setShowLibrary}
				setShowCursoLive={setShowCursoLive}
				//setResponse={setResponse}
			/>

			{/*Informacion del estudiante */}

			{showInformacion && (
				<div className="p-4 sm:ml-56">
					<Informacion
						estudiante={estudiante}
						//response={response}
						//setResponse={setResponse}
						GetStudent={FetchEstudiante}
					/>
				</div>
			)}

			{showCourses && (
				<div className="p-4 sm:ml-56">
					<Courses
						setShowPlayer={setShowPlayer}
						setShowCourses={setShowCourses}
						estudiante={estudiante}
						setMatricula={setMatricula}
					/>
				</div>
			)}

			{showPlayer && (
				<div className="p-4 sm:ml-56">
					{/*Reproductor de video con el playlist */}
					<PlayerVideo
						estudiante={estudiante}
						matricula={matricula}
						setMatricula={setMatricula}
					/>
					{/*Componente para escribir un comentario */}
					<Comentario estudiante={estudiante} matricula={matricula} />
				</div>
			)}
			{/*Mostrar los logros de los cursos */}

			{showLogro && (
				<div className="p-4 sm:ml-56">
					<Logros estudiante={estudiante} />
				</div>
			)}

			{showDeberes && (
				<div className="p-4 sm:ml-56">
					<Deberes
						estudiante={estudiante}
						setMatricula={setMatricula}
						setShowDeberDetail={setShowDeberDetail}
					/>
				</div>
			)}

			{showDeberDetail && (
				<div className="p-4 sm:ml-56">
					<DeberDetail matricula={matricula} />
				</div>
			)}

			{showPruebas && (
				<div className="p-4 sm:ml-56">
					<Pruebas
						estudiante={estudiante}
						setMatricula={setMatricula}
						setShowPruebaDetail={setShowPruebaDetail}
					/>
				</div>
			)}

			{showPruebaDetail && (
				<div className="p-4 sm:ml-56">
					<PruebaDetail matricula={matricula} />
				</div>
			)}

			{showLibrary && (
				<div className="p-4 sm:ml-56">
					<Biblioteca estudiante={estudiante} />
				</div>
			)}

			{showCursoLive && (
				<div className="p-4 sm:ml-56">
					<CursoLive estudiante={estudiante} />
				</div>
			)}
		</div>
	);
};
