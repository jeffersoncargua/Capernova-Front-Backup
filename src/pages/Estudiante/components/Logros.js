import { CoursesCard, ProgressBar } from "../../Estudiante/components";

export const Logros = () => {

  console.log('Estas en tus logros');

  return (
    <div className="w-[95%] mx-auto flex flex-wrap ">
      <CoursesCard isActive={true} title='Active' isCompleted={false}>
        <ProgressBar porcentaje={40} isCompleted={false}  />
      </CoursesCard>
      <CoursesCard isActive={false} title='Fuera de servicio' isCompleted={true} >
        <ProgressBar porcentaje={100} isCompleted={true}/>
      </CoursesCard>
    </div>
  )
}
