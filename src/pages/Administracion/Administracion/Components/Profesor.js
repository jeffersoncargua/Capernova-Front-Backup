import { useEffect, useRef, useState } from "react";
//import { ModalSuccessAssigment } from "../Components";
import { toast } from "react-toastify";


export const Profesor = ({profesor, setProfesor,cursoList,response,setResponse}) => {

    const refCurso = useRef();
    const [cursoId,setCursoId] = useState();
    const [showButtonLoading,setShowButtonLoading] = useState(false);
    const [showButtonLoading2,setShowButtonLoading2] = useState(false);
    //const [response,setResponse] = useState({});

    console.log(cursoId);
    console.log(cursoList);

    const handleAssigmentCourse = async() => {
        setShowButtonLoading(true);
        
        try {
            if (cursoId !== '') {
                const result = await fetch(`https://localhost:7164/api/Managment/assigmentCourse/${parseInt(cursoId)}`,{
                    method:'PUT',
                    credentials: 'include',
                    headers:{
                        'Content-Type' : 'application/json',
                        'Accept' : 'application/json',
                    },
                    body: JSON.stringify(
                        profesor.id
                    )
                    
                });
        
                const resultFetch = await result.json();
                console.log(resultFetch);
                setResponse(resultFetch);
                setCursoId();//para eliminar el valor de cursoId para nuevas asignaciones
                setShowButtonLoading(false);
                //setShowModalAssigment(true);
            }else{
                setShowButtonLoading(false);
                toast.error('Selecciona un curso');
            }
            
            
        } catch (error) {
            setShowButtonLoading(false);
            console.error(error);            
        }
        
    }

    useEffect(() => {
        response.isSuccess? toast.success(response.message): toast.error(response.message);
    },[response])

    const handleSelectCourse = () =>{
        //console.log(refCurso.current.value);
        //console.log(typeof(refCurso.current.value));
        setCursoId(refCurso.current.value);      
    }

    const handleDeleteAssigment = async(curso) => {
        const result = await fetch(`https://localhost:7164/api/Managment/deleteAssigmentCourse/${curso.id}`,{
            method:'PUT',
            credentials: 'include',
            headers:{
                'Content-Type' : 'application/json',
                'Accept' : 'application/json',
            },
            body: JSON.stringify(
                profesor.id
            )
            
        });
        const resultFetch = await result.json();
        console.log(resultFetch);
        setResponse(resultFetch);
        setCursoId();//para eliminar el valor de cursoId para nuevas asignaciones
        setShowButtonLoading2(false);
    }

  return (
    <div className="w-[90%] mx-auto">
        
        {/*showModalAssigment && <ModalSuccessAssigment showModalAssigment={showModalAssigment} setShowModalAssigment={setShowModalAssigment} response={response} setResponse={setResponse}  />*/}

        <h1 className="text-center font-medium text-xl">Profesor Capernova</h1>

        <div className="mb-2">
            <label className="mb-2 font-medium" htmlFor="titulo">Nombre: {profesor.name} </label>
        </div>
        <div className="mb-2">
            <label className="mb-2 font-medium" htmlFor="titulo">Apellido: {profesor.lastName}</label>
        </div>
        <div className="w-full flex justify-start items-center mb-2">
            
            {/*Select para selecionar el curso a asignarle al profe */}
            <div>
                <label htmlFor="curso" className="block mb-2 font-medium text-gray-900 dark:text-white">Cursos Capernova:</label>
                <select onChange={() => handleSelectCourse()} id="curso" className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={''} ref={refCurso}>
                    <option selected value=''>---- Selecciona el curso a asignar ----</option>
                    {cursoList.map((curso) => (
                        curso.teacherId === null &&
                       <option key={curso.id} value={curso.id}>{curso.titulo}</option> 
                    ))}
                </select>
                
            </div>
            {/*Boton para guardar la info del curso + el id del profesor */}                
            <div className="ms-2 mt-8">
                {showButtonLoading ? 
                (<button disabled type="button" className="flex items-center justify-center text-gray-900 hover:text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-primary-300 rounded-lg text-sm px-4 py-2 focus:outline-none dark:focus:ring-primary-800">
                <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                </svg>
                ...Procesando
            </button>)
                :(<button onClick={() => handleAssigmentCourse()} type="button" className="flex items-center justify-center text-gray-900 hover:text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-primary-300 rounded-lg text-sm px-4 py-2 focus:outline-none dark:focus:ring-primary-800">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-plus-circle h-4 w-4 mr-2" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                </svg>
                Asignar Curso
            </button>)}
                
            </div>
            
        </div>

        

        
        <h1 className="text-center mb-5 font-medium text-xl">Cursos que se dicta:</h1>

        {/* Tabla con la informacion de los cursos que va a impartir el profe */}

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-20">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Cod. Curso
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Titulo
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Precio
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Ver/Eliminar
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {cursoList.map((curso) => (
                        (profesor.id === curso.teacherId) && (
                        <tr key={curso.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {curso.codigo}
                            </td>
                            <td className="px-6 py-4">
                                {curso.titulo}
                            </td>
                            <td className="px-6 py-4">
                                {curso.precio}
                            </td> 
                            <td className="px-6 py-4">
                                {showButtonLoading2? (
                                <button disabled className="flex items-center justify-center py-2 px-4 text-sm text-gray-900 hover:text-white bg-red-500 hover:bg-red-600 rounded-lg">
                                    <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                    </svg>
                                    ...Procesando
                                </button>):(<button onClick={() => handleDeleteAssigment(curso)} className="flex items-center justify-center py-2 px-4 text-sm text-gray-900 hover:text-white bg-red-500 hover:bg-red-600 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-trash3 w-4 h-4 mr-2" viewBox="0 0 16 16">
                                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                                    </svg>
                                    Eliminar
                                </button>)}
                            </td>
                        </tr>) 
                    ))}
                               
                </tbody>
            </table>
        </div>
    </div>
  )
}


