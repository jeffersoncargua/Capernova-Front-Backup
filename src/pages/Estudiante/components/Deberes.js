import { useState,useEffect } from "react";
import { CoursesCard } from '../components'


export const Deberes = ({estudiante,setMatricula,setShowDeberDetail}) => {

  const [matriculaList,setMatriculaList] = useState([]);
  
  //const dispatch = useDispatch();


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
    //dispatch(clearPlaylist([]));
  },[estudiante])


  return (
    <div className="w-[95%] mx-auto flex flex-wrap space-x-8">
      {matriculaList.length > 0 && matriculaList.map((matricula) => (
        <div key={matricula.id}>
          <button disabled={!matricula.isActive} onClick={()=>{setMatricula(matricula);setShowDeberDetail(true)}} className={`${matricula.isActive ? `hover:cursor-pointer`: 'hover:cursor-not-allowed'}`}>
            <CoursesCard matricula={matricula}  />
          </button>
        </div>
        
      ))}
    </div>
  )
}
