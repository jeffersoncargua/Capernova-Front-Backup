import {Link, useNavigate} from 'react-router-dom';
import CaperNova from '../assets/Capernova.png';
import { useState } from 'react';

export const Header = () => {

    const navigate = useNavigate();
    const [hidden, setHidden] = useState(true);
    const [showDrop, setShowDrop] = useState(true);

  return (
    <header className='border-b-[1px] border-slate-400 rounded-lg'>

        <div className='mt-[30px] flex justify-center'>
            <Link to="/" className="flex items-center justify-center space-x-3 rtl:space-x-reverse h-[98px] w-[429px]">
                <img src={CaperNova} className="" alt="Capernova Logo" />
            </Link>
        </div>

        <nav className=" bg-white border-gray-200 dark:bg-gray-900">
            
            <div className="max-w-screen-xl flex flex-wrap md:flex-nowrap items-center md:justify-between mx-auto p-4 justify-end">

                <div className="flex md:order-2 ">
                    <button onClick={()=> setHidden(!hidden) } type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1">
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                        <span className="sr-only">Search</span>
                    </button>
                    <div className="relative hidden md:block flex-1 w-80">   
                        <button onClick={()=> navigate('/')}>
                            <div className="absolute inset-y-0 end-2 flex items-center ps-3 ">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                                <span className="sr-only">Search icon</span>   
                            </div> 
                        </button>                     
                        <input type="text" id="search-navbar" className="w-full p-2 ps-2 text-sm text-gray-900 rounded-lg bg-gray-50 hover:border-blue-300 focus:outline-none focus:ring-inset focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar Cursos..." />                        
                    </div>
                    <button onClick={()=> setHidden(!hidden) } data-collapse-toggle="navbar-search" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                </div>

                <div className='items-center font-medium md:order-3 space-x-4 hidden md:flex ml-[10px]'>                    
                    <Link to="register" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 hover:underline md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Register</Link>
                    <Link to="login" className="block p-[10px] px-10 rounded bg-blue-600 hover:bg-blue-700 md:hover:text-gray-50 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Login</Link>
                </div>

                <div className={`${hidden ? 'hidden' :''} items-center justify-between w-full md:flex md:w-auto md:order-1 md:mr-4`} id="navbar-search" >
                    <div className="relative md:hidden">
                        <button onClick={()=> navigate('student')} className=''>
                            <div className="absolute bottom-3 end-2 flex items-end ps-3 ">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                                <span className="sr-only">Search icon</span>   
                            </div> 
                        </button> 
                        <input type="text" id="search-navbar" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar Cursos..." />
                    </div>
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li >
                            <Link to="/" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">Home</Link>
                        </li>
                        <li>
                            <Link to="/" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Nosotros</Link>
                        </li>
                        <li >

                            <button onClick={() => setShowDrop(!showDrop)} id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className="flex items-center justify-between w-full py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent">
                             Cursos 
                                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                            </svg>
                            </button>
                            {/*<!-- Dropdown menu -->*/}
                            <div id="dropdownNavbar" className={`${showDrop ? 'hidden':''} md:absolute z-50 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow md:w-44 dark:bg-gray-700 dark:divide-gray-600`} >
                                <ul className="font-medium rounded-lg py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownLargeButton">
                                    <li >
                                        <Link to='products' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Cosmetología</Link>
                                    </li>
                                    <li >
                                        <Link to='products' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Gastronomía</Link>
                                    </li>
                                    <li >
                                        <Link to='products' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Danza</Link>
                                    </li>
                                    <li >
                                        <Link to='products' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Musica</Link>
                                    </li>
                                </ul>
                            </div>
                            
                        </li>
                        <li className='md:hidden'>
                            <Link to="register" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Registrarse</Link>
                        </li>
                        <li className='md:hidden'>
                            <Link to="login" className=" block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Sign In</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
  )
}
