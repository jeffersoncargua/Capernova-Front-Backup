//import { Products} from '../../components/Products';
import { Hero,Nosotros,Feedback, SliderProduct } from '../Home/components';

export const Home = () => {
  return (
    <div className='dark:bg-gray-900' >
      <Hero />
      <SliderProduct />
      <Nosotros />
      <Feedback />
    </div>
  )
}
