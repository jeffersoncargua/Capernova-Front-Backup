import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export const CalificarDeber = ({deber,matricula}) => {

    const refCalificacionDeber = useRef();
    const [notaDeber,setNotaDeber] = useState({});
    const [response,setResponse] = useState({});

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
              //console.log(resultFetch);
              if (resultFetch.isSuccess) {
                setNotaDeber(resultFetch.result);  
              }
              
        }

        GetNotaDeber();
        response.isSuccess? toast.success(response.message):toast.error(response.message)
    },[deber,matricula,response])

    const handleCalificarDeberes = async(notaDeber) => {
        console.log(refCalificacionDeber.current.value);
        const resultFromApi = await fetch(`https://localhost:7164/api/Teacher/updateNotaDeber?id=${notaDeber.id}&studentId=${matricula.estudianteId}`,{
            method: 'PUT',
            credentials:'include',
            headers:{
              'Content-Type':'application/json',
              'Accept':'application/json'
            },
            body: JSON.stringify(refCalificacionDeber.current.value)
          });
          const resultFetch = await resultFromApi.json();
          setResponse(resultFetch);
          
    }

  return (
    <>
        <td className="px-4 py-3">{notaDeber.observacion || 'Sin archivo'}</td>
        <td className="px-4 py-3">{notaDeber.estado || 'Sin entregar'}</td>
        <td className="px-4 py-3">
            <input type="text" name="calificacion" id="calificacion" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500" defaultValue={notaDeber.calificacion} ref={refCalificacionDeber} />
        </td>
        <td className="px-4 py-3">
          <div className="flex justify-center space-x-3 items-center">
            <Link to={`https://drive.google.com/file/d/${notaDeber.fileUrl}/preview`} target="_blank" className="flex items-center justify-center py-2 px-4 text-sm text-gray-900 hover:text-white bg-green-300 hover:bg-green-400 rounded-lg mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-eye h-4 w-4 mr-2" viewBox="0 0 16 16">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
              </svg>
              Revisar Deber
            </Link>
            <button onClick={() => {handleCalificarDeberes(notaDeber)}} className="flex items-center justify-center py-2 px-4 text-sm text-gray-900 hover:text-white bg-yellow-300 hover:bg-yellow-400 rounded-lg mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-pencil-square h-4 w-4 mr-2" viewBox="0 0 16 16">
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                  <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
              </svg>
              Calificar Deber
            </button>
          </div>
            
        </td>
    </>
  )
}
