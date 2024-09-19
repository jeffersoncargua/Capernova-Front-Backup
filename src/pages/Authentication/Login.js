import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import {ModalLogin} from './components';
import { JWTDecode } from '../../hooks/JWTDecode';
import { useDispatch } from 'react-redux';
import { signIn } from '../../redux/userSlice';
//import {baseURL} from '../endpoints';


import LogoImg from '../../assets/registro2.jpg'



export const Login = ({children}) => {

  const [showPass, setShowPass] = useState(false);
  const [showButtonLoading, setShowButtonLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  //const [messagePassword,setMessagePassword] = useState('');
  const [response,setResponse] = useState({});
  const navigate = useNavigate();

  const refEmail = useRef();
  const refPassword = useRef();
  //Activador del useDispatch
  const dispatch = useDispatch();


  const handleSubmitLogin = async (event) =>{
    event.preventDefault();
    setShowButtonLoading(true);
    try {
      const resultFromApi = await fetch(`${process.env.REACT_APP_API_URL}/Authentication/login`, {
        method:'POST',   
        credentials:'include',
        headers:{
          "Content-Type" : "application/json",
          "Accept" : "application/json",
        },
        body: JSON.stringify({          
            email: refEmail.current.value,
            password: refPassword.current.value,
          })
        });

        
        const resultFetch  = await resultFromApi.json();

        if (resultFromApi.status !== 200) {
          throw resultFetch;
        }

        setShowButtonLoading(false);
        //console.log(result);
        setShowModal(true);
        setResponse(resultFetch);
        const token = resultFetch.result.token;
        

        //Funcion para decodificar el token y acceder a su informacion para el inicio de sesion
        const objet = JWTDecode(token);
        //console.log(objet);

        //Se guarda la seccion 
        //Permite almacenar el inicio de sesion de un usuario que se ha logeado de forma exitosa
        sessionStorage.setItem('auth',resultFetch.result.token);
        dispatch(signIn(objet));
        

    } catch (error) {
      setShowButtonLoading(false);
      console.error('Algo salio mal al crear el registro: ', error);
      navigate('/error');
    }

  }

  return (
    <div className="w-[95%] md:flex mx-auto">
      <div name='avatar' className='md:w-1/2 my-10 w-full'>
        <img src={LogoImg} alt="logoLogin" className='' />
      </div>
      <div className='md:w-1/2 w-full my-10 border border-gray-300 p-6 flex items-center'>
        <form className="w-[70%] mx-auto" onSubmit={ handleSubmitLogin}>
          <div className="relative z-0 w-full mb-5 group">
              <input type="email" pattern="[a-zA-Z0-9!#$%&'*\/=?^_`\{\|\}~\+\-]([\.]?[a-zA-Z0-9!#$%&'*\/=?^_`\{\|\}~\+\-])+@[a-zA-Z0-9]([^@&%$\/\(\)=?¿!\.,:;]|\d)+[a-zA-Z0-9][\.][a-zA-Z]{2,4}([\.][a-zA-Z]{2})?" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer rouded-lg" placeholder=" " required ref={refEmail} autoComplete='off' />
              <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Correo Electrónico</label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
              <input type={showPass ? 'text': 'password'} name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer  " placeholder=" " required ref={refPassword} autoComplete='off' />
              <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Contraseña</label>
              <span onClick={() => setShowPass(!showPass)} className='absolute inset-y-0 right-0 flex items-center hover:cursor-pointer'>
                {showPass ? 
                (<svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-eye text-gray-600 hover:text-blue-500 h-5 w-5" viewBox="0 0 16 16">
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                </svg>)
                :
                (<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-eye-slash text-gray-600 hover:text-blue-500 h-5 w-5" viewBox="0 0 16 16">
                  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
                  <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
                  <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
                </svg>)}
              </span>
          </div>
          <Link to='/forget' className='text-blue-500 text-sm my-10 font-bold hover:underline hover:decoration-blue-500 block'>¿Olvidate tu contraseña?</Link>
          {showButtonLoading ? 
            (<button disabled type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                </svg>
              Procesando...
            </button>)
            :
            (<button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Log In</button>)
            }
          
        </form>
      </div>
      
      {/*{showModal && <ModalLogin response={response} setShowModal={setShowModal} refEmail={refEmail.current.value}/>} */}
      {showModal && <ModalLogin response={response} setShowModal={setShowModal}/>}
      {children}

    </div>
  )
}
