import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { PedidoDetails } from "../Components";
import Datepicker from "react-tailwindcss-datepicker";
import { GetAllPedidos } from "../../../../apiServices/ManagmentServices/ManagmentVentas";

export const Pedidos = () => {
	const [pedidoList, setPedidoList] = useState([]);
	const [pedido, setPedido] = useState({});
	const [search, setSearch] = useState("");
	const [value, setValue] = useState({
		startDate: null,
		endDate: null,
	}); // permite escoger las fechas de inicio y final para buscar las ventas de acuedo al rango de fecha que se solicite
	const [showModalPedidoDetail, setShowModalPedidoDetail] = useState(false);
	const columns = [
		"Fecha Emisión",
		"Transacción ID",
		"Cliente ID",
		"Nombre Cliente",
		"Apellido Cliente",
		"Teléfono",
		"Calle Principal",
		"Calle Secundaria",
		"Estado",
		"Ver Detalle/Eliminar",
	];

	const [response, setResponse] = useState({});
	const refSearch = useRef();

	useEffect(() => {
		const fetchPedidos = async () => {
			try {
				var resultFromApi = await GetAllPedidos(
					search,
					value.startDate,
					value.endDate,
				);

				const resultFetch = await resultFromApi.json();

				if (resultFromApi.status !== 200 && resultFromApi.status !== 400) {
					throw resultFetch;
				}

				if (resultFetch.isSuccess) {
					setPedidoList(resultFetch.result);
				}
			} catch (error) {
				console.error(error);
				toast.error("Algo ha fallado en nuestro servidor. Inténtelo más tarde");
			}
		};
		fetchPedidos();
		response.isSuccess
			? toast.success(response.message)
			: toast.error(response.message);
	}, [showModalPedidoDetail, search, response, value]);

	const handleSearch = (event) => {
		setSearch(refSearch.current.value);
		setResponse({});
	};

	const handleDetail = (pedido) => {
		setPedido(pedido);
		setShowModalPedidoDetail(!showModalPedidoDetail);
		setResponse({});
	};

	const GetFecha = (fecha) => {
		const date = new Date(fecha);
		return date.toLocaleDateString();
	};

	return (
		<div>
			<h1 className="text-center font-medium text-xl dark:text-white mb-10">
				Pedidos de Capernova
			</h1>
			{/*Modal para ingresar los valores de la publicidad */}
			{showModalPedidoDetail && (
				<PedidoDetails
					showModalPedidoDetail={showModalPedidoDetail}
					setShowModalPedidoDetail={setShowModalPedidoDetail}
					pedido={pedido}
					setPedido={setPedido}
					setResponse={setResponse}
				/>
			)}
			{/* {showModalDelete && <ModalDelete showModalDelete={showModalDelete} setShowModalDelete={setShowModalDelete} publicidad={publicidad} setResponse={setResponse}  />} */}
			{/* {showModalDelete && <ModalDelete showModalDelete={showModalDelete} setShowModalDelete={setShowModalDelete} objeto={objeto} setObjeto={setObjeto} setResponse={setResponse} tipo={tipo} setTipo={setTipo} />} */}

			{/* Tabla para la informacion */}
			<section className="">
				<div className="mx-auto max-w-screen-xl px-4 lg:px-12">
					<div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
						<div className="w-full md:w-1/2">
							<Datepicker
								value={value}
								onChange={(newValue) => setValue(newValue)}
								showShortcuts={true}
							/>
						</div>

						<div className="w-full md:w-1/2">
							<form className="flex items-center">
								<label htmlFor="simple-search" className="sr-only">
									Search
								</label>
								<div className="relative w-full">
									<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
										<svg
											aria-hidden="true"
											className="w-5 h-5 text-gray-500 dark:text-white"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fillRule="evenodd"
												d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
												clipRule="evenodd"
											/>
										</svg>
									</div>
									<input
										onChange={handleSearch}
										type="text"
										id="simple-search"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
										placeholder="Buscar por Transaccion ID, ID o Apellido del cliente"
										required=""
										ref={refSearch}
									/>
								</div>
							</form>
						</div>
					</div>
					{/*<!-- Start coding here -->*/}
					<div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden mb-10">
						<div className="overflow-x-auto">
							<table className="w-full text-sm text-left dark:text-white">
								<thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
									<tr>
										{columns.map((column) => (
											<th key={column} scope="col" className="px-4 py-3">
												{column}
											</th>
										))}
									</tr>
								</thead>
								<tbody>
									{pedidoList.length > 0 ? (
										pedidoList.map((item) => (
											<tr
												key={item.id}
												className="border-b dark:border-gray-700"
											>
												<td className="px-4 py-3">{GetFecha(item.emision)}</td>
												<td className="px-4 py-3">
													{item.venta.transaccionId}
												</td>
												<td className="px-4 py-3">{item.venta.userId}</td>
												<td className="px-4 py-3">{item.venta.name}</td>
												<td className="px-4 py-3">{item.venta.lastName}</td>
												<td className="px-4 py-3">{item.venta.phone}</td>
												<td className="px-4 py-3">{item.directionMain}</td>
												<td className="px-4 py-3">{item.directionSec}</td>
												<td className="px-4 py-3">{item.estado}</td>
												<td className="px-4 py-3">
													<div className="py-1 flex justify-start">
														<button
															onClick={() => handleDetail(item)}
															className="flex items-center justify-center py-2 px-4 text-sm text-gray-900 hover:text-white bg-yellow-300 hover:bg-yellow-400 rounded-lg mr-2"
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																fill="currentColor"
																className="bi bi-pencil-square h-4 w-4 mr-2"
																viewBox="0 0 16 16"
															>
																<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
																<path
																	fillRule="evenodd"
																	d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
																/>
															</svg>
															Ver Pedido
														</button>
													</div>
												</td>
											</tr>
										))
									) : (
										<tr className="border-b dark:border-gray-700">
											<td className="font-medium text-xl mb-10 p-5">
												No se ha encontrado tu busqueda...
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};
