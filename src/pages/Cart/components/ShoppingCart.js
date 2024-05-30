import { useEffect, useState } from "react"
import { ShoppingCard } from "../components"

export const ShoppingCart = ({cartList}) => {


  const [total,setTotal] = useState(0);
  

  /*Permite realizar la suma del total de los articulos del carrito de compras cada vez que se quiera revisar cuanto se debe pagar */
  useEffect(()=>{
    let totalRef = 0;
    /*Este forEach permite realizar la suma de los precios de cada item en el carrito de compras */
    cartList.forEach(element => {
      totalRef += element.price;
    });
    
    setTotal(totalRef);
    
  },[cartList])

  return (
    <div className='w-[95%] mx-auto flex flex-col gap-y-8'>
      <h1 className="font-bold text-3xl text-center">Items: {cartList.length} </h1>
      {cartList.map((item) => (
          <ShoppingCard key={item.id} item={item} />
      ))}
      <div className="grid justify-items-end justify-end items-center my-8 mr-8">
        <div className="flex items-center">
          <h1 className="text-3xl">Total a pagar: &nbsp; </h1>
          <span className="text-3xl text-pink-600">${total}</span>
        </div>
        <div className="mt-8">
          <button className="block bg-blue-600 rounded-lg transition duration-300 hover:text-white hover:bg-green-600 hover:scale-110 py-2 px-3 ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5 bi bi-cart-check inline-block mr-2" viewBox="0 0 16 16">
              <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z"/>
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
            </svg>
            Realizar Compra
          </button>
        </div>          
      </div>
    </div>
  )
}
