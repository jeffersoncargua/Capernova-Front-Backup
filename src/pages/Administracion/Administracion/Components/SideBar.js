import { useState } from "react";

export const SideBar = ({setShowPublicidad,setShowCursos,/*setShowVentas*/setShowVideos,setShowTalento,setShowProfesor,setResponse}) => {

    const [showBar, setShowBar] = useState(false);

  return (
    <div className="relative mt-4">
        <button onClick={()=> setShowBar(!showBar)} data-drawer-target="sidebar-multi-level-sidebar" data-drawer-toggle="sidebar-multi-level-sidebar" aria-controls="sidebar-multi-level-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
         <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
        </button>

        <div id="sidebar-multi-level-sidebar" className={`absolute top-0 left-0 z-40 w-64 h-screen transition-transform ${showBar? '-translate-x-full':''} sm:translate-x-0`} aria-label="Sidebar">

            <button onClick={()=> setShowBar(!showBar)} type="button" data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation" className="text-gray-900 bg-transparent sm:hidden hover:bg-gray-200 hover:text-gray-800 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:text-white" >
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Close menu</span>
            </button>

            <div className="overflow-y-auto overflow-x-hidden bg-gradient-to-r from-indigo-100 to-blue-500 dark:bg-gray-800 rounded-lg border-2 border-zinc-600 shadow-md shadow-zinc-700 dark:shadow-zinc-50">
                
                <ul className="space-y-2 font-medium">
                    <li>
                        <span className="ms-3 whitespace-nowrap w-full text-xl dark:text-white flex items-center p-2 text-gray-900">Administración</span>
                    </li>   
                    <li>
                        <button onClick={()=> {setShowPublicidad(true);setShowCursos(false)/*;setShowVentas(false)*/;setShowVideos(false);setShowTalento(false);setShowProfesor(false);setResponse({})}} className="w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <span className=" ms-3 whitespace-nowrap">Publicidad</span>
                        </button>
                    </li>              
                    <li>
                        <button onClick={()=> {setShowPublicidad(false);setShowCursos(true)/*;setShowVentas(false)*/;setShowVideos(false);setShowTalento(false);setShowProfesor(false);setResponse({})}} className="w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <span className="ms-3 whitespace-nowrap">Cursos</span>
                        </button>
                    </li>
                    <li>
                        <button onClick={()=> {setShowPublicidad(false);setShowCursos(false)/*;setShowVentas(false)*/;setShowVideos(false);setShowTalento(false);setShowProfesor(false);setResponse({})}} className="w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <span className="ms-3 whitespace-nowrap">Ventas</span>
                        </button>
                    </li>
                    <li>
                        <button onClick={()=> {setShowPublicidad(true);setShowCursos(false)/*;setShowVentas(false)*/;setShowVideos(false);setShowTalento(false);setShowProfesor(false);setResponse({})}} className="w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <span className=" ms-3 whitespace-nowrap">Usuarios</span>
                        </button>
                    </li>    
                    <li>
                        <button onClick={()=> {setShowPublicidad(false);setShowCursos(false)/*;setShowVentas(false)*/;setShowVideos(false);setShowTalento(true);setShowProfesor(false);setResponse({})}} className="w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <span className=" ms-3 whitespace-nowrap">Talento Humano</span>
                        </button>
                    </li>             
                    {/*<li>
                        <button className="w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <span className=" ms-3 whitespace-nowrap">Sign out</span>
                        </button>
                    </li>*/}
                </ul>
            </div>
        </div>
    </div>
  )
}
