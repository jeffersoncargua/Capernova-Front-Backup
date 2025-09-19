import { useEffect, useState } from "react";
import { CoursesCard } from "../components";
import { clearPlaylist } from "../../../redux/playlistSlice";
import { useDispatch } from "react-redux";
//import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination, Navigation } from "swiper/modules";

//Styles Swiper
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";
import { GetCoursesStudent } from "../../../apiServices/StudentServices/StudentServices";

//import { useSelector } from "react-redux";

export const Courses = ({
	setShowPlayer,
	setShowCourses,
	estudiante,
	setMatricula,
}) => {
	const [matriculaList, setMatriculaList] = useState([]);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		const FecthCourses = async () => {
			try {
				var resultFromApi = await GetCoursesStudent(estudiante.id);

				const resultFetch = await resultFromApi.json();

				if (resultFromApi.status !== 200 && resultFromApi.status !== 400) {
					throw resultFetch;
				}
				if (resultFetch.isSuccess) {
					setMatriculaList(resultFetch.result);
				}
			} catch (error) {
				console.error(error);
				navigate("/error");
			}
		};

		FecthCourses();

		dispatch(clearPlaylist([]));
	}, [estudiante, dispatch, setShowCourses, navigate]);

	return (
		// <div className="w-[95%] mx-auto flex flex-wrap space-x-8 ">
		<div className="w-[95%] mx-auto flex space-x-8 ">
			<Swiper
				pagination={{
					type: "fraction",
				}}
				navigation={true}
				modules={[Pagination, Navigation]}
				className="text-black dark:text-white"
			>
				{matriculaList.length > 0 &&
					matriculaList.map((matricula, index) => (
						<div key={index || Math.random()}>
							<SwiperSlide className="" style={{ width: "" }}>
								<button
									disabled={!matricula.isActive}
									onClick={() => {
										setShowPlayer(true);
										setShowCourses(false);
										setMatricula(matricula);
									}}
									className={`${matricula.isActive ? `hover:cursor-pointer` : "hover:cursor-not-allowed"} contents `}
								>
									<CoursesCard matricula={matricula} />
								</button>
							</SwiperSlide>
						</div>
					))}
			</Swiper>
		</div>
	);
};

/*
<button  disabled={isActive} onClick={()=>{setShowPlayer(true);setShowCourses(false)}} className={`${!isActive ? `hover:cursor-pointer`: 'hover:cursor-not-allowed'}`}>
        <CoursesCard isActive={true} title='Activo' isCompleted={false} />        
      </button>
      
      <button disabled={!isActive} onClick={()=>{setShowPlayer(true);setShowCourses(false)}} className={`${isActive ? `hover:cursor-pointer`: 'hover:cursor-not-allowed'}`}>
        <CoursesCard isActive={false} title='Fuera de servicio' isCompleted={true} />       
      </button>
*/
