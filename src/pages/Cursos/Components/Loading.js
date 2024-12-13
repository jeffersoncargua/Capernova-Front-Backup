import Logo from '../../../assets/CapernovaWS.png';

export const Loading = () => {

    window.scrollTo(0, 0);

  return (
    <div className="w-full mx-auto flex justify-center z-50 fixed inset-0" tabIndex='-1'>
        <div aria-label="Loading..." role="status" className="flex flex-col md:flex-row items-center justify-center space-x-2 mt-28">
            {/* <svg className="h-20 w-20 animate-spin stroke-orange-500" viewBox="0 0 256 256">
                <line x1="128" y1="32" x2="128" y2="64" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" strokeLinecap="round" strokeLinejoin="round"
                    strokeWidth="24"></line>
                <line x1="224" y1="128" x2="192" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24">
                </line>
                <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" strokeLinecap="round" strokeLinejoin="round"
                    strokeWidth="24"></line>
                <line x1="128" y1="224" x2="128" y2="192" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24">
                </line>
                <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" strokeLinecap="round" strokeLinejoin="round"
                    strokeWidth="24"></line>
                <line x1="32" y1="128" x2="64" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24">
                </line>
            </svg> */}
            <img src={Logo} className="animate-pulse w-14 h-14 md:w-16 md:h-16" alt="Capernova" />
            <span className="text-3xl md:text-4xl font-medium text-black dark:text-white animate-pulse ">Espere un momento...</span>
        </div>
    </div>
  )
}
