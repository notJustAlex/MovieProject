import { useNavigate } from "react-router-dom";
import { IMovie } from "../../assets/interfaces/movie.interface";
import { ISerie } from "../../assets/interfaces/serie.interface";

interface IProps {
	movie: IMovie | ISerie;
	setTerm: (term: string) => void;
	setActiveSearchBar: (active: boolean) => void;
}

const SearchMovieItem = ({ movie, setTerm, setActiveSearchBar }: IProps) => {
	const navigate = useNavigate();

	function isMovie(obj: IMovie | ISerie): obj is IMovie {
		return "original_title" in obj;
	}

	return isMovie(movie) ? (
		<div
			className="movie"
			key={movie.id}
			onClick={() => {
				navigate(`/movie/${movie.id}`);
				setActiveSearchBar(false);
			}}
		>
			{movie.poster_path ? (
				<img
					src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
					alt={movie.original_title}
					loading="lazy"
				/>
			) : (
				<div className="img_plug"></div>
			)}

			<span className="title">
				{movie.title}
				<span className="divider">|</span>
				<span className="vote">{movie.vote_average.toFixed(1)}</span>
			</span>
		</div>
	) : (
		<div
			className="movie"
			key={movie.id}
			onClick={() => {
				navigate(`/serie/${movie.id}`);
				setActiveSearchBar(false);
			}}
		>
			{movie.poster_path ? (
				<img
					src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
					alt={movie.original_name}
					loading="lazy"
				/>
			) : (
				<div className="img_plug"></div>
			)}

			<span className="title">
				{movie.original_name}
				<span className="divider">|</span>
				<span className="vote">{movie.vote_average.toFixed(1)}</span>
			</span>
		</div>
	);
};

export default SearchMovieItem;
