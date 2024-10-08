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

          if (resultFromApi.status !== 200 && resultFromApi.status !== 400) {
            throw resultFetch;
          }
          //console.log(resultFetch);
          if (resultFetch.isSuccess) {
            setCurso(resultFetch.result);
          }else{
            toast.error(resultFetch.message);
          }
          
          } catch (error) {
            console.error(error);
            toast.error('Algo ha fallado en nuestro servidor. Inténtelo más tarde');
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
