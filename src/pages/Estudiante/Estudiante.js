import { useEffect, useState } from "react";
import { PlayerVideo, SideBar, Logros, Courses, Informacion,Deberes,Pruebas} from "../Estudiante/components";
import { useSelector } from "react-redux";


export const Estudiante = () => {

  const [showPlayer, setShowPlayer] = useState(false);
  const [showLogro, setShowLogro] = useState(false);
  const [showCourses, setShowCourses] = useState(false);
  const [showDeberes, setShowDeberes] = useState(false);
  const [showPruebas, setShowPruebas] = useState(false);
  const [showInformacion, setShowInformacion] = useState(true);
  const [estudiante, setEstudiante] = useState({});
  const [curso, setCurso] = useState({});
  const [response, setResponse] = useState({});
  const [matricula,setMarticula] = useState({});


  const userStudent = useSelector(state => state.userState.user);
  //console.log(userStudent);

  useEffect(()=>{
      const fetchEstudiante = async() => {
        const resultFromApi = await fetch(`https://localhost:7164/api/Student/getEstudiante?id=${userStudent.nameIdentifier}`,{
          method:'GET',
          credentials : 'include',
          headers:{
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
          }
        });
  
        const resultFetch = await resultFromApi.json();
        //console.log(resultFetch);
        if (resultFetch.isSuccess) {
          setEstudiante(resultFetch.result);
        }
      };

      fetchEstudiante();

  },[userStudent])

  return (
    <div className="relative w-[95%] mx-auto">
        <SideBar setShowPlayer={setShowPlayer}  setShowLogro={setShowLogro} setShowCourses={setShowCourses} setShowDeberes={setShowDeberes} setShowPruebas={setShowPruebas} setShowInformacion={setShowInformacion} /> {/*Barra lateral de navegacion del estudiante */}

        {/*Informacion del estudiante */}
        
        {showInformacion && 
        <div className="p-4 sm:ml-56">
          <Informacion estudiante={estudiante} response={response} setResponse={setResponse} />
        </div>
        }

        {showCourses && 
        <div className="p-4 sm:ml-56">
          <Courses setShowPlayer={setShowPlayer} setShowCourses={setShowCourses} estudiante={estudiante} curso={curso} setCurso={setCurso} setMarticula={setMarticula} />
        </div>}

        {showPlayer && 
        <div className="p-4 sm:ml-56">
          {/*Reproductor de video con el playlist */}
           <PlayerVideo curso={curso} estudiante={estudiante} matricula={matricula} /> 
           {/*Componente para escribir un comentario */}
            <div className="my-8 w-[95%] md:w-2/3 mx-auto flex flex-col sm:ml-4 justifify-center">          
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dejanos tu comentario</label>
              <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Escribe tu comentario aqui..."></textarea>
              <button type="button" className=" w-36 my-3 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Enviar</button>
            </div>
        </div>}
        {/*Mostrar los logros de los cursos */}
        
        {showLogro && 
          <div className="p-4 sm:ml-56" >
            <Logros estudiante={estudiante} />
          </div>}

        {showDeberes && 
        <div className="p-4 sm:ml-56" >
          <Deberes />
        </div>}

        {showPruebas && 
        <div className="p-4 sm:ml-56" >
          <Pruebas />
        </div>}

    </div>
  )
}
