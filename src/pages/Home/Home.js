//import { Products} from '../../components/Products';
//import { Hero,Nosotros,Feedback, SliderProduct } from '../Home/components';
import { useState } from "react";
//import Video
import video from "../../assets/IntroCapernova.mp4";
import {
	Feedback,
	Hero,
	Loading,
	SliderCursos,
	SliderProduct,
} from "../Home/components";

export const Home = ({ children }) => {
	const [loading, setLoading] = useState(true);

	// setTimeout(() => {
	// 	setLoading(false);
	// }, [6000]);

	return (
		<div className="dark:bg-gray-900">
			<div className={`${loading ? "visible" : "hidden"}`}>
				<Loading />
			</div>
			<div className={`${loading ? "invisible" : "visible"}`}>
				<Hero video={video} />
				<SliderCursos />
				<SliderProduct />
				<Feedback setLoading={setLoading} />
				{children}
			</div>
		</div>

		// {/*Esta es la parte funcional */}
		// <div className="dark:bg-gray-900">
		// 	<div className={`${loading ? "visible" : "hidden"}`}>
		// 		<Loading />
		// 	</div>
		// 	<div className={`${loading ? "invisible" : "visible"}`}>
		// 		<Hero video={video} />
		// 		<SliderCursos />
		// 		<SliderProduct />
		// 		<Feedback />
		// 		{children}
		// 	</div>
		// </div>
	);
};
