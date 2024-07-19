import { Routes,Route } from "react-router-dom";
import { Home, Login, Register,Products,Estudiante, Cart, ForgotPassword, ChangePassword,ConfirmationEmail,Order,CancelPayment,ConfirmPay,Administracion, Profesor,Secretaria ,Certificado} from "../pages/index";
import {WhatsappComponent} from '../components'


export const AllRoutes = () => {
  return (
    <main>
        <Routes>
          {/*Paginas home y products para cualquier usuario */}
          <Route path="/" element={<Home><WhatsappComponent /></Home>} />
          <Route path="products" element={<Products><WhatsappComponent /></Products>} />
          {/*Paginas de autenticacion para realizar el login, resgister, recuperacion de contraseñas */}
          <Route path="login" element={<Login><WhatsappComponent /></Login>} />
          <Route path="register" element={<Register><WhatsappComponent /></Register>} />
          <Route path="forget" element={<ForgotPassword><WhatsappComponent /></ForgotPassword>} /> {/*Para enviar la solicitud del cambio de contraseña */}
          <Route path="changePassword" element={<ChangePassword><WhatsappComponent /></ChangePassword>} /> {/*Para realizar el cambio de contraseña */}
          <Route path="confirmEmail" element={<ConfirmationEmail><WhatsappComponent /></ConfirmationEmail>} /> {/*Para confirmar el Email */}
          {/*Pagina para el estudiante */}
          <Route path="student" element={<Estudiante />} />
          {/*Paginas para agregar los cursos al carrito de compras, pagar y confirmar o no el pago */}
          <Route path="cart" element={<Cart />} />
          <Route path="order" element={<Order />} /> {/*Pagina para realizar el pago */}
          <Route path="confirmPay" element={<ConfirmPay />} /> {/*Pagina para realizar el pago */}
          <Route path="cancelPay" element={<CancelPayment />} /> {/*Pagina para realizar el pago */}
          
          {/*Pagina para realizar la administracion de la plataforma Capernova */}
          <Route path="admin" element={<Administracion />} /> {/*Pagina para Administrar la plataforma */}
          <Route path="teacher" element={<Profesor />} /> {/*Pagina para los profes la plataforma */}
          <Route path="secretary" element={<Secretaria />} /> {/*Pagina para la secretaria la plataforma */}
          <Route path="certificado" element={<Certificado />} /> {/*Pagina para Administrar la plataforma */}
        </Routes>
    </main>    
  )
}
