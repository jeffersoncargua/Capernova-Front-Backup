import { useState } from "react";
import { SideBar, Cursos, Estudiantes} from "./Components";


export const Secretaria = () => {

  let [cursoList, setCursoList] = useState([]);
  //let [curso, setCurso] = useState({});

  const [showEstudiantes,setShowEstudiantes] = useState(false);
  const [showCursos,setShowCursos] = useState(false);
  //const [showVentas,setShowVentas] = useState(false);


  return (
    <div className="w-[95%] mx-auto">
        <SideBar setShowEstudiantes={setShowEstudiantes} setShowCursos={setShowCursos} /*setShowVentas={setShowVentas} */ />

        
      <div className="sm:ml-56">
          {showCursos && <Cursos setShowCursos={setShowCursos} cursoList={cursoList} setCursoList={setCursoList}  />}
          {showEstudiantes && <Estudiantes setShowEstudiantes={setShowEstudiantes} />}
        
      </div>
    </div>
    
  )
}
