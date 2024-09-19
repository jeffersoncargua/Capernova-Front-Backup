import { useState,useEffect } from "react";
import { toast } from "react-toastify";

export const Temario = ({capitulo}) => {

    const [temas,setTemas] = useState([]);
    console.log(capitulo);


    useEffect(()=>{
        const FetchVideos = async()=>{
          try {
            const resultFromApi = await fetch(`${process.env.REACT_APP_API_URL}/Video/getAllVideos/${capitulo.id}`,{
              method:'GET',
              credentials : 'include',
              headers:{
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
              }
            });

          const resultFetch = await resultFromApi.json();

          if (resultFromApi.status !== 200) {
            throw resultFetch;
          }
          //console.log(resultFetch);
          setTemas(resultFetch.result);
          } catch (error) {
            console.error(error);
            toast.error('Ha ocurrido un error en el servidor');
          }
            
        }
        FetchVideos();
    },[capitulo])
  return (
        <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
          {temas && temas.map((tema) => (
            <li key={tema.id} className="flex items-center">
                <svg className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                </svg>
                {tema.titulo}
            </li>
          ))}
        </ul>
  )
}
