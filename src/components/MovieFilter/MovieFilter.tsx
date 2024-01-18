import Slider from "react-slick";
import { useEffect, useState } from "react";
import { IGenre } from "../../assets/interfaces/genre.interface";
import MovieService from "../../service/MovieService";
import { useDispatch } from "react-redux";
import { changeActiveGenres } from "../../actions/actions";
import ScaleLoader from "react-spinners/ScaleLoader";

import "./movieFilter.css";

const MovieFilter = () => {
	const { setProcess, getAllGenres, process } = MovieService();

	const dispatch = useDispatch();

	const [genres, setGenres] = useState<IGenre[]>([]);
	const [activeGenres, setActiveGenres] = useState<number[]>([]);

	useEffect(() => {
		getFilters();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		dispatch(changeActiveGenres(activeGenres));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeGenres]);

	const getFilters = () => {
		getAllGenres()
			.then((genres: IGenre[]) => setGenres(genres))
			.then(() => setProcess("confirmed"))
			.catch(() => {
				setProcess("error");
			});
	};

	const renderMovieFilters = () => {
		if (!genres?.length) return null;

		return genres.map((genre) => {
			return (
				<span
					key={genre.id}
					className={
						activeGenres.includes(genre.id)
							? "filter_button active"
							: "filter_button"
					}
					onClick={() =>
						setActiveGenres((activeGenres) =>
							activeGenres.includes(genre.id)
								? activeGenres.filter((id) => id !== genre.id)
								: [...activeGenres, genre.id]
						)
					}
				>
					{genre.name}
				</span>
			);
		});
	};

	return (
		<div className="movie_filter_wrapper">
			{process !== "confirmed" ? (
				<div className="filter_spinner">
					<ScaleLoader
						loading={true}
						color={"#E50914"}
						height={38}
						width={20}
						aria-label="Loading Spinner"
						data-testid="loader"
					/>
				</div>
			) : (
				<Slider
					{...{
						slidesToShow: 8,
						slidesToScroll: 6,
						dots: false,
						arrows: true,
						autoplay: false,
						infinite: false,
						speed: 500,
						lazyLoad: "ondemand",
						responsive: [
							{
								breakpoint: 1630,
								settings: {
									slidesToShow: 6,
									slidesToScroll: 4,
								},
							},
							{
								breakpoint: 1250,
								settings: {
									slidesToShow: 4,
									slidesToScroll: 2,
								},
							},
						],
					}}
				>
					{renderMovieFilters()}
				</Slider>
			)}
		</div>
	);
};

export default MovieFilter;
