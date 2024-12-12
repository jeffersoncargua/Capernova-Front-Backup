import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { remove } from "../../../redux/searchProductSlice";

export const SearchFilter = () => {

    const [showSearch, setShowSearch] = useState(true);
    const [categoriaList,setCategoriaList] = useState([]);

    const dispatch = useDispatch();

    useEffect(()=>{
        const FetchCategoriaCurso = async()=>{
          try {
              //Falta agregar la autorizacion mediante bearer --Mucho ojo!!!
              const result = await fetch(`${process.env.REACT_APP_API_URL}/Producto/getAllCategoria?tipo=${'curso'}`,{
                  method:'GET',
                  credentials: 'include',
                  headers:{
                      'Content-Type' : 'application/json',
                      'Accept' : 'application/json',
                  },
      
              });
              const resultFetch = await result.json();
      
      
              //console.log(resultFetch);
              //console.log(result.status);
              if (result.status !== 200 && result.status !== 400) {
                  throw resultFetch;
              }
      
              if (resultFetch.isSuccess) {
                setCategoriaList(resultFetch.result);
              }else{
                setCategoriaList([]);
              }
              
      
          } catch (error) {
            console.error(error);
            toast.error('Algo ha fallado en nuestro servidor. Inténtelo más tarde');      
          }
        }
        FetchCategoriaCurso();
      },[])

  return (
    <div className='relative sm:mr-4'>
        <button onClick={()=> setShowSearch(!showSearch)} data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className={`inline-flex items-center p-2 mt-2 ms-7 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600`}>
            <span  className="sr-only">Open sidebar</span>
            <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-three-dots-vertical w-6 h-6" viewBox="0 0 16 16">
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
            </svg>
        </button>
        <div className={`group text-black dark:text-white absolute top-0 left-0 z-40 w-[95%] min-[350px]:w-72 flex flex-wrap space-x-4 justify-start ps-4 border border-gray-200 rounded-lg dark:border-gray-700 gap-y-8 ml-4 px-10 py-2 transition-transform ${showSearch ? '-translate-x-full':''} md:translate-x-0 bg-slate-50 dark:bg-gray-900 drop-shadow-md `} tabIndex="-1">
            <h1 className="text-xl md:text-2xl font-semibold text-center md:text-start">Búsqueda por área</h1>
            <button onClick={()=> setShowSearch(!showSearch)} type="button" data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation" className="text-gray-400 bg-transparent md:hidden hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Close menu</span>
            </button>
            {categoriaList.length > 0 ? (categoriaList.map((categoria) =>( 
            <div translate="no" key={categoria.id} className="mb-2 bg-gray-300 dark:bg-gray-700 px-2.5 py-2 text-center">  
                <Link to={`/cursos?categoriaId=${categoria.id}`} className="text-sm md:text-base " >{categoria.name}</Link>
            </div>)))
            :
            (<div className="">                  
                <label className="w-full py-4 ms-2 text-sm md:text-base ">No existen áreas de búsqueda ... </label>
            </div> ) }

            <div className="mb-2">  
                <Link onClick={()=>dispatch(remove())} to={`/cursos`} className="bg-gray-300 dark:bg-gray-700 text-sm md:text-base px-2.5 py-2" >VER TODOS</Link>
            </div>
                       
            {/* <div>
                <button type="button" className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Buscar</button>
            </div> */}
        </div>
    </div>
    
  )
}
