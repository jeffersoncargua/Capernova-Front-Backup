import { useState,useRef, useEffect } from "react";
//import { ModalDelete } from "../../Components";
//import { ModalTalento, ModalDeleteTalento } from '../Components';
import { ModalCalificarDeber, ModalCalificarPrueba } from '../Components';
import { toast } from "react-toastify";

export const Estudiantes = ({cursoList}) => {

  const pageSize = 10;
  const [matriculaList, setMatriculaList] = useState([]);
  const [matricula, setMatricula] = useState({});
  const [cursoId,setCursoId] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [currentDataDisplayed, setCurrentDataDisplayed] = useState([]);
  const [previousAllowed, setPreviousAllowed] = useState(false);
  const [nextAllowed, setNextAllowed] = useState(true);
  const [showModalCalificarDeber,setShowModalCalificarDeber] = useState(false);
  const [showModalCalificarPrueba,setShowModalCalificarPrueba] = useState(false);

  const [searchUser,setSearchUser] = useState('');
  
  const [response,setResponse] = useState({});
  //const [showModalTalento,setShowModalTalento] = useState(false);
  //const [showModalDeleteTalento,setShowModalDeleteTalento] = useState(false);
  //const [showModalDelete,setShowModalDelete] = useState(false);
  //const [tipo,setTipo] = useState(''); //es para almacenar el tipo de objeto a eliminar que puede ser curso, capitulo, video, deber, etc
  //const [objeto, setObjeto] = useState({}); //es para almacenar el objeto a eliminar mediante el componente ModalDelete
  
  const columns = ["Nombre", "Apellido" , "Teléfono" , "Curso" ,"Correo","Acciones"];
  const refSearch = useRef();
  const refCurso = useRef();

  useEffect(() => {
    const fetchEstudiantes = async() => {
      const resultFromApi = await fetch(`https://localhost:7164/api/Teacher/getStudents?cursoId=${cursoId || 0}&search=${searchUser}`,{
        method:'GET',
        credentials : 'include',
        headers:{
          'Content-Type' : 'application/json',
          'Accept' : 'application/json'
        }
      });

      const resultFetch = await resultFromApi.json();
      
        setMatriculaList(resultFetch.result);
        //console.log(resultFetch.result);
        setNumberOfPages(Math.ceil(resultFetch.result?.length / pageSize));

        setCurrentDataDisplayed(() => {
        const page = resultFetch?.result?.slice((currentPage - 1) * pageSize, currentPage * pageSize);
        return { list: page }; //List es una lista con la cantidad de items de publicidad que se va a mostrar en la tabla
        });
        setPreviousAllowed(() => currentPage > 1);
        setNextAllowed(() => currentPage < numberOfPages);
      
    }
    fetchEstudiantes();
    response.isSuccess? toast.success(response.message): toast.error(response.message);
    //console.log(response);
  }, [currentPage,numberOfPages,searchUser,response,cursoId]);

  // [currentPage,numberOfPages,showModalTalento,showModalDeleteTalento,searchRole,searchUser,response]);
  

  const handleSearch = () => {
    if (refSearch.current.value.length > 0) {
      setCurrentPage(1);
      setSearchUser(refSearch.current.value);
    }else{
      setSearchUser('');
    }
    setResponse({});
  }

  const handleSelectedCourse = () => {
    //console.log(refCurso.current.value);
    if (refCurso.current.value !== '') {
      setCurrentPage(1);
      setCursoId(refCurso.current.value);
      
    }else{
      setCursoId('');
    }
    setResponse({});
  }

  const handleCalificarDeberes = (matricula) => {
    // setShowTalento(false);
    // setShowProfesor(true);
    setShowModalCalificarDeber(true);
    setMatricula(matricula);
    setResponse({});
  }   

  //handleCalificarPruebas

  const handleCalificarPruebas = (matricula) => {
    setShowModalCalificarPrueba(true);
    setMatricula(matricula);
    setResponse({});
  }   

  // const handleDelete = (talento) => {
  //   //setTalento(talento);
  //   //setShowModalDeleteTalento(!showModalDeleteTalento);
  //   setShowModalDelete(!showModalDelete);
  //   setObjeto(talento);
  //   setTipo('talento');
  //   setResponse({});
  // }

  const handlePagination = (action) => {
    if (action === "prev") {
      if (!previousAllowed) return;
      setCurrentPage((prevState) => (prevState -= 1));
    }
    if (action === "next") {
      if (!nextAllowed) return;
      setCurrentPage((prevState) => (prevState += 1));
    }
  }

  

  return (
    <div className="w-[95%] mx-auto">
        
        {showModalCalificarDeber && <ModalCalificarDeber showModalCalificarDeber={showModalCalificarDeber} setShowModalCalificarDeber={setShowModalCalificarDeber} matricula={matricula}  setResponse={setResponse} />}
        {showModalCalificarPrueba && <ModalCalificarPrueba showModalCalificarPrueba={showModalCalificarPrueba} setShowModalCalificarPrueba={setShowModalCalificarPrueba} matricula={matricula}  setResponse={setResponse} />}
        
        {/* {showModalDeleteTalento && <ModalDeleteTalento showModalDeleteTalento={showModalDeleteTalento} setShowModalDeleteTalento={setShowModalDeleteTalento} talento={talento} setResponse={setResponse} />} */}
        {/* {showModalDelete && <ModalDelete showModalDelete={showModalDelete} setShowModalDelete={setShowModalDelete} objeto={objeto} setObjeto={setObjeto} setResponse={setResponse} tipo={tipo} setTipo={setTipo} />} */}

        <h1 className="text-center font-medium text-xl dark:text-white mb-10">Estudiantes de Capernova</h1>

        {/* Tabla para la informacion */}
        <section className="">
          <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
            {/*<!-- Start coding here -->*/}
            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div className="w-full md:w-1/2">
                  <div>
                    <label htmlFor="curso" className="me-2 mb-2 text-sm font-medium  dark:text-white" >Cursos que dicta:</label>
                    <select onChange={() =>handleSelectedCourse()} id="curso" className=" w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={''} ref={refCurso}>
                        <option value="" >---- Selecciona el curso ----</option>
                        {cursoList && cursoList.map((curso)=>(
                          <option key={curso.id} value={`${curso.id}`}>{curso.titulo}</option>
                        ))}
                        
                    </select>
                  </div>
                  <form className="flex items-center mt-2" >
                    <label htmlFor="simple-search" className="sr-only">Search</label>
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <input onChange={handleSearch} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Busca por el nombre, apellido o correo" required="" ref={refSearch} />
                    </div>
                  </form>
                </div>
                {/* <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                    <button onClick={() => {setEstudiante({});setResponse({})}} type="button" className="flex items-center justify-center text-gray-900 hover:text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-primary-300 rounded-lg text-sm px-4 py-2 focus:outline-none dark:focus:ring-primary-800">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-plus-circle h-4 w-4 mr-2" viewBox="0 0 16 16">
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                      </svg>
                        Añadir
                    </button>
                </div> */}
              </div>
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
                  {currentDataDisplayed.list? (currentDataDisplayed.list.map((matricula) => (
                    <tr key={matricula.id} className="border-b dark:border-gray-700">
                      <td className="px-4 py-3">{matricula.estudiante.name}</td>
                      <td className="px-4 py-3">{matricula.estudiante.lastName}</td>                      
                      <td className="px-4 py-3">{matricula.estudiante.phone}</td>
                      <td className="px-4 py-3">{matricula.curso.titulo}</td>
                      <td className="px-4 py-3">{matricula.estudiante.email}</td>
                      <td className="px-4 py-3">
                        <div className="py-1 flex justify-start">                          
                          <button onClick={() => {handleCalificarDeberes(matricula)}} className="flex items-center justify-center py-2 px-4 text-sm text-gray-900 hover:text-white bg-yellow-300 hover:bg-yellow-400 rounded-lg mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-pencil-square h-4 w-4 mr-2" viewBox="0 0 16 16">
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                              <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                            </svg>
                            Calificar Deberes
                          </button>                             
                          <button onClick={() => {handleCalificarPruebas(matricula)}} className="flex items-center justify-center py-2 px-4 text-sm text-gray-900 hover:text-white bg-green-500 hover:bg-green-600 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-pencil-square h-4 w-4 mr-2" viewBox="0 0 16 16">
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                              <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                            </svg>
                            Calificar Pruebas
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))): (null)}
                    
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
  
        {/* Pagination section */}
        <div className="flex justify-around items-center p-3 sm:p-5">
          <div className="group dark:text-white">
            <p>
              Mostrando{" "}
              <span>{pageSize * (currentPage - 1) + 1}</span>
              {" "}a{" "}
              <span>
                {currentDataDisplayed.list &&
                  currentDataDisplayed.list.length +
                    (currentPage - 1) * pageSize}
              </span>{" "}
              de <span>{matriculaList?.length}</span>{" "}
              resultados
            </p>
          </div>
          <div className="flex justify-between">
            <button onClick={() => handlePagination("prev")} className="flex items-center justify-center bg-gray-400 hover:bg-gray-500 px-4 py-2 mr-2 rounded-lg hover:cursor-pointer" >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-arrow-left-short w-4 h-4 mr-2" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/>
              </svg>
              Anterior
            </button>
            <button onClick={() => handlePagination("next")} className="flex items-center justify-center bg-gray-400 hover:bg-gray-500 px-4 py-2 rounded-lg hover:cursor-pointer" >
              Siguiente
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-arrow-right-short w-4 h-4 ms-2" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"/>
              </svg>
            </button>
          </div>
        </div>

    </div>
  )
}
