import { useNavigate } from "react-router-dom";
import { ReactComponent as ErrorIcon } from "../../assets/icons/error.svg";

import "./errorMessage.css";

const ErrorMessage = () => {
	const navigate = useNavigate();

	return (
		<section className="error_section">
			<div className="error_message">
				<ErrorIcon />
				<span className="title">Oops! Something Went Wrong...</span>
				<span className="descr">
					We're working on it and we'll get it fixed as soon as we can.
				</span>
				<span className="reload" onClick={() => navigate(0)}>
					Try Again
				</span>
			</div>
		</section>
	);
};

export default ErrorMessage;
