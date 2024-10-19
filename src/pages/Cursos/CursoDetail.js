import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {Descripcion,Contenido, SliderCurso, Loading}  from './Components'

import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/cartSlice";

// Import AOS para el fade
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..

//import { ProductCard } from "../../components";

export const CursoDetail = () => {

  const [loading, setLoading] = useState(true);
  const dispath = useDispatch();
  const [searchParams] = useSearchParams();
  const productoId = searchParams.get('productoId');
  //const [cant, setCant] = useState(1);
  //console.log(productoId);
  //const refCant = useRef();
  const [producto,setProducto] = useState({});
 
  const [enableDescription,setEnableDescription] = useState(true);
  const [enableContenido,setEnableContenido] = useState(false);
  //const [productList,setProductList] = useState([]);
  const navigate = useNavigate();

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
  

  useEffect(()=>{
    const fetchProducto = async() => {
      setLoading(true);
      try {
        const resultFromApi = await fetch(`${process.env.REACT_APP_API_URL}/Producto/getProducto/${productoId}`,{
          method:'GET',
          credentials : 'include',
          headers:{
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
          }
        });
  
        const resultFetch = await resultFromApi.json();

        if (resultFromApi.status !== 200) {
          throw resultFetch;
        }

        //console.log(resultFetch);
        setProducto(resultFetch.result);
        setLoading(false);
        

      } catch (error) {
        console.error(error);
        setLoading(false);
        navigate('/error');
        
      }
    }
      
    fetchProducto();
    
  },[productoId,navigate])

  //console.log(producto);


  const handleAddToCart = (itemProd) => {
    let objetoCart = {
      id: itemProd.id,
      codigo: itemProd.codigo,
      imagen: itemProd.imagenUrl,
      titulo: itemProd.titulo,
      precio : itemProd.precio,
      cantidad : 1,
      tipo : itemProd.tipo,
    }

    dispath(addToCart(objetoCart));

    toast.success(`Se agregó el ${itemProd.tipo} de ${itemProd.titulo} a su carrito`);
  }
  
  return (
    <div className="w-[95%] mx-auto mb-10">
      
      {loading ? 
      (<Loading />)
      :(<div className={``} data-aos="fade-up" >
        <div className="flex flex-wrap mt-10">
          <div className="w-full text-center md:mx-10 md:w-[60%] mt-10 md:mt-0 group order-2 md:order-1 ">
            <h1 className="font-semibold text-3xl dark:text-white">{producto.titulo}</h1>
            <hr className="mx-auto w-[100px] border border-blue-400 drop-shadow-md" />
            <ul className="text-sm font-medium text-center text-gray-500 rounded-lg shadow flex dark:divide-gray-700 dark:text-gray-400 mt-5">
              <li className="w-full focus-within:z-10">
                  <button onClick={()=> {setEnableDescription(true);setEnableContenido(false)}} className="inline-block w-full p-4 text-gray-900 bg-gray-100 border-r border-gray-200 dark:border-gray-700 rounded-s-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white" aria-current="page">Descripción</button>
              </li>
              <li className="w-full focus-within:z-10">
                  <button onClick={()=> {setEnableDescription(false);setEnableContenido(true)}} className="inline-block w-full p-4 bg-white border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">Contenido del Curso</button>
              </li>
            </ul>
            {/* <span className="flex self-start text-xl font-semibold mb-2">Descripción:</span> */}
            {enableDescription && (
              <Descripcion detalle={producto.detalle} />
            )}
            {enableContenido && (
              <Contenido codigo={producto.codigo} />
            )}

          </div>
          <div className="w-full md:w-[30%] order-1 md:order-2 md:mt-[3rem]" data-aos="fade-up">
            <img className={`mx-auto w-full sm:max-w-md md:max-w-sm  rounded-lg shadow shadow-gray-500 shadow-lg dark:shadow-white`} src={producto.imagenUrl} alt="Aqui va la imagen" />
            <div className="mt-10 gap-y-3 flex justify-around items-center">
              
              <span className="font-semibold text-lg me-3 dark:text-white" >
                Precio: <p className="inline-block text-lg text-pink-500">
                          ${producto.precio}
                        </p>
              </span>
              {/*Esta seccion es para colocar el boton que va a agregar el producto al carrito */}
              <div className="flex group ">
                <button onClick={() => handleAddToCart(producto)} className="flex items-center text-black group-hover:text-white group-hover:scale-110 rounded-lg px-2.5 py-2 border border-blue-400 bg-blue-600 hover:border-green-400 hover:bg-green-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-cart-plus w-5 h-5 me-3" viewBox="0 0 16 16">
                    <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z"/>
                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                  </svg>
                  <span className="">Agregar al carrito</span>                 
                </button>
              </div>
            </div>
          </div>
        </div>
        {/*Aqui va el slider de los cursos similares */}
        <SliderCurso producto={producto} />
      </div>)}

      
      
    </div>
  )
}
