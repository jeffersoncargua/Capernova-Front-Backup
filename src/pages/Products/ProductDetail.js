import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/cartSlice";

import { ProductCard } from "../../components";

export const ProductDetail = () => {


    const dispath = useDispatch();
    const [searchParams] = useSearchParams();
    const productoId = searchParams.get('productoId');
    const [cant, setCant] = useState(1);
    //console.log(typeof(productoId));
    const refCant = useRef();

    const [producto, setProducto] = useState({});
    const [productList,setProductList] = useState([]);
    const [shoppingCart, setShoppingCart] = useState(JSON.parse(localStorage.getItem('shoppingcart')) || []);

    useEffect(()=>{
     
        try {          
            const fetchProducto = async() => {
              const resultFromApi = await fetch(`https://localhost:7164/api/Producto/getProducto/${productoId}`,{
                method:'GET',
                credentials : 'include',
                headers:{
                  'Content-Type' : 'application/json',
                  'Accept' : 'application/json'
                }
              });
        
              const resultFetch = await resultFromApi.json();
              console.log(resultFetch);
              setProducto(resultFetch.result);
            }
            const fetchProductos = async() => {
              const resultFromApi = await fetch(`https://localhost:7164/api/Producto/getAllProducto?tipo=${"producto"}`,{
                method:'GET',
                credentials : 'include',
                headers:{
                  'Content-Type' : 'application/json',
                  'Accept' : 'application/json'
                }
              });
        
              const resultFetch = await resultFromApi.json();
              console.log(resultFetch);
              setProductList(resultFetch.result);
            }

            fetchProducto();
            fetchProductos();
            
          } catch (error) {
            console.error(error);
          }
    },[productoId])

    useEffect(()=>{
      if (shoppingCart.length > 0) {        
        const updateCant = shoppingCart.find((item) => item.productoId === productoId);
        //console.log(typeof(updateCant.cantidad));
        console.log(updateCant);
        if(updateCant){
          setCant(+updateCant.cantidad);
        }else{
          setCant(1);
        }
      }
    },[shoppingCart,productoId,setShoppingCart])

    const handleIncrement = ()=>{
      if(cant < producto.cantidad){  
        setCant(cant + 1);
      }else{
        alert("Alcanzó la máxima cantidad disponible");
      }
    }

    const handleDecrement = ()=>{
      if(cant > 1){
          setCant(cant-1);
      }else{
        alert("Error");
      }
      
    }

    const handleAddToCart = (itemProd) => {

      let objetoCart = {
        id: itemProd.id,
        codigo: itemProd.codigo,
        imagen: itemProd.imagenUrl,
        titulo: itemProd.titulo,
        precio : itemProd.precio,
        cantidad : refCant.current.value,
        tipo : itemProd.tipo,
      }

      dispath(addToCart(objetoCart));

      //let shoppingCart = JSON.parse(localStorage.getItem('shoppingcart'));

        const itemCart = shoppingCart.find((item) => item.productoId === productoId);
        console.log(itemCart);
        if (itemCart) {
          let updateListCart = shoppingCart;
          let cartist = updateListCart.map(itemCart => itemCart.productoId === productoId ? {...itemCart, cantidad : itemCart.cantidad = refCant.current.value}:itemCart );
          console.log(updateListCart);
          setShoppingCart(updateListCart);
          localStorage.setItem('shoppingcart',JSON.stringify(cartist));
        }else{
          let updateListCart= shoppingCart;
          setShoppingCart([...shoppingCart,{'productoId':productoId,'cantidad':refCant.current.value}]);
          const newlist = updateListCart.concat({'productoId':productoId,'cantidad':refCant.current.value});        
          localStorage.setItem('shoppingcart',JSON.stringify(newlist));
        }
      
      

      toast.success(`Se agregó el ${itemProd.tipo} de ${itemProd.titulo} a su carrito`);
    }

  return (
    <div className="w-[95%] mx-auto group text-black dark:text-white ">
        <div className="flex flex-wrap mt-10 ">
            <div className="w-full md:w-[50%] relative">
                <img className={`mx-auto w-full sm:max-w-lg md:max-w-md rounded-lg shadow shadow-gray-500 shadow-lg dark:shadow-white ${!producto.cantidad>0 ? 'grayscale':''}`} src={producto.imagenUrl} alt="Aqui va la imagen" />
                {!(producto.cantidad>0) && <h1 className="absolute inset-y-1/2 inset-x-1/3 text-5xl text-red-500 font-bold ">Agotado</h1> }
                
            </div>
            <div className="w-full text-center md:w-[50%] mt-10 md:mt-0">
              <div className="md:mx-10">
                <h1 className="font-semibold text-3xl dark:text-white">{producto.titulo}</h1>
                <hr className="mx-auto w-[100px] border border-blue-400 drop-shadow-md" />
                <span className="flex self-start text-xl font-semibold mb-2">Descripción:</span>
                <div className="flex flex-col self-start text-start text-lg gap-y-2 dark:text-white">
                  <pre className=" text-sm font-sans leading-loose text-wrap text-justify">
                    {producto.detalle}
                  </pre>
                  
                  <span className="font-semibold text-md me-3 dark:text-white" >
                  Precio: <p className="inline-block text-md text-pink-500">
                            ${producto.precio}
                          </p>
                  </span>
                  
                </div>
                <div className="flex flex-wrap items-center">
                  {/*Esta seccion es para el contador de productos que se desea adquirir */}
                  <div className="relative flex items-center max-w-[13rem] mt-5 me-5">
                    <label className="font-semibold text-md me-3">Cantidad:</label>
                    <button onClick={()=>handleDecrement()} type="button" id="decrement-button" data-input-counter-decrement="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                        <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                        </svg>
                    </button>
                    <input type="text" id="quantity-input" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readOnly value={cant} ref={refCant} required />
                    <button onClick={()=>handleIncrement()} type="button" id="increment-button" data-input-counter-increment="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                        <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                        </svg>
                    </button>
                  </div>
                  {/*Esta seccion es para colocar el boton que va a agregar el producto al carrito */}
                  {/*El disabled en false permite que el boton puede ser accedido y en true el boton no puede ser accedido */}
                  <div className="flex justify-center group mt-5">                    
                    <button onClick={() => handleAddToCart(producto)} disabled={producto.cantidad > 0 ? false:true} className={`flex items-center text-black group-hover:text-white group-hover:scale-110 rounded-lg px-2.5 py-2 border border-blue-400 bg-blue-600 hover:border-green-400 hover:bg-green-600 ${producto.cantidad > 0 ? 'cursor-pointer':'cursor-not-allowed'}`}>
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
        </div>
        <h1 className="self-center text-3xl font-medium text-center my-10 dark:text-white">
          <span>
              Productos Similares
              <hr className="mx-auto w-[100px] border border-blue-400 drop-shadow-md" />
          </span>
        </h1>
        <div className="flex flex-wrap">
          {productList.map((itemProd,index) => (
                <div className= 'shrink-0 w-full sm:w-1/2 md:w-1/2 lg:w-1/3 mb-10' key={index}>
                  {/*ProductCard */}
                    <ProductCard itemProd={itemProd} />
                </div> 
            ))}
        </div> 
    </div>
  )
}
