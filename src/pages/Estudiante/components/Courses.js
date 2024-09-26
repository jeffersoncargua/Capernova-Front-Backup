import { useEffect, useState } from "react";
import { CoursesCard } from '../components'
import { clearPlaylist } from "../../../redux/playlistSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination, Navigation } from 'swiper/modules';

//Styles Swiper
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

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

  console.log(matriculaList.length > 0 );
  //const isActive = false;

  return (
    // <div className="w-[95%] mx-auto flex flex-wrap space-x-8 ">
    <div className="w-[95%] mx-auto flex space-x-8 ">

      {/* {matriculaList.length > 0 && matriculaList.map((matricula) => (        
        <div key={matricula.id}>
          <button disabled={!matricula.isActive} onClick={()=>{setShowPlayer(true);setShowCourses(false);setMatricula(matricula)}} className={`${matricula.isActive ? `hover:cursor-pointer`: 'hover:cursor-not-allowed'}`}>
            <CoursesCard matricula={matricula}  />
          </button>
        </div>
        
      ))} */}      

      <Swiper 
         pagination={{
          type: 'fraction',
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="text-black dark:text-white">
        {matriculaList.length > 0 && matriculaList.map((matricula,index) => (        
          <div key={index || Math.random()}>
            <SwiperSlide className="" style={{width:''}} >
              <button disabled={!matricula.isActive} onClick={()=>{setShowPlayer(true);setShowCourses(false);setMatricula(matricula)}} className={`${matricula.isActive ? `hover:cursor-pointer`: 'hover:cursor-not-allowed'} contents `}>
                <CoursesCard matricula={matricula}  />
              </button>
            </SwiperSlide>
          </div>
          
        ))}
      </Swiper>

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