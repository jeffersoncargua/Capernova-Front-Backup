import { useState } from "react";
import { SideBar, Cursos,Ventas,Pedidos} from "./Components";


export const Secretaria = () => {

  let [cursoList, setCursoList] = useState([]);
  //let [curso, setCurso] = useState({});

  //const [showEstudiantes,setShowEstudiantes] = useState(false);
  const [showCursos,setShowCursos] = useState(false);
  const [showVentas,setShowVentas] = useState(true);
  const [showPedidos,setShowPedidos] = useState(false);


  return (
    <div className="w-[95%] mx-auto">
        <SideBar /*setShowEstudiantes={setShowEstudiantes}*/ setShowCursos={setShowCursos} setShowVentas={setShowVentas} setShowPedidos={setShowPedidos}  />

        
      <div className="sm:ml-56">
          {showCursos && <Cursos setShowCursos={setShowCursos} cursoList={cursoList} setCursoList={setCursoList}  />}
          {/* {showEstudiantes && <Estudiantes setShowEstudiantes={setShowEstudiantes} />} */}
          
          {showVentas && <Ventas />}
          {showPedidos && <Pedidos  />}
        
      </div>
    </div>
    
  )
}
