import { useEffect, useRef, useState } from "react";
import MovieService from "../../service/MovieService";
import Slider from "react-slick";
import { IMovie } from "../../assets/interfaces/movie.interface";
import { IGenre } from "../../assets/interfaces/genre.interface";
import MovieList from "../../components/MovieList/MovieList";
import { useNavigate } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";

import { ReactComponent as StarIcon } from "../../assets/icons/star.svg";
import { ReactComponent as TriangleIcon } from "../../assets/icons/triangle.svg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./mainPage.css";

const MainPage = () => {
	const { getPopularMovies, getAllGenres, setProcess, clearError, process } =
		MovieService();

	const navigate = useNavigate();

	const [movies, setMovies] = useState<IMovie[] | null>(null);
	const [genres, setGenres] = useState<IGenre[] | null>(null);

	const isCalledRef = useRef(false);

	useEffect(() => {
		if (!isCalledRef.current) {
			isCalledRef.current = true;
			getMovies();
			getFilters();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getMovies = (page: number = 1) => {
		clearError();
		getPopularMovies(page)
			.then((movies: IMovie[]) => setMovies(movies))
			.then(() => setProcess("confirmed"))
			.catch(() => {
				setProcess("error");
			});
	};

	const getFilters = () => {
		clearError();
		getAllGenres()
			.then((genres: IGenre[]) => setGenres(genres))
			.then(() => setProcess("confirmed"))
			.catch(() => {
				setProcess("error");
			});
	};

	const renderSlides = () => {
		if (!movies) return null;

		return movies?.slice(0, 3).map((movie: IMovie, index: number) => {
			return (
				<div className="slide_wrapper" key={index}>
					<img
						src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
						alt={movie.original_title}
						loading="lazy"
					/>

					<div className="text_wrapper">
						<span className="top">TOP</span>
						<h1 className="title">{movie.original_title}</h1>
						<div className="descr">{movie.overview}</div>

						<div className="info_wrapper">
							<span>{movie.release_date.split("-")[0]}</span>
							<span className="divider">|</span>
							<span className="age">{movie.adult ? "18+" : "16+"}</span>
							<span className="divider">|</span>
							<span>Movie</span>
						</div>

						<div className="genres_wrapper">
							<div className="score_wrapper">
								<StarIcon />
								<span className="sore">{movie.vote_average.toFixed(1)}</span>
							</div>
							<span className="genres">
								- Genre {renderGenres(movie.genre_ids)}
							</span>
						</div>

						<button
							type="button"
							className="watch_button"
							onClick={() => navigate(`/movie/${movie.id}`)}
						>
							<TriangleIcon />
							WATCH
						</button>
					</div>
				</div>
			);
		});
	};

	const renderGenres = (genreIds: number[]) => {
		if (!genres?.length || !genreIds) return null;

		const genreNames = genres
			.filter((genre) => genreIds.includes(genre.id))
			.map((genre) => genre.name.toLowerCase());

		return genreNames.map((genre, index) => (
			<span className="genre" key={genre}>
				{genre}
				{index === genreNames.length - 1 ? "" : ", "}
			</span>
		));
	};

	if (process === "loading")
		return (
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

	return (
		<main className="main_page">
			<section className="main" id="home">
				<div style={{ height: "100vh", width: "100%" }}>
					<Slider
						{...{
							slidesToShow: 1,
							slidesToScroll: 1,
							dots: true,
							arrows: false,
							autoplay: true,
							autoplaySpeed: 15000,
							infinite: true,
							speed: 500,
						}}
					>
						{renderSlides()}
					</Slider>
				</div>
			</section>
			<MovieList />
		</main>
	);
};

export default MainPage;
