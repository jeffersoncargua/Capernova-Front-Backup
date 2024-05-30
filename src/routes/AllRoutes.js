import { Routes,Route } from "react-router-dom";
import { Home, Login, Register,Products,Estudiante, Cart, ForgetPassword, ChangePassword} from "../pages/index";



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
            <Route path="forget" element={<ForgetPassword />} /> {/*Para enviar la solicitud del cambio de contraseña */}
            <Route path="changePass" element={<ChangePassword />} /> {/*Para realizar el cambio de contraseña */}
        </Routes>
    </main>    
  )
}
