
export const ForgetPassword = () => {
  return (
    <div className="w-[95%] my-8">
        <blockquote className=" w-1/2 mx-auto flex flex-col">
          <h1 className="text-center text-2xl mb-4">Recuperar contraseña</h1>
          <p>Para recuperar tu contraseña sigue las siguientes indicaciones: </p>
          <ol className="mt-2 space-y-1 text-justify list-decimal list-inside">
            <li>Ingresa correctamente tu correo electrónico y presiona el botón <strong>Enviar</strong></li>
            <li>Revisa la bandeja de tu correo electrónico </li>
          </ol>
        </blockquote>
        <div className="flex justify-center my-8">
            <input className="rounded-l-lg focus:border-blue-200 focus:ring-2 focus:ring-blue-200" name="Email" type="text" placeholder="Escribe tu correo electrónico" />
            <button className=" rounded-r-lg bg-blue-600 transition py-2 px-3 duration-300 ease-in-out hover:bg-blue-700 text-white hover:scale-110">Enviar</button>
        </div>
    </div>
  )
}
