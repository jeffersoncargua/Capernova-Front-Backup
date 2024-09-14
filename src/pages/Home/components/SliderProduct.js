import { useEffect, useState } from "react";
import { ProductCard } from "../../../components/ProductCard";
import { useNavigate } from "react-router-dom";

export const SliderProduct = () => {

  const [current, setCurrent] = useState(0);
  const [slices, setSlices] = useState([]);
  const navigate = useNavigate();
  

  useEffect(() => {
    try {
      const fetchProducto = async() => {
        const resultFromApi = await fetch(`https://localhost:7164/api/Producto/getAllProducto?tipo=${"producto"}`,{
          method:'GET',
          credentials : 'include',
          headers:{
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
          }
        });
  
        const resultFetch = await resultFromApi.json();
        //console.log(resultFetch);
        setSlices(resultFetch.result);
      }
      fetchProducto();
      
    } catch (error) {
      console.error(error);
      navigate('error');
    }
  },[navigate])


  let previousSlice = () => {
    if(current === 0){
        setCurrent(slices.length - 1);
    }else{
        setCurrent(current - 1);
    }
    //console.log(current);
}

let nextSlice = () => {
    if(current === slices.length-1){
        setCurrent(0);
    }else{
        setCurrent(current + 1);
    }
    //console.log(current); imprime el slider Actual
}

  return (
    <div className="w-[95%] mx-auto flex flex-col dark:bg-gray-900 mt-10">
      {/* <h1 className="self-center text-5xl font-extrabold before:block before:absolute before:-inset-1 before:-skew-y-[1.7deg] before:bg-black dark:before:bg-slate-50 relative my-1" ><span className="before:block before:absolute before:-inset-1 before:skew-y-[1.8deg] before:bg-amber-300 "><span className=" text-white relative ">Nuestros </span></span></h1> 
      <h1 className="self-center text-5xl font-extrabold before:block before:absolute before:-inset-1 before:-skew-y-[1.7deg] before:bg-black dark:before:bg-slate-50 relative my-1" ><span className="before:block before:absolute before:-inset-1 before:skew-y-[1.8deg] before:bg-amber-300 "><span className=" text-white relative ">Cursos </span></span></h1> */}
      
      {/* <h1 className="self-end text-4xl font-bold before:block before:absolute before:-inset-1 before:-skew-y-[1.7deg] before:bg-black dark:before:bg-slate-50 relative my-8 " ><span className="before:block before:absolute before:-inset-1 before:skew-y-[1.7deg] before:bg-amber-300 "><span className=" text-white relative ">Nuestros Productos ...</span></span></h1>  */}
      <h1 className="self-center md:self-end text-3xl font-medium text-center my-10 dark:text-white">
        <span>
            Productos
            <hr className="mx-auto w-[100px] border border-blue-400 drop-shadow-md" />
        </span>
      </h1>
      {/*<h1 className="self-end text-4xl font-bold before:block before:absolute before:-inset-1 before:-skew-y-[1.7deg] before:bg-cyan-400 relative my-8 " ><span className=" text-white relative ">Te Ofrecemos ...</span></h1>*/}
      {/*Slider que permite movilizar los cursos que contiene la pagina web */}
      <div className="w-full flex">
        <div className="w-[5%] flex items-center">
          <span onClick={()=> previousSlice()} className=" cursor-pointer">
            <i className="bi bi-arrow-left-circle-fill text-gray-300 hover:text-blue-600 text-3xl"></i>
          </span>
        </div>
        <div className="w-[90%] overflow-x-hidden">

          {/* permite transformar el desplazamiento en x en pantalla completa  style={{transform: `translateX(-${current/3 * 100}%)`}} */}
          <div className={`flex transition ease-in-out duration-40 mx-auto max-lg:hidden `} style={{transform: `translateX(-${current *25}%)`}} >
              {slices.map((itemProd,index) => (
                  <div className= 'shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 hover:scale-110 mb-10' key={index}>
                    {/*ProductCard */}
                      <ProductCard itemProd={itemProd} />
                  </div> 
              ))}
          </div>

          {/* permite transformar el desplazamiento en x en pantalla semicompleta  style={{transform: `translateX(-${current/3 * 100}%)`}} */}
          <div className={`md:max-lg:flex transition ease-in-out duration-40 mx-auto hidden `} style={{transform: `translateX(-${current/3 * 100}%)`}} >
              {slices.map((itemProd,index) => (
                  <div className= 'shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 hover:scale-110 mb-10' key={index}>
                    {/*ProductCard */}
                      <ProductCard itemProd={itemProd} />
                  </div> 
              ))}
          </div>

          {/* permite transformar el desplazamiento en x en pantalla mediana  style={{transform: `translateX(-${current/3 * 100}%)`}} */}
          <div className={`sm:max-md:flex transition ease-in-out duration-40 mx-auto hidden `} style={{transform: `translateX(-${current * 50}%)`}} >
              {slices.map((itemProd,index) => (
                  <div className= 'shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 hover:scale-110 mb-10' key={index}>
                    {/*ProductCard */}
                      <ProductCard itemProd={itemProd} />
                  </div> 
              ))}
          </div>

          {/* permite transformar el desplazamiento en x en pantalla pequeña  style={{transform: `translateX(-${current/3 * 100}%)`}} */}
          <div className={`max-sm:flex transition ease-in-out duration-40 mx-auto hidden `} style={{transform: `translateX(-${current * 100}%)`}} >
              {slices.map((itemProd,index) => (
                  <div className= 'shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 hover:scale-110 mb-10' key={index}>
                    {/*ProductCard */}
                      <ProductCard itemProd={itemProd} />
                  </div> 
              ))}
          </div>

        </div>
        <div className="w-[5%] flex items-center justify-end">
          <span onClick={()=> nextSlice()} className="cursor-pointer">
            <i className="bi bi-arrow-right-circle-fill text-gray-300 hover:text-blue-600  text-3xl"></i>
          </span>
        </div>
      </div>

      {/*Indicadores de la tarjeta actual */}
      <div className="flex justify-center w-full  items-center">
            {slices.map((s,index) => (
              <span key={index} className={`flex me-3 ${current===index ? 'bg-blue-600 w-3.5 h-3.5':'bg-gray-600 w-3 h-3'}  rounded-full`}></span>
            ))} 
      </div>
    </div>
  )
}
