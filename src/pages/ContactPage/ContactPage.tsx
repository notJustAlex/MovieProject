import useTitle from "../../hooks/useTitile";

import { ReactComponent as TriangleIcon } from "../../assets/icons/triangle.svg";
import { ReactComponent as InstagramIcon } from "../../assets/icons/Instagram.svg";
import { ReactComponent as FacebookIcon } from "../../assets/icons/Facebook.svg";
import { ReactComponent as LinkedInIcon } from "../../assets/icons/Linkedin.svg";
import { ReactComponent as TwitterIcon } from "../../assets/icons/Twitter.svg";
import { ReactComponent as YouTubeIcon } from "../../assets/icons/Youtube.svg";

import "./contactPage.css";

const ContactPage = () => {
	useTitle("Filbery | Contacts");

	return (
		<main className="contact">
			<section className="contact_section">
				<div className="wrapper">
					<h3 className="title">
						<TriangleIcon />
						Connect with us
					</h3>
					<span className="descr">
						Hello, dear guest of our site! You can send us a message on any
						topic using the contact form below. We will review your request and
						write you an answer within 24 hours. Thank you for choosing our
						site! Source: filmberry.com
					</span>

					<div className="inputs_wrapper">
						<input type="text" placeholder="Name *" required />
						<input type="text" placeholder="Email *" required />
						<textarea placeholder="Message" />
					</div>

					<div className="buttons_wrapper">
						<button className="submit">Send Message</button>

						<div className="icons_wrapper">
							<InstagramIcon title="Instagram" />
							<FacebookIcon title="Facebook" />
							<LinkedInIcon title="Linkedin" />
							<TwitterIcon title="Twitter" />
							<YouTubeIcon title="Youtube" />
						</div>
					</div>
				</div>
			</section>
		</main>
	);
};

export default ContactPage;
