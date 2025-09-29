import { useEffect } from "react";
import { useLocation } from "react-router-dom";

//lint/correctness/useExhaustiveDependencies - Esto permite que no de errores
// porque no es necesaria la dependencia de pathname pero si se necesita para
// que el scroll se posicione en la coordenada 0,0 de la pantalla
export function ScrollToTop() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
}
