export const Descripcion = ({ detalle }) => {
	return (
		<div className=" flex flex-col self-start text-start text-lg mt-5 dark:text-white ">
			<pre className=" text-sm font-sans leading-loose text-wrap text-justify">
				{detalle}
			</pre>
		</div>
	);
};
