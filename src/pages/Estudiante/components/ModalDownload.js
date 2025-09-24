import QRCode from "react-qr-code";

export const ModalDownload = ({
	showModalDownload,
	setShowModalDownload,
	result,
	setResult,
}) => {
	return (
		<div>
			{/*<!-- Main modal -->*/}
			<div
				//id="crud-modal"
				tabIndex="-1"
				className={`${showModalDownload ? "" : "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] bg-gray-700/[0.6]`}
			>
				<div className="relative mx-auto p-4 w-full max-w-md max-h-full">
					{/*<!-- Modal content -->*/}
					<div className="relative my-[30%] bg-white rounded-lg shadow dark:bg-gray-700 mb-14">
						{/*<!-- Modal header -->*/}
						<div className="flex items-center justify-between p-4 md:p-5 dark:border-gray-600">
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
								Descargar Certificado
							</h3>
							<button
								onClick={() => {
									setShowModalDownload(!showModalDownload);
									setResult({});
								}}
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
						{/*<!-- Boton para realizar la descarga del certificado -->*/}
						<div className="px-4 md:px-5">
							<span className="text-black dark:text-white">
								<a
									href={`data:${result.result.contentType};base64,${result.result.fileContents}`}
									download={`${result.result.fileDownloadName}`}
									className="hover:underline text-blue-500 hover:text-violet-600"
								>
									Presiona este enlace para descargar
								</a>{" "}
								o escanea el código QR para obtener tu certificado
							</span>
						</div>
						{/*<!--Codigo QR para realizar la descarga del certificado -->*/}
						<div className="p-4 md:p-5">
							<div
								style={{
									height: "auto",
									margin: "0 auto",
									maxWidth: 230,
									width: "100%",
								}}
							>
								<QRCode
									size={256}
									style={{ height: "auto", maxWidth: "100%", width: "100%" }}
									//value={`https://www.google.com`}
									value={`https://drive.google.com/file/d/${result.message}/view`}
									viewBox={`0 0 256 256`}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
