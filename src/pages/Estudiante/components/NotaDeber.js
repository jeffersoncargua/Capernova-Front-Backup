import { useEffect, useState } from "react"


export const NotaDeber = ({deber,matricula}) => {

    const [notaDeber,setNotaDeber] = useState({});

    //console.log(deber);


    useEffect(()=>{
        const GetNotaDeber = async() => {
            const resultFromApi = await fetch(`https://localhost:7164/api/Student/getNotaDeber?id=${deber.id}&studentId=${matricula.estudianteId}`,{
                method: 'GET',
                credentials:'include',
                headers:{
                  'Content-Type':'application/json',
                  'Accept':'application/json'
                }
              });
              const resultFetch = await resultFromApi.json();
              console.log(resultFetch);
              if (resultFetch.isSuccess) {
                setNotaDeber(resultFetch.result);  
              }
              
        }

        GetNotaDeber();
    },[deber,matricula])

  return (
    <>
        <td className="px-6 py-4 ">
            {notaDeber.estado || 'Por entregar'}
        </td>
        <td className="px-6 py-4 ">
            {notaDeber.observacion || 'No se ha encontrado un archivo'}
        </td>
        <td className="px-6 py-4 ">
            {notaDeber.calificacion || 'Sin calificación'}
        </td>
    </>
    

    
    
  )
}
