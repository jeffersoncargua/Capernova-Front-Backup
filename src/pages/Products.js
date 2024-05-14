import { SearchFilter, ProductCard } from "../components";

import Fondo2 from '../assets/fondo2.jpg';
import Fondo3 from '../assets/fondo3.jpg';
import Fondo4 from '../assets/fondo4.jpg';
import Fondo5 from '../assets/fondo5.png';


export const Products = () => {

  const slices = [
    {imagen : Fondo5 , title: 'Titulo 1' , description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, sint!'},
    {imagen : Fondo3 , title: 'Titulo 2' , description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae eum perferendis quasi maiores tenetur totam!'},
    {imagen : Fondo2 , title: 'Titulo 3' , description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum sunt quis iure blanditiis autem consequatur illo dicta perspiciatis doloribus officia.'},
    {imagen : Fondo3 , title: 'Titulo 4' , description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt animi velit incidunt, vel facere placeat repudiandae. Recusandae omnis sint officia autem numquam assumenda sit odio?'},
    {imagen : Fondo4 , title: 'Titulo 5' , description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, dolor sequi officiis illum distinctio in eos voluptatum omnis qui cumque molestiae tempore ex eligendi ipsam ad aut minus! Sequi, molestiae!'},
    {imagen : Fondo5 , title: 'Titulo 1' , description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, sint!'},
    {imagen : Fondo3 , title: 'Titulo 2' , description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae eum perferendis quasi maiores tenetur totam!'},
    {imagen : Fondo2 , title: 'Titulo 3' , description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum sunt quis iure blanditiis autem consequatur illo dicta perspiciatis doloribus officia.'},
    {imagen : Fondo3 , title: 'Titulo 4' , description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt animi velit incidunt, vel facere placeat repudiandae. Recusandae omnis sint officia autem numquam assumenda sit odio?'},
    {imagen : Fondo4 , title: 'Titulo 5' , description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, dolor sequi officiis illum distinctio in eos voluptatum omnis qui cumque molestiae tempore ex eligendi ipsam ad aut minus! Sequi, molestiae!'},
    {imagen : Fondo5 , title: 'Titulo 1' , description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, sint!'},
    {imagen : Fondo3 , title: 'Titulo 2' , description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae eum perferendis quasi maiores tenetur totam!'},
    {imagen : Fondo2 , title: 'Titulo 3' , description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum sunt quis iure blanditiis autem consequatur illo dicta perspiciatis doloribus officia.'},
    {imagen : Fondo3 , title: 'Titulo 4' , description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt animi velit incidunt, vel facere placeat repudiandae. Recusandae omnis sint officia autem numquam assumenda sit odio?'},
    {imagen : Fondo4 , title: 'Titulo 5' , description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, dolor sequi officiis illum distinctio in eos voluptatum omnis qui cumque molestiae tempore ex eligendi ipsam ad aut minus! Sequi, molestiae!'}
    
  ]
  return (
    <div className="flex mt-4">
      <SearchFilter />

      <div className="w-[75%] flex flex-wrap md:justify-center">

        <div className='w-full'>
          <div className="relative md:hidden block mb-6 flex-1 w-[95%]">                        
              <div className="absolute inset-y-0 end-2 flex items-center ps-3 ">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
                  <span className="sr-only">Search icon</span>   
              </div> 
              <input type="text" id="search-navbar" className="w-full p-2 ps-2 text-sm text-gray-900 rounded-lg bg-gray-50 hover:border-blue-300 focus:outline-none focus:ring-inset focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar Cursos..." />                        
          </div>
        </div>

        
          {slices.map((itemProd,index) => (
              <div className= 'w-[95%] md:max-w-xs mb-8 md:mx-auto' key={index}>
                {/*ProductCard */}
                  <ProductCard itemProd={itemProd} />
              </div> 
          ))}
      </div>

    </div>
  )
}
