import MovieService from "../../service/MovieService";
import MovieListItem from "./MovieListItem";
import MovieFilter from "../MovieFilter/MovieFilter";
import { useEffect, useState } from "react";
import { IGenre } from "../../assets/interfaces/genre.interface";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { ReactComponent as TriangleIcon } from "../../assets/icons/triangle.svg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./movieList.css";

const MovieList = () => {
	const {
		getPopularMovies,
		getAllGenres,
		getRecommendedMovies,
		getPopularSeries,
		getCartoons,
		setProcess,
	} = MovieService();

	const { t } = useTranslation();

	const activeGenres = useSelector(
		(state: { activeGenres: number[] }) => state.activeGenres
	);
	const [genres, setGenres] = useState<IGenre[]>([]);

	useEffect(() => {
		getGenres();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getGenres = () => {
		getAllGenres()
			.then((genres: IGenre[]) => setGenres(genres))
			.then(() => setProcess("confirmed"))
			.catch(() => {
				setProcess("error");
			});
	};

	const renderMovieListSections = () => {
		const movieListData = [
			{
				translation: "movie_list_title_recommended",
				key: "Recommended",
				type: "movie",
				func: getRecommendedMovies,
				movieFilter: true,
			},
			{
				translation: "movie_list_title_popular",
				key: "Popular",
				type: "movie",
				func: getPopularMovies,
				movieFilter: false,
			},
			{
				translation: "movie_list_title_series",
				key: "Series",
				type: "serie",
				func: getPopularSeries,
				movieFilter: false,
			},
			{
				translation: "movie_list_title_cartoons",
				key: "Cartoons",
				type: "serie",
				func: getCartoons,
				movieFilter: false,
			},
		];

		return Object.values(movieListData).map((item) => {
			return (
				<div className={`movie_section ${item.type}s`} key={item.key}>
					<h3 className="title">
						<TriangleIcon />
						{t(item.translation)}
					</h3>
					<MovieListItem
						func={item.func}
						type={item.type}
						movieFilter={item.movieFilter}
						genres={genres}
						activeGenres={activeGenres}
					/>
				</div>
			);
		});
	};

	return (
		<section className="movie_list" id="movies">
			<MovieFilter />
			<div className="divider"></div>
			<div className="movie_list_sections">{renderMovieListSections()}</div>
		</section>
	);
};

export default MovieList;
