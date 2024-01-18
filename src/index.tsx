import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";
import ScaleLoader from "react-spinners/ScaleLoader";

const loadingMarkup = (
	<div className="spinner_wrapper">
		<ScaleLoader
			loading={true}
			color={"#E50914"}
			height={85}
			width={20}
			aria-label="Loading Spinner"
			data-testid="loader"
		/>
	</div>
);

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<Suspense fallback={loadingMarkup}>
		<React.StrictMode>
			<Provider store={store}>
				<App />
			</Provider>
		</React.StrictMode>
	</Suspense>
);
