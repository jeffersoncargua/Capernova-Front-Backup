import { Routes,Route } from "react-router-dom";
import { Home, Login, Register,Products,Estudiante, Cart, ForgotPassword, ChangePassword,ConfirmationEmail,Order,CancelPayment,ConfirmPay,Administracion} from "../pages/index";


export const AllRoutes = () => {
  return (
    <main>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="products" element={<Products />} />
            <Route path="student" element={<Estudiante />} />
            <Route path="cart" element={<Cart />} />
            <Route path="forget" element={<ForgotPassword />} /> {/*Para enviar la solicitud del cambio de contraseña */}
            <Route path="changePassword" element={<ChangePassword />} /> {/*Para realizar el cambio de contraseña */}
            <Route path="confirmEmail" element={<ConfirmationEmail />} /> {/*Para confirmar el Email */}
            <Route path="order" element={<Order />} /> {/*Pagina para realizar el pago */}
            <Route path="confirmPay" element={<ConfirmPay />} /> {/*Pagina para realizar el pago */}
            <Route path="cancelPay" element={<CancelPayment />} /> {/*Pagina para realizar el pago */}
            <Route path="admin" element={<Administracion />} /> {/*Pagina para Administrar la plataforma */}
        </Routes>
    </main>    
  )
}
