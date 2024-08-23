import { useEffect, useState } from "react"

export const Feedback = () => {

    const [feedback, setFeedback] = useState(0);

    const users = [
        {nombre: 'Bonnie Green', comentario:'If you care for your time, I hands down would go with this."',avatar: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png',job:'Developer at Open AI'},
        {nombre: 'Bonnie Green', comentario:'If you care for your time, I hands down would go with this."',avatar: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png',job:'Developer at Front-End'},
        {nombre: 'Bonnie Green', comentario:'If you care for your time, I hands down would go with this."',avatar: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png',job:'Developer at Back-End'},
        {nombre: 'Bonnie Green', comentario:'If you care for your time, I hands down would go with this."',avatar: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png',job:'Developer at Api`s'},
    ]


    /* */
    useEffect(()=>{
        const interval = setInterval(() => {
            if(feedback === users.length -1){
                setFeedback(0);
            }else{
                setFeedback(feedback + 1);
            }
        }, 5000);
        return () => clearInterval(interval); // Permite limpiar el intervalo para que renderice correctamente luego de ejecutar el useEffect cada 5000 ms
    },[feedback,users.length])
    
  return (
    
        <div className="w-[95%] flex flex-col my-[50px] mx-auto dark:bg-gray-900">

            {/* <h1 className="self-center text-5xl font-extrabold before:block before:absolute before:-inset-1 before:-skew-y-[1.7deg] before:bg-black dark:before:bg-slate-50 relative my-1" ><span className="before:block before:absolute before:-inset-1 before:skew-y-[1.7deg] before:bg-amber-300"><span className=" text-white relative ">Nuestros</span></span></h1>
            <h1 className="self-center text-5xl font-extrabold before:block before:absolute before:-inset-1 before:-skew-y-[1.7deg] before:bg-black dark:before:bg-slate-50 relative my-1" ><span className="before:block before:absolute before:-inset-1 before:skew-y-[1.7deg] before:bg-amber-300"><span className=" text-white relative ">Estudiantes</span></span></h1> */}
            <h1 className="self-center text-3xl font-medium text-center mt-10 dark:text-white">
                <span>
                    Nuestros Estudiantes
                    <hr className="mx-auto w-[150px] border border-blue-400 drop-shadow-md" />
                </span>
            </h1>

            <div className="overflow-hidden w-full dark:border-gray-700 md:mb-12 bg-white dark:bg-gray-800 my-8">
                {/*Para pantalla grande */}
                <div className="md:flex hidden bg-white w-[98%] transition ease-in-out duration-400 gap-x-2 dark:bg-gray-900" style={{transform: `translateX(-${feedback * 50}%)`}}>
                    {users.map((user,index) => (
                        <figure key={index} className="flex-none flex flex-col items-center justify-center border border-gray-200 rounded-lg shadow-sm p-8 text-center bg-white dark:bg-gray-800  w-full md:w-1/2">
                            <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Very easy this was to integrate</h3>
                                <p className="my-4">{user.comentario}</p>
                            </blockquote>
                            <figcaption className="flex items-center justify-center ">
                                <img className="rounded-full w-9 h-9" src={user.avatar} alt="profilepicture" />
                                <div className="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                                    <div>{user.nombre}</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 ">{user.job}</div>
                                </div>
                            </figcaption>    
                        </figure>
                    ))}
                </div>

                {/*Para pantalla pequeña */}
                <div className="flex md:hidden bg-white w-[98%] transition ease-in-out duration-400 md:gap-x-2" style={{transform: `translateX(-${feedback * 100}%)`}}>
                    {users.map((user,index) => (
                        <figure key={index} className="flex-none flex flex-col items-center justify-center border border-gray-200 rounded-lg shadow-sm p-8 text-center bg-white dark:bg-gray-800  w-full md:w-1/2">
                            <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Very easy this was to integrate</h3>
                                <p className="my-4">{user.comentario}</p>
                            </blockquote>
                            <figcaption className="flex items-center justify-center">
                                <img className="rounded-full w-9 h-9" src={user.avatar} alt="profilepicture" />
                                <div className="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                                    <div>{user.nombre}</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 ">{user.job}</div>
                                </div>
                            </figcaption>    
                        </figure>
                    ))}
                </div>
            </div>
        
        </div>
  )
}
