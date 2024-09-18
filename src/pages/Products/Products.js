import { useEffect, useRef, useState } from "react";
import { ProductCard } from "../../components/ProductCard";
import {SearchFilter} from '../Products/components';
import {Beneficios} from '../../components'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { search } from "../../redux/searchProductSlice";
import { useNavigate } from "react-router-dom";


export const Products = ({children}) => {

  const [slices, setSlices] = useState([]);
  const refSearch = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchProduct = useSelector(state => state.searchState.searchProduct);

  useEffect(()=>{
    
      const fetchProductos = async() => {
        try {
        const result = await fetch(`${process.env.REACT_APP_API_URL}/Producto/getAllProducto?search=${searchProduct}&tipo=${"producto"}`,{
          method: 'GET',
          headers:{
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
          }
        });
        const resultFetch = await result.json();

        //console.log(resul.status);
        if (result.status !== 200) {
          throw resultFetch;
        }
        setSlices(resultFetch.result);

        } catch (error) {
          console.error(error);
          navigate('error');
        }
      }
      fetchProductos();
      
    
  },[searchProduct,navigate])

  const handleSubmitSearch = (event) => {
    //event.preventDefault();
    dispatch(search(refSearch.current.value));
}


  return (
    <div className=" mt-4">
      {/*Esta seccion es para mostrar los beneficios y el tutilo para los cursos  */}
      <div className="mb-4">
        <Beneficios />
        <h1 className=" text-3xl font-medium text-center my-10 dark:text-white">
              <span>
                  Nuestros Productos
                  <hr className="mx-auto w-[100px] border border-blue-400 drop-shadow-md" />
              </span>
          </h1>
      </div>
      
      {/*Esta seccion contiene el slidebar y los productos/cursos que se van buscar */}
      <div className="w-[95%] flex mx-auto">
        <SearchFilter />

        <div className="w-[75%] flex flex-wrap md:justify-center">

          <div className='w-full'>
            <div className="relative md:hidden block mb-6 flex-1 w-[95%]">   
              {/* <form onSubmit={handleSubmitSearch}> */}
              <form>
                <div type='submit' className="absolute inset-y-0 end-2 flex items-center ps-3 ">
                  <svg className="w-4 h-4 text-gray-500 dark:text-white hover:text-blue-500 dark:hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
                  <span className="sr-only">Search icon</span>   
                </div> 
                <input onChange={() => handleSubmitSearch()} type="text" id="search-navbar" className="w-full p-2 ps-2 text-sm text-gray-900 rounded-lg bg-gray-50 hover:border-blue-300 focus:outline-none focus:ring-inset focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar Productos..." ref={refSearch} />                        
              </form>                     
                
            </div>
          </div>          
            {slices.map((itemProd,index) => (
                <div className= 'shrink-0 w-full sm:w-1/2 md:w-1/2 lg:w-1/3 mb-10' key={index}>
                  {/*ProductCard */}
                    <ProductCard itemProd={itemProd} />
                </div> 
            ))}
        </div>
      </div>      
      {children}
    </div>
  )
}
