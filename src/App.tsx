import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import NavMenu from "./components/Navmenu/NavMenu";
import MainPage from "./pages/MainPage/MainPage";
import SingleMoviePage from "./pages/SingleMoviePage/SingleMoviePage";
import ContactPage from "./pages/ContactPage/ContactPage";
import Layout from "./components/Layout";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

i18n
	.use(initReactI18next)
	.use(LanguageDetector)
	.use(HttpApi)
	.init({
		supportedLngs: ["en", "ua"],
		fallbackLng: "en",
		detection: {
			order: ["path", "htmlTag", "cookie", "localStorage", "subdomain"],
			caches: ["cookie"],
		},
		backend: {
			loadPath: "/assets/locales/{{lng}}/translation.json",
		},
	});

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
