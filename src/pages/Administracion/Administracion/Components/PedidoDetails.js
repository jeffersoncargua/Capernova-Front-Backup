import { useState,useEffect, useRef} from "react";


export const PedidoDetails = ({showModalPedidoDetail,setShowModalPedidoDetail,pedido, setPedido,setResponse}) => {


const columns = ['Imagen','Código', 'Producto','Cantidad'];
const [cartList,setCartList] = useState([]);

const refDirMain = useRef();
const refDirSec = useRef();
const refEstado = useRef();

useEffect(() => {

    setCartList(JSON.parse(pedido.productos));
    console.log(pedido);
    
  }, [pedido]);

  const handlePedidoEdit = async(pedido) => {
    const resultFromApi = await fetch(`https://localhost:7164/api/Venta/updatePedido/${pedido.id}`,{
        method:'PUT',
        credentials : 'include',
        headers:{
          'Content-Type' : 'application/json',
          'Accept' : 'application/json'
        },
        body: JSON.stringify({
            id: pedido.id,
            emision: pedido.emision,
            productos: pedido.productos,
            ventaId: pedido.ventaId,
            directionMain : refDirMain.current.value,
            directionSec: refDirSec.current.value,
            estado: refEstado.current.value,
        })
      });


      const resultFetch = await resultFromApi.json();
      console.log(resultFetch);
      if (resultFetch.isSuccess) {
        setResponse(resultFetch);
      }
      setShowModalPedidoDetail(false);
  }


  return (
    <div>
        {/*<!-- Main modal -->*/}
        <div id="crud-modal" tabIndex='-1' className={`${showModalPedidoDetail? '' :'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] h-full bg-gray-700/[0.6]`}>
            <div className="relative p-4 mx-auto w-full max-w-2xl max-h-full dark:border-gray-600 mb-14">
                {/*<!-- Modal content -->*/}
                <div className="relative bg-white my-[4%] rounded-lg shadow dark:bg-gray-700">
                    {/*<!-- Modal header -->*/}
                    <div className="flex items-center justify-between p-4 md:p-5 ">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Detalle del Pedido
                        </h3>
                        <button onClick={()=>{setShowModalPedidoDetail(false);setResponse({})}} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/*<!-- Modal body -->*/}
                    <div className="grid gap-4 mb-4 grid-cols-2 p-5 ">
                        <div className="">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre:</label>
                            <input disabled type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" defaultValue={pedido.venta.name} />
                        </div>                            
                        <div className="">
                            <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellido:</label>
                            <input disabled type="text" name="lastName" id="lastName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" defaultValue={pedido.venta.lastName} />
                        </div>
                        <div className="">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo:</label>
                            <input disabled  type="email" pattern="[a-zA-Z0-9!#$%&'*\/=?^_`\{\|\}~\+\-]([\.]?[a-zA-Z0-9!#$%&'*\/=?^_`\{\|\}~\+\-])+@[a-zA-Z0-9]([^@&%$\/\(\)=?¿!\.,:;]|\d)+[a-zA-Z0-9][\.][a-zA-Z]{2,4}([\.][a-zA-Z]{2})?" name="email" id="email"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" defaultValue={pedido.venta.email}  />
                        </div>

                        <div className="">
                            <label htmlFor="identificacion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Identificación:</label>
                            <input disabled type="text" pattern="[0-9]{10}" name="identificacion" id="identificacion" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"  defaultValue={pedido.venta.userId}  />                            
                        </div>
                        
                        <div className="">
                            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Teléfono:</label>
                            <input disabled type="tel" pattern="[0-9]{10}" name="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"  defaultValue={pedido.venta.phone}  />                            
                        </div>                        
                        
                        <div className="">
                            <label htmlFor="direccionPrincipal" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dirección Principal:</label>
                            <input  type="text"  name="direccionPrincipal" id="direccionPrincipal" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"  defaultValue={pedido.directionMain} ref={refDirMain} />
                        </div>
                        <div className="">
                            <label htmlFor="direccionSecundaria" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dirección Secundaria:</label>
                            <input  type="text"  name="direccionSecundaria" id="direccionSecundaria" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"  defaultValue={pedido.directionSec} ref={refDirSec}  />
                        </div>
                        <div className="">
                            <label htmlFor="estado" className="block mb-2 text-sm font-medium text-black dark:text-white">Estado:</label>
                            <select onChange={()=>handlePedidoEdit(pedido)} id="estado" className="block w-full p-2 text-sm text-black border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={pedido.estado} ref={refEstado} >
                                <option value="POR ENTREGAR">POR ENTREGAR</option>
                                <option value="ENTREGADO">ENTREGADO</option>
                                <option value="CANCELADO">CANCELADO</option>
                            </select>
                        </div>

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
                                    <tr key={item.Id} className="border-b dark:border-gray-700">
                                        <td className="px-4 py-3">
                                            <img src={item.Imagen} className="w-16 max-h-full" alt={item.Titulo} />
                                        </td>
                                        <td className="px-4 py-3">{item.Codigo}</td>
                                        <td className="px-4 py-3">{item.Titulo}</td>                                                         
                                        <td className="px-4 py-3">{item.Cantidad}</td>
                                    </tr>
                                    ))}
                                    
                                    </tbody>
                                    
                                </table>
                            </div>
                        </div>
                </div>
            </div>
        </div> 
    </div>
  )
}
