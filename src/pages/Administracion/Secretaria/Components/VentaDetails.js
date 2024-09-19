import { useState,useEffect } from "react";
import { toast } from "react-toastify";


export const VentaDetails = ({showModalVentaDetail,setShowModalVentaDetail,venta, setVenta}) => {


const columns = ['Imagen','Código', 'Producto','Cantidad','Total'];
const [cartList,setCartList] = useState([]);

useEffect(() => {
    const fetchVentaDetail = async() => {
        try {
            const resultFromApi = await fetch(`${process.env.REACT_APP_API_URL}/Venta/getShoppingCart?ventaId=${venta.id}`,{
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
              if (resultFetch.isSuccess) {
                setCartList(resultFetch.result);
              }
        } catch (error) {
            console.error(error);
            toast.error('Ha ocurrido un error en el servidor');
        }
      
    }
    fetchVentaDetail();
    
  }, [venta]);

  //console.log(cartList);

  return (
    <div>
        {/*<!-- Main modal -->*/}
        <div id="crud-modal" tabIndex='-1' className={`${showModalVentaDetail? '' :'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] h-full bg-gray-700/[0.6]`}>
            <div className="relative p-4 mx-auto w-full max-w-2xl h-full dark:border-gray-600 mb-10">
                {/*<!-- Modal content -->*/}
                <div className="relative bg-white my-[4%] rounded-lg shadow dark:bg-gray-700">
                    {/*<!-- Modal header -->*/}
                    <div className="flex items-center justify-between p-4 md:p-5 ">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Detalle de la Venta
                        </h3>
                        <button onClick={()=>setShowModalVentaDetail(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/*<!-- Modal body -->*/}
                    <div className="grid gap-4 mb-4 grid-cols-2 p-5  ">
                        <div className="">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre:</label>
                            <input disabled type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" defaultValue={venta.name} />
                        </div>                            
                        <div className="">
                            <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellido:</label>
                            <input disabled type="text" name="lastName" id="lastName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" defaultValue={venta.lastName} />
                        </div>
                        <div className="">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo:</label>
                            <input disabled  type="email" pattern="[a-zA-Z0-9!#$%&'*\/=?^_`\{\|\}~\+\-]([\.]?[a-zA-Z0-9!#$%&'*\/=?^_`\{\|\}~\+\-])+@[a-zA-Z0-9]([^@&%$\/\(\)=?¿!\.,:;]|\d)+[a-zA-Z0-9][\.][a-zA-Z]{2,4}([\.][a-zA-Z]{2})?" name="email" id="email"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" defaultValue={venta.email}  />
                        </div>

                        <div className="">
                            <label htmlFor="identificacion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Identificación:</label>
                            <input disabled type="text" pattern="[0-9]{10}" name="identificacion" id="identificacion" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"  defaultValue={venta.userId}  />                            
                        </div>
                        
                        <div className="">
                            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Teléfono:</label>
                            <input disabled type="tel" pattern="[0-9]{10}" name="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"  defaultValue={venta.phone}  />                            
                        </div>

                        
                        
                        {/* <div className="">
                            <label htmlFor="direccionPrincipal" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dirección Principal:</label>
                            <input  type="text"  name="direccionPrincipal" id="direccionPrincipal" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Escribe tu dirección principal" required ref={refDireccionPrincipal}  />
                        </div>
                        <div className="">
                            <label htmlFor="direccionSecundaria" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dirección Secundaria:</label>
                            <input  type="text"  name="direccionSecundaria" id="direccionSecundaria" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Escribe tu dirección secundaria" required ref={refDireccionSecundaria}  />
                        </div>*/}

                       
                    </div>
                     <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden mb-10">
                            
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left dark:text-white">
                                    <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
                                    <tr>
                                    {columns.map((column) => (
                                        <th key={column} scope="col" className="px-4 py-3">{column}</th>
                                    ))}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {cartList.length > 0 && cartList.map((item) => (
                                    <tr key={item.id} className="border-b dark:border-gray-700">
                                        <td className="px-4 py-3">
                                            <img src={item.productoImagen} className="w-16 max-h-full" alt={item.titulo} />
                                        </td>
                                        <td className="px-4 py-3">{item.productoCode}</td>
                                        <td className="px-4 py-3">{item.productoName}</td>                                                         
                                        <td className="px-4 py-3">{item.cantidad}</td>
                                        <td className="px-4 py-3">{item.total}</td>
                                        
                                    </tr>
                                    ))}
                                    
                                    </tbody>
                                    <tfoot>
                                        <tr className="font-semibold text-black bg-gray-50 dark:bg-gray-700 dark:text-white">
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th scope="row" className="px-6 py-3 text-base">Total</th>
                                            <td className="px-6 py-3">${venta.total}</td>                                        
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                </div>
            </div>
        </div> 
    </div>
  )
}
