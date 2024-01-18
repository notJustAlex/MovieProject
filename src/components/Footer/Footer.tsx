import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";

import { ReactComponent as LogoIcon } from "../../assets/icons/logo.svg";

import "./footer.css";
import { useTranslation } from "react-i18next";

const Footer = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();

	return (
		<footer className="footer">
			<div className="text_wrapper">
				<div className="company_wrapper">
					<LogoIcon
						onClick={() => {
							navigate("/");
							window.scrollTo({
								top: 0,
								behavior: "smooth",
							});
						}}
					/>
					<span>{t("footer_rights")}</span>
				</div>
				<div className="contacts_wrapper">
					<div className="list">
						<span className="title">{t("footer_contacts_title")}</span>
						<ul className="pages">
							<li>
								<Link to="home" smooth={true} duration={500}>
									{t("footer_contacts_page_home")}{" "}
								</Link>
							</li>
							<li>
								<Link to="movies" smooth={true} duration={500}>
									{t("footer_contacts_page_movies")}{" "}
								</Link>
							</li>
							<li>
								<Link to="movies" smooth={true} duration={500}>
									{t("footer_contacts_page_top_movies")}{" "}
								</Link>
							</li>
							<li>
								<Link to="series" smooth={true} duration={500}>
									{t("footer_contacts_page_series")}
								</Link>
							</li>
						</ul>
					</div>
					<div className="list">
						<span className="title">{t("footer_network_title")}</span>
						<ul className="networks">
							<li>
								<span>Telegram</span>
							</li>
							<li>
								<span>Instagram</span>
							</li>
							<li>
								<span>Facebook</span>
							</li>
							<li>
								<span>YouTube</span>
							</li>
						</ul>
					</div>
					<div className="list">
						<span className="title">{t("footer_reference_title")}</span>
						<ul className="reference">
							<li>
								<span>Telegram</span>
							</li>
							<li>
								<span>Instagram</span>
							</li>
							<li>
								<span>Whatsapp</span>
							</li>
							<li>
								<span>Skype</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<span className="policies">© Filmberry.com - 2023</span>
		</footer>
	);
};

export default Footer;
