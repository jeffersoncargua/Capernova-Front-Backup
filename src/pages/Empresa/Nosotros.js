import { useState } from "react";
import { Loading } from "../../components";
import { MisionVision, TalentoHumano } from "./Components";

export const Nosotros = () => {
	const [loading, setLoading] = useState(true);

	return (
		<div>
			<div>{loading && <Loading />}</div>
			<div className={`${loading ? "invisible" : "visible"}`}>
				<MisionVision />
				<TalentoHumano setLoading={setLoading} />
			</div>
		</div>
	);
};
