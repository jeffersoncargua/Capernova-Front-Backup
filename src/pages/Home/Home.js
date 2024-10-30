//import { Products} from '../../components/Products';
//import { Hero,Nosotros,Feedback, SliderProduct } from '../Home/components';
import { useState } from 'react';
import { Hero,Feedback, SliderProduct, SliderCursos, Loading } from '../Home/components';

//import Video
import video from '../../assets/IntroCapernova.mp4';

export const Home = ({children}) => {


  const [loading, setLoading] = useState(true);

  setTimeout(()=>{
    setLoading(false);
  },[6000]);

  return (
    <div className='dark:bg-gray-900' >
      
      {loading ? (<Loading />)
      :(<>     
        <Hero video={video} />   
        <SliderCursos />
        <SliderProduct />
        {/* <Nosotros /> */}
        <Feedback />
        {children}
      </>)}
      
      
    </div>
  )
}
