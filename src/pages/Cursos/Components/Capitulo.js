import { useState, useEffect } from "react";
import {Temario} from '../Components'
import { toast } from "react-toastify";

export const Capitulo = ({curso}) => {

    const [capitulos,setCapitulos] = useState([]);
    console.log(curso);

    useEffect(()=>{
      const FetchCapitulos = async()=>{
        try {
          const resultFromApi = await fetch(`${process.env.REACT_APP_API_URL}/Capitulo/getAllCapitulo/${curso.id}`,{
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
        setCapitulos(resultFetch.result);
        } catch (error) {
          console.error(error);
          toast.error('Ha ocurrido un error en el servidor');
        }
          
      }
      
      if(Object.keys(curso).length > 0 ){
        FetchCapitulos();
      }
        
    },[curso])


  return (
    <div className="mt-5">
        {capitulos && capitulos.map((capitulo)=>(
            <>
              <h2 key={capitulo.id} className="text-start mb-2 text-lg font-semibold text-gray-900 dark:text-white">{capitulo.titulo}</h2>
              <Temario  capitulo={capitulo}  />
            </> 
        ))}
    
    </div>
  )
}
