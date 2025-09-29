import { useState, useEffect, useCallback } from "react";
import { CoursesCard } from "../components";
//import { toast } from "react-toastify";

import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination, Navigation } from "swiper/modules";

//Styles Swiper
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";
import { GetCoursesStudent } from "../../../apiServices/StudentServices/StudentServices";

export const Deberes = ({ estudiante, setMatricula, setShowDeberDetail }) => {
	const [matriculaList, setMatriculaList] = useState([]);

	const navigate = useNavigate();

	const FecthCourses = useCallback(async () => {
		try {
			const resultFromApi = await GetCoursesStudent(estudiante.id);

			const resultFetch = await resultFromApi.json();

			if (resultFromApi.status !== 200 && resultFromApi.status !== 400) {
				throw resultFetch;
			}

			if (resultFetch.isSuccess) {
				setMatriculaList(resultFetch.result);
			} else {
				setMatriculaList([]);
			}
		} catch (error) {
			console.error(error);
			navigate("/error");
		}
	}, [estudiante, navigate]);

	useEffect(() => {
		FecthCourses();
	}, [FecthCourses]);

	return (
		//<div className="w-[95%] mx-auto flex flex-wrap space-x-8">
		<div className="w-[95%] mx-auto flex space-x-8">
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
									type="button"
									disabled={!matricula.isActive}
									onClick={() => {
										setMatricula(matricula);
										setShowDeberDetail(true);
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
