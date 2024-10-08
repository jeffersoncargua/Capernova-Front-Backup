import { useEffect, useState } from "react"
import { TeacherCard } from "./TeacherCard"
import { useNavigate } from "react-router-dom";

export const TalentoHumano = () => {

    const [teacherList,setTeacherList] = useState([]);
    const navigate = useNavigate();

    useEffect(() =>{
        
        const getTeacher = async() => {
            try {
                const resultFromApi = await fetch(`${process.env.REACT_APP_API_URL}/Teacher/getAllTeacher`,{
                    method:'GET',
                    credentials:'include',
                    headers: {
                        'Content-Type' : 'application/json',
                        'Accept' : 'application/json'
                    }
                });
                const resultFetch = await resultFromApi.json();

                //console.log(resultFromApi.status);
                if (resultFromApi.status !== 200 && resultFromApi.status !== 400) {
                    throw resultFetch;
                }

                if (resultFetch.isSuccess) {
                    setTeacherList(resultFetch.result);
                }else{
                    setTeacherList([]);
                }
                

            } catch (error) {
                console.error(error);
                navigate('/error');
            }
            
        }

        getTeacher();
    },[navigate])

    //console.log(teacherList);

  return (
    <div className='w-[95%] flex flex-col my-[50px] leading-loose mx-auto dark:bg-gray-900'>
        {/* <h1 className="self-center text-5xl font-extrabold before:block before:absolute before:-inset-1 before:-skew-y-[1.7deg] before:bg-black dark:before:bg-slate-50 relative inline-block mb-8" ><span className="before:block before:absolute before:-inset-1 before:skew-y-[1.7deg] before:bg-amber-300 "><span className=" text-white relative ">Nuestros Profesores</span></span></h1> */}
        <h1 className="self-center text-5xl font-medium text-center my-10 dark:text-white">
          <span>
                Nuestros Profesores
                <hr className="mx-auto w-[250px] border border-blue-400 drop-shadow-md" />
          </span>
      </h1>
        {teacherList.length > 0 && teacherList.map((teacher,index)=>(
            <TeacherCard key={index} teacher={teacher} index={index} />
        ))}
        
    </div>
  )
}
