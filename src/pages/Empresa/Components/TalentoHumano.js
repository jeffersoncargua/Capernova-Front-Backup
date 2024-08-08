import { useEffect, useState } from "react"
import { TeacherCard } from "./TeacherCard"

export const TalentoHumano = () => {

    const [teacherList,setTeacherList] = useState([]);

    useEffect(() =>{
        const getTeacher = async() => {
            const resultFromApi = await fetch(`https://localhost:7164/api/Teacher/getAllTeacher`,{
                method:'GET',
                credentials:'include',
                headers: {
                    'Content-Type' : 'application/json',
                    'Accept' : 'application/json'
                }
            });
            const resultFetch = await resultFromApi.json();
            setTeacherList(resultFetch.result);
            
        }

        getTeacher();
    },[])

    console.log(teacherList);

  return (
    <div className='w-[95%] flex flex-col my-[50px] leading-loose mx-auto dark:bg-gray-900'>
        <h1 className="self-center text-5xl font-extrabold before:block before:absolute before:-inset-1 before:-skew-y-[1.7deg] before:bg-black dark:before:bg-slate-50 relative inline-block mb-8" ><span className="before:block before:absolute before:-inset-1 before:skew-y-[1.7deg] before:bg-amber-300 "><span className=" text-white relative ">Nuestros Profesores</span></span></h1>
        {teacherList.map((teacher,index)=>(
            <TeacherCard key={index} teacher={teacher} index={index} />
        ))}
        
    </div>
  )
}
