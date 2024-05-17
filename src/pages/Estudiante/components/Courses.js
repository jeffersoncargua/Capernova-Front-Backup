import { CoursesCard } from "../../Estudiante/components";

export const Courses = ({setShowPlayer,setShowCourses}) => {

  const isActive = false;

  return (
    <div className="w-[95%] mx-auto flex flex-wrap space-x-8 ">

      <button  disabled={isActive} onClick={()=>{setShowPlayer(true);setShowCourses(false)}} className={`${!isActive ? `hover:cursor-pointer`: 'hover:cursor-not-allowed'}`}>
        <CoursesCard isActive={true} title='Activo' isCompleted={false} />        
      </button>
      
      <button disabled={!isActive} onClick={()=>{setShowPlayer(true);setShowCourses(false)}} className={`${isActive ? `hover:cursor-pointer`: 'hover:cursor-not-allowed'}`}>
        <CoursesCard isActive={false} title='Fuera de servicio' isCompleted={true} />       
      </button>

    </div>
  )
}
