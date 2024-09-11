import { useState, useEffect} from "react";
import { CoursesCard, ProgressBar , ModalDownload} from "../../Estudiante/components";

export const Logros = ({estudiante}) => {

  
  const [matriculaList,setMatriculaList] = useState([]);
  const [showModalDownload, setShowModalDownload] = useState(false);
  const [result,setResult] = useState({});

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
      console.log(resultFetch);
      if(resultFetch.isSuccess){
        setMatriculaList(resultFetch.result);
      }
    }

    fecthCourses();
  },[estudiante])

  return (
    <div className="w-[95%] mx-auto flex flex-wrap space-x-8  ">

      {/*Aqui van los modal */}
      
      {showModalDownload && <ModalDownload showModalDownload={showModalDownload} setShowModalDownload={setShowModalDownload} result={result} setResult={setResult} />}

      {matriculaList.length > 0 && matriculaList.map((matricula) => (
        <div key={matricula.id}>
          <CoursesCard matricula={matricula} >
              <ProgressBar porcentaje={100} isCompleted={true} setShowModalDownload={setShowModalDownload} setResult={setResult}/>
          </CoursesCard>
        </div>))}
      
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
