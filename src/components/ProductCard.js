// import { addToCart } from "../redux/cartSlice";
// import { useDispatch } from "react-redux";
// import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ProductCard = ({itemProd}) => {

  const navigate = useNavigate();

//   const dispath = useDispatch();
  
//   const handleAddToCart = (itemProd) => {
//     let objetoCart = {
//       id: itemProd.id,
//       codigo: itemProd.codigo,
//       imagen: itemProd.imagenUrl,
//       titulo: itemProd.titulo,
//       precio : itemProd.precio,
//       cantidad : '1',
//       //tipo: 'curso',
//       tipo : itemProd.tipo,
//     }

//     dispath(addToCart(objetoCart));

//     toast.success(`Se agregó el ${itemProd.tipo} de ${itemProd.titulo} a su carrito`);
//   }


  const handleNavigate = ()  =>  {
    if(itemProd.tipo === 'producto'){
      navigate(`/productDetail?productoId=${itemProd.id}`) 
    }else{
      navigate(`/cursoDetail?productoId=${itemProd.id}`) 
    }

  }

  return (
    <div className=" w-[300px] sm:w-[260px] md:w-[220px] lg:w-[230px] mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="relative">
        <img className={`rounded-t-lg h-[230px] sm:h-[190px] md:h-[150px] lg:h-[160px] ${!(itemProd.cantidad>0)&& 'grayscale'}`} src={itemProd.imagenUrl} alt="lo que sea" />
        {!(itemProd.cantidad>0) && <h1 className="absolute inset-y-1/2 inset-x-1/3 text-xl text-red-500 font-bold ">Agotado</h1> }
      </div>
        
        <div className="p-5 flex flex-col justify-center">
            <h5 translate="no" className="mb-2 text-center block text-md font-medium tracking-tight text-gray-900 dark:text-white">{itemProd.titulo}</h5>
            {/*<p className="block mb-3 font-normal text-gray-700 dark:text-gray-400">{itemProd.description}</p>*/}
            {/* <button onClick={()=>handleAddToCart(itemProd)} className="capitalize inline-flex justify-center items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition delay-300 duration-300 hover:scale-90 ease-in-out ">
                Ver {itemProd.tipo}
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </button> */}
            <button onClick={()=> handleNavigate()}  className="capitalize inline-flex justify-center items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition delay-300 duration-300 hover:scale-90 ease-in-out ">
                Ver {itemProd.tipo}
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </button>
        </div>
    </div>
  )
}
