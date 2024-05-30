
export const Beneficios = () => {
  return (
    <div className="w-[95%] mx-auto">
        <h1 className=" text-3xl font-medium text-center my-10">
            <span>
                Beneficios
                <hr className="mx-auto w-[100px] border border-blue-400 drop-shadow-md" />
            </span>
        </h1>
        
        <div className="flex flex-wrap">
            <div className="w-1/2 md:w-1/4 my-3">
                <div className="w-[80%] mx-auto border border-gray-300 rounded-lg flex flex-col items-center justify-center py-3 gap-y-3 bg-gradient-to-r from-cyan-300 to-blue-400">
                    <h4 className="font-medium text-2xs ">Disponibilidad 24/7</h4>
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-clock-history text-slate-600 " viewBox="0 0 16 16">
                        <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z"/>
                        <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z"/>
                        <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5"/>
                    </svg>
                </div>
            </div>
            <div className="w-1/2 md:w-1/4 my-3">
                <div className="w-[80%] mx-auto border border-gray-300 rounded-lg flex flex-col items-center justify-center py-3 gap-y-3 bg-gradient-to-r from-cyan-300 to-blue-400">
                    <h4 className="font-medium text-2xs ">Multiplataforma</h4>
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-phone-fill text-slate-600 " viewBox="0 0 16 16">
                            <path d="M3 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zm6 11a1 1 0 1 0-2 0 1 1 0 0 0 2 0"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-laptop-fill text-slate-600 " viewBox="0 0 16 16">
                        <path d="M2.5 2A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-tablet-fill text-slate-600" viewBox="0 0 16 16">
                            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm7 11a1 1 0 1 0-2 0 1 1 0 0 0 2 0"/>
                        </svg>
                    </div>
                </div>
            </div>
            <div className="w-1/2 md:w-1/4 my-3">
                <div className="w-[80%] mx-auto border border-gray-300 rounded-lg flex flex-col items-center justify-center py-3 gap-y-3 bg-gradient-to-r from-cyan-300 to-blue-400">
                    <h4 className="font-medium text-2xs ">Personal capacitado</h4>
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-person-fill-check text-slate-600" viewBox="0 0 16 16">
                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                        <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
                    </svg>
                </div>
            </div>
            <div className="w-1/2 md:w-1/4 my-3">
                <div className="w-[80%] mx-auto border border-gray-300 rounded-lg flex flex-col items-center justify-center py-3 gap-y-3 bg-gradient-to-r from-cyan-300 to-blue-400">
                    <h4 className="font-medium text-2xs ">Certificado</h4>
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-mortarboard-fill text-slate-600" viewBox="0 0 16 16">
                      <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917z"/>
                      <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466z"/>
                    </svg>
                </div>
            </div>
        </div>

        <h1 className=" text-3xl font-medium text-center my-10">
            <span>
                Nuestros Cursos
                <hr className="mx-auto w-[100px] border border-blue-400 drop-shadow-md" />
            </span>
        </h1>
        
    </div>
  )
}
