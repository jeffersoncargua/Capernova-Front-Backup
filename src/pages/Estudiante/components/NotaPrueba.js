import { useEffect, useState } from "react"


export const NotaPrueba = ({test,matricula}) => {



    const [notaPrueba,setNotaPrueba] = useState({});

    useEffect(()=>{
      const GetNotaPrueba = async() => {
          const resultFromApi = await fetch(`https://localhost:7164/api/Student/getNotaPrueba?id=${test.id}&studentId=${matricula.estudianteId}`,{
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
              setNotaPrueba(resultFetch.result);  
            }
            
      }

      GetNotaPrueba();
      
  },[test,matricula])


    useEffect(()=>{
        const GetNotaDeber = async() => {
            const resultFromApi = await fetch(`https://localhost:7164/api/Student/getNotaPrueba?id=${test.id}&studentId=${matricula.estudianteId}`,{
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
                setNotaPrueba(resultFetch.result);  
              }
              
        }

        GetNotaDeber();
    },[test,matricula])

  return (
    <>
        <td className="px-6 py-4 ">
            {notaPrueba.estado || 'Por realizar'}
        </td>
        <td className="px-6 py-4 ">
            {notaPrueba.observacion || 'No existe registro'}
        </td>
        <td className="px-6 py-4 ">
            {notaPrueba.calificacion || 'Sin calificación'}
        </td>
    </>
    

    
    
  )
}
