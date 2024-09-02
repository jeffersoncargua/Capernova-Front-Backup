import { useSelector } from "react-redux";
import { ShoppingCart,EmptyCart } from "./components"

export const Cart = () => {

  const cartList = useSelector(state => state.cartState.cartList);
  const total = useSelector(state => state.cartState.total);
  console.log(cartList);
  console.log(total);

  return (
    <div className="pt-8">
      
      {/*Permite mostrar el listado del carrito de compras en caso de haber items en el carrito caso contrario nos muestra el EmptyCart */}
        {(cartList.length > 0) ? (<ShoppingCart cartList={cartList} total={total} />)
        :
        (<EmptyCart />)}
    </div>
  )
}
