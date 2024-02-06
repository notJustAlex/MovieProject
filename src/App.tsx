import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import NavMenu from "./components/Navmenu/NavMenu";
import MainPage from "./pages/MainPage/MainPage";
import SingleMoviePage from "./pages/SingleMoviePage/SingleMoviePage";
import ContactPage from "./pages/ContactPage/ContactPage";
import Layout from "./components/Layout";

function App() {
	return (
		<BrowserRouter>
			<NavMenu />
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<MainPage />} />
					<Route path="/:type/:id" element={<SingleMoviePage />} />
					<Route path="/contact" element={<ContactPage />} />
				</Route>
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
