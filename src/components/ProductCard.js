
export const ProductCard = ({itemProd}) => {
  return (
    <div className=" w-[300px] sm:w-[260px] md:w-[220px] lg:w-[230px] mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <img className="rounded-t-lg" src={itemProd.imagen} alt="lo que sea" />
        <div className="p-5 flex flex-wrap justify-center">
            <h5 className="mb-2 block text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{itemProd.title}</h5>
            <p className="block mb-3 font-normal text-gray-700 dark:text-gray-400">{itemProd.description}</p>
            <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition delay-300 duration-300 hover:scale-90 ease-in-out ">
                Ver Curso
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </button>
        </div>
    </div>
  )
}
