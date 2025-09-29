import { useCallback, useEffect, useState } from "react";
import { Videos, ModalCompleted } from "../components";
import { useSelector } from "react-redux";
//import VideoPlayer from "react-player/vimeo";
import VideoPlayer from "react-player/youtube";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
	CreateViewVideo,
	GetAllCapitulos,
} from "../../../apiServices/StudentServices/StudentServices";

import {
	//GetVideos,
	GetVideosCourse,
	UpdateStateMatricula,
} from "../../../apiServices/StudentServices/StudentServices"; //Quitar si no funciona correctamente lo hecho anteriormente

export const PlayerVideo = ({ estudiante, matricula, setMatricula }) => {
	const playList = useSelector((state) => state.playListState.playList);
	const [currentVideo, setCurrentVideo] = useState({});

	const [videoViewList, setVideoViewList] = useState([]); //Se agrego para probar sy funcionalidad si no sirve se quita

	const navigate = useNavigate();

	const [capituloList, setCapiuloList] = useState([]);
	const [showModalCompleted, setShowModalCompleted] = useState(false);

	const FetchCapitulos = useCallback(async () => {
		try {
			const resultFromApi = await GetAllCapitulos(matricula.cursoId);

			const resultFetch = await resultFromApi.json();

			if (resultFromApi.status !== 200 && resultFromApi.status !== 400) {
				throw resultFetch;
			}

			if (resultFetch.isSuccess) {
				setCapiuloList(resultFetch.result);
			}
		} catch (error) {
			console.error(error);
			toast.error(
				"Algo ha fallado en nuestro servidor. Inténte retornar a sus cursos",
			);
			navigate("/error");
		}
	}, [matricula, navigate]);

	useEffect(() => {
		FetchCapitulos();
	}, [FetchCapitulos]);

	const fetchCreateVisualizacion = async (id) => {
		try {
			const resultFromApi = await CreateViewVideo({
				videoId: id,
				studentId: estudiante.id,
				cursoId: matricula.cursoId,
			});

			const resultFetch = await resultFromApi.json();

			if (resultFromApi.status !== 200 && resultFromApi.status !== 400) {
				throw resultFetch;
			}

			FetchVisualizacion();
		} catch (error) {
			console.error(error);
			toast.error(
				"Algo ha fallado en nuestro servidor. Inténte retornar a sus cursos",
			);
			navigate("/error");
		}
	};

	const handlePlayer = (id) => {
		if (id !== null) {
			fetchCreateVisualizacion(id);
		}
		const videoActual = playList.find((urlItem) => urlItem.id === id);
		const nextVideo = playList[playList.indexOf(videoActual) + 1];
		if (nextVideo) {
			setCurrentVideo(nextVideo);
		} else {
			setShowModalCompleted(true);
		}
	};

	const handlePlay = (video) => {
		setCurrentVideo(video);
	};

	const FecthUpdateEstadoMatricula = useCallback(async () => {
		//Se agrego si no srive se quita
		try {
			if (
				playList.length > 0 &&
				playList.length === videoViewList.length &&
				matricula.estado === "En progreso"
			) {
				const resultFromApi = await UpdateStateMatricula({
					id: matricula.id,
					cursoId: matricula.cursoId,
					estudianteId: matricula.estudianteId,
					isActive: matricula.isActive,
				});

				const resultFetch = await resultFromApi.json();

				if (resultFromApi.status !== 200 && resultFromApi.status !== 400) {
					throw resultFetch;
				}

				if (resultFetch.isSuccess) {
					setMatricula(resultFetch.result);
					toast.success(
						`Has finalizado de ver los videos tutoriales del curso ${matricula.curso.titulo}`,
					);
				}
			}
		} catch (error) {
			console.error(error);
			toast.error("Algo ha fallado en nuestro servidor. Inténtelo más tarde");
		}
	}, [matricula, videoViewList, playList, setMatricula]);

	const FetchVisualizacion = useCallback(async () => {
		//Se agrego si no sirve se quita
		try {
			const resultFromApi = await GetVideosCourse(
				estudiante.id,
				matricula.cursoId,
			);

			const resultFetch = await resultFromApi.json();

			if (resultFromApi.status !== 200 && resultFromApi.status !== 400) {
				throw resultFetch;
			}

			if (
				resultFetch.result.length === playList.length &&
				matricula.estado === "En progreso"
			) {
				FecthUpdateEstadoMatricula();
			}

			if (resultFetch.isSuccess) {
				setVideoViewList(resultFetch.result);
			}
		} catch (error) {
			console.error(error);
			toast.error("Algo ha fallado en nuestro servidor. Inténtelo más tarde");
		}
	}, [estudiante, matricula, playList, FecthUpdateEstadoMatricula]);

	// useEffect(() => { //Se agrego si no sirve se quita
	// 	const interval = setInterval(() => {
	// 		FetchVisualizacion();
	// 	}, 1000);
	// 	return () => clearInterval(interval);
	// }, [FetchVisualizacion]);

	return (
		<div className="w-[95%] mx-auto flex flex-wrap justify-between">
			{showModalCompleted && (
				<ModalCompleted
					showModalCompleted={showModalCompleted}
					setShowModalCompleted={setShowModalCompleted}
				/>
			)}

			<div className="flex-initial w-full md:w-2/3 mb-10">
				{currentVideo && (
					<VideoPlayer
						playing={true}
						url={
							currentVideo.videoUrl ||
							"https://www.youtube.com/watch?v=eGo20jYz5I0"
						}
						controls={true}
						onEnded={() => handlePlayer(currentVideo.id || null)}
						//onDuration={(duration)=>handleDuration(duration)}
						width="100%"
					/>
				)}
			</div>

			<div className="flex-initial w-full md:w-[30%]">
				{capituloList.length > 0 &&
					capituloList.map((capitulo) => (
						<ul
							key={capitulo.id}
							className="text-sm text-center text-black bg-white border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white md:m-0"
						>
							<li className="w-full px-4 py-2 font-bold text-lg border-b border-gray-200 bg-blue-100 dark:bg-gray-500 dark:border-gray-600">
								{capitulo.titulo}
							</li>
							{/* <Videos capitulo={capitulo} handlePlay={handlePlay} playList={playList} estudiante={estudiante} matricula={matricula} /> */}
							<Videos
								capitulo={capitulo}
								handlePlay={handlePlay}
								estudiante={estudiante}
								//matricula={matricula} //Se debe descomentar si no sirve videoViewList
								//setMatricula={setMatricula} //Se debe descomentar si no sirve videoViewList
								videoViewList={videoViewList} //Se agrgo sino sirve se quita
							/>
						</ul>
					))}
			</div>
		</div>
	);
};

/*
<div className='flex-initial w-full md:w-[30%]'>
            <ul className="text-sm text-center text-gray-900 bg-white border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white mt-8 md:m-0">
                <li className="w-full px-4 py-2 font-bold text-lg border-b border-gray-200 bg-blue-100 dark:border-gray-600">
                    Gastronomia
                </li>
                {playList.map((urlItem)=>(
                    <li key={urlItem.id} className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50">
                        <button className='w-[80%] flex justify-between' onClick={()=>handlePlay(urlItem)}>
                            <svg className={`w-4 h-4 ${urlItem.view ? 'text-green-500' :'text-gray-500'} dark:text-gray-400 flex-shrink-0`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                            </svg>
                            <span className='ml-5' >{urlItem.titulo}</span>
                        </button>
                    </li>
                ))}
                
            </ul>
        </div>

*/
