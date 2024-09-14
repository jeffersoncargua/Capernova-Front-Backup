import {  useRef, useState, useEffect} from 'react';
import { Tooltip } from 'react-tooltip';
import { toast } from 'react-toastify';
import {Loading} from '../components';
import Avatar from '../../../assets/avatar.png';

export const Informacion = ({estudiante,response,setResponse}) => {

  const refName = useRef();
  const refLastName = useRef();
  const refPhone = useRef();
  const refImageUrl = useRef();

  let formData = new FormData();

  const [uploadFile,setUploadFile] = useState(false);
  const [enableName,setEnableName] = useState(false);
  const [enableLastName,setEnableLastName] = useState(false);
  const [enablePhone,setEnablePhone] = useState(false);
  const [showButtonLoading,setShowButtonLoading] = useState(false);
  const [showLoading , setLoading] = useState(false);


  const handleSubmit = async(event) => {
    event.preventDefault();
    setShowButtonLoading(true);
    setLoading(true);
    
    try {

      const resultFromApi = await fetch(`https://localhost:7164/api/Student/updateStudent?id=${estudiante.id}`,{
        method: 'PUT',
        credentials:'include',
        headers: {
         'Content-Type' : 'application/json',         
         'Accept' : 'application/json',         
       },
        body: JSON.stringify({
          id : estudiante.id,
          name : refName.current.value,
          lastName : refLastName.current.value,
          phone : refPhone.current.value,
          photoUrl : estudiante.photoURL
        })   
      });

      const resultFecthInfo = await resultFromApi.json();

      if (refImageUrl.current !== null) {
        const result = await fetch(`https://localhost:7164/api/Student/updateImageStudent?id=${estudiante.id}`,{
          method: 'PUT',
          credentials:'include',
          headers: {
           //'Content-Type' : 'multipart/form-data',
           //'Accept' : 'application/json',         
         },
          body: formData
        });
        const resultFetchPhoto = await result.json();
        console.log(resultFetchPhoto);
      }
      setResponse(resultFecthInfo);      
      setShowButtonLoading(false);
      setLoading(false);
      formData.delete('file');
    } catch (error) {
      //console.error(error);
      setShowButtonLoading(false);
      formData.delete('file');
    }

  }


  useEffect(()=>{

    //console.log(response);
    if(response.isSuccess === true){
      setUploadFile(false);
      setEnableName(false);
      setEnableLastName(false);
      setEnablePhone(false);
    }    
    
    response.isSuccess ? toast.success(response.message):toast.error(response.message);
  },[response])

  const changePhoto = () => {
    formData.append('file',refImageUrl.current.files[0]);
  }

  //console.log(estudiante);


  return (
    <div className='w-[95%] mx-auto mb-10'>

      {showLoading && <Loading /> }

      <form onSubmit={handleSubmit} encType='multipart/form-data' className={`${!showLoading ? '':'hidden'}`} >
        <div className='w-[95%] mx-auto flex items-center justify-center flex-col'>
          <div className='flex justify-center w-60 h-60 relative rounded-full outline outline-4 outline-gray-300 shadow-lg bg-slate-50 z-20'>
            {estudiante.photoUrl ? 
            (<img className="w-60 h-60 rounded-full self-center"  src={`https://drive.google.com/thumbnail?id=${estudiante.photoUrl}`} alt="Aqui va la foto" />)
            :(<img className="w-44 h-44 rounded-full self-center"  src={Avatar} alt="Aqui va la foto" />)}
            
            {/* <img className="w-60 h-60 rounded-full self-center"  src={`https://drive.google.com/file/d/${estudiante.photoUrl}/preview`} alt="Aqui va la foto" />  */}
            <button onClick={()=>setUploadFile(!uploadFile)} data-tooltip-id='tooltip-image' type='button' className='absolute bottom-4 right-0 w-10 h-10 bg-gray-100 group hover:bg-gray-300 dark:hover:bg-gray-400 flex justify-center items-center rounded-full border shadow'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-camera text-slate-300 group-hover:text-black h-7 w-7" viewBox="0 0 16 16">
                <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z"/>
                <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
              </svg>
            </button>
            <Tooltip id='tooltip-image' place='top' content={uploadFile ?'No Cambiar Foto Perfil':'Cambiar Foto Perfil'} />     
          </div>
          <div className='z-10 -mt-28 w-full border-2 border-gray-300 shadow-lg rounded-xl bg-cyan-50 dark:bg-slate-800'>
            <div className='p-6 mt-24 flex flex-col gap-y-3'>
              <div className='relative group dark:text-white'>
                <label htmlFor="nombre" className='font-semibold'>Nombre: </label>
                <input className={`rounded-lg ${!enableName ? 'border-0 bg-transparent':'border border-blue-300 bg-blue-200 dark:bg-slate-900'}`} disabled={!enableName} type="text" id='nombre' name='nombre' defaultValue={estudiante.name || ''} ref={refName} />
                <button onClick={()=>setEnableName(!enableName)} data-tooltip-id='tooltip-name' type='button' className='absolute bottom-2 right-2 w-8 h-8 bg-gray-100 group-hover:bg-gray-300 dark:group-hover:bg-gray-400 flex justify-center items-center rounded-lg border shadow'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-pencil-fill text-slate-300 group-hover:text-black  h-4 w-4" viewBox="0 0 16 16">
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                  </svg>
                </button>
                <Tooltip id='tooltip-name' place='top' content={enableName ?'No Editar Nombre':'Editar Nombre'} />     
              </div>
              <div className='relative group dark:text-white'>
                <label htmlFor="apellido" className='font-semibold'>Apellido: </label>
                <input className={`rounded-lg ${!enableLastName ? 'border-0 bg-transparent':'border border-blue-300 bg-blue-200 dark:bg-slate-900'}`} disabled={!enableLastName} type="text" id='apellido' name='apellido' defaultValue={estudiante.lastName ||''} ref={refLastName} />
                <button onClick={()=>setEnableLastName(!enableLastName)} data-tooltip-id='tooltip-lastName' type='button' className='absolute bottom-2 right-2 w-8 h-8 bg-gray-100 group-hover:bg-gray-300 dark:group-hover:bg-gray-400 flex justify-center items-center rounded-lg border shadow'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-pencil-fill text-slate-300 group-hover:text-black h-4 w-4" viewBox="0 0 16 16">
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                  </svg>
                </button>
                <Tooltip id='tooltip-lastName' place='top' content={enableLastName ?'No Editar Apellido':'Editar Apellido'} />     
              </div>
              <div className='relative group dark:text-white'>
                <label htmlFor="telefono" className='font-semibold'>Teléfono: </label>
                <input type="tel" pattern="[0-9]{10}" className={`rounded-lg ${!enablePhone ? 'border-0 bg-transparent':'border border-blue-300 bg-blue-200 dark:bg-slate-900'}`} disabled={!enablePhone} id='telefono' name='telefono' defaultValue={estudiante.phone || ''} ref={refPhone} />
                <button onClick={()=>setEnablePhone(!enablePhone)} data-tooltip-id='tooltip-phone' type='button' className='absolute bottom-2 right-2 w-8 h-8 bg-gray-100 group-hover:bg-gray-300 dark:group-hover:bg-gray-400 flex justify-center items-center rounded-lg border shadow'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-pencil-fill text-slate-300 group-hover:text-black h-4 w-4" viewBox="0 0 16 16">
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                  </svg>
                </button>
                <Tooltip id='tooltip-phone' place='top' content={enablePhone ?'No Editar Teléfono':'Editar Teléfono'} />     
              </div>
              
            </div>
          </div>
        </div>
      
        <div>
          {uploadFile && <input type="file" onChange={()=>changePhoto()} className='ms-10 mt-10 rounded-full border border-blue-300' ref={refImageUrl} />}    
        </div>

        <div className="flex justify-end my-10">
          { (enableName || enableLastName || enablePhone || uploadFile) &&
            (showButtonLoading ? 
              (<button disabled className="flex items-center px-4 py-2 bg-blue-400 hover:bg-blue-600 text-gray 900 hover:text-white text-sm rounded-lg hover:scale-125">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-floppy w-5 h-5 mr-2" viewBox="0 0 16 16">
                  <path d="M11 2H9v3h2z"/>
                  <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z"/>
                </svg>
                ...Procensando
              </button>)
              :
              (<button type='submit' className="flex items-center px-4 py-2 bg-gray-400 hover:bg-gray-600 text-gray 900 hover:text-white text-sm rounded-lg hover:scale-125">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-floppy w-5 h-5 mr-2" viewBox="0 0 16 16">
                  <path d="M11 2H9v3h2z"/>
                  <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z"/>
                </svg>
                Guardar
              </button>))
          }
          
        </div>
      </form>
      
    </div>
        
  )
}

/*
<div className='w-[95%] mx-auto flex items-center justify-center flex-wrap md:flex-nowrap'>
          <div className='flex flex-nowrap justify-center w-64 h-56 relative rounded-full border border-gray-200 shadow-lg bg-slate-50 z-20'>
            <img className="w-64 h-56 rounded-full self-center"  src={`https://drive.google.com/thumbnail?id=${profesor.photoURL}`} alt="Aqui va la foto" />
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
                <input className={`rounded-lg ${!enableName ? 'border-0 bg-transparent':'border border-blue-300 bg-blue-200'}`} disabled={!enableName? true:false} type="text" id='nombre' name='nombre' defaultValue={profesor.name} ref={refName} />
                <button onClick={()=>setEnableName(!enableName)} data-tooltip-id='tooltip-name' type='button' className='absolute bottom-2 right-2 w-8 h-8 bg-gray-100 group-hover:bg-gray-300 flex justify-center items-center rounded-lg border shadow'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-pencil-fill text-slate-300 group-hover:text-white h-4 w-4" viewBox="0 0 16 16">
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                  </svg>
                </button>
                <Tooltip id='tooltip-name' place='top' content={enableName ?'No Editar Nombre':'Editar Nombre'} />     
              </div>
              <div className='relative group'>
                <label htmlFor="apellido" className='font-semibold'>Apellido: </label>
                <input className={`rounded-lg ${!enableLastName ? 'border-0 bg-transparent':'border border-blue-300 bg-blue-200'}`} disabled={!enableLastName? true:false} type="text" id='apellido' name='apellido' defaultValue={profesor.lastName} ref={refLastName} />
                <button onClick={()=>setEnableLastName(!enableLastName)} data-tooltip-id='tooltip-lastName' type='button' className='absolute bottom-2 right-2 w-8 h-8 bg-gray-100 group-hover:bg-gray-300 flex justify-center items-center rounded-lg border shadow'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-pencil-fill text-slate-300 group-hover:text-white h-4 w-4" viewBox="0 0 16 16">
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                  </svg>
                </button>
                <Tooltip id='tooltip-lastName' place='top' content={enableName ?'No Editar Apellido':'Editar Apellido'} />     
              </div>
              <div className='relative group'>
                <label htmlFor="telefono" className='font-semibold'>Teléfono: </label>
                <input type="tel" pattern="[0-9]{10}" className={`rounded-lg ${!enablePhone ? 'border-0 bg-transparent':'border border-blue-300 bg-blue-200'}`} disabled={!enablePhone? true:false} id='telefono' name='telefono' defaultValue={profesor.phone} ref={refPhone} />
                <button onClick={()=>setEnablePhone(!enablePhone)} data-tooltip-id='tooltip-phone' type='button' className='absolute bottom-2 right-2 w-8 h-8 bg-gray-100 group-hover:bg-gray-300 flex justify-center items-center rounded-lg border shadow'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-pencil-fill text-slate-300 group-hover:text-white h-4 w-4" viewBox="0 0 16 16">
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                  </svg>
                </button>
                <Tooltip id='tooltip-phone' place='top' content={enableName ?'No Editar Teléfono':'Editar Teléfono'} />     
              </div>
              <div className='w-[95%] relative group' >
                <label htmlFor="biography" className='font-semibold'>Biografía:</label>
                <textarea className={`w-full ${!enableBiography ? 'border-0 bg-transparent':'border-1 border-blue-300 bg-blue-200'} rounded-lg p-3`} rows='10'  disabled={!enableBiography ? true:false} au name="biography" id="biography" defaultValue={profesor.biografy} placeholder='Ingrese información sobre su biografía...' ref={refBiography}></textarea>
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
*/
