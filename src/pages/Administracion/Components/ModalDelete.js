

export const ModalDelete = ({showModalDelete,setShowModalDelete, objeto,setObjeto,setResponse, tipo ,setTipo}) => {



    const handleDelete = async(object) =>{
        let resultFetch = {};
        switch(tipo){
            case 'prueba': //instrucciones para eliminar la prueba
                            resultFetch = await Delete('Prueba/deletePrueba',object)
                            setResponse(resultFetch);

                break;
            case 'deber': //instrucciones para eliminar la deber
                            resultFetch = await Delete('Prueba/deleteDeber',object)
                            setResponse(resultFetch);
                break;
            case 'capitulo': //instrucciones para eliminar el capitulo
                            resultFetch = await Delete('Capitulo/deleteCapitulo',object)
                            setResponse(resultFetch);
            break;
            case 'video': //instrucciones para eliminar el video
                            resultFetch = await Delete('Video/deleteVideo',object)
                            setResponse(resultFetch);
                            
                break;
            case 'curso': //instrucciones para eliminar la prueba

            break;
            default:
                break;
        
        }
    }

    const Delete = async(ruta,objeto) =>{
        const resultFromApi = await fetch(`https://localhost:7164/api/`+ruta+`/${objeto.id}`,{
            method:'DELETE',
            credentials:'include',
            headers:{
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
            },
        });
        const resultFetch = await resultFromApi.json();
        setObjeto({});
        setTipo('');
        setShowModalDelete(false);
        return resultFetch;
        
        // setPrueba({});
        
    }


    return (
        <div>
            <div id="popup-modal" tabIndex="-1" className={`${showModalDelete? '':'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div className="relative p-4 mx-auto w-full max-w-md max-h-full">
                    <div className="relative my-[30%] bg-white rounded-lg shadow dark:bg-gray-700">
                        <button onClick={()=> setShowModalDelete(false)} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="p-4 md:p-5 text-center">
                            <svg className="mx-auto mb-4 w-12 h-12 text-red-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>
                            <h3 className="mb-5 text-lg font-normal dark:text-white">Estas seguro de eliminar este/esta {tipo}?</h3>
                            <button onClick={()=> handleDelete(objeto)}  data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                            Si, estoy Seguro
                            </button>
                            
                            <button onClick={()=> setShowModalDelete(false)} data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700">No, cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )
}
