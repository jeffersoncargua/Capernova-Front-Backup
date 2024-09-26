import { useState,useEffect } from "react";
import { CoursesCard } from '../components'
import { toast } from "react-toastify";

import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination, Navigation } from 'swiper/modules';

//Styles Swiper
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


export const Deberes = ({estudiante,setMatricula,setShowDeberDetail}) => {

  const [matriculaList,setMatriculaList] = useState([]);
  
  //const dispatch = useDispatch();


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
          toast.error('Algo ha fallado en nuestro servidor. Inténtalo más tarde');
        
        
      }
      
    }

    FecthCourses();
    //dispatch(clearPlaylist([]));
  },[estudiante])


  return (
    //<div className="w-[95%] mx-auto flex flex-wrap space-x-8">
    <div className="w-[95%] mx-auto flex space-x-8">
      {/* {matriculaList.length > 0 && matriculaList.map((matricula) => (
        <div key={matricula.id}>
          <button disabled={!matricula.isActive} onClick={()=>{setMatricula(matricula);setShowDeberDetail(true)}} className={`${matricula.isActive ? `hover:cursor-pointer`: 'hover:cursor-not-allowed'}`}>
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
              <button disabled={!matricula.isActive} onClick={()=>{setMatricula(matricula);setShowDeberDetail(true)}} className={`${matricula.isActive ? `hover:cursor-pointer`: 'hover:cursor-not-allowed'} contents `}>
                <CoursesCard matricula={matricula}  />
              </button>
            </SwiperSlide>
          </div>
          
        ))}
      </Swiper>

    </div>
  )
}
