import { useEffect, useState } from "react"
import { toast } from "react-toastify";

// export const VideoCard = ({cap,setShowModalVideo,setShowModalDeleteVideo,setVideo}) => {
export const VideoCard = ({cap,setShowModalVideo,setShowModalDelete,setVideo,setObjeto,setTipo}) => {


    const [videos, setVideos] = useState([]);

    useEffect(()=>{
        const GetVideo = async() => {
          try {
            const resultFromApi = await fetch(`${process.env.REACT_APP_API_URL}/Video/getAllVideos/${cap.id}`,{
              method : 'GET',
              credentials:'include',
              headers:{
                  'Content-Type' : 'application/json',
                  'Accept' : 'application/json'
              },
          });
          const resultFetch = await resultFromApi.json();

          if (resultFromApi.status !== 200 && resultFromApi.status !== 400) {
            throw resultFetch;
          }
          
          //console.log (resultFetch);
          if (resultFetch.isSuccess) {
            setVideos(resultFetch.result);
          }else{
            setVideos([]);
          }

          
          } catch (error) {
            console.error(error);
            toast.error('Algo ha fallado en nuestro servidor. Inténtelo más tarde');
          } 
        }
        GetVideo();
    },[cap]);

    //console.log(cap);

    const handleEditVideo= (video) => {
        setShowModalVideo(true);
        setVideo(video);
      }
    
      const handleDeleteVideo = (video) => {
        //setShowModalDeleteVideo(true);
        setShowModalDelete(true);
        //setVideo(video);
        setObjeto(video);
        setTipo('video');
      }

  return (
    <>
        {videos.length > 0 ?  (videos.map((video) => (
            <tr key={video.id} className="border-b dark:border-gray-700">
            {/* <td className="px-4 py-3">{video.Codigo}</td> */}
            <td className="px-4 py-3">{video.titulo}</td>
            <td className="px-4 py-3">{video.videoUrl}</td>
            <td className="px-4 py-3">{video.ordenReproduccion}</td>
            {/* <td className="px-4 py-3">{String(video.Visto)}</td> */}
            <td className="px-4 py-3">
              <div className="py-1 flex justify-start">                          
                <button onClick={() => handleEditVideo(video)} className="flex items-center justify-center py-2 px-4 text-sm text-gray-900 hover:text-white bg-yellow-300 hover:bg-yellow-400 rounded-lg mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-pencil-square h-4 w-4 mr-2" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                  </svg>
                  Editar
                </button>                              
                <button onClick={() => handleDeleteVideo(video)} className="flex items-center justify-center py-2 px-4 text-sm text-gray-900 hover:text-white bg-red-500 hover:bg-red-600 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-trash3 w-4 h-4 mr-2" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                  </svg>
                  Eliminar
                </button>
              </div>
            </td>
          </tr>
        ))):(
          <tr className="border-b dark:border-gray-700" >
            <td className="font-medium text-xl mb-10 p-5">No se han encontrado registros...</td>                  
          </tr>
        )}
    </>
  )
}
