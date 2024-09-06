import { useEffect, useState } from "react";
import { CoursesCard } from '../components'
import { clearPlaylist } from "../../../redux/playlistSlice";
import { useDispatch } from "react-redux";

export const Courses = ({setShowPlayer,setShowCourses,estudiante,curso,setCurso,setMarticula}) => {

  const [matriculaList,setMatriculaList] = useState([]);
  const dispatch = useDispatch();

  

  useEffect(()=>{
    const fecthCourses = async()=>{
      const resultFromApi = await fetch(`https://localhost:7164/api/Student/getCursos?id=${estudiante.id}`,{
        method: 'GET',
        credentials:'include',
        headers:{
          'Content-Type':'application/json',
          'Accept':'application/json'
        }
      });
      const resultFetch = await resultFromApi.json();
      //console.log(resultFetch);
      if(resultFetch.isSuccess){
        setMatriculaList(resultFetch.result);
      }
    }

    fecthCourses();
    dispatch(clearPlaylist());
  },[estudiante,dispatch])

  //console.log(matriculaList);
  //const isActive = false;

  return (
    <div className="w-[95%] mx-auto flex flex-wrap space-x-8 ">

      {matriculaList.length > 0 && matriculaList.map((matricula) => (
        <div key={matricula.id}>
          <button disabled={!matricula.isActive} onClick={()=>{setShowPlayer(true);setShowCourses(false);setMarticula(matricula)}} className={`${matricula.isActive ? `hover:cursor-pointer`: 'hover:cursor-not-allowed'}`}>
            <CoursesCard matricula={matricula} curso={curso} setCurso={setCurso} />
          </button>
        </div>
        
      ))}


    </div>
  )
}


/*
<button  disabled={isActive} onClick={()=>{setShowPlayer(true);setShowCourses(false)}} className={`${!isActive ? `hover:cursor-pointer`: 'hover:cursor-not-allowed'}`}>
        <CoursesCard isActive={true} title='Activo' isCompleted={false} />        
      </button>
      
      <button disabled={!isActive} onClick={()=>{setShowPlayer(true);setShowCourses(false)}} className={`${isActive ? `hover:cursor-pointer`: 'hover:cursor-not-allowed'}`}>
        <CoursesCard isActive={false} title='Fuera de servicio' isCompleted={true} />       
      </button>
*/