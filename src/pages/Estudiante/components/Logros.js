import { useState } from "react";
import { CoursesCard, ProgressBar , ModalDownload} from "../../Estudiante/components";

export const Logros = () => {

  //console.log('Estas en tus logros');

  const [showModalDownload, setShowModalDownload] = useState(false);
  const [result,setResult] = useState({});

  return (
    <div className="w-[95%] mx-auto flex flex-wrap ">

      {/*Aqui van los modal */}
      
      {showModalDownload && <ModalDownload showModalDownload={showModalDownload} setShowModalDownload={setShowModalDownload} result={result} setResult={setResult} />}

      <CoursesCard isActive={true} title='Active' isCompleted={false} >
        <ProgressBar porcentaje={40} isCompleted={false} setShowModalDownload={setShowModalDownload} setResult={setResult} />
      </CoursesCard>
      <CoursesCard isActive={false} title='Fuera de servicio' isCompleted={true}>
        <ProgressBar porcentaje={100} isCompleted={true} setShowModalDownload={setShowModalDownload} setResult={setResult}/>
      </CoursesCard>
    </div>
  )
}
