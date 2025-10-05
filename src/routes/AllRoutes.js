import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { WhatsappComponent } from "../components";
import {
	Administracion,
	CancelPayment,
	Cart,
	ChangePassword,
	ConfirmationEmail,
	ConfirmPay,
	CursoDetail,
	Cursos,
	Estudiante,
	ForgotPassword,
	Home,
	Login,
	Nosotros,
	Order,
	PageError,
	PageNotFound,
	Privacidad,
	ProductDetail,
	Products,
	Profesor,
	Register,
	Secretaria,
	TerminosCondiciones,
} from "../pages/index";

export const AllRoutes = () => {
	const userAuth = useSelector((state) => state.userState.isAuth);
	const user = useSelector((state) => state.userState.user);

	return (
		<main>
			<Routes>
				{/*Paginas home y products para cualquier usuario */}
				<Route
					path="/"
					element={
						<Home>
							<WhatsappComponent />
						</Home>
					}
				/>
				<Route
					path="nosotros"
					element={
						<Nosotros>
							<WhatsappComponent />
						</Nosotros>
					}
				/>
				{/*Paginas para los productos y los cursos */}
				<Route
					path="products"
					element={
						<Products>
							<WhatsappComponent />
						</Products>
					}
				/>
				<Route path="productDetail" element={<ProductDetail />} />
				<Route
					path="cursos"
					element={
						<Cursos>
							<WhatsappComponent />
						</Cursos>
					}
				/>
				<Route path="cursoDetail" element={<CursoDetail />} />
				{/*Paginas de autenticacion para realizar el login, resgister, recuperacion de contraseñas */}
				<Route
					path="login"
					element={
						<Login>
							<WhatsappComponent />
						</Login>
					}
				/>
				<Route
					path="register"
					element={
						<Register>
							<WhatsappComponent />
						</Register>
					}
				/>
				<Route
					path="forget"
					element={
						<ForgotPassword>
							<WhatsappComponent />
						</ForgotPassword>
					}
				/>{" "}
				{/*Para enviar la solicitud del cambio de contraseña */}
				<Route
					path="changePassword"
					element={
						<ChangePassword>
							<WhatsappComponent />
						</ChangePassword>
					}
				/>{" "}
				{/*Para realizar el cambio de contraseña */}
				<Route
					path="confirmEmail"
					element={
						<ConfirmationEmail>
							<WhatsappComponent />
						</ConfirmationEmail>
					}
				/>{" "}
				{/*Para confirmar el Email */}
				{/*Pagina para el estudiante */}
				<Route
					path="student"
					element={
						userAuth && user.role === "Student" ? (
							<Estudiante />
						) : (
							<Navigate to={"/"} />
						)
					}
				/>
				{/*Paginas para agregar los cursos al carrito de compras, pagar y confirmar o no el pago */}
				<Route path="cart" element={<Cart />} />
				<Route path="order" element={<Order />} />{" "}
				{/*Pagina para realizar el pago */}
				<Route path="confirmPay" element={<ConfirmPay />} />{" "}
				{/*Pagina para realizar el pago */}
				<Route path="cancelPay" element={<CancelPayment />} />{" "}
				{/*Pagina para realizar el pago */}
				{/* <Route path="paymentPaypal" element={<PaymentPaypal />} /> */}
				{/*Pagina para realizar la administracion de la plataforma Capernova */}
				<Route
					path="admin"
					element={
						userAuth && user.role === "Admin" ? (
							<Administracion />
						) : (
							<Navigate to={"/"} />
						)
					}
				/>{" "}
				{/*  Pagina para Administrar la plataforma */}
				<Route
					path="teacher"
					element={
						userAuth && user.role === "Teacher" ? (
							<Profesor />
						) : (
							<Navigate to={"/"} />
						)
					}
				/>{" "}
				{/*Pagina para los profes la plataforma */}
				<Route
					path="secretary"
					element={
						userAuth && user.role === "Secretary" ? (
							<Secretaria />
						) : (
							<Navigate to={"/"} />
						)
					}
				/>{" "}
				{/*Pagina para la secretaria la plataforma */}
				{/* <Route path="certificado" element={<Certificado />} /> Pagina para Administrar la plataforma  */}
				<Route path="*" element={<PageNotFound />} />
				<Route path="error" element={<PageError />} />
				<Route path="termsAndConditions" element={<TerminosCondiciones />} />
				<Route path="privacy" element={<Privacidad />} />
			</Routes>
		</main>
	);
};
