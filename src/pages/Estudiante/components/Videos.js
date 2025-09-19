import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addVideo } from "../../../redux/playlistSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
	GetVideosCourse,
	UpdateStateMatricula,
} from "../../../apiServices/StudentServices/StudentServices";

export const Videos = ({
	capitulo,
	handlePlay,
	estudiante,
	matricula,
	setMatricula,
}) => {
	const [videoList, setVideoList] = useState([]);
	const [videoViewList, setVideoViewList] = useState([]);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const playList = useSelector((state) => state.playListState.playList);

	useEffect(() => {
		const FetchVideos = async () => {
			try {
				const resultFromApi = await fetch(
					`${process.env.REACT_APP_API_URL}/Student/getVideos/${capitulo.id}`,
					{
						method: "GET",
						credentials: "include",
						headers: {
							"Content-Type": "application/json",
							Accept: "application/json",
						},
					},
				);
				const resultFetch = await resultFromApi.json();

				if (resultFromApi.status !== 200 && resultFromApi.status !== 400) {
					throw resultFetch;
				}

				if (resultFetch.isSuccess) {
					setVideoList(
						resultFetch.result.sort(
							(a, b) => a.ordenReproduccion - b.ordenReproduccion,
						),
					); //sort() permite ordenar la lista de videos de acuerdo al orden de reproduccion
					resultFetch.result
						.sort((a, b) => a.ordenReproduccion - b.ordenReproduccion)
						.forEach((element) => {
							dispatch(addVideo(element));
						});
					//playList.push(resultFetch.result.sort((a,b)=> a.ordenReproduccion-b.ordenReproduccion));
					//console.log(playList);
					//setPlayList([...resultFetch.result.sort((a,b)=> a.ordenReproduccion-b.ordenReproduccion)])
				}
			} catch (error) {
				console.error(error);
				navigate("/error");
			}
		};

		FetchVideos();
	}, [capitulo, dispatch, navigate]);

	useEffect(() => {
		const FetchVisualizacion = async () => {
			try {
				var resultFromApi = await GetVideosCourse(
					estudiante.id,
					matricula.cursoId,
				);

				const resultFetch = await resultFromApi.json();

				if (resultFromApi.status !== 200 && resultFromApi.status !== 400) {
					throw resultFetch;
				}

				if (resultFetch.isSuccess) {
					setVideoViewList(resultFetch.result);
				}
			} catch (error) {
				console.error(error);
				toast.error("Algo ha fallado en nuestro servidor. Inténtelo más tarde");
			}
		};

		const interval = setInterval(() => {
			FetchVisualizacion();
		}, 1500);
		return () => clearInterval(interval);
	}, [estudiante, matricula]);

	useEffect(() => {
		const FecthUpdateEstadoMatricula = async () => {
			try {
				if (
					playList.length > 0 &&
					playList.length === videoViewList.length &&
					matricula.estado === "En progreso"
				) {
					var resultFromApi = await UpdateStateMatricula({
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
		};

		FecthUpdateEstadoMatricula();
	}, [matricula, videoViewList, playList, setMatricula]);

	const GetVideoView = (id) => {
		const result = videoViewList.find(
			(videoView) =>
				videoView.videoId === id && videoView.studentId === estudiante.id,
		);
		if (result && result.estado === "Visto") {
			return true;
		}
	};

	return (
		<ul className="text-sm text-center text-black bg-white border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white md:m-0">
			{videoList.length > 0 &&
				videoList.map((video) => (
					<li
						key={video.id}
						className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 group"
					>
						<button
							className="w-[80%] flex justify-between"
							onClick={() => handlePlay(video)}
						>
							<svg
								className={`w-4 h-4 ${GetVideoView(video.id) ? "text-green-500 dark:text-green-500 " : "text-gray-500 dark:text-gray-400 "} flex-shrink-0`}
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
							</svg>
							<span className="ml-5 dark:group-hover:text-black">
								{video.titulo}
							</span>
						</button>
					</li>
				))}
		</ul>
	);
};
