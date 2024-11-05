import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import { toast } from "react-toastify";

export const DropDownCursos = ({setShowDrop,setHidden,setShowDropProductos,hidden}) => {

    const [categoriaList,setCategoriaList] = useState([]);
    const navigate = useNavigate();

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
        
                if(resultFetch.isSuccess){
                    setCategoriaList(resultFetch.result);
                }else{
                    setCategoriaList([]);
                }
        
            } catch (error) {
                console.error(error);
                navigate('/error');
        
            }
          }
          FetchCategoriaCurso();
    },[navigate])



  return (
    <div>
        <ul className="rounded-lg py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownLargeButton">
            {categoriaList.length > 0 && ((categoriaList.slice(0,5)).map((categoria)=>(
            <li translate="no" key={categoria.id} >
                <Link onClick={() => {setShowDrop(true);setHidden(!hidden);setShowDropProductos(true)}} to={`/cursos?categoriaId=${categoria.id}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{categoria.name}</Link>
            </li>
            )))}

            {/* <li >
                <Link onClick={() => {setShowDrop(false);setHidden(!hidden);setShowDropProductos(true)}} to='/cursos' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Cocina</Link>
            </li>
            <li >
                <Link onClick={() => {setShowDrop(false);setHidden(!hidden);setShowDropProductos(true)}} to='/cursos' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Cocina</Link>
            </li>
            <li >
                <Link onClick={() => {setShowDrop(false);setHidden(!hidden);setShowDropProductos(true)}} to='/cursos' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Belleza</Link>
            </li>
            <li >
                <Link onClick={() => {setShowDrop(false);setHidden(!hidden);setShowDropProductos(true)}} to='/cursos' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Peluquería</Link>
            </li> */}
            {/* <li >
                <Link onClick={() => {setShowDrop(!showDrop);setHidden(!hidden);setShowDropProductos(true)}} to='cursos' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Belleza</Link>
            </li> */}
            {/* <li >
                <Link onClick={() => {setShowDrop(!showDrop);setHidden(!hidden);setShowDropProductos(true)}} to='cursos' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Chocolatería Fina</Link>
            </li> */}
            {/* <li >
                <Link onClick={() => {setShowDrop(!showDrop);setHidden(!hidden);setShowDropProductos(true)}} to='cursos' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reposteria Fina</Link>
            </li> */}
            {/* <li >
                <Link onClick={() => {setShowDrop(!showDrop);setHidden(!hidden);setShowDropProductos(true)}} to='cursos' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Make Up</Link>
            </li> */}
        </ul>
        <div className="py-2 border-t">
            <Link onClick={() => {setShowDrop(true);setHidden(!hidden);setShowDropProductos(true)}} to='cursos' className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Ver más</Link>
        </div>
    </div>
  )
}
