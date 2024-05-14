import { Routes,Route } from "react-router-dom";
import { Home, Login, Register,Products,Estudiante} from "../pages";

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
