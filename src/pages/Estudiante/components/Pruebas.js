import { useState, useEffect } from "react";
import { CoursesCard } from "../components";
import { toast } from "react-toastify";

import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination, Navigation } from "swiper/modules";

//Styles Swiper
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { GetCoursesStudent } from "../../../apiServices/StudentServices/StudentServices";

export const Pruebas = ({ estudiante, setMatricula, setShowPruebaDetail }) => {
	const [matriculaList, setMatriculaList] = useState([]);

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
				} else {
					setMatriculaList([]);
				}
			} catch (error) {
				console.error(error);
				toast.error("Algo ha fallado en nuestro servidor. Inténtelo más tarde");
			}
		};

		FecthCourses();
	}, [estudiante]);

	return (
		// <div className="w-[95%] mx-auto flex flex-wrap space-x-8">
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
									disabled={!matricula.isActive}
									onClick={() => {
										setMatricula(matricula);
										setShowPruebaDetail(true);
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
