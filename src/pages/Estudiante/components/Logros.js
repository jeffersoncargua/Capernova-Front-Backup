import { useState, useEffect} from "react";
import { CoursesCard, ProgressBar , ModalDownload} from "../../Estudiante/components";
import { toast } from "react-toastify";

import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination, Navigation } from 'swiper/modules';

//Styles Swiper
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


export const Logros = ({estudiante}) => {

  
  const [matriculaList,setMatriculaList] = useState([]);
  const [showModalDownload, setShowModalDownload] = useState(false);
  const [result,setResult] = useState({});

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
  },[estudiante])

  return (
    //<div className="w-[95%] mx-auto flex flex-wrap space-x-8  ">
    <div className="w-[95%] mx-auto flex space-x-8  ">

      {/*Aqui van los modal */}
      
      {showModalDownload && <ModalDownload  showModalDownload={showModalDownload} setShowModalDownload={setShowModalDownload} result={result} setResult={setResult} />}

      {/* {matriculaList.length > 0 && matriculaList.map((matricula) => (
        <div key={matricula.id}>
          <CoursesCard matricula={matricula} >
              <ProgressBar matricula={matricula} setShowModalDownload={setShowModalDownload} setResult={setResult}/>
          </CoursesCard>
        </div>))} */}

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
              <div className="contents">
                <CoursesCard matricula={matricula} >
                  <ProgressBar matricula={matricula} setShowModalDownload={setShowModalDownload} setResult={setResult}/>
                </CoursesCard>
              </div>
            </SwiperSlide>
          </div>
          
        ))}
      </Swiper>
      
    </div>
  )
}

/*

<CoursesCard isActive={true} title='Active' isCompleted={false} >
        <ProgressBar porcentaje={40} isCompleted={false} setShowModalDownload={setShowModalDownload} setResult={setResult} />
      </CoursesCard>
      <CoursesCard isActive={false} title='Fuera de servicio' isCompleted={true}>
        <ProgressBar porcentaje={100} isCompleted={true} setShowModalDownload={setShowModalDownload} setResult={setResult}/>
      </CoursesCard>

*/
