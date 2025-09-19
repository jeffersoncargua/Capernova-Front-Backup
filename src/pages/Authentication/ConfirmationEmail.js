import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ConfirmEmail } from "../../apiServices/Authenticate/AuthenticateServices";

export const ConfirmationEmail = ({ children }) => {
	const [response, setResponse] = useState({});
	const [searchParams] = useSearchParams();
	const token = searchParams.get("token");
	token.replace(" ", "+");
	const email = searchParams.get("email");

	useEffect(() => {
		const FetchConfirm = async () => {
			try {
				var resultFromApi = await ConfirmEmail(token, email);

				const resultFetch = await resultFromApi.json();

				setResponse(resultFetch);
			} catch (error) {
				console.log(error);
			}
		};
		FetchConfirm();
	}, [token, email]);

	return (
		<div className="w-[95%] mx-auto mt-10 group text-black dark:text-white">
			<h1
				className={`text-xl ${response.isSuccess ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400"}  mb-4`}
			>
				{response.message}!!!!!
			</h1>
			{response.isSuccess && (
				<p className="text-sm">
					Navega por nuestro sitio web y conoce acerca más sobre nosotros y de
					nuestros cursos y productos
				</p>
			)}
			{children}
		</div>
	);
};
