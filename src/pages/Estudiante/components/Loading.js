import Logo from "../../../assets/CapernovaWS.png";

export const Loading = () => {
	window.scrollTo(0, 0);

	return (
		<div
			className="w-full mx-auto flex justify-center z-50 fixed inset-0"
			tabIndex="-1"
		>
			<div
				//aria-label="Loading..."
				//role="status"
				className="flex flex-col md:flex-row items-center justify-center space-x-2 mt-28"
			>
				<img
					src={Logo}
					className="animate-pulse w-14 h-14 md:w-16 md:h-16"
					alt="Capernova"
				/>
				<span className="text-3xl md:text-4xl font-medium text-black dark:text-white animate-pulse ">
					Espere un momento...
				</span>
			</div>
		</div>
	);
};
