import Slider from "react-slick";
import MovieService from "../../service/MovieService";
import { memo, useEffect, useRef, useState } from "react";
import { IMovie } from "../../assets/interfaces/movie.interface";
import { IGenre } from "../../assets/interfaces/genre.interface";
import { ISerie } from "../../assets/interfaces/serie.interface";
import { useNavigate } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";

import { ReactComponent as StarIcon } from "../../assets/icons/littleStar.svg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface IProps {
	func: (page: number, genres?: number[]) => Promise<IMovie[]>;
	genres?: IGenre[];
	movieFilter: boolean;
	settings?: { [key: string]: number | string | boolean };
	type: string;
	activeGenres?: number[];
}

const MovieListItem = memo(
	({ func, genres, movieFilter, settings, type, activeGenres }: IProps) => {
		const { setProcess, clearError, process } = MovieService();

		const navigate = useNavigate();

		const [movies, setMovies] = useState<IMovie[]>([]);
		const [page, setPage] = useState(2);

		const [sliderStatus, setSliderStatus] = useState<"loading" | "confirmed">(
			"loading"
		);

		const isCalledRef = useRef(false);
		const activeGenresRef = useRef<number[]>([]);

		useEffect(() => {
			if (!isCalledRef.current) {
				isCalledRef.current = true;
				getMovies(1);
			} else if (
				activeGenres &&
				movieFilter &&
				activeGenresRef.current !== activeGenres
			) {
				setSliderStatus("loading");
				setMovies([]);
				setPage(1);
				activeGenresRef.current = activeGenres;
				getMovies(1, activeGenres);
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [activeGenres]);

		const getMovies = (page: number = 1, genres: number[] = []) => {
			clearError();
			func(page, genres)
				.then((newMovies: IMovie[]) =>
					setMovies((prevMovies) => [...prevMovies, ...newMovies])
				)
				.then(() => {
					setProcess("confirmed");
					setSliderStatus("confirmed");
				})
				.catch(() => {
					setProcess("error");
				});
		};

		function isMovie(obj: IMovie | ISerie): obj is IMovie {
			return "original_title" in obj;
		}

		return (
			<div className="movie_list_item">
				{sliderStatus === "loading" ? (
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
				) : (
					<Slider
						{...{
							dots: false,
							arrows: true,
							autoplay: false,
							infinite: false,
							speed: 500,
							slidesToShow: 6.5,
							slidesToScroll: 4,
							lazyLoad: "ondemand",
							afterChange: (currentSlide: number) => {
								const totalSlides = movies.length;
								if (currentSlide + 8.5 >= totalSlides) {
									setPage((page) => ++page);
									getMovies(page);
								}
							},
							responsive: [
								{
									breakpoint: 1800,
									settings: {
										slidesToShow: 5.5,
										slidesToScroll: 3,
										afterChange: (currentSlide: number) => {
											const totalSlides = movies.length;
											if (currentSlide + 7.5 >= totalSlides) {
												setPage((page) => ++page);
												getMovies(page);
											}
										},
									},
								},
								{
									breakpoint: 1500,
									settings: {
										slidesToShow: 4.5,
										slidesToScroll: 2.5,
										afterChange: (currentSlide: number) => {
											const totalSlides = movies.length;
											if (currentSlide + 6.5 >= totalSlides) {
												setPage((page) => ++page);
												getMovies(page);
											}
										},
									},
								},
							],
							...settings,
						}}
					>
						{movies.length === 0 && process === "confirmed" && (
							<div className="slide_wrapper loading_slide">
								<div className="text_wrapper">
									<span className="title">No results...</span>
									<span className="descr">Try removing some filters</span>
								</div>
							</div>
						)}
						{movies.map((movie: IMovie | ISerie, index: number) => {
							const movieGenre = movie.genre_ids
								.slice(0, 1)
								.map((genreId: number) => {
									return genres?.find((genre) => genre.id === genreId)?.name;
								});

							return (
								<div
									className="slide_wrapper"
									key={index}
									onClick={() => navigate(`/${type}/${movie.id}`)}
								>
									{isMovie(movie) && movie?.poster_path ? (
										<img
											src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
											alt={movie.original_title}
											loading="lazy"
										/>
									) : !isMovie(movie) && movie?.poster_path ? (
										<img
											src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
											alt={movie.original_name}
											loading="lazy"
										/>
									) : null}
									<div className="text_wrapper">
										<span className="genre">{movieGenre}</span>
										<div className="rating">
											{Array.from(
												{ length: Math.floor(movie.vote_average / 2) },
												(_, index) => (
													<StarIcon key={index} />
												)
											)}
											{movie.vote_average - Math.floor(movie.vote_average) >
												0 && (
												<StarIcon
													viewBox={`0 0 ${
														(movie.vote_average -
															Math.floor(movie.vote_average)) *
														15
													} 16`}
													width={
														(movie.vote_average -
															Math.floor(movie.vote_average)) *
														15
													}
													key="decimal"
													className="decimal"
												/>
											)}
										</div>
										{isMovie(movie) ? (
											<span className="title">{movie.original_title}</span>
										) : (
											<span className="title">{movie.original_name}</span>
										)}
									</div>
								</div>
							);
						})}
					</Slider>
				)}
			</div>
		);
	}
);

export default MovieListItem;
