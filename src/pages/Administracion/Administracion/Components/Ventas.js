import { useState, useRef,useEffect} from "react";
import { toast } from "react-toastify";
//import { ModalDelete } from "../../Components";
import {VentaDetails,Loading} from '../Components';
//import para escoger la fecha de busqueda de registros de las ventas
import Datepicker from "react-tailwindcss-datepicker";

import { DownloadTableExcel } from "react-export-table-to-excel";


export const Ventas = () => {

  
  const [ventaList, setVentaList] = useState([]);
  const [venta, setVenta] = useState({});
  const [search , setSearch] = useState('');
  const [total, setTotal] = useState(0);
  const [value,setValue] = useState({
    startDate:null,
    endDate:null
  }); // permite escoger las fechas de inicio y final para buscar las ventas de acuedo al rango de fecha que se solicite
  const [showModalVentaDetail, setShowModalVentaDetail] = useState(false);
  //const [showModal,setShowModal] = useState(false);
  //const [showModalDelete,setShowModalDelete] = useState(false);
  const columns = ["Fecha Emisión", "ID Trasacción","ID Cliente", "Nombre Cliente" ,"Apellido Cliente", "Correo", "Teléfono", "Total" , "Estado", "Ver Detalle/Eliminar"];
  const columns2 = ["Fecha Emisión", "ID Trasacción","ID Cliente", "Nombre Cliente" ,"Apellido Cliente", "Correo", "Teléfono", "Total" , "Estado"];
  //const [tipo,setTipo] = useState(''); //es para almacenar el tipo de objeto a eliminar que puede ser curso, capitulo, video, deber, etc
  //const [objeto, setObjeto] = useState({}); //es para almacenar el objeto a eliminar mediante el componente ModalDelete
  const [response,setResponse] = useState({});
  const refSearch = useRef();
  const [loading, setLoading] = useState(false);
  
  const tableRef = useRef(null);



  useEffect(() => {
    const fetchVentas = async() => {
      try {
        const resultFromApi = await fetch(`${process.env.REACT_APP_API_URL}/Venta/getAllVentas?search=${search}&start=${JSON.stringify(value.startDate)}&end=${JSON.stringify(value.endDate)}`,{
          method:'GET',
          credentials : 'include',
          headers:{
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
          }
        });
  
  
        const resultFetch = await resultFromApi.json();

        if (resultFromApi.status !==200 && resultFromApi.status !== 400) {
          throw resultFetch;
        }
        //console.log(resultFetch);
        if (resultFetch.isSuccess) {
          let subTotal = 0;
          setVentaList(resultFetch.result);
          resultFetch.result.forEach(element => {
            if (element.estado === 'Pagado') {
              subTotal += element.total; 
            }
            
          });
          setTotal(subTotal);
        }
      } catch (error) {
        console.error(error);
        toast.error("Ha ocurrido un error en el servidor");
      }
      
    }
    fetchVentas();
    response.isSuccess ? toast.success(response.message): toast.error(response.message) ;
  }, [showModalVentaDetail,search,response,value]);


  const handleSearch = (event) => {
    setSearch(refSearch.current.value)
    setResponse({});
  }

  const handleDetail = (venta) => {
    setVenta(venta);
    setShowModalVentaDetail(!showModalVentaDetail);
  }    

  //Esta funcion permite realizar el cambiar el estado de reembolso para eliminar el shoppingCart, la matricula de ser necesario y el pedido
  const handleRefund = async(venta) => {
    setLoading(true)
    try {
      setLoading(true)
      const resultFromApi = await fetch(`${process.env.REACT_APP_API_URL}/Venta/updateVenta/${venta.id}`,{
        method:'PUT',
        credentials : 'include',
        headers:{
          'Content-Type' : 'application/json',
          'Accept' : 'application/json'
        }
      });
      const resultFetch = await resultFromApi.json();

      if (resultFromApi.status !==200 && resultFromApi.status !== 400) {
        throw resultFetch;
      }
      
      resultFetch.isSuccess ? toast.success(resultFetch.message):toast.error(resultFetch.message);
      setLoading(false);

    } catch (error) {
      console.error(error);
      toast.error('Algo ha fallado en nuestro servidor. Inténtelo más tarde');
      setLoading(false);
    }
    //setPublicidad(publicidad);
    //setObjeto(venta);
    //setTipo('venta');
    //setShowModalDelete(!showModalDelete);
    setResponse({});
  }

  const GetFecha = (fecha) => {
    let date = new Date(fecha);
    return date.toLocaleDateString();
  }


  //console.log(new Date().toLocaleDateString());

  return (
    <div>

      <h1 className="text-center font-medium text-xl dark:text-white mb-10">Ventas de Capernova</h1>
      {/*Modal para ingresar los valores de la publicidad */}
      {showModalVentaDetail && <VentaDetails showModalVentaDetail={showModalVentaDetail} setShowModalVentaDetail={setShowModalVentaDetail} venta={venta} setVenta={setVenta} /> }
      {/* {showModalDelete && <ModalDelete showModalDelete={showModalDelete} setShowModalDelete={setShowModalDelete} publicidad={publicidad} setResponse={setResponse}  />} */}
      {/* {showModalDelete && <ModalDelete showModalDelete={showModalDelete} setShowModalDelete={setShowModalDelete} objeto={objeto} setObjeto={setObjeto} setResponse={setResponse} tipo={tipo} setTipo={setTipo} />} */}
      {loading && <Loading />}
      {/* Tabla para la informacion */}
      <section className="">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          {/*Boton para descargar el deocumento excel */}
          <div className="group text-black dark:text-white">
            <DownloadTableExcel filename={`Reporte-Capernova-${new Date().toLocaleDateString()}`} sheet="reporte" currentTableRef={tableRef.current} >
              <button className="bg-green-700 hover:bg-green-600 flex items-center rounded-lg px-3 py-2 ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-table w-5 h-5 me-2.5" viewBox="0 0 16 16">
                  <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 2h-4v3h4zm0 4h-4v3h4zm0 4h-4v3h3a1 1 0 0 0 1-1zm-5 3v-3H6v3zm-5 0v-3H1v2a1 1 0 0 0 1 1zm-4-4h4V8H1zm0-4h4V4H1zm5-3v3h4V4zm4 4H6v3h4z"/>
                </svg>
                Descargar Reporte
              </button>
            </DownloadTableExcel>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">

            <div className="w-full md:w-1/2">
              <Datepicker value={value} onChange={newValue => setValue(newValue)} showShortcuts={true} />
            </div>

            <div className="w-full md:w-1/2">
              <form className="flex items-center" >
                <label htmlFor="simple-search" className="sr-only">Search</label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input onChange={handleSearch} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Buscar por Transacción ID, ID, Correo o Apellido del Cliente" required="" ref={refSearch} />
                </div>
              </form>
            </div>

          {/* <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <button onClick={() => {setShowModal(!showModal);setVenta({});setResponse({})}} type="button" className="flex items-center justify-center text-gray-900 hover:text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-primary-300 rounded-lg text-sm px-4 py-2 focus:outline-none dark:focus:ring-primary-800">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-plus-circle h-4 w-4 mr-2" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                </svg>
                  Añadir 
              </button>
          </div> */}
          </div>
          {/*<!-- Start coding here -->*/}
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
                {ventaList.length > 0 ? (ventaList.map((item) => (
                  <tr key={item.id} className="border-b dark:border-gray-700">
                    <td className="px-4 py-3">{GetFecha(item.emision)}</td>
                    <td className="px-4 py-3">{item.transaccionId}</td>
                    <td className="px-4 py-3">{item.userId}</td>
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3">{item.lastName}</td>
                    <td className="px-4 py-3">{item.email}</td>                      
                    <td className="px-4 py-3">{item.phone}</td>
                    {item.estado === 'Pagado' ? (<td className="px-4 py-3">{item.total}</td>):(<td className="px-4 py-3 text-red-500"><del>{item.total}</del></td>)}
                    
                    <td className="px-4 py-3">{item.estado}</td>
                    <td className="px-4 py-3">
                      <div className="py-1 flex justify-start">                          
                        <button onClick={() => handleDetail(item)} className="flex items-center justify-center py-2 px-4 text-sm text-gray-900 hover:text-white bg-yellow-300 hover:bg-yellow-400 rounded-lg mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-pencil-square h-4 w-4 mr-2" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                          </svg>
                          Ver Detalle 
                        </button>  
                        <button onClick={() => handleRefund(item)} disabled={item.estado === 'Reembolsado'} className={` ${item.estado === 'Pagado' ? 'cursor-pointer':'cursor-not-allowed'} flex items-center justify-center py-2 px-4 text-sm text-gray-900 hover:text-white bg-red-500 hover:bg-red-600 rounded-lg`}>
                          {/* <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-trash3 w-4 h-4 mr-2" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                          </svg> */}
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" viewBox="0 0 193.769 193.769" fill='currentColor'>
                            <g>
                              <g>
                                <g>
                                  <path d="M149.203,41.104l-9.348,12.009c20.15,15.679,30.201,41.063,26.234,66.253c-2.906,18.484-12.838,34.73-27.964,45.748 c-15.131,11.012-33.64,15.488-52.124,12.567c-38.157-6.008-64.32-41.938-58.322-80.098C30.585,79.097,40.52,62.85,55.648,51.835 c13.208-9.615,28.991-14.233,45.086-13.317L87.579,52.319l9.759,9.313l20.766-21.801l0.005,0.008l9.303-9.769l-9.752-9.303 l-0.005,0.003L95.862,0l-9.31,9.769l14.2,13.525c-19.303-0.913-38.21,4.702-54.059,16.242 C28.28,52.943,16.19,72.717,12.65,95.221c-7.302,46.445,24.54,90.184,70.985,97.493c4.489,0.708,8.976,1.055,13.434,1.055 c17.89,0,35.273-5.623,50.011-16.356c18.415-13.409,30.503-33.183,34.043-55.682C185.952,91.077,173.72,60.181,149.203,41.104z" />
                                  <path d="M105.24,151.971v-0.003h0.001v-8.757c10.383-1.159,20.485-7.718,20.485-20.17c0-16.919-15.732-18.859-27.223-20.274 c-7.347-0.878-12.97-1.897-12.97-6.348c0-6.188,8.722-6.855,12.473-6.855c5.567,0,11.507,2.617,13.525,5.957l0.586,0.971 l11.542-5.341l-0.571-1.164c-4.301-8.793-12.009-11.337-17.85-12.364v-7.71H91.723v7.677 c-12.582,1.856-20.054,8.839-20.054,18.829c0,16.29,14.791,17.943,25.582,19.153c9.617,1.134,14.094,3.51,14.094,7.469 c0,7.563-10.474,8.154-13.685,8.154c-7.147,0-14.038-3.566-16.031-8.301l-0.495-1.169l-12.539,5.316l0.5,1.169 c3.713,8.691,11.725,14.137,22.63,15.425v8.336H105.24z"/>
                                </g>
                              </g>
                            </g>
                          </svg>
                          Reembolsar
                        </button>
                        {/* <button onClick={() => handleDelete(item)} className="flex items-center justify-center py-2 px-4 text-sm text-gray-900 hover:text-white bg-red-500 hover:bg-red-600 rounded-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-trash3 w-4 h-4 mr-2" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                          </svg>
                          Eliminar
                        </button> */}
                      </div>
                    </td>
                  </tr>
                ))):(<tr className="border-b dark:border-gray-700" >
                    <td className="font-medium text-xl mb-10 p-5">No se han encontrado regitros...</td>                  
                  </tr>)} 
                </tbody>
                <tfoot>
                        <tr className="font-semibold text-black bg-gray-50 dark:bg-gray-700 dark:text-white">
                            <th></th><th></th><th></th><th></th><th></th><th></th>
                            <th scope="row" className="px-6 py-3 text-base">Total</th>
                            <td className="px-6 py-3">${total}</td>
                            <th></th>
                        </tr>
                    </tfoot>
              </table>
              {/*La tabla que se va a imprimir */}
              <table id="imprimir" ref={tableRef} className="w-full text-sm text-left dark:text-white hidden">
                <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
                  <tr>
                  {columns2.map((column) => (
                    <th key={column} scope="col" className="px-4 py-3">{column}</th>
                  ))}
                  </tr>
                </thead>
                <tbody>
                {ventaList.length > 0 ? (ventaList.map((item) => (
                  <tr key={item.id} className="border-b dark:border-gray-700">
                    <td className="px-4 py-3">{GetFecha(item.emision)}</td>
                    <td className="px-4 py-3">{item.transaccionId}</td>
                    <td className="px-4 py-3">{item.userId}</td>
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3">{item.lastName}</td>
                    <td className="px-4 py-3">{item.email}</td>                      
                    <td className="px-4 py-3">{item.phone}</td>
                    {item.estado === 'Pagado' ? 
                    (<td className="px-4 py-3">{item.total}</td>):
                    (<td className="px-4 py-3 text-red-500"><del>{item.total}</del></td>)}                    
                    <td className="px-4 py-3">{item.estado}</td>
                  </tr>
                ))):(<tr className="border-b dark:border-gray-700" >
                    <td className="font-medium text-xl mb-10 p-5">No se han encontrado regitros...</td>                  
                  </tr>)} 
                </tbody>
                <tfoot>
                        <tr className="font-semibold text-black bg-gray-50 dark:bg-gray-700 dark:text-white">
                            <th></th><th></th><th></th><th></th><th></th><th></th>
                            <th scope="row" className="px-6 py-3 text-base">Total</th>
                            <td className="px-6 py-3">${total}</td>
                            <th></th>
                        </tr>
                    </tfoot>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

/*

<span class="material-symbols-outlined">
currency_exchange
</span>

*/