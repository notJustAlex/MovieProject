import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

export const languages = [
	{
		code: "en",
		name: "English",
		title: "English",
	},
	{
		code: "ua",
		name: "Ukrainian",
		title: "Українська",
	},
];

i18n
	.use(initReactI18next)
	.use(LanguageDetector)
	.use(HttpApi)
	.init({
		supportedLngs: languages.map((language) => language.code),
		fallbackLng: "en",
		detection: {
			order: ["path", "htmlTag", "cookie", "localStorage", "subdomain"],
			caches: ["cookie"],
		},
		backend: {
			loadPath: "/assets/locales/{{lng}}/translation.json",
		},
	});

export default i18n;
