import { useEffect, useRef, useState } from "react";
import MovieService from "../../service/MovieService";
import { useParams } from "react-router-dom";
import { IDetailMovie } from "../../assets/interfaces/detailed_movie.interface";
import YouTubeEmbed from "../../components/YouTubeEmber/YouTubeEmber";
import { IVideo } from "../../assets/interfaces/video.interface";
import CommentsSection from "../../components/YouTubeEmber/CommentsSection";
import MovieListItem from "../../components/MovieList/MovieListItem";
import { IGenre } from "../../assets/interfaces/genre.interface";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useTranslation } from "react-i18next";

import { ReactComponent as LikeIcon } from "../../assets/icons/thumb_up.svg";
import { ReactComponent as DislikeIcon } from "../../assets/icons/thumb_down.svg";
import { ReactComponent as TriangleIcon } from "../../assets/icons/triangle.svg";

import "./singleMoviePage.css";

const SingleMoviePage = () => {
	const {
		getMovieById,
		getRecommendedMovies,
		getMoviesVideoByID,
		getAllGenres,
		setProcess,
		clearError,
	} = MovieService();

	const { t } = useTranslation();

	const { type, id } = useParams();

	const [movie, setMovie] = useState<IDetailMovie | null>(null);
	const [video, setVideo] = useState<IVideo | null>(null);

	const [genres, setGenres] = useState<IGenre[]>([]);

	const idRef = useRef("");

	useEffect(() => {
		if (id && type) {
			getMovie(id, type);
			getVideo(id);
			getGenres();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (id && type && idRef.current !== id) {
			getMovie(id, type);
			idRef.current = id;
			window.scrollTo({
				top: 0,
				behavior: "smooth",
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	const getMovie = (id: string, type: string) => {
		clearError();
		getMovieById(id, type)
			.then((movie: IDetailMovie) => setMovie(movie))
			.then(() => setProcess("confirmed"))
			.catch(() => {
				setProcess("error");
			});
	};

	const getVideo = (id: string) => {
		getMoviesVideoByID(id)
			.then((video: IVideo) => setVideo(video))
			.then(() => setProcess("confirmed"))
			.catch(() => {
				setProcess("error");
			});
	};

	const getGenres = () => {
		getAllGenres()
			.then((genres: IGenre[]) => setGenres(genres))
			.then(() => setProcess("confirmed"))
			.catch(() => {
				setProcess("error");
			});
	};

	if (!movie || !genres || !id || !type)
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
		<main className="single_movie_page">
			<section className="movie_section">
				<div className="movie_wrapper">
					<div className="img_wrapper">
						<span key={movie.genres[0].id} className="genre">
							{movie.genres[0].name}
						</span>
						<img
							src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
							alt={movie?.original_title}
						/>
					</div>

					<div className="text_wrapper">
						<h3 className="title">{movie.original_title}</h3>
						<div className="details_wrapper">
							<span className="time">
								{t("single_movie_descr_time")} -{" "}
								<span>{Math.floor(movie.runtime / 60)}h</span>{" "}
								<span>{Math.round(movie.runtime % 60)}m</span>
							</span>
							<span className="release_date">
								{t("single_movie_descr_date")} -{" "}
								<span>{movie?.release_date?.split("-")[0]}</span>
							</span>
							<span className="genres">
								{t("single_movie_descr_genres")} -{" "}
								{movie.genres.map((genre, index) => (
									<span key={genre.id}>
										{genre.name}
										{index === movie.genres.length - 1 ? "" : ", "}
									</span>
								))}
							</span>
							<span className="language">
								{t("single_movie_descr_language")} -{" "}
								<span>{movie.original_language}</span>
							</span>
						</div>

						<div className="review_wrapper">
							{Math.round(movie.vote_average * 10)}%{" "}
							{t("single_movie_descr_review")}
							<span>
								<LikeIcon />
							</span>
							<span>
								<DislikeIcon />
							</span>
						</div>

						<button
							className="watch"
							onClick={() =>
								window.open(`https://www.youtube.com/watch?v=${video?.key}`)
							}
							disabled={!video}
						>
							<TriangleIcon />
							{t("single_movie_descr_button_text")}
						</button>
					</div>
				</div>

				<div className="about_wrapper">
					<h3 className="title">{t("single_movie_title_about")}</h3>
					<span className="descr">{movie.overview}</span>
				</div>

				{video && (
					<div className="trailer_wrapper">
						<YouTubeEmbed videoId={video.key} />
					</div>
				)}
				{video && (
					<div className="comments_section">
						<CommentsSection videoId={video.key} />
					</div>
				)}

				<div className="recommended_movies">
					<h3 className="title">
						<TriangleIcon />
						{t("single_movie_title_more_like")}
					</h3>
					<MovieListItem
						type="movie"
						func={getRecommendedMovies}
						genres={genres}
						movieFilter={false}
						settings={{ slidesToShow: 4.5, slidesToScroll: 2 }}
					/>
				</div>
			</section>
		</main>
	);
};

export default SingleMoviePage;
