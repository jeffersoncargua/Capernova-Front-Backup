import { useRef } from "react"
import { toast } from "react-toastify";

export const ModalCalificarNotaFinal = ({showModalCalificarNotaFinal,setShowModalCalificarNotaFinal,matricula,setResponse}) => {

    const refNotaFinal = useRef();


    const handleNotaFinal = async() => {
        try {
            const resultFromApi = await fetch(`${process.env.REACT_APP_API_URL}/Teacher/updateMatriculaNota/${matricula.id}`,{
                method: 'PUT',
                credentials: 'include',
                headers:{
                    'Content-Type' : 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(refNotaFinal.current.value)
            });

            const resultFetch = await resultFromApi.json();

            if (resultFromApi.status !== 200) {
                throw resultFetch;
            }

            setResponse(resultFetch);
            setShowModalCalificarNotaFinal(false);
            

        } catch (error) {
            console.error(error);
            toast.error('Algo ha fallado en nuestro servidor. Inténtelo más tarde');
            setShowModalCalificarNotaFinal(false);
        }
    }

  return (

    <div id="crud-modal" tabIndex='-1' className={`${showModalCalificarNotaFinal? '' :'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] h-full bg-gray-700/[0.6]`}>
        <div className="relative p-4 mx-auto w-full max-w-4xl max-h-full">
            {/*<!-- Modal content -->*/}
            <div className="relative bg-white my-[0.15%] rounded-lg shadow dark:bg-gray-700 mb-14">
                {/*<!-- Modal header -->*/}
                <div className="flex items-center justify-between p-4 md:p-5 dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {`Curso ${matricula.curso.titulo}`}
                    </h3>
                    <button onClick={()=>setShowModalCalificarNotaFinal(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                {/*<!-- Modal body -->*/}
                <div className="p-4 md:p-5" >
                    <div className="grid gap-4 mb-4 grid-cols-2 group text-black dark:text-white">                        
                        <div className="col-span-2 flex items-center">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium mr-3 ">Nombre:</label>
                            <input type="text" disabled name="name" id="name" className="bg-gray-50 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Escribe el Titulo" required="" defaultValue={matricula.estudiante.name || ''} />
                        </div>
                        <div className="col-span-2 flex items-center">
                            <label htmlFor="lastName" className="block mb-2 text-sm font-medium mr-3 ">Apellido:</label>                                
                            <input type="text" disabled name="name" id="name" className=" bg-gray-50 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Escribe el Titulo" required="" defaultValue={matricula.estudiante.lastName || ''} />
                        </div>
                    </div>

                    <div className="flex justify-center items-align group text-black dark:text-white">
                        <input type="text" name="calificacion" id="calificacion" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-80 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500 mr-14" defaultValue={matricula.notaFinal || 0} ref={refNotaFinal} />
                        <button onClick={()=> handleNotaFinal()} className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-pen me-1 -ms-1 w-5 h-5" viewBox="0 0 16 16">
                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                            </svg>
                            Calificar Estudiante
                        </button>
                    </div>
                    

                    {/* {showButtonLoading ? 
                    (<button disabled className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                        </svg>
                        Procesando....
                    </button>)
                    :
                    (<button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-pen me-1 -ms-1 w-5 h-5" viewBox="0 0 16 16">
                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                        </svg>
                        {notaDeber.id ? 'Editar':'Entregar'}
                    </button>)} */}
                </div>
            </div>
        </div>
    </div>
  )
}
