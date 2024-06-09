import { ShoppingCart,EmptyCart } from "./components"

export const Cart = () => {

  /*Permite listar una serie de items para el carrito de compras */
    const cartList=[
        {id:1, imagen : 'https://i.postimg.cc/wjFMLyF7/fondo5.png' , title: 'Cosmetologia' , price: 180},
        {id:2 ,imagen : 'https://i.postimg.cc/bNcZhjsN/fondo2.jpg' , title: 'Cocina' , price: 90},
        {id:3 ,imagen : 'https://i.postimg.cc/BnJtjcTr/fondo3.jpg' , title: 'Veterinaria' , price: 80},
        {id:4 ,imagen : 'https://i.postimg.cc/hPLf43d8/fondo4.jpg' , title: 'Danza' , price: 100},
        {id:5 ,imagen : 'https://i.postimg.cc/wjFMLyF7/fondo5.png' , title: 'Musica' , price: 130},
    ];

  return (
    <div className="pt-8">
      {/*Permite mostrar el listado del carrito de compras en caso de haber items en el carrito caso contrario nos muestra el EmptyCart */}
        {(cartList.length > 0) ? (<ShoppingCart cartList={cartList} />)
        :
        (<EmptyCart />)}
    </div>
  )
}
