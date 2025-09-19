import { Link, useNavigate } from "react-router-dom";
//import { toast } from "react-toastify";
import { useState, useEffect, useCallback } from "react";
import { GetCategoriaProductos } from "../apiServices/GeneralServices";

export const DropDownProductos = ({
	setShowDrop,
	setHidden,
	setShowDropProductos,
	hidden,
}) => {
	const [categoriaList, setCategoriaList] = useState([]);
	const navigate = useNavigate();

	const FetchCategoriaCurso = useCallback(async() => {
			try {
				const result = await GetCategoriaProductos();

				const resultFetch = await result.json();

				if (result.status !== 200 && result.status !== 400) {
					throw resultFetch;
				}

				if (resultFetch.isSuccess) {
					setCategoriaList(resultFetch.result);
				} else {
					setCategoriaList([]);
				}
			} catch (error) {
				console.error(error);
				navigate("/error");
			}
		},[navigate]);

	useEffect(() => {
		FetchCategoriaCurso();
	}, [FetchCategoriaCurso]);

	return (
		<div>
			<ul
				className="rounded-lg py-2 text-sm text-gray-700 dark:text-gray-200"
				aria-labelledby="dropdownLargeButton"
			>
				{categoriaList.length > 0 &&
					categoriaList.slice(0, 5).map((categoria) => (
						<li translate="no" key={categoria.id}>
							<Link
								onClick={() => {
									setShowDrop(true);
									setHidden(!hidden);
									setShowDropProductos(true);
								}}
								to={`/products?categoriaId=${categoria.id}`}
								className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
							>
								{categoria.name}
							</Link>
						</li>
					))}
				{/* <li >
                <Link onClick={() => {setShowDrop(true);setHidden(!hidden);setShowDropProductos(!showDropProductos)}} to='products' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Shampoo</Link>
            </li>
            <li >
                <Link onClick={() => {setShowDrop(true);setHidden(!hidden);setShowDropProductos(!showDropProductos)}} to='products' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Aceites Naturales</Link>
            </li>
            <li >
                <Link onClick={() => {setShowDrop(true);setHidden(!hidden);setShowDropProductos(!showDropProductos)}} to='products' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Cremas</Link>
            </li> */}
			</ul>
			<div className="py-2 border-t">
				<Link
					onClick={() => {
						setShowDrop(true);
						setHidden(!hidden);
						setShowDropProductos(true);
					}}
					to="products"
					className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
				>
					Ver más
				</Link>
			</div>
		</div>
	);
};
