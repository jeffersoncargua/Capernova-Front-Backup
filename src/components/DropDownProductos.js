import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState,useEffect } from "react";

export const DropDownProductos = ({setShowDrop,setHidden,setShowDropProductos,hidden}) => {


    const [categoriaList,setCategoriaList] = useState([]);

    useEffect(()=>{
        const FetchCategoriaCurso = async()=>{
            try {
                //Falta agregar la autorizacion mediante bearer --Mucho ojo!!!
                const result = await fetch(`${process.env.REACT_APP_API_URL}/Producto/getAllCategoria?tipo=${'producto'}`,{
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
                if (result.status !== 200) {
                    throw resultFetch;
                }
        
                setCategoriaList(resultFetch.result);
        
            } catch (error) {
                if (error.statusCode !== 400) {
                    console.error(error);
                    toast.error('Algo ha fallado en nuestro servidor. Inténtelo más tarde');
                }
        
            }
          }
          FetchCategoriaCurso();
    },[])

  return (
    <div>
        <ul className="rounded-lg py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownLargeButton">
            {categoriaList.length > 0 && ((categoriaList.slice(0,5)).map((categoria)=>(
            <li key={categoria.id} >
                <Link onClick={() => {setShowDrop(true);setHidden(!hidden);setShowDropProductos(true)}} to={`/products?categoriaId=${categoria.id}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{categoria.name}</Link>
            </li>
            )))}
            {/* <li >
                <Link onClick={() => {setShowDrop(true);setHidden(!hidden);setShowDropProductos(!showDropProductos)}} to='products' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Shampoo</Link>
            </li>
            <li >
                <Link onClick={() => {setShowDrop(true);setHidden(!hidden);setShowDropProductos(!showDropProductos)}} to='products' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Aceites Naturales</Link>
            </li>
            <li >
                <Link onClick={() => {setShowDrop(true);setHidden(!hidden);setShowDropProductos(!showDropProductos)}} to='products' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Cremas</Link>
            </li> */}
        </ul>
        <div className="py-2 border-t">
            <Link onClick={() => {setShowDrop(true);setHidden(!hidden);setShowDropProductos(true)}} to='products' className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Ver más</Link>
        </div>
    </div>
  )
}
