import {  useEffect, useState } from 'react';
import { Videos,ModalCompleted } from '../components';
import { useSelector } from 'react-redux';
import VideoPlayer from 'react-player/youtube';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export const PlayerVideo = ({estudiante,matricula,setMatricula}) => {

    // const urls = [
    //     {id: 1 , titulo: 'LLapingacho' ,video:'https://www.youtube.com/watch?v=S9HdmW8FHFU', view: false},
    //     {id: 2 , titulo: 'Encebollado' ,video:'https://www.youtube.com/watch?v=AhJpRnQqcVs', view: false},
    //     {id: 3 , titulo: 'Camarón al Ajillo' ,video:'https://www.youtube.com/watch?v=yXFnChtAJdY', view: false},
    //     {id: 4 , titulo: 'Arroz Marinero' ,video:'https://www.youtube.com/watch?v=88uCobiTaBI', view: false},
    //     {id: 5 , titulo: 'Tigrillo' ,video:'https://www.youtube.com/watch?v=mbZETORPR2c', view: false},
    //     {id: 6 , titulo: 'Bandeja Paisa' ,video:'https://www.youtube.com/watch?v=fed_bdj-ZN4', view: false},
    //     {id: 7 , titulo: 'Tartar' ,video:'https://www.youtube.com/watch?v=isH2-fyNC10', view: false},
    //     {id: 8 , titulo: 'Cangrejada' ,video:'https://www.youtube.com/watch?v=g3yVaYGezDk', view: false},
    // ]

    // const [currentVideo, setCurrentVideo] = useState({id: 1 , titulo: 'LLapingacho' ,video:'https://www.youtube.com/watch?v=S9HdmW8FHFU', view: false});
    // const [playList, setPlayList] = useState(urls);
    const playList = useSelector(state => state.playListState.playList)
    const [currentVideo, setCurrentVideo] = useState({});

    const navigate = useNavigate();
    
    //let [playList, setPlayList] = useState([]);
    //const [total, setTotal] = useState(0);
    //const [duration, setDuration] = useState(0);

    const [capituloList,setCapiuloList] = useState([]);
    const [showModalCompleted,setShowModalCompleted] = useState(false);



    useEffect(()=>{
        const FetchCapitulos = async() => {
            try {
                const resultFromApi = await fetch(`${process.env.REACT_APP_API_URL}/Student/getCapitulos/${matricula.cursoId}`,{
                    method: 'GET',
                    credentials:'include',
                    headers:{
                      'Content-Type':'application/json',
                      'Accept':'application/json'
                    }
                  });
                  const resultFetch = await resultFromApi.json();

                  if (resultFromApi.status !== 200 && resultFromApi.status !== 400) {
                    throw resultFetch;
                  }
                  //console.log(resultFetch);
                  if(resultFetch.isSuccess){
                    setCapiuloList(resultFetch.result);
                  }
            } catch (error) {
                console.error(error);
                toast.error('Algo ha fallado en nuestro servidor. Inténte retornar a sus cursos');
                navigate('/error');
            }
            
          }
          FetchCapitulos();
    },[matricula,setCurrentVideo,navigate]);

    
    const fetchVisualizacion = async(id) => {
        try {
            const resultFromApi = await fetch(`${process.env.REACT_APP_API_URL}/Student/createViewVideo`,{
                method: 'POST',
                credentials:'include',
                headers:{
                  'Content-Type':'application/json',
                  'Accept':'application/json'
                },
                body: JSON.stringify({
                    videoId: id,
                    studentId: estudiante.id,
                    cursoId: matricula.cursoId
                })
              });
    
            const resultFetch = await resultFromApi.json();

            if (resultFromApi.status !== 200 && resultFromApi.status !== 400) {
                throw resultFetch;
            }

            //console.log(resultFetch);
        } catch (error) {
            console.error(error);
            toast.error('Algo ha fallado en nuestro servidor. Inténte retornar a sus cursos');
            navigate('/error');
        }
        
    }

    const handlePlayer = (id) => {
        // console.log('Se termino el video');
        // console.log(id);
        if (id !==null) {
            //console.log(`id es distinto null`);
            fetchVisualizacion(id);
        }//else{
        //     console.log(`id es null`);
        // }
        //setPlayList(playList.map((urlItem) => urlItem.id === id ? {...urlItem, view:true} : urlItem)); // permite cambiar el estado de visto a un video
        const videoActual = playList.find((urlItem) => urlItem.id === id);
        //console.log(videoActual);
        // if(!videoActual.view){
        //     setTotal(total+duration);
        // }
        const nextVideo = playList[playList.indexOf(videoActual)+1];
        //console.log(nextVideo);
        if(nextVideo){
            setCurrentVideo(nextVideo);
        }else{
            //console.log(playList[0]);
            // const initialVideo = playList[0];
            // setCurrentVideo(initialVideo);
            setShowModalCompleted(true);
        }
    }


    // const handleDuration =  (duration) => {
    //     setDuration(duration);
    // }

    const handlePlay = (video) => {
        setCurrentVideo(video);
    }

    
    //console.log(playList);
    //console.log(currentVideo);
    //console.log('duracion del video: '+ duration);
    //console.log('tiempo invertido: ' + total);
    

  return (
    <div className='w-[95%] mx-auto flex flex-wrap justify-between'>

        {showModalCompleted &&  <ModalCompleted showModalCompleted={showModalCompleted} setShowModalCompleted={setShowModalCompleted} /> }
        
        <div className='flex-initial w-full md:w-2/3 mb-10'>
            <VideoPlayer 
                playing={true}
                url={currentVideo.videoUrl || 'https://www.youtube.com/watch?v=pJjjzarKotI'}
                //url={''}
                controls
                onEnded={()=>handlePlayer(currentVideo.id || null)}
                //onDuration={(duration)=>handleDuration(duration)}
                width='100%'
            />
        </div>
        
        <div className='flex-initial w-full md:w-[30%]'>
            {capituloList.length > 0 && capituloList.map((capitulo)=>(
                <ul key={capitulo.id} className="text-sm text-center text-black bg-white border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white md:m-0">
                    <li className="w-full px-4 py-2 font-bold text-lg border-b border-gray-200 bg-blue-100 dark:bg-gray-500 dark:border-gray-600">
                        {capitulo.titulo}
                    </li>
                    {/* <Videos capitulo={capitulo} handlePlay={handlePlay} playList={playList} estudiante={estudiante} matricula={matricula} /> */}
                    <Videos capitulo={capitulo} handlePlay={handlePlay} estudiante={estudiante} matricula={matricula} setMatricula={setMatricula}/>
                </ul>
            ))}
            
        </div>
    </div>
  )
}

/*
<div className='flex-initial w-full md:w-[30%]'>
            <ul className="text-sm text-center text-gray-900 bg-white border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white mt-8 md:m-0">
                <li className="w-full px-4 py-2 font-bold text-lg border-b border-gray-200 bg-blue-100 dark:border-gray-600">
                    Gastronomia
                </li>
                {playList.map((urlItem)=>(
                    <li key={urlItem.id} className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50">
                        <button className='w-[80%] flex justify-between' onClick={()=>handlePlay(urlItem)}>
                            <svg className={`w-4 h-4 ${urlItem.view ? 'text-green-500' :'text-gray-500'} dark:text-gray-400 flex-shrink-0`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                            </svg>
                            <span className='ml-5' >{urlItem.titulo}</span>
                        </button>
                    </li>
                ))}
                
            </ul>
        </div>

*/
