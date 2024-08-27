import { useState, useEffect } from "react";
import {Temario} from '../Components'

export const Capitulo = ({curso}) => {

    const [capitulos,setCapitulos] = useState([]);
    console.log(curso);

    useEffect(()=>{
        const fetchCapitulos = async()=>{
            const resultFromApi = await fetch(`https://localhost:7164/api/Capitulo/getAllCapitulo/${curso.id}`,{
                method:'GET',
                credentials : 'include',
                headers:{
                  'Content-Type' : 'application/json',
                  'Accept' : 'application/json'
                }
              });
  
            const resultFetch = await resultFromApi.json();
            console.log(resultFetch);
            setCapitulos(resultFetch.result);
        }
        if(Object.keys(curso).length > 0 ){
          fetchCapitulos();
        }
        
    },[curso])


  return (
    <div className="mt-5">
        {capitulos && capitulos.map((capitulo)=>(
            <>
              <h2 className="text-start mb-2 text-lg font-semibold text-gray-900 dark:text-white">{capitulo.titulo}</h2>
              <Temario key={capitulo.id} capitulo={capitulo}  />
            </> 
        ))}
    
    </div>
  )
}
