import { PaymentInfo,PaymentMethod } from "./components"


export const Order = () => {
  return (
    <div className="w-95% flex flex-wrap justify-around mx-auto my-20">
        {/*Apartado del metodo de pago */}
        <div className="w-full sm:w-[50%] flex flex-col items-center border-r-2 border-gray-300">
          <PaymentMethod />
        </div>
        {/*Apartado para el ingreso del numero de la tarjeta */}
        <div className="w-full sm:w-[50%] flex flex-col items-center">
          <PaymentInfo />
        </div>
    </div>
  )
}
