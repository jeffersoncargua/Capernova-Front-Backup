//import { Link } from "react-router-dom";
import { useState } from "react";
import { ProductCard } from "./ProductCard";

//import Fondo1 from '../assets/fondo1.jpg';
import Fondo2 from '../assets/fondo2.jpg';
import Fondo3 from '../assets/fondo3.jpg';
import Fondo4 from '../assets/fondo4.jpg';
import Fondo5 from '../assets/fondo5.png';

export const Products = () => {
  const [current, setCurrent] = useState(0);

  const slices = [
    {imagen : Fondo5 , title: 'Titulo 1' , description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, sint!'},
    {imagen : Fondo3 , title: 'Titulo 2' , description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae eum perferendis quasi maiores tenetur totam!'},
    {imagen : Fondo2 , title: 'Titulo 3' , description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum sunt quis iure blanditiis autem consequatur illo dicta perspiciatis doloribus officia.'},
    {imagen : Fondo3 , title: 'Titulo 4' , description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt animi velit incidunt, vel facere placeat repudiandae. Recusandae omnis sint officia autem numquam assumenda sit odio?'},
    {imagen : Fondo4 , title: 'Titulo 5' , description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, dolor sequi officiis illum distinctio in eos voluptatum omnis qui cumque molestiae tempore ex eligendi ipsam ad aut minus! Sequi, molestiae!'},
    {imagen : Fondo5 , title: 'Titulo 6' , description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, sint!'},
    {imagen : Fondo3 , title: 'Titulo 7' , description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae eum perferendis quasi maiores tenetur totam!'},
    {imagen : Fondo2 , title: 'Titulo 8' , description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum sunt quis iure blanditiis autem consequatur illo dicta perspiciatis doloribus officia.'},
    {imagen : Fondo3 , title: 'Titulo 9' , description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt animi velit incidunt, vel facere placeat repudiandae. Recusandae omnis sint officia autem numquam assumenda sit odio?'},
    {imagen : Fondo4 , title: 'Titulo 10' , description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, dolor sequi officiis illum distinctio in eos voluptatum omnis qui cumque molestiae tempore ex eligendi ipsam ad aut minus! Sequi, molestiae!'},
    {imagen : Fondo5 , title: 'Titulo 11' , description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, sint!'},
    {imagen : Fondo3 , title: 'Titulo 12' , description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae eum perferendis quasi maiores tenetur totam!'},
    {imagen : Fondo2 , title: 'Titulo 13' , description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum sunt quis iure blanditiis autem consequatur illo dicta perspiciatis doloribus officia.'},
    {imagen : Fondo3 , title: 'Titulo 14' , description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt animi velit incidunt, vel facere placeat repudiandae. Recusandae omnis sint officia autem numquam assumenda sit odio?'},
    {imagen : Fondo4 , title: 'Titulo 15' , description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, dolor sequi officiis illum distinctio in eos voluptatum omnis qui cumque molestiae tempore ex eligendi ipsam ad aut minus! Sequi, molestiae!'}
  ]

    let previousSlice = () => {
        if(current === 0){
            setCurrent(slices.length - 1);
        }else{
            setCurrent(current - 1);
        }
        console.log(current);
    }

    let nextSlice = () => {
        if(current === slices.length-1){
            setCurrent(0);
        }else{
            setCurrent(current + 1);
        }
        console.log(current);
    }

  

  return (
    <div className="relative flex flex-col w-[95%] mx-auto">

      <h1 className="self-center text-5xl font-extrabold before:block before:absolute before:-inset-1 before:bg-cyan-400 relative my-8" ><span className=" text-white relative ">Nuestros Cursos</span></h1>        

      <div className='w-full overflow-hidden static rounded-lg'>
        {/* permite transformar el desplazamiento en x en pantalla completa  style={{transform: `translateX(-${current/3 * 100}%)`}} */}
          <div className={`md:flex transition ease-in-out duration-40 mx-auto hidden`} style={{transform: `translateX(-${current/3 * 100}%)`}} >
              {slices.map((itemProd,index) => (
                  <div className= 'shrink-0 w-full md:w-1/3 ' key={index}>
                    {/*ProductCard */}
                      <ProductCard itemProd={itemProd} />
                  </div> 
              ))}
          </div>

          {/* permite transformar el desplazamiento en x en pantalla pequeña  style={{transform: `translateX(-${current/3 * 100}%)`}} */}
          <div className={`flex transition md:hidden ease-in-out duration-40 mx-auto`} style={{transform: `translateX(-${current* 100}%)`}} >
              {slices.map((itemProd,index) => (
                  <div className= 'shrink-0 w-full md:w-1/3' key={index}>
                    {/*ProductCard */}
                      <ProductCard itemProd={itemProd} />
                  </div> 
              ))}
          </div>

          {/*Slider buttons */}
          <div className="absolute top-0 h-full w-full justify-between flex items-center text-black text-3xl">
              {/*boton para pasar al item item */}
              <span onClick={()=> previousSlice()} className="cursor-pointer">
                <i className="bi bi-arrow-left-circle-fill"></i>
              </span>
              {/*boton para pasar al proximo item */}
              <span onClick={()=> nextSlice()} className="cursor-pointer">
                <i className="bi bi-arrow-right-circle-fill"></i>
              </span>
          </div>


      </div>
    </div>
  )
}

/*
<figure className="relative">                        
    <img  src={s.imagen} alt='slice' className='opacity-75' />
    <figcaption className="absolute mx-5 text-lg text-black bottom-6">
        <h3 className='font-semibold text-lg text-center'>{s.title}</h3>
        <p className='text-sm text-justify' >{s.description}</p>
    </figcaption>
</figure>
 */