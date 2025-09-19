import { useEffect, useState } from "react";
import { CalificarDeber } from "../Components";
import { toast } from "react-toastify";
import { GetAllTest } from "../../../../apiServices/TeacherServices/TeacherServices";

export const ModalCalificarDeber = ({
	showModalCalificarDeber,
	setShowModalCalificarDeber,
	matricula,
}) => {
	const [deberList, setDeberList] = useState([]);
	const columns = [
		"Deber",
		"Observación",
		"Estado",
		"Calificación",
		"Acciones",
	];

	useEffect(() => {
		const GetNotaDeber = async () => {
			try {
				var resultFromApi = await GetAllTest(matricula.cursoId);

				const resultFetch = await resultFromApi.json();

				if (resultFromApi.status !== 200 && resultFromApi.status !== 400) {
					throw resultFetch;
				}
				if (resultFetch.isSuccess) {
					setDeberList(resultFetch.result);
				} else {
					setDeberList([]);
				}
			} catch (error) {
				console.error(error);
				toast.error("Algo ha fallado en nuestro servidor. Inténtelo más tarde");
			}
		};

		GetNotaDeber();
	}, [matricula]);

	return (
		<div
			id="crud-modal"
			tabIndex="-1"
			className={`${showModalCalificarDeber ? "" : "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] bg-gray-700/[0.6]`}
		>
			<div className="relative p-4 mx-auto w-full max-w-4xl max-h-full">
				{/*<!-- Modal content -->*/}
				<div className="relative bg-white my-[0.15%] rounded-lg shadow dark:bg-gray-700 mb-14">
					{/*<!-- Modal header -->*/}
					<div className="flex items-center justify-between p-4 md:p-5 dark:border-gray-600">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
							{`Curso ${matricula.curso.titulo}`}
						</h3>
						<button
							onClick={() => setShowModalCalificarDeber(false)}
							type="button"
							className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
							data-modal-toggle="crud-modal"
						>
							<svg
								className="w-3 h-3"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 14 14"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
								/>
							</svg>
							<span className="sr-only">Close modal</span>
						</button>
					</div>
					{/*<!-- Modal body -->*/}
					<div className="p-4 md:p-5">
						<div className="grid gap-4 mb-4 grid-cols-2 group text-black dark:text-white">
							<div className="col-span-2 flex items-center">
								<label
									htmlFor="name"
									className="block mb-2 text-sm font-medium mr-3 "
								>
									Nombre:
								</label>
								<input
									type="text"
									disabled
									name="name"
									id="name"
									className="bg-gray-50 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
									defaultValue={matricula.estudiante.name || ""}
								/>
							</div>
							<div className="col-span-2 flex items-center">
								<label
									htmlFor="lastName"
									className="block mb-2 text-sm font-medium mr-3 "
								>
									Apellido:
								</label>
								<input
									type="text"
									disabled
									name="name"
									id="name"
									className=" bg-gray-50 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
									defaultValue={matricula.estudiante.lastName || ""}
								/>
							</div>
							<div className="col-span-2 flex items-center">
								<label
									htmlFor="email"
									className="block mb-2 text-sm font-medium mr-3 "
								>
									Correo:
								</label>
								<input
									type="text"
									disabled
									name="email"
									id="email"
									className="bg-gray-50 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
									defaultValue={matricula.estudiante.email || ""}
								/>
							</div>
						</div>

						{/* */}

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
									{deberList
										? deberList.map((deber) => (
												<tr
													key={deber.id}
													className="border-b dark:border-gray-700"
												>
													<td className="px-4 py-3">{deber.titulo}</td>
													<CalificarDeber deber={deber} matricula={matricula} />
												</tr>
											))
										: null}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

/*

<div className="overflow-x-auto">
  <table className="w-full text-sm text-left dark:text-white">
    <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
      <tr>
      {columns.map((column) => (
        <th key={column} scope="col" className="px-4 py-3">{column}</th>
      ))}
      </tr>
    </thead>
    <tbody>
    {currentDataDisplayed.list? (currentDataDisplayed.list.map((matricula) => (
      <tr key={matricula.id} className="border-b dark:border-gray-700">
        <td className="px-4 py-3">{matricula.estudiante.name}</td>
        <td className="px-4 py-3">{matricula.estudiante.lastName}</td>
        
        <td className="px-4 py-3">{matricula.estudiante.phone}</td>
        <td className="px-4 py-3">{matricula.curso.titulo}</td>
        <td className="px-4 py-3">
          <div className="py-1 flex justify-start">                          
            <button onClick={() => {handleCalificarDeberes(matricula)}} className="flex items-center justify-center py-2 px-4 text-sm text-gray-900 hover:text-white bg-yellow-300 hover:bg-yellow-400 rounded-lg mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-pencil-square h-4 w-4 mr-2" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
              </svg>
              Calificar Deberes
            </button>                             
            {/* <button onClick={() => handleDelete(item)} className="flex items-center justify-center py-2 px-4 text-sm text-gray-900 hover:text-white bg-red-500 hover:bg-red-600 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-trash3 w-4 h-4 mr-2" viewBox="0 0 16 16">
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
              </svg>
              Eliminar
            </button> 
            </div>
            </td>
          </tr>
        ))): (null)}
          
        </tbody>
      </table>
    </div>

*/
