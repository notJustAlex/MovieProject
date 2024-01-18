import { useState, useRef, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-scroll";
import { useLocation, useNavigate } from "react-router-dom";
import { IMovie } from "../../assets/interfaces/movie.interface";
import MovieService from "../../service/MovieService";
import { useTranslation } from "react-i18next";
import { ISerie } from "../../assets/interfaces/serie.interface";
import SearchMovieItem from "./SearchMovieItem";
import i18next from "i18next";
import cookies from "js-cookie";

import { ReactComponent as LogoIcon } from "../../assets/icons/logo.svg";
import { ReactComponent as CaretIcon } from "../../assets/icons/caret.svg";
import { ReactComponent as LangaugeIcon } from "../../assets/icons/language.svg";
import { ReactComponent as BellIcon } from "../../assets/icons/bell.svg";
import { ReactComponent as MagnifierIcon } from "../../assets/icons/magnifier.svg";
import { ReactComponent as ClouseIcon } from "../../assets/icons/close.svg";
import { ReactComponent as TriangleIcon } from "../../assets/icons/triangle.svg";

import "./navMenu.css";

const languages = [
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

const NavMenu = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { t } = useTranslation();

	const { getMovieByTitle, setProcess } = MovieService();

	const [activeLink, setActiveLink] = useState("Home");

	const [activeSearchBar, setActiveSearchBar] = useState(false);
	const [term, setTerm] = useState("");
	const [movies, setMovies] = useState<(IMovie | ISerie)[]>([]);

	const navAnimationRef = useRef(null);
	const searchInputAnimationRef = useRef(null);
	const searchInputMovieListAnimationRef = useRef(null);

	useEffect(() => {
		if (location.pathname !== "/") setActiveLink("");
	}, [location.pathname]);

	useEffect(() => {
		if (term !== "") getMovies(term);

		if (term === "") setMovies([]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [term]);

	const renderLinks = () => {
		const linksArr = [
			{
				name: "Home",
				translation: "nav_menu_links_home",
			},
			{
				name: "Movies",
				translation: "nav_menu_links_movies",
			},
			{
				name: "Series",
				translation: "nav_menu_links_series",
			},
		];
		const onClick = (item: string) => {
			if (item === "Home" && location.pathname !== "/") {
				navigate("/");
				setActiveLink(item);
			}

			setActiveLink(item);
		};

		return linksArr.map((item) => {
			return (
				<li className="nav_link_wrapper" key={`link_wrapper_${item.name}`}>
					{activeLink === item.name ? (
						<TriangleIcon />
					) : (
						<div style={{ width: "9px" }}></div>
					)}
					<Link
						smooth={true}
						duration={500}
						spy={true}
						to={item.name.toLowerCase()}
						key={`nav_link_${item}`}
						className={"nav_link"}
						onClick={() => onClick(item.name)}
						activeClass="active"
						onSetActive={() => setActiveLink(item.name)}
					>
						{t(item.translation)}
					</Link>
				</li>
			);
		});
	};

	const getMovies = (title: string) => {
		getMovieByTitle(title)
			.then((movies: (IMovie | ISerie)[]) => setMovies(movies))
			.then(() => setProcess("confirmed"))
			.catch(() => {
				setProcess("error");
			});
	};

	return (
		<div className="nav_menu">
			<div className="logo">
				<LogoIcon onClick={() => navigate("/")} />
			</div>

			<nav className="nav_wrapper">
				<CSSTransition
					unmountOnExit
					timeout={200}
					in={!activeSearchBar}
					classNames="nav_animation"
					nodeRef={navAnimationRef}
				>
					<ul className="nav" ref={navAnimationRef}>
						{renderLinks()}
						{/* <li className="list_menu">
							<div className="dropdown">
								<button className="dropbtn">
									<span>{t("nav_menu_links_my_list")}</span>
									<CaretIcon />
								</button>
								<div className="dropdown-content">
									{/*content*/
						/*content*/
						/*content
								</div>
							</div>
						</li> */}
					</ul>
				</CSSTransition>

				<CSSTransition
					unmountOnExit
					timeout={200}
					in={activeSearchBar}
					classNames="search_input_animation"
					nodeRef={searchInputAnimationRef}
					onEnter={() =>
						(
							searchInputAnimationRef?.current as HTMLInputElement | null
						)?.focus()
					}
				>
					<>
						<div
							className="close_tab"
							onClick={() => {
								setActiveSearchBar(!activeSearchBar);
							}}
						></div>
						<div className="search_input_wrapper">
							<input
								type="text"
								className="search_input"
								autoComplete="off"
								onChange={(e) => setTerm(e.target.value)}
								value={term}
								placeholder="Find movie..."
								ref={searchInputAnimationRef}
							/>
							<CSSTransition
								unmountOnExit
								timeout={0}
								in={movies.length > 0 && activeSearchBar ? true : false}
								classNames="search_input_movie_list_animation"
								nodeRef={searchInputMovieListAnimationRef}
							>
								<div
									className="movie_list"
									ref={searchInputMovieListAnimationRef}
								>
									{movies?.splice(0, 10).map((movie: IMovie | ISerie) => {
										return (
											<SearchMovieItem
												movie={movie}
												setTerm={setTerm}
												setActiveSearchBar={setActiveSearchBar}
												key={movie.id}
											/>
										);
									})}
								</div>
							</CSSTransition>
						</div>
					</>
				</CSSTransition>

				<ul className="icons">
					<li className="search">
						{activeSearchBar ? (
							<ClouseIcon
								onClick={() => {
									setTerm("");
									setActiveSearchBar(!activeSearchBar);
								}}
							/>
						) : (
							<MagnifierIcon
								onClick={() => setActiveSearchBar(!activeSearchBar)}
							/>
						)}
					</li>

					<li className="notification" onClick={() => navigate("./contact")}>
						<BellIcon />
					</li>

					<li className="language_menu">
						<div className="dropdown">
							<button className="dropbtn">
								<LangaugeIcon />
								<span>{cookies.get("i18next")?.toUpperCase() || "EN"}</span>
								<CaretIcon />
							</button>
							<div className="dropdown-content">
								{languages.map(({ code, title }) => (
									<button
										className="dropdown_item"
										key={code}
										title={title}
										onClick={() => i18next.changeLanguage(code)}
										disabled={code === cookies.get("i18next")}
									>
										{code}
									</button>
								))}
							</div>
						</div>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default NavMenu;
