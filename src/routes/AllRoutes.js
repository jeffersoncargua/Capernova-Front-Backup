import { Routes,Route } from "react-router-dom";
import { Home, Login, Register,Products} from "../pages/index";
import { Estudiante } from "../pages/Estudiante/Estudiante";

export const AllRoutes = () => {
  return (
    <main>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="products" element={<Products />} />
            <Route path="student" element={<Estudiante />} />
        </Routes>
    </main>    
  )
}
