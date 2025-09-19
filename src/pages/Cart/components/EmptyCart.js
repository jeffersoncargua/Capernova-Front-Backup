import { Link } from "react-router-dom";

export const EmptyCart = () => {
	return (
		<div className="w-[95%] mx-auto mb-8">
			<div className="sm:max-md:w-full md:max-lg:w-1/3 lg:w-1/2 mx-auto border border-gray-500 rounded-lg bg-gray-50 shadow-inner dark:bg-gray-400">
				<span className="flex justify-center text-gray-200 dark:text-gray-700">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						className="h-80 w-80 bi bi-cart-x-fill "
						viewBox="0 0 16 16"
					>
						<path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M7.354 5.646 8.5 6.793l1.146-1.147a.5.5 0 0 1 .708.708L9.207 7.5l1.147 1.146a.5.5 0 0 1-.708.708L8.5 8.207 7.354 9.354a.5.5 0 1 1-.708-.708L7.793 7.5 6.646 6.354a.5.5 0 1 1 .708-.708" />
					</svg>
				</span>
				<h1 className="my-2 text-center text-gray-400 text-sm md:text-xl dark:text-gray-700">
					Lo sentimos, no tienes productos en tu carrito de compras
				</h1>
				<div className="my-6 flex justify-center">
					<Link
						to="/"
						className=" bg-blue-500 text-sm md:text-base rounded-lg transition duration-300 hover:text-white hover:bg-green-600 hover:scale-110 py-2 px-3 "
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							className="h-5 w-5 bi bi-cart4 inline-block mr-2"
							viewBox="0 0 16 16"
						>
							<path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
						</svg>
						Quiero Comprar
					</Link>
				</div>
			</div>
		</div>
	);
};
