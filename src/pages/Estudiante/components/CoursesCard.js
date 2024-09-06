//import { useEffect } from "react";

//export const CoursesCard = ({isActive, title, isCompleted,children}) => {
export const CoursesCard = ({matricula, children}) => {

  //const [curso,setCurso] = useState({})

  // useEffect(()=>{

  //   const fetchCurso = async() => {
  //     const resultFromApi = await fetch(`https://localhost:7164/api/Student/getCurso/${matricula.cursoId}`,{
  //       method: 'GET',
  //       credentials:'include',
  //       headers:{
  //         'Content-Type':'application/json',
  //         'Accept':'application/json'
  //       }
  //     });
  //     const resultFetch = await resultFromApi.json();
  //     //console.log(resultFetch);
  //     if(resultFetch.isSuccess){
  //       setCurso(resultFetch.result);
  //     }
  //   }
  // fetchCurso();
    
  // },[matricula,setCurso]);



  return (
    <div className="w-full md:max-w-xs mx-auto bg-white mb-8 flex flex-col items-center border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      {/*Muestra la imagen del curso */}
      <div className="w-full md:max-w-xs">
        <img className="rounded-t-lg " src={matricula.curso.imagenUrl} alt="Aqui va la imagen del curso" />
      </div>        
      
      <div className="w-[95%] mx-auto flex flex-col justify-center items-center ">
          <h5 className="mb-2 text-md font-semibold tracking-tight text-center text-gray-900 dark:text-white">{matricula.curso.titulo}</h5>
          
          {/*Muestra los estados del curso */}
          <div className="w-full mb-2 flex flex-wrap justify-around">
            {/*Mostrar el estado de acceso */}
            <span className={`inline-flex items-center ${matricula.isActive ? 'bg-green-100':'bg-red-100'} ${matricula.isActive ? 'text-green-800':'text-red-800'} text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300`}>
                <span className={`w-2 h-2 me-1 ${matricula.isActive ? 'bg-green-500':'bg-red-500'} rounded-full`}></span>
                {matricula.isActive ? 'Activado':'Deshabilitado'}
            </span>
            {/*Mostrar el estado de progreso */}
            <span className={`inline-flex items-center ${matricula.estado === 'Completado' ? 'bg-orange-100':'bg-blue-100'} ${matricula.estado === 'Completado' ? 'text-orange-800':'text-blue-800'} text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300`}>
                <span className={`w-2 h-2 me-1 ${matricula.estado === 'Completado'? 'bg-orange-500':'bg-blue-500'} rounded-full`}></span>
                {matricula.estado}
            </span>
          </div>
      </div>

      <div>
        {/*El children es el progressBar */}
        {children}
      </div>         
    </div>
  )
}

/*<button disabled >
      <ProgressBar />
  </button>
        

  <div className="w-full md:max-w-xs mx-auto bg-white mb-8 flex flex-col items-center border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        {/*Muestra la imagen del curso 
        <div className="w-full md:max-w-xs">
          <img className="rounded-t-lg " src='https://media.es.wired.com/photos/650b2a2e72d73ca3bd5ef0cc/16:9/w_1600,c_limit/Business-OpenAI-Dall-E-3-heart.jpg' alt="Fondo" />
        </div>        
        
        <div className="w-[95%] mx-auto flex flex-col justify-center items-center ">
            <h5 className="mb-2 text-md font-semibold tracking-tight text-center text-gray-900 dark:text-white">Titulo Producto</h5>
            
            {/*Muestra los estados del curso 
            <div className="w-full mb-2 flex flex-wrap justify-around">
              {/*Mostrar el estado de acceso 
              <span className={`inline-flex items-center ${matricula.isActive ? 'bg-green-100':'bg-red-100'} ${matricula.isActive ? 'text-green-800':'text-red-800'} text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300`}>
                  <span className={`w-2 h-2 me-1 ${matricula.isActive ? 'bg-green-500':'bg-red-500'} rounded-full`}></span>
                  {matricula}
              </span>
              {/*Mostrar el estado de progreso
              <span className={`inline-flex items-center ${matricula.isCompleted ? 'bg-orange-100':'bg-blue-100'} ${matricula.isCompleted? 'text-orange-800':'text-blue-800'} text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300`}>
                  <span className={`w-2 h-2 me-1 ${matricula.isCompleted? 'bg-orange-500':'bg-blue-500'} rounded-full`}></span>
                  {matricula.isCompleted ? 'Completado':'En progreso'}
              </span>
            </div>
        </div>

        <div>
          {/*El children es el progressBar 
          {children}
        </div>        
      </div>
            
*/
