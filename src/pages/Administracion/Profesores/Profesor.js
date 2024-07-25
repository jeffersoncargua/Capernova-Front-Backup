import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

import { SideBar,Cursos,Videos,Estudiantes,Informacion,Deberes,Pruebas } from "./Components"

export const Profesor = () => {

  const userTeacher = useSelector(state=>state.userState.user); //permite obtener el id del profesor cuando se loguea

  let [cursoList, setCursoList] = useState([]);
  let [curso, setCurso] = useState({});
  //const [search, setSearch] = useState('');
  const [showInformacion,setShowInformacion] = useState(false);
  const [showEstudiante,setShowEstudiantes] = useState(false);
  const [showCursos,setShowCursos] = useState(false);
  const [showDeberes,setShowDeberes] = useState(false);
  const [showPruebas,setShowPruebas] = useState(false);
  const [showVideos,setShowVideos] = useState(false);
  const [response, setResponse] = useState({});

  const GetCurso = useCallback(async()=>{
    const resultFromApi = await fetch(`https://localhost:7164/api/Teacher?id=${userTeacher.nameIdentifier}`,{
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
 },[userTeacher])
 
 
   useEffect(()=>{
   
   GetCurso();

   },[GetCurso,showCursos,showVideos,response])

   console.log(cursoList);

  return (
    <div className="w-[95%] mx-auto">
      <SideBar setShowInformacion={setShowInformacion} setShowCursos={setShowCursos} setShowVideos={setShowVideos} setShowEstudiantes={setShowEstudiantes} setShowDeberes={setShowDeberes} setShowPruebas={setShowPruebas} />
      
      <div className="md:ml-64">
        
        {showInformacion && <Informacion />}
        {showCursos && <Cursos setShowCursos={setShowCursos} setShowVideos={setShowVideos} cursoList={cursoList} curso={curso} setCurso={setCurso} response={response} setResponse={setResponse} setShowDeberes={setShowDeberes} setShowPruebas={setShowPruebas} />}
        {showVideos && <Videos setShowCursos={setShowCursos} setShowVideos={setShowVideos} curso={curso} setCurso={setCurso} setShowDeberes={setShowDeberes} setShowPruebas={setShowPruebas} />}
        {showDeberes && <Deberes setShowCursos={setShowCursos} setShowVideos={setShowVideos} curso={curso} setCurso={setCurso} setShowDeberes={setShowDeberes} setShowPruebas={setShowPruebas} />}
        {showPruebas && <Pruebas setShowCursos={setShowCursos} setShowVideos={setShowVideos} curso={curso} setCurso={setCurso} setShowDeberes={setShowDeberes} setShowPruebas={setShowPruebas} />}
        {showEstudiante && <Estudiantes />}
      </div>
    </div>
  )
}
