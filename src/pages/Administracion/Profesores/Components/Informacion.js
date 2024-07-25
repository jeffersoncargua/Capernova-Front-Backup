import { useState } from 'react';
import { Tooltip } from 'react-tooltip';
//import Photo from '../../../../assets/Capernova2.png'

export const Informacion = () => {

  const [uploadFile,setUploadFile] = useState(false);
  const [enableBiography,setEnableBiography] = useState(false);
  const [enableName,setEnableName] = useState(false);
  const [enableLastName,setEnableLastName] = useState(false);
  const [enablePhone,setEnablePhone] = useState(false);


  return (
    <div className='w-[95%] mx-auto mb-10'>
      <div className='w-[95%] mx-auto flex items-center justify-center flex-wrap md:flex-nowrap'>
        <div className='flex flex-nowrap justify-center w-64 h-64 relative rounded-full border border-gray-200 shadow-lg bg-gray-800 z-20'>
          <img className="w-64 h-64" src='' alt="Aqui va la foto" />
          <button onClick={()=>setUploadFile(!uploadFile)} data-tooltip-id='tooltip-image' type='button' className='absolute bottom-4 right-0 w-10 h-10 bg-gray-100 group hover:bg-gray-300 flex justify-center items-center rounded-full border shadow'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-camera text-slate-300 group-hover:text-white h-7 w-7" viewBox="0 0 16 16">
              <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z"/>
              <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
            </svg>
          </button>
          <Tooltip id='tooltip-image' place='top' content={uploadFile ?'No Editar Fotografía':'Editar Fotografía'} />     
        </div>
        <div className='z-10 -mt-6 md:mt-0 md:-ms-20 w-full border border-gray-300 shadow-lg rounded-xl bg-blue-100 '>
          <div className='md:ms-20 p-6 flex flex-col gap-y-3'>
            <div className='relative group'>
              <label htmlFor="nombre" className='font-semibold'>Nombre: </label>
              <input className={`rounded-lg ${!enableName ? 'border-0 bg-transparent':'border border-blue-300 bg-blue-200'}`} disabled={!enableName? true:false} type="text" id='nombre' name='nombre' defaultValue={'Jefferson'} />
              <button onClick={()=>setEnableName(!enableName)} data-tooltip-id='tooltip-name' type='button' className='absolute bottom-2 right-2 w-8 h-8 bg-gray-100 group-hover:bg-gray-300 flex justify-center items-center rounded-lg border shadow'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-pencil-fill text-slate-300 group-hover:text-white h-4 w-4" viewBox="0 0 16 16">
                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                </svg>
              </button>
              <Tooltip id='tooltip-name' place='top' content={enableName ?'No Editar Nombre':'Editar Nombre'} />     
            </div>
            <div className='relative group'>
              <label htmlFor="apellido" className='font-semibold'>Apellido: </label>
              <input className={`rounded-lg ${!enableLastName ? 'border-0 bg-transparent':'border border-blue-300 bg-blue-200'}`} disabled={!enableLastName? true:false} type="text" id='apellido' name='apellido' defaultValue={'Jefferson'} />
              <button onClick={()=>setEnableLastName(!enableLastName)} data-tooltip-id='tooltip-lastName' type='button' className='absolute bottom-2 right-2 w-8 h-8 bg-gray-100 group-hover:bg-gray-300 flex justify-center items-center rounded-lg border shadow'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-pencil-fill text-slate-300 group-hover:text-white h-4 w-4" viewBox="0 0 16 16">
                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                </svg>
              </button>
              <Tooltip id='tooltip-lastName' place='top' content={enableName ?'No Editar Apellido':'Editar Apellido'} />     
            </div>
            <div className='relative group'>
              <label htmlFor="telefono" className='font-semibold'>Teléfono: </label>
              <input type="tel" pattern="[0-9]{10}" className={`rounded-lg ${!enablePhone ? 'border-0 bg-transparent':'border border-blue-300 bg-blue-200'}`} disabled={!enablePhone? true:false} id='telefono' name='telefono' defaultValue={'0987654321'} />
              <button onClick={()=>setEnablePhone(!enablePhone)} data-tooltip-id='tooltip-phone' type='button' className='absolute bottom-2 right-2 w-8 h-8 bg-gray-100 group-hover:bg-gray-300 flex justify-center items-center rounded-lg border shadow'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-pencil-fill text-slate-300 group-hover:text-white h-4 w-4" viewBox="0 0 16 16">
                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                </svg>
              </button>
              <Tooltip id='tooltip-phone' place='top' content={enableName ?'No Editar Teléfono':'Editar Teléfono'} />     
            </div>
            <div className='w-[95%] relative group' >
              <label htmlFor="biography" className='font-semibold'>Biografía:</label>
              <textarea className={`w-full ${!enableBiography ? 'border-0 bg-transparent':'border-1 border-blue-300 bg-blue-200'} rounded-lg`}  disabled={!enableBiography ? true:false} name="biography" id="biography" defaultValue={'eiñnxbpwixnwqepijbfoiwcneix'}></textarea>
              <button onClick={()=>setEnableBiography(!enableBiography)} data-tooltip-id='tooltip-biography' type='button' className='absolute bottom-2 right-2 w-8 h-8 bg-gray-100 group-hover:bg-gray-300 flex justify-center items-center rounded-lg border shadow'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-pencil-fill text-slate-300 group-hover:text-white h-4 w-4" viewBox="0 0 16 16">
                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                </svg>
              </button>
              <Tooltip id='tooltip-biography' place='top' content={enableBiography ?'No Editar Biografía':'Editar Biografía'} />     
            </div>
          </div>
        </div>
      </div>
      
      <div>
      {uploadFile && <input type="file" className='ms-10 mt-10 rounded-full border border-blue-300' required />}    
      </div>
      
      
      
    </div>
  )
}
