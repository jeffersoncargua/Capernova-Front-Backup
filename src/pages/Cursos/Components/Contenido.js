import { useEffect, useState } from 'react';
import { Capitulo } from '../Components';


export const Contenido = ({codigo}) => {

    const [curso, setCurso] = useState({});
    console.log(codigo);

    useEffect(()=>{
        const fetchCapitulos = async()=>{
            const resultFromApi = await fetch(`https://localhost:7164/api/Course/getCourseCode?codigo=${codigo}`,{
                method:'GET',
                credentials : 'include',
                headers:{
                  'Content-Type' : 'application/json',
                  'Accept' : 'application/json'
                }
              });
  
            const resultFetch = await resultFromApi.json();
            console.log(resultFetch);
            setCurso(resultFetch.result);
        }
        fetchCapitulos();
    },[codigo])

  return (
    <div>
        <Capitulo curso={curso} />
    </div>
  )
}
