import { useEffect, useState } from "react";
import { CoursesCard } from '../components'
import { clearPlaylist } from "../../../redux/playlistSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
//import { useSelector } from "react-redux";

export const Courses = ({setShowPlayer,setShowCourses,estudiante,setMatricula}) => {

  const [matriculaList,setMatriculaList] = useState([]);
  const dispatch = useDispatch();

  
  //const playList = useSelector(state => state.playListState.playList);
  //console.log(playList);

  useEffect(()=>{
    const FecthCourses = async()=>{
      try {
        const resultFromApi = await fetch(`${process.env.REACT_APP_API_URL}/Student/getCursos?id=${estudiante.id}`,{
          method: 'GET',
          credentials:'include',
          headers:{
            'Content-Type':'application/json',
            'Accept':'application/json'
          }
        });
        const resultFetch = await resultFromApi.json();

        if (resultFromApi.status !== 200) {
          throw resultFetch;
        }
        //console.log(resultFetch);
        if(resultFetch.isSuccess){
          setMatriculaList(resultFetch.result);
        }
      } catch (error) {
        console.error(error);
        toast.error('Algo ha fallado en nuestro servidor. Inténtelo más tarde');
      }
      
    }

    FecthCourses();
    dispatch(clearPlaylist([]));
  },[estudiante,dispatch,setShowCourses])

  //console.log(matriculaList);
  //const isActive = false;

  return (
    <div className="w-[95%] mx-auto flex flex-wrap space-x-8 ">

      {matriculaList.length > 0 && matriculaList.map((matricula) => (
        <div key={matricula.id}>
          <button disabled={!matricula.isActive} onClick={()=>{setShowPlayer(true);setShowCourses(false);setMatricula(matricula)}} className={`${matricula.isActive ? `hover:cursor-pointer`: 'hover:cursor-not-allowed'}`}>
            <CoursesCard matricula={matricula}  />
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