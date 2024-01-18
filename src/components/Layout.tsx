import { Outlet } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import MovieService from "../service/MovieService";

const Layout = () => {
	const { process } = MovieService();

	return (
		<>
			{process === "error" && <ErrorMessage />}

			<Outlet />
		</>
	);
};
export default Layout;
