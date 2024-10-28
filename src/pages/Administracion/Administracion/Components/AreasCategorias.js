import { useState,useRef,useEffect } from "react";
import { toast } from "react-toastify";
import {ModalAreaCategoria} from '../Components'
import { ModalDelete } from "../../Components";

export const AreasCategorias = ({response,setResponse}) => {

    
    
    const [categoryList, setCategoryList] = useState([]);
    const [categoria, setCategoria] = useState({});
    
    
    const [searchCategory , setSearchCategory] = useState('');
    const [showModalAreaCategoria,setShowModalAreaCategoria] = useState(false);
    const [showModalDelete,setShowModalDelete] = useState(false);
    
    const columnsCategory = ["Categoría","Tipo", "Editar/Eliminar"];
    const [tipo,setTipo] = useState(''); //es para almacenar el tipo de objeto a eliminar que puede ser curso, capitulo, video, deber, etc
    const [objeto, setObjeto] = useState({}); //es para almacenar el objeto a eliminar mediante el componente ModalDelete
    const refSearchCategory = useRef();

    useEffect(() => {
      const FetchCategory = async() => {
        try {
          const resultFromApi = await fetch(`${process.env.REACT_APP_API_URL}/Producto/getAllCategoria?search=${searchCategory}`,{
            method:'GET',
            credentials : 'include',
            headers:{
              'Content-Type' : 'application/json',
              'Accept' : 'application/json'
            }
          });
    
          const resultFetch = await resultFromApi.json();

          if (resultFromApi.status !== 200 && resultFromApi.status !== 400 ) {
            throw resultFetch;
          }
          
          if (resultFetch.isSuccess) {
            setCategoryList(resultFetch.result);
          }else{
            setCategoryList([]);
          }
          
          
        } catch (error) {
          console.error(error);
          toast.error('Algo ha fallado en nuestro servidor. Inténtelo más tarde');
        }
        
      }
      FetchCategory();
      response.isSuccess ? toast.success(response.message): toast.error(response.message) ;
    }, [showModalAreaCategoria,showModalDelete,searchCategory,response]);


      
    const handleSearchCategory = () => {
      if (refSearchCategory.current.value.length > 0) {
        
        setSearchCategory(refSearchCategory.current.value)
      }else{
          setSearchCategory('');
      }
      setResponse({});
    }

    const handleEdit = (item) => {
      setCategoria(item);
      setShowModalAreaCategoria(true);
      setResponse({});
    }    

    const handleDelete = (itemDelete) => {
      setObjeto(itemDelete);
      setTipo('categoria');
      setShowModalDelete(!showModalDelete);
      setResponse({});
    }
  

  return (
    <div className="">
            
        <h1 className="text-center font-medium text-xl dark:text-white mb-10">Categorías de Capernova</h1>
        
        <div className="mx-auto mb-10">
            {showModalAreaCategoria && <ModalAreaCategoria showModalAreaCategoria={showModalAreaCategoria} setShowModalAreaCategoria={setShowModalAreaCategoria} categoria={categoria} setCategoria={setCategoria} setResponse={setResponse} />}
            {/* {showModalDelete && <ModalDelete showModalDelete={showModalDelete} setShowModalDelete={setShowModalDelete} publicidad={publicidad} setResponse={setResponse}  />} */}
            {showModalDelete && <ModalDelete showModalDelete={showModalDelete} setShowModalDelete={setShowModalDelete} objeto={objeto} setObjeto={setObjeto} setResponse={setResponse} tipo={tipo} setTipo={setTipo} />}

            {/* Tabla para la informacion */}
            <section className="">
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                {/*<!-- Start coding here -->*/}
                    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <div className="w-full md:w-1/2">
                                <form className="flex items-center" >
                                    <label htmlFor="simple-search" className="sr-only">Search</label>
                                    <div className="relative w-full">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <input onChange={handleSearchCategory} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Busca por el nombre de la categoría" required="" ref={refSearchCategory} />
                                    </div>
                                </form>
                            </div>
                            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                <button onClick={() => {setShowModalAreaCategoria(!showModalAreaCategoria);setCategoria({});setResponse({});}} type="button" className="flex items-center justify-center text-gray-900 hover:text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-primary-300 rounded-lg text-sm px-4 py-2 focus:outline-none dark:focus:ring-primary-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-plus-circle h-4 w-4 mr-2" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                                    </svg>
                                    Añadir
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left dark:text-white">
                                <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
                                    <tr>
                                    {columnsCategory.map((column) => (
                                    <th key={column} scope="col" className="px-4 py-3">{column}</th>
                                    ))}
                                    </tr>
                                </thead>
                                <tbody>
                                {categoryList.length > 0 ? categoryList.map((category) => (
                                    <tr key={category.id} className="border-b dark:border-gray-700">
                                        <td className="px-4 py-3">{category.name}</td>
                                        <td className="px-4 py-3">{category.tipo}</td>
                                        <td className="px-4 py-3">
                                            <div className="py-1 flex justify-start">                          
                                            <button onClick={() => handleEdit(category)} className="flex items-center justify-center py-2 px-4 text-sm text-gray-900 hover:text-white bg-yellow-300 hover:bg-yellow-400 rounded-lg mr-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-pencil-square h-4 w-4 mr-2" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                                </svg>
                                                Editar
                                            </button>                              
                                            <button onClick={() => handleDelete(category)} className="flex items-center justify-center py-2 px-4 text-sm text-gray-900 hover:text-white bg-red-500 hover:bg-red-600 rounded-lg">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-trash3 w-4 h-4 mr-2" viewBox="0 0 16 16">
                                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                                                </svg>
                                                Eliminar
                                            </button>
                                            </div>
                                        </td>
                                    </tr>
                                )): (<tr className="border-b dark:border-gray-700" >
                                    <td className="font-medium text-xl mb-10 p-5">No se han encontrado registros...</td>                  
                                </tr>)}
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
  )
}
