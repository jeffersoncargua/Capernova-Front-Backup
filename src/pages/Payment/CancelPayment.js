
import { Link } from "react-router-dom";

export const CancelPayment = () => {
  return (
    <div className="flex flex-col mt-[10%] gap-y-4 my-8">
          <h1 className="font-medium text-lg sm:text-2xl text-red-500 text-center">¡Lo sentimos, no se pudo completar tu transacción!</h1>
          <h3 className="font-medium text-sm sm:text-lg text-red-500 text-center">La solicitud de pago no se ha generado.</h3>          
          
          <div className="mx-auto w-full flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-cart-x sm:w-96 sm:h-96 w-full text-red-500" viewBox="0 0 16 16">
              <path d="M7.354 5.646a.5.5 0 1 0-.708.708L7.793 7.5 6.646 8.646a.5.5 0 1 0 .708.708L8.5 8.207l1.146 1.147a.5.5 0 0 0 .708-.708L9.207 7.5l1.147-1.146a.5.5 0 0 0-.708-.708L8.5 6.793z"/>
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
            </svg>
          </div>
          
          <div className="mx-auto flex items-center justify-center">
            <Link to='/' className="inline-flex text-xs sm:text-sm bg-red-500 hover:bg-red-700 px-2.5 py-2 rounded-lg text-white hover:cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-house-fill h-5 w-5 me-2" viewBox="0 0 16 16">
                <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z"/>
                <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z"/>
              </svg>
            Volver a la página principal
            </Link>
          </div>
        </div>
  )
}
