import { useEffect, useState } from "react"
import { toast } from "react-toastify";


export const NotaDeber = ({deber,matricula}) => {

    const [notaDeber,setNotaDeber] = useState({});

    //console.log(deber);


    useEffect(()=>{
        const GetNotaDeber = async() => {
          try {
            const resultFromApi = await fetch(`${process.env.REACT_APP_API_URL}/Student/getNotaDeber?id=${deber.id}&studentId=${matricula.estudianteId}`,{
              method: 'GET',
              credentials:'include',
              headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
              }
            });
            const resultFetch = await resultFromApi.json();


            if (resultFromApi.status !== 200) {
              throw resultFetch;
            }
            //console.log(resultFetch);
            if (resultFetch.isSuccess) {
              setNotaDeber(resultFetch.result);  
            }
          } catch (error) {
            if (error.statusCode !== 400) {
              console.error(error);
              toast.error('Algo ha fallado en nuestro servidor. Inténtelo más tarde');
            }
           
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
