import { useEffect, useState } from "react";


export const Usuarios = () => {

  const pageSize = 10;
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [currentDataDisplayed, setCurrentDataDisplayed] = useState([]);
  const [previousAllowed, setPreviousAllowed] = useState(false);
  const [nextAllowed, setNextAllowed] = useState(true);
  const columns = ["Nombre", "Apellido", "Correo", "Celular", "Cuidad", "Rol", "Editar/Eliminar"];

  useEffect(() => {
    fetchUsuarios();
  }, []);

  useEffect(() => {
    users &&
      setCurrentDataDisplayed(() => {
        const page = users?.result?.slice((currentPage - 1) * pageSize, currentPage * pageSize);
        return { users: page };
      });
    setPreviousAllowed(() => currentPage > 1);
    setNextAllowed(() => currentPage < numberOfPages);
  }, [currentPage,users,numberOfPages]);

  function fetchUsuarios() {
    fetch('',{
      method:'GET',
      credentials : 'include',
      headers:{
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      }

    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setNumberOfPages(Math.ceil(data.result.length / pageSize));
      });
  }

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
    <div>
      {/* Tabla para la informacion */}
      <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          {/*<!-- Start coding here -->*/}
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2">
                <form className="flex items-center">
                  <label htmlFor="simple-search" className="sr-only">Search</label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" required="" />
                  </div>
                </form>
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                  <button type="button" className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                      <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                      </svg>
                      Add product
                  </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                  {columns.map((column) => (
                    <th key={column} scope="col" className="px-4 py-3">{column}</th>
                  ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b dark:border-gray-700">
                    <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Apple iMac 27&#34;</th>
                    <td className="px-4 py-3">PC</td>
                    <td className="px-4 py-3">Apple</td>
                    <td className="px-4 py-3">300</td>
                    <td className="px-4 py-3">$2999</td>
                    <td className="px-4 py-3 flex items-center justify-end">
                      <button id="apple-imac-27-dropdown-button" data-dropdown-toggle="apple-imac-27-dropdown" className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" type="button">
                          <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                          </svg>
                      </button>
                      <div id="apple-imac-27-dropdown" className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                          
                        <div className="py-1">                          
                          <button className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Editar</button>                              
                          <button className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Eliminar</button>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Pagination section */}
      <div>
        <div>
          <p>
            Showing{" "}
            <span>{pageSize * (currentPage - 1)}</span>{" "}
            to{" "}
            <span>
              {currentDataDisplayed &&
                currentDataDisplayed.products.length +
                  (currentPage - 1) * pageSize}
            </span>{" "}
            of <span>{users?.result.length}</span>{" "}
            results
          </p>
        </div>
        <div>
          <button
            onClick={() => handlePagination("prev")}
          >
            Previous
          </button>
          <button
            onClick={() => handlePagination("next")}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}


/*


  
  
  export const TableWithPaginationComponent = () => {
    
    
    
   ;
    return (
      <div>
        <table>
          <thead>
            <tr>
              
            </tr>
          </thead>
          <tbody>
            {currentDataDisplayed
              ? currentDataDisplayed.products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.title}</td>
                    <td>{product.price}</td>
                    <td>{product.rating}</td>
                    <td>{product.brand}</td>
                    <td>{product.category}</td>
                    <td>{product.stock}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
        
      </div>
    );
  };

*/