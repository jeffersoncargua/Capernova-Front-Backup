import { useCallback, useEffect, useState } from "react";
import { Videos} from "../Components";
//import { SideBar , Publicidad,Cursos, Videos, TalentoHumano,Profesor} from "./Components";
import { SideBar , Publicidad,Cursos, TalentoHumano,Profesor,Productos,Ventas,Pedidos} from "./Components";


export const Administracion = () => {

  let [cursoList, setCursoList] = useState([]);
  let [curso, setCurso] = useState({});
  let [profesor, setProfesor] = useState({});
  const [search , setSearch] = useState(''); //permite realizar las busquedas personalizadas de los cursos

  const [showPublicidad,setShowPublicidad] = useState(false);
  const [showCursos,setShowCursos] = useState(false);
  const [showModalCourse,setShowModalCourse] = useState(false);
  //const [showModalDeleteCurso,setShowModalDeleteCurso] = useState(false);
  const [showModalDelete,setShowModalDelete] = useState(false);
  const [showTalento,setShowTalento] = useState(false); //Permite visualizar el talento humano de la empresa
  const [showProfesor,setShowProfesor] = useState(false); //Permite visualizar los cursos que tiene y se le puede asignar a un profesor
  const [showVentas,setShowVentas] = useState(false);
  const [showPedidos,setShowPedidos] = useState(false);
  //const [showUsuarios,setShowUsuarios] = useState(false);
  const [showVideos,setShowVideos] = useState(false);
  //const [showModalAssigment,setShowModalAssigment] = useState(false);
  const [showProductos,setShowProductos] = useState(false);

  const [response, setResponse] = useState({}); //Permite mostrar si la accion se realizo correctamente al llamar al api
  

  const GetCurso = useCallback(async()=>{
     const resultFromApi = await fetch(`https://localhost:7164/api/Course/getAllCourse?search=${search}`,{
         method:'GET',
         credentials : 'include',
          headers:{
           'Content-Type' : 'application/json',
           'Accept' : 'application/json'
         }
       });
      let resultFetch = await resultFromApi.json();
     //const capitulos = JSON.parse(resultFetch.result[0].capitulos);
    setCursoList(resultFetch.result);
    
    //setCursoList(list);
  },[search])
  
  
    useEffect(()=>{
    
    GetCurso();

    },[GetCurso,showModalCourse,showModalDelete,showTalento,showVideos])

    //[GetCurso,showModalCourse,showModalDeleteCurso,showTalento,showVideos,response])

  return (
    <div className="w-[95%] mx-auto">
        
        <SideBar setShowPublicidad={setShowPublicidad} setShowCursos={setShowCursos} setShowVentas={setShowVentas} setShowPedidos={setShowPedidos} setShowVideos={setShowVideos} setShowTalento={setShowTalento} setShowProfesor={setShowProfesor} setShowProductos={setShowProductos} setResponse={setResponse} />

        <div className="sm:ml-56">
            {showPublicidad && <Publicidad response={response} setResponse={setResponse} />}
            {/* {showCursos && <Cursos setShowCursos={setShowCursos} setShowVideos={setShowVideos} showModalCourse={showModalCourse} setShowModalCourse={setShowModalCourse} showModalDeleteCurso={showModalDeleteCurso} setShowModalDeleteCurso={setShowModalDeleteCurso} cursoList={cursoList} curso={curso} setCurso={setCurso} setSearch={setSearch} response={response} setResponse={setResponse} />} */}
            {showCursos && <Cursos setShowCursos={setShowCursos} setShowVideos={setShowVideos} showModalCourse={showModalCourse} setShowModalCourse={setShowModalCourse} showModalDelete={showModalDelete} setShowModalDelete={setShowModalDelete} cursoList={cursoList} curso={curso} setCurso={setCurso} setSearch={setSearch} response={response} setResponse={setResponse} />}
            {showVideos && <Videos setShowCursos={setShowCursos} setShowVideos={setShowVideos}  curso={curso} setCurso={setCurso}  />}
            {showTalento && <TalentoHumano setShowTalento={setShowTalento} setShowProfesor={setShowProfesor} setProfesor={setProfesor} response={response} setResponse={setResponse} />}
            {showProfesor && <Profesor profesor={profesor} setProfesor={setProfesor} cursoList={cursoList} setSearch={setSearch} response={response} setResponse={setResponse} />} {/* Permite asignar el/los curso/s a un profesor */}
            {showProductos && <Productos  />}
            {showVentas && <Ventas  />}
            {showPedidos && <Pedidos  />}

        </div>

    </div>
  )
}
