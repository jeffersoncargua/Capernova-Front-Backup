
export const ShoppingCard = ({item}) => {
  return (
    <div className="w-[320px] sm:w-full md:w-[70%] mx-auto grid grid-cols-1 sm:grid-cols-3 items-center justify-between border border-gray-500s rounded-lg hover:shadow-md" >
        <img className="w-full md:w-[180px] md:h-[100px] lg:w-[320px] lg:h-[200px] md:rounded-l-lg" src={item.imagen} alt="item" />
        <div className="flex flex-col items-center justify-evenly">
          <h1 translate="no" className="font-medium text-2xl">{item.titulo}</h1>
          <span className="text-red-500 text-3xl text-pink-600 ">${item.precio}</span> 
        </div>
        <div className="flex justify-center">
          <button className="transition duration-300 ease-in-out rounded-lg hover:scale-90 hover:text-white text-black bg-blue-600 hover:bg-red-600 py-2 px-6 mx-8 mb-2">Quitar del Carrito</button>
        </div>
    </div>
  )
}
