import { Tooltip } from 'react-tooltip';
import { useState } from 'react';
import {Loading} from '../components';
import { toast } from 'react-toastify';


export const ProgressBar = ({matricula,setShowModalDownload, setResult }) => {

  const [showLoading , setLoading] = useState(false);

  const handleGetCertificate = async() => {
    setLoading(true);
    try {
      const result = await fetch(`${process.env.REACT_APP_API_URL}/Student/getCertificate?studentId=${matricula.estudianteId}&cursoId=${matricula.cursoId}`,{
        method: 'GET',
        headers:{
          'Content-Type' : 'application/json',
          'Accept' : 'application/json'
        }
      });
  
      const resultFetch = await result.json();

      if (result.status !== 200) {
        throw resultFetch;
      }

      console.log(resultFetch);
      setShowModalDownload(true);
      setResult(resultFetch);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error('Algo ha fallado en nuestro servidor. Inténtlo más tarde');
    }
    
  }

  //console.log((matricula.estado === 'Completado' && matricula.notaFinal !== null)); //Esta condicional es necesaria para poder activar el boton para descargar el certificado

  return (

    <div>
      {showLoading && <Loading /> }
      <button onClick={() => handleGetCertificate()} disabled={(matricula.estado === 'Completado' && matricula.notaFinal !== null)? false:true} className={`${(matricula.estado === 'Completado' && matricula.notaFinal !== null)? 'hover:cursor-pointer':'hover:cursor-not-allowed'}`}>
        <div className="relative w-full h-28 block mb-2 flex flex-col justify-center items-center ">

        {matricula.notaFinal && (
          <div  className=' mb-1' >
            <h1 className="text-sm text-black dark:text-white">Nota Final: {matricula.notaFinal}</h1>
          </div>
        )}
          
        {!(matricula.estado === 'Completado') ? 
        (<div data-tooltip-id='tooltip-progreso' className=' mb-1' >
          <h1 className="text-sm text-black dark:text-white">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;En Progreso&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h1>
          <Tooltip id='tooltip-progreso' className='z-50' place='top' content={'Para completar tu curso realiza las pruebas y deberes'} />     
        </div>)       
        : 
        (<div data-tooltip-id='tooltip-certificado' className=' mb-1'>
          <h1 className="text-sm text-black dark:text-white">¡Obten tu certificado!</h1>
          <Tooltip id='tooltip-certificado' className='z-50' place='top' content={'Presiona la Copa'} />     
        </div>)}

          <svg className="" viewBox="0 0 100 100">
            {/*<!-- Background circle -->*/}
            <circle
              className="text-gray-200 stroke-current"
              strokeWidth="8" //permite colocar el grosor del circulo
              cx="50"
              cy="50"
              r="45"
              fill="transparent"
            ></circle>

            {/*<!-- Progress circle -->*/}
            <circle
              className="text-indigo-500 progress-ring__circle stroke-current"
              strokeWidth="8" //permite colocar el grosor del circulo
              strokeLinecap="round"
              cx="50"
              cy="50"
              r="45" // radio de la circunferencia
              fill="transparent"
              strokeDasharray="282.74" // se obtiene mediante la formula del diametro=2r(pi) y permite rellenar el avance 
              strokeDashoffset={`calc(282.74 - (282.74 * ${(matricula.estado === 'Completado' && matricula.notaFinal !== null) ? 100:0} ) / 100)`} // permite rellenar la circunferencia de lo que falta del avance
            ></circle>
            
            {/*<!-- Center text -->*/}
            <svg x='30' y='30' xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={`bi bi-trophy-fill z-10 w-1 h-1 ${(matricula.estado === 'Completado' && matricula.notaFinal !== null) ? 'text-yellow-300':'text-gray-300'}`} viewBox="0 0 40 40">
              <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5q0 .807-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33 33 0 0 1 2.5.5m.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935m10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935"/>
            </svg>
            {/*<text x="50" y="50" fontFamily="Verdana" fontSize="12" textAnchor="middle" alignmentBaseline="middle">70%</text>*/}
          </svg>
        </div>
      </button>
    </div>
    
    
  )
}
