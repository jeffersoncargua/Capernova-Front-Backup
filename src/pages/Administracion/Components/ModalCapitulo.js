import { useRef } from "react";


export const ModalCapitulo = ({showModalCapitulo,setShowModalCapitulo,capitulo, setCapitulo, curso,setResponse/*,capitulos, setCapitulos*/}) => {

    //const refCodigo = useRef();
    const refTitulo = useRef();

    //console.log(capitulo);
 
    const handleSubmitAdd = async(event) =>  {
        event.preventDefault();
        // let object = {Codigo: refCodigo.current.value, Titulo : refTitulo.current.value, Videos:[]};
        // //console.log(object);
        // let updatedCapitulos = capitulos.concat(object);
        // setCapitulos(updatedCapitulos);
        // setShowModalCapitulo(false);
        const resultFromApi = await fetch(`https://localhost:7164/api/Capitulo/createCapitulo`,{
            method: 'POST',
            credentials:'include',
            headers:{
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
            },
            body: JSON.stringify({
                titulo: refTitulo.current.value,
                courseId: curso.id,
            })
        });
        const resultFetch = await resultFromApi.json();
        console.log(resultFetch);
        setResponse(resultFetch);
        setCapitulo({});
        setShowModalCapitulo(false);
    }

    const handleSubmitEdit = async(event) =>  {
        event.preventDefault();
        // let object = {Codigo: refCodigo.current.value, Titulo : refTitulo.current.value};
        // //console.log(object);
        // let updatedCapitulos = capitulos.map((cap) => cap.Codigo===object.Codigo ? {...cap, Titulo:refTitulo.current.value } : cap);
        // //console.log(updatedCapitulos);
        // setCapitulos(updatedCapitulos);
        // setShowModalCapitulo(false);
        // setCapitulo({});
        // //console.log('Se edito el capitulo');
        const resultFromApi = await fetch(`https://localhost:7164/api/Capitulo/updateCapitulo/${capitulo.id}`,{
            method: 'PUT',
            credentials:'include',
            headers:{
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
            },
            body: JSON.stringify({
                id:capitulo.id,
                titulo: refTitulo.current.value,
                courseId: curso.id,
            })
        });
        const resultFetch = await resultFromApi.json();
        console.log(resultFetch);
        setResponse(resultFetch);
        setShowModalCapitulo(false);
    }

  return (
    <div>
        {/*<!-- Main modal -->*/}
        <div id="crud-modal" tabIndex='-1' className={`${showModalCapitulo? '' :'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] h-full bg-gray-700/[0.6]`}>
            <div className="relative p-4 mx-auto w-full max-w-md max-h-full">
                {/*<!-- Modal content -->*/}
                <div className="relative bg-white my-[10%] rounded-lg shadow dark:bg-gray-700 mb-14">
                    {/*<!-- Modal header -->*/}
                    <div className="flex items-center justify-between p-4 md:p-5 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {capitulo.id ? 'Editar Capítulo':'Agregar Capítulo'}
                        </h3>
                        <button onClick={()=>setShowModalCapitulo(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/*<!-- Modal body -->*/}
                    <form className="p-4 md:p-5" onSubmit={capitulo.id ?  handleSubmitEdit : handleSubmitAdd} >
                        <div className="grid gap-4 mb-4 grid-cols-2">
                            {/* <div className="col-span-2">
                                <label htmlFor="codigo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Codigo</label>
                                <input type="text" name="codigo" id="codigo" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Escribe el Código" required="" ref={refCodigo} defaultValue={capitulo.Codigo || ''} />
                            </div>                             */}
                            <div className="col-span-2">
                                <label htmlFor="titulo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Titulo</label>
                                <input type="text" name="titulo" id="titulo" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Escribe el Titulo" required="" ref={refTitulo} defaultValue={capitulo.titulo || ''} />
                            </div>
                        </div>
                        {capitulo.id ? 
                            (<button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-pen me-1 -ms-1 w-5 h-5" viewBox="0 0 16 16">
                                   <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                                </svg>
                                Editar
                            </button>)
                            :
                            (<button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                Agregar
                            </button>
                        )}
                    </form>
                </div>
            </div>
        </div> 
    </div>
  )
}

