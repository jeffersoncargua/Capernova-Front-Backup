import { useState } from "react";
//import { Link } from "react-router-dom";
import Logo from '../assets/CapernovaWS.png'

export const WhatsappComponent = () => {

    const [isActive, setIsActive] = useState(false);
    const [hidden,setHidden] = useState(true);

  return (
    <div data-dial-init className="fixed start-10 bottom-10 group z-50 group text-black dark:text-white">
        <div id="speed-dial-menu-hover" className={`flex flex-col items-center ${hidden ? 'hidden':''} mb-4 space-y-2`}>
            <div className="flex flex-col items-center justify-center max-w-xs p-6 bg-green-400 border border-green-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">           
                <div className="w-14 h-14 rounded-full flex justify-center items-center bg-black dark:bg-white ">
                    {/* <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-wechat w-10 h-10 text-white dark:text-gray-400" viewBox="0 0 16 16">
                        <path d="M11.176 14.429c-2.665 0-4.826-1.8-4.826-4.018 0-2.22 2.159-4.02 4.824-4.02S16 8.191 16 10.411c0 1.21-.65 2.301-1.666 3.036a.32.32 0 0 0-.12.366l.218.81a.6.6 0 0 1 .029.117.166.166 0 0 1-.162.162.2.2 0 0 1-.092-.03l-1.057-.61a.5.5 0 0 0-.256-.074.5.5 0 0 0-.142.021 5.7 5.7 0 0 1-1.576.22M9.064 9.542a.647.647 0 1 0 .557-1 .645.645 0 0 0-.646.647.6.6 0 0 0 .09.353Zm3.232.001a.646.646 0 1 0 .546-1 .645.645 0 0 0-.644.644.63.63 0 0 0 .098.356"/>
                        <path d="M0 6.826c0 1.455.781 2.765 2.001 3.656a.385.385 0 0 1 .143.439l-.161.6-.1.373a.5.5 0 0 0-.032.14.19.19 0 0 0 .193.193q.06 0 .111-.029l1.268-.733a.6.6 0 0 1 .308-.088q.088 0 .171.025a6.8 6.8 0 0 0 1.625.26 4.5 4.5 0 0 1-.177-1.251c0-2.936 2.785-5.02 5.824-5.02l.15.002C10.587 3.429 8.392 2 5.796 2 2.596 2 0 4.16 0 6.826m4.632-1.555a.77.77 0 1 1-1.54 0 .77.77 0 0 1 1.54 0m3.875 0a.77.77 0 1 1-1.54 0 .77.77 0 0 1 1.54 0"/>
                    </svg>    */}
                    <img src={Logo} className=" w-10 h-10" alt="Capernova" />
                </div>
                <div>
                    <p className="mb-3 font-normal text-justify">Si necesitas ayuda o tienes alguna inquietud, envíanos un mensaje a nuestro whatsapp:</p>
                    <a href={`https://api.whatsapp.com/send?phone=${process.env.REACT_APP_WHATSAPP}`} target="blank" className="inline-flex font-medium items-center text-blue-700 hover:underline hover:text-white">
                        Escríbenos a nuestro chat                       
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-whatsapp w-5 h-5 ms-2.5" viewBox="0 0 16 16">
                            <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
        {isActive ? 
        (<button onClick={() => {setIsActive(!isActive);setHidden(!hidden)}} type="button" data-dial-toggle="speed-dial-menu-hover" data-dial-trigger="hover" aria-controls="speed-dial-menu-hover" aria-expanded="false" className="flex items-center justify-center text-white bg-green-400 rounded-full w-14 h-14 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
            <svg className="w-5 h-5 transition-transform group-hover:rotate-[60deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
            </svg>
            <span className="sr-only">Open actions menu</span>
        </button>)
        :
        (<button onClick={() => {setIsActive(!isActive);setHidden(!hidden)}} type="button" data-dial-toggle="speed-dial-menu-hover" data-dial-trigger="hover" aria-controls="speed-dial-menu-hover" aria-expanded="false" className="flex items-center justify-center text-white bg-green-400 rounded-full w-14 h-14 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-whatsapp w-8 h-8" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
            </svg>
            <span className="sr-only">Open actions menu</span>
        </button>)}
        
    </div>
  )
}
