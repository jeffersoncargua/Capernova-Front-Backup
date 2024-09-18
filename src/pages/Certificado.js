
export const Certificado = () => {
  return (
    <div>
        <h1><b>Se ha realizado un pedido</b></h1>
        <h2><b>Nombre:</b></h2>
        <h2><b>Apellido:</b></h2>
        <h2><b>Teléfono:</b></h2>
        <h2><b>Direccion Principal:</b></h2>
        <h2><b>Direccion Secundaria:</b></h2>
        <h2><b>Pedido:</b></h2>
        <br />
        <table style={{border:'1px solid #000', tableLayout:'auto'}}>
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Lo que sea</td>
                    <td>3</td>
                </tr>
            </tbody>
        </table>
        
    </div>
  )
}


/*

<div className="bg-[url('https://i.postimg.cc/SK55dgbd/certificado-Capernova.jpg')] max-w-[64rem]">
        <div className="flex flex-col justify-center items-center ">
            <h1 className="mt-[9rem] text-[3rem] font-[600] font-['Lato']">CERTIFICADO DE CAPACITACIÓN</h1>
            <h2 className="mt-[0.125rem] text-[1.875rem] font-[400]">POR APROBACIÓN</h2>
            <h3 className="mt-[0.75rem] text-[1.25rem]">ESTE CERTIFICADO SE OTORGA A:</h3>
            <h1 className="mt-[0.875rem] text-[3rem] font-[500]">Nombre y Apellido de la persona</h1>
            <p className="mt-[1.75rem] text-[1.125rem] font-[400] text-justify max-w-[64rem]">
                Por haber cursado todos los niveles de manera satisfactoria y con los más altos estándares                
            </p>
            <p className="text-[1.125rem] font-[400] text-justify max-w-[64rem]">
                de educación brindados por el Centro de Capacitación para Profesionales, Emprendedores
            </p>
            <p className="text-[1.125rem] font-[400] text-justify max-w-[64rem]">
                e Innovación "Capernova", el curso de Experto en Chocolatería con Técnica Franceso con
            </p>
            <p className="text-[1.125rem] font-[400] text-center max-w-[64rem]">
                120 horas de estudio.
            </p>
            <br /><br /><br /><br /><br /><br /><br /><br />
        </div>
    </div>

*/