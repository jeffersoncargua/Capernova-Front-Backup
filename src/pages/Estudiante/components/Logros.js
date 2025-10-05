import { useCallback, useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import {
	CoursesCard,
	ModalDownload,
	ProgressBar,
} from "../../Estudiante/components";

//Styles Swiper
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";
import { GetCoursesStudent } from "../../../apiServices/StudentServices/StudentServices";

export const Logros = ({ estudiante }) => {
	const [matriculaList, setMatriculaList] = useState([]);
	const [showModalDownload, setShowModalDownload] = useState(false);
	const [result, setResult] = useState({}); //Sirve para pasar informacion al modal Download para obtener la informacion y generar el certificado

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
		//<div className="w-[95%] mx-auto flex flex-wrap space-x-8  ">
		<div className="w-[95%] mx-auto flex space-x-8  ">
			{/*Aqui van los modal */}

			{showModalDownload && (
				<ModalDownload
					showModalDownload={showModalDownload}
					setShowModalDownload={setShowModalDownload}
					result={result}
					setResult={setResult}
				/>
			)}

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
								<div className="contents">
									<CoursesCard matricula={matricula}>
										<ProgressBar
											matricula={matricula}
											setShowModalDownload={setShowModalDownload}
											setResult={setResult}
										/>
									</CoursesCard>
								</div>
							</SwiperSlide>
						</div>
					))}
			</Swiper>
		</div>
	);
};

/*

<CoursesCard isActive={true} title='Active' isCompleted={false} >
        <ProgressBar porcentaje={40} isCompleted={false} setShowModalDownload={setShowModalDownload} setResult={setResult} />
      </CoursesCard>
      <CoursesCard isActive={false} title='Fuera de servicio' isCompleted={true}>
        <ProgressBar porcentaje={100} isCompleted={true} setShowModalDownload={setShowModalDownload} setResult={setResult}/>
      </CoursesCard>

*/
