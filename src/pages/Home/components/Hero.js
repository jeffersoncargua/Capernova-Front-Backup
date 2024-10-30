import { useEffect ,useState } from 'react';
//import { useEffect } from 'react';
import { Link } from 'react-router-dom';

//import Fondo from '../../../assets/FondoGotaAzul.png';
import { useNavigate } from 'react-router-dom';
//import Fondo2 from '../../../assets/FondoAmarillo.png';

// Import AOS para el fade
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles




export const Hero = ({video}) => {

    const [current, setCurrent] = useState(0);
    //const [currentPhoto,setCurrentPhoto] = useState({});
    const [changeStyle,setChangeStyle] = useState(false);
    const [slices, setSlices] = useState([]);
    const navigate = useNavigate();


    useEffect(()=>{
        AOS.init({
          offset: 120, // offset (in px) from the original trigger point
          delay: 0, // values from 0 to 3000, with step 50ms
          duration: 2000, // values from 0 to 3000, with step 50ms
          easing: 'ease', // default easing for AOS animations
          once: false, // whether animation should happen only once - while scrolling down
          mirror: false, // whether elements should animate out while scrolling past them
          anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
        });
      },[])

    useEffect(() => {
        
        const fetchPublicidad = async() => {
            try {
                const result = await fetch(`${process.env.REACT_APP_API_URL}/Marketing/publicidadList`,{
                    method:'GET',
                    credentials : 'include',
                    headers:{
                        'Content-Type' : 'application/json',
                        'Accept' : 'application/json'
                    }
                });
                const resultFetch = await result.json();
                
                //console.log(result.status);
                if(result.status !== 200 && result.status !== 400){
                    throw resultFetch;
                }

                //console.log(resultFetch);
                if (resultFetch.isSuccess) {
                    setSlices(resultFetch.result);
                    setCurrent(0);

                }else{
                    setSlices([]);
                }

                
            } catch (error) {
                console.log(error);
                //console.error('Se ha producido un error');
                navigate('error');
            }
        }
        fetchPublicidad();
        
    },[navigate])
        
    /*este useEffect se emplea para hacer el slider o carrusel dinamico y automatico */
    useEffect(()=> {
        const interval = setInterval(() => {
            if(current === slices.length-1){
                setCurrent(0);
                //setCurrentPhoto(slices[0]);
                setChangeStyle(!changeStyle);
            }else{
                setCurrent(current + 1);
                //setCurrentPhoto(slices[current+1]);
                setChangeStyle(!changeStyle);
            }
        }, 7000);
        return () => clearInterval(interval); // Permite limpiar el intervalo para que renderice correctamente luego de ejecutar el useEffect cada 5000 ms
    },[current,slices,changeStyle])

    //console.log(currentPhoto === slices[current]);
    // console.log(slices);

    


    

  return (
    //<div className='w-full flex flex-col md:flex-row bg-gray-900 mb-10 relative'>
    <div className=' relative w-full flex flex-col mb-10 md:shadow-2xl md:shadow-slate-50 md:border-b md:border-slate-50 ' >
        {/* <img className='absolute top-0 left-0 h-full' src={Fondo} alt="fondo" /> */}

        <div className='flex-1 ' data-aos="fade-up">
            <video className='flex object-cover w-full h-auto md:h-[30rem]'  autoPlay loop muted controls={false} disablePictureInPicture={true} preload='auto' >
                <source src={video} type='video/mp4' />
            </video>
            {/* <div className='shrink-0'>
                
            </div> */} 
 

        </div>


        <div className='w-full flex bg-gradient-to-r from-blue-500/[0.8] from-20% via-sky-50/[0.8] via-40% to-cyan-200/[0.8] to-60%' data-aos="fade-up" >
            <div className='w-[90%] mx-auto group text-black dark:text-white space-y-6 my-[2.5%] flex flex-col italic ' >
                <h1 className='font-semibold text-center text-xl md:text-2xl'>Bienvenidos a la página oficial de Capernova</h1>
                <p className='text-sm md:text-lg text-center'>En este sitio encontrarás todo lo que tu necesitas para tu ampliar tus concocimientos, así como, adquirir productos para tu emprendimiento. </p>
                <p className='text-sm md:text-lg text-center'>Contamos con cursos y productos que te ayudarán a expandir tus ideas y alcanzar tus sueños.</p>
                <p className='text-sm md:text-lg text-center'>Recuerda que tu potencial es infinito, atrévete a explorarlo junto a nosotros.</p>
                <Link to={'/register'} className='text-sm md:text-lg px-3 py-2.5 self-center rounded-lg bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500'>Registrarse</Link>
            </div>
        </div>

        <div className='w-full flex flex-col md:flex-row bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500'>
            <div className='w-full order-2 md:order-1 md:w-1/2 overflow-x-hidden relative z-20 ' data-aos="fade-up" >
                
                <div className='flex transition ease-in-out duration-1000 z-40' style={{transform: `translateX(-${current * 100}%)`}} >
                    {slices.map((s,index) => (
                        <div className='shrink-0 w-full' key={s.id}>
                            <div className='' > 
                                <h1 className={`relative my-[5%] md:mt-[30%] font-extrabold text-3xl md:text-5xl text-center ${current===index ? 'animate-in zoom-in-50 duration-4000 ':''}`} >{s.titulo}</h1>
                            </div>
                            
                        </div> 
                    ))} 
                </div>          
            </div>
            
            <div className='bg-slate-50 overflow-x-hidden w-full order-1 md:order-2 md:w-1/2 z-10 md:shadow-2xl md:shadow-slate-50 md:border-slate-50' data-aos="fade-up" >
                <div className='flex transition ease-in-out duration-1000 ' style={{transform: `translateX(-${current * 100}%)`}} >
                    {slices.map((s,index) => (
                        <div className='shrink-0 w-full ' key={index}>
                            <img src={s.imageUrl} alt='slice' className={`opacity-100 ${current===index ? 'animate-in zoom-in-90 duration-4000 ':'animate-out zoom-out duration-1000 '} `} />
                        </div> 
                    ))}
                </div>
            </div>
        </div>      

    </div>    
  )
}

/*
<div className='bg-gradient-to-r from-green-400 to-blue-500 my-10 rounded-lg dark:bg-gray-900'>
    <div className='mx-auto w-full md:w-[60%] overflow-hidden relative rounded-lg'>
        <div className='flex transition ease-in-out duration-1000' style={{transform: `translateX(-${current * 100}%)`}} >
            {slices.map((s,index) => (
                <div className='shrink-0 w-full' key={index}>
                    <figure className="relative">                        
                        <img src={s.imagen} alt='slice' className='opacity-75' />
                        <figcaption className="absolute text-center text-lg text-black bottom-6">
                            <h3 className='font-semibold text-lg text-center'>{s.title}</h3>
                            <p className='text-sm text-justify' >{s.description}</p>
                        </figcaption>
                    </figure>
                </div> 
            ))}
        </div>
    </div>
</div> 
*/


/*

<div className='w-full flex flex-col md:flex-row mb-10 relative '>
        {/* <img className='absolute top-0 left-0 h-full' src={Fondo} alt="fondo" /> 
        <div className='w-full order-2 md:order-1 md:w-1/2 overflow-x-hidden relative z-20 bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500' >
            {/*<div className='z-30' >
                <img className='absolute top-0 left-0 h-full'  src={Fondo2} alt="fondo2" />
            </div>
            <div className='flex transition ease-in-out duration-1000 z-40' style={{transform: `translateX(-${current * 100}%)`}} >
                {slices.map((s,index) => (
                    <div className='shrink-0 w-full' key={s.id}>
                        <div className='' > 
                            <h1 className={`relative my-[5%] md:mt-[30%] font-extrabold text-5xl text-center ${current===index ? 'animate-in zoom-in-50 duration-4000 ':''}`} >{s.titulo}</h1>
                            {/*<p className='text-xl text-slate-50 text-center' >{s.description}</p>
                        </div>
                        
                    </div> 
                ))} 
            </div>          
        </div>
        
        <div className='bg-slate-50 overflow-x-hidden w-full order-1 md:order-2 md:w-1/2 z-10 md:rounded-l-[100px] md:shadow-2xl md:shadow-slate-50 md:border-l-[16px] md:border-slate-50'  >
            <div className='flex transition ease-in-out duration-1000 ' style={{transform: `translateX(-${current * 100}%)`}} >
                {slices.map((s,index) => (
                    <div className='shrink-0 w-full ' key={index}>
                        <img src={s.imageUrl} alt='slice' className={`opacity-100 ${current===index ? 'animate-in zoom-in-90 duration-4000 ':'animate-out zoom-out duration-1000 '} `} />
                    </div> 
                ))}
            </div>
        </div>
    </div>
*/

/*

<div className='w-full order-2 md:order-1 md:w-1/2 overflow-x-hidden relative z-20 ' >
            {/*<div className='z-30' >
                <img className='absolute top-0 left-0 h-full'  src={Fondo2} alt="fondo2" />
            </div>
            <div className='w-[90%] mx-auto group text-black dark:text-white space-y-6 my-[10%] flex flex-col italic '>
                <h1 className='font-semibold text-center text-xl md:text-2xl'>Bienvenidos a la página oficial de Capernova</h1>
                <p className='text-sm md:text-lg text-justify'>En este sitio encontrarás todo lo que tu necesitas para tu ampliar tus concocimientos, así como, adquirir productos para tu emprendimiento. </p>
                <p className='text-sm md:text-lg text-justify'>Contamos con cursos y productos que te ayudarán a expandir tus ideas y alcanzar tus sueños.</p>
                <p className='text-sm md:text-lg text-justify'>Recuerda que tu potencial es infinito, atrévete a explorarlo junto a nosotros.</p>
                <Link to={'/register'} className='px-3 py-2.5 self-center rounded-lg bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500'>Registrarse</Link>
            </div>
            {/* <div className='flex transition ease-in-out duration-1000 z-40' style={{transform: `translateX(-${current * 100}%)`}} >
                {slices.map((s,index) => (
                    <div className='shrink-0 w-full' key={s.id}>
                        <div className='' > 
                            <h1 className={`relative my-[5%] md:mt-[10%] font-extrabold text-5xl text-center dark:text-white ${current===index ? 'animate-in zoom-in-50 duration-4000 ':''}`} >{s.titulo}</h1>
                            {/*<p className='text-xl text-slate-50 text-center' >{s.description}</p>
                        </div>
                        
                    </div> 
                ))} 
            </div>
        </div>
        
        {/*<div className='overflow-x-hidden w-full order-1 md:order-2 md:w-1/2 z-10 '  >
            <div className='flex transition ease-in-out duration-1000 ' style={{transform: `translateX(-${current * 100}%)`}} >
                {slices.map((s,index) => (
                    <div className='shrink-0 w-full ' key={index}>
                        <img src={s.imageUrl} alt='slice' className={`opacity-100 ${current===index ? 'animate-in zoom-in-90 duration-4000 ':'animate-out zoom-out duration-1000 '} `} />
                    </div> 
                ))}
            </div>
        </div>


*/