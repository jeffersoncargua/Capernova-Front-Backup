import { useState } from "react";
import { PaymentInfo,PaymentMethod } from "./components";


export const Order = () => {
  const [checkCard, setCheckCard] = useState(false);
    const [checkPaypal, setCheckPayPal] = useState(false);

  return (
    <div className="w-95% flex flex-wrap justify-around mx-auto mb-10 md:my-20">
        {/*Apartado del metodo de pago */}
        <div className="w-full md:w-[50%] flex flex-col items-center md:border-r-2 border-gray-300">
          <PaymentMethod checkCard={checkCard} setCheckCard={setCheckCard} checkPaypal={checkPaypal} setCheckPayPal={setCheckPayPal} />
        </div>
        {/*Apartado para el ingreso del numero de la tarjeta */}
        <div className="w-full md:w-[50%] flex flex-col items-center">
          <PaymentInfo checkCard={checkCard} checkPaypal={checkPaypal}  />
        </div>
    </div>
  )
}

