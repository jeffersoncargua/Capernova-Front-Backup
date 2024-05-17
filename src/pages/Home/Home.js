import { Products} from '../../components/Products';
import { Hero,Nosotros,Feedback } from '../Home/components';

export const Home = () => {
  return (
    <div className='' >
      <Hero />
      <Products />
      <Nosotros />
      <Feedback />
    </div>
  )
}