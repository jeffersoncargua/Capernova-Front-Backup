import { useEffect, useState } from "react";
import { ProductCard } from "../../../components/ProductCard";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// Import AOS para el fade
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..

export const SliderProduct = ({producto}) => {

  const [current, setCurrent] = useState(0);
  const [slices, setSlices] = useState([]);
  const navigate = useNavigate();
  //console.log(producto);
  //console.log(producto.categoriaId);

  useEffect(()=>{
    AOS.init({
      offset: 120, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 2000, // values from 0 to 3000, with step 50ms
      easing: 'ease', // default easing for AOS animations
      once: false, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
      anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
    });
  },[])
  

  useEffect(() => {
    const fetchProducto = async() => {
      try {
      
        if (producto.categoriaId !== null && producto.categoriaId !== undefined) {
            const resultFromApi = await fetch(`${process.env.REACT_APP_API_URL}/Producto/getAllProducto?tipo=${"producto"}&categoriaId=${producto.categoriaId || 0}`,{
                method:'GET',
                credentials : 'include',
                headers:{
                  'Content-Type' : 'application/json',
                  'Accept' : 'application/json'
                }
              });
        
              const resultFetch = await resultFromApi.json();
              
              //console.log(resultFromApi.status);
              if (resultFromApi.status !==200 && resultFromApi.status !==400) {
                throw resultFetch;
              }
      
              if (resultFetch.isSuccess) {
                setSlices(resultFetch.result);
              }else{
                setSlices([]);
              }
              
        }
        

      } catch (error) {
        console.error(error);
        navigate('error');
      }
   }
    
   fetchProducto();

  },[navigate,producto])

  //console.log(producto.categoriaId === null);


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
    <div className="w-[95%] mx-auto flex flex-col dark:bg-gray-900 mt-10 mb-10" data-aos="fade-up">

        {slices.length > 0 && (
            <div>
                <h1 className="self-center text-3xl font-medium text-center my-10 dark:text-white">
                <span>
                    Productos Similares
                    <hr className="mx-auto w-[100px] border border-blue-400 drop-shadow-md" />
                </span>
                </h1>
            
                {/*Slider que permite movilizar los cursos que contiene la pagina web */}
                <div className="w-full flex">
                    <div className="w-[5%] flex items-center max-sm:hidden">
                    <span onClick={()=> previousSlice()} className=" cursor-pointer">
                        <i className="bi bi-arrow-left-circle-fill text-gray-300 hover:text-blue-600 text-3xl"></i>
                    </span>
                    </div>
                    <div className="w-[90%] mx-auto overflow-x-hidden">

                        {/* permite transformar el desplazamiento en x en pantalla completa  style={{transform: `translateX(-${current/3 * 100}%)`}} */}
                        <div className={`flex transition ease-in-out duration-40 mx-auto max-[1088px]:hidden `} style={{transform: `translateX(-${current *25}%)`}} >
                            {slices.map((itemProd,index) => (
                                <div className= 'shrink-0 w-1/4 hover:scale-110 mb-10' key={index}>
                                    {/*ProductCard */}
                                    <ProductCard itemProd={itemProd} />
                                </div> 
                            ))}
                        </div>

                        {/* permite transformar el desplazamiento en x en pantalla completa  style={{transform: `translateX(-${current/3 * 100}%)`}} */}
                        <div className={`lg:max-[1088px]:flex transition ease-in-out duration-40 mx-auto hidden `} style={{transform: `translateX(-${current/3 *100}%)`}} >
                            {slices.map((itemProd,index) => (
                                <div className= 'shrink-0 w-1/3 hover:scale-110 mb-10' key={index}>
                                    {/*ProductCard */}
                                    <ProductCard itemProd={itemProd} />
                                </div> 
                            ))}
                        </div>

                        {/* permite transformar el desplazamiento en x en pantalla semicompleta  style={{transform: `translateX(-${current/3 * 100}%)`}} */}
                        <div className={`min-[796px]:max-lg:flex transition ease-in-out duration-40 mx-auto hidden `} style={{transform: `translateX(-${current/3 * 100}%)`}} >
                            {slices.map((itemProd,index) => (
                                <div className= 'shrink-0 w-1/3 hover:scale-110 mb-10' key={index}>
                                    {/*ProductCard */}
                                    <ProductCard itemProd={itemProd} />
                                </div> 
                            ))}
                        </div>

                        {/* permite transformar el desplazamiento en x en pantalla semicompleta  style={{transform: `translateX(-${current/3 * 100}%)`}} */}
                        <div className={`md:max-[795px]:flex transition ease-in-out duration-40 mx-auto hidden `} style={{transform: `translateX(-${current*50}%)`}} >
                            {slices.map((itemProd,index) => (
                                <div className= 'shrink-0 w-1/2 hover:scale-110 mb-10' key={index}>
                                    {/*ProductCard */}
                                    <ProductCard itemProd={itemProd} />
                                </div> 
                            ))}
                        </div>

                        {/* permite transformar el desplazamiento en x en pantalla mediana  style={{transform: `translateX(-${current/3 * 100}%)`}} */}
                        <div className={`sm:max-md:flex transition ease-in-out duration-40 mx-auto hidden `} style={{transform: `translateX(-${current * 50}%)`}} >
                            {slices.map((itemProd,index) => (
                                <div className= 'shrink-0 w-1/2 hover:scale-110 mb-10' key={index}>
                                    {/*ProductCard */}
                                    <ProductCard itemProd={itemProd} />
                                </div> 
                            ))}
                        </div>

                        {/* permite transformar el desplazamiento en x en pantalla pequeña  style={{transform: `translateX(-${current/3 * 100}%)`}} */}
                        {/* <div className={`max-sm:flex transition ease-in-out duration-40 mx-auto hidden `} style={{transform: `translateX(-${current * 100}%)`}} >
                            {slices.map((itemProd,index) => (
                                <div className= 'shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 hover:scale-110 mb-10' key={index}>
                                    //ProductCard
                                    <ProductCard itemProd={itemProd} />
                                </div> 
                            ))}
                        </div> */}

                        <div  className="max-sm:flex hidden mx-auto">
                            <Swiper 
                            pagination={true} 
                            modules={[Pagination]} 
                            >
                                {slices.map((itemProd,index) => (
                                <SwiperSlide key={index}>
                                    <div className= 'shrink-0 w-full hover:scale-100 mb-10' key={index}>
                                    {/*ProductCard */}
                                        <ProductCard itemProd={itemProd} />
                                    </div>
                                </SwiperSlide>
                                        
                                    ))}
                            </Swiper>
                        </div>

                    </div>

                    <div className="w-[5%] flex items-center justify-end max-sm:hidden">
                    <span onClick={()=> nextSlice()} className="cursor-pointer">
                        <i className="bi bi-arrow-right-circle-fill text-gray-300 hover:text-blue-600  text-3xl"></i>
                    </span>
                    </div>
                </div>

                {/*Indicadores de la tarjeta actual */}
                <div className="flex justify-center w-full  items-center max-sm:hidden">
                        {slices.map((s,index) => (
                        <span key={index} className={`flex me-3 ${current===index ? 'bg-blue-600 w-3.5 h-3.5':'bg-gray-600 w-3 h-3'}  rounded-full`}></span>
                        ))} 
                </div>
            </div>
        ) }

    </div>
  )
}
