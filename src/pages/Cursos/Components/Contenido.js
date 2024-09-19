import { useEffect, useState } from 'react';
import { Capitulo } from '../Components';
import { toast } from 'react-toastify';


export const Contenido = ({codigo}) => {

    const [curso, setCurso] = useState({});
    console.log(codigo);

    useEffect(()=>{
        const FetchCapitulos = async()=>{
          try {
            const resultFromApi = await fetch(`${process.env.REACT_APP_API_URL}/Course/getCourseCode?codigo=${codigo}`,{
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
          setCurso(resultFetch.result);
          } catch (error) {
            console.error(error);
            toast.error('Ha ocurrido un error en el servidor');
          }
            
        }
        FetchCapitulos();
    },[codigo])

  return (
    <div>
        <Capitulo curso={curso} />
    </div>
  )
}
