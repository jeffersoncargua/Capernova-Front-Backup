import { useState } from "react";
import { Cursos, Pedidos, SideBar, Ventas } from "./Components";

export const Secretaria = () => {
	const [cursoList, setCursoList] = useState([]);

	const [showCursos, setShowCursos] = useState(false);
	const [showVentas, setShowVentas] = useState(true);
	const [showPedidos, setShowPedidos] = useState(false);

	return (
		<div className="w-[95%] mx-auto">
			<SideBar /*setShowEstudiantes={setShowEstudiantes}*/
				setShowCursos={setShowCursos}
				setShowVentas={setShowVentas}
				setShowPedidos={setShowPedidos}
			/>

			<div className="sm:ml-56">
				{showCursos && (
					<Cursos
						setShowCursos={setShowCursos}
						cursoList={cursoList}
						setCursoList={setCursoList}
					/>
				)}
				{/* {showEstudiantes && <Estudiantes setShowEstudiantes={setShowEstudiantes} />} */}

				{showVentas && <Ventas />}
				{showPedidos && <Pedidos />}
			</div>
		</div>
	);
};
