import { useState } from "react";
import { SideBar , Publicidad,Cursos, Videos} from "./Components";

export const Administracion = () => {

  let [cursoList, setCursoList] = useState([]);
  let [curso, setCurso] = useState({});

  const [showPublicidad,setShowPublicidad] = useState(false);
  const [showCursos,setShowCursos] = useState(false);
  const [showVentas,setShowVentas] = useState(false);
  const [showUsuarios,setShowUsuarios] = useState(false);
  const [showVideos,setShowVideos] = useState(false);

  return (
    <div className="w-[95%] mx-auto">
        
        <SideBar setShowPublicidad={setShowPublicidad} setShowCursos={setShowCursos} setShowVentas={setShowVentas} setShowVideos={setShowVideos} />

        <div className="sm:ml-56">
            {showPublicidad && <Publicidad />}
            {showCursos && <Cursos setShowCursos={setShowCursos} setShowVideos={setShowVideos} cursoList={cursoList} setCursoList={setCursoList} curso={curso} setCurso={setCurso} />}
            {showVideos && <Videos setShowCursos={setShowCursos} setShowVideos={setShowVideos}  curso={curso} setCurso={setCurso}  />}
        </div>

    </div>
  )
}
