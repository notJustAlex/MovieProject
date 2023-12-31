import { useHttp } from "../hooks/http.hooks";

const useMovieService = () => {
    const {request, clearError, process, setProcess} = useHttp();

	const _apiBase = "https://api.themoviedb.org/3";
	const _apiKey = "api_key=0c28de39122147921d44d5fee667181b";

	const getRecomendedMovies = async (page) => {
		const res = await request(`${_apiBase}/trending/movie/day?${_apiKey}&page=${page}`);
        return res.results.map(item => _transformMovie(item));
	}

    const getMovie = async (id) => {
		const res = await request(`${_apiBase}/movie/${id}?${_apiKey}`);
		return _transformMovie(res);
	};

	const getMovieByTitle = async (title, page) => {
		const res = await request(`${_apiBase}/search/movie?${_apiKey}&query=${title}&page=${page}`);
		return res.results.map(item => _transformMovie(item));
	}

	const _transformMovie = (movie) => {
		return {
			id: movie.id,
			title: movie.title,
			description: movie.overview ? movie.overview: "There is no description for this movie",
			vote: movie.vote_average.toFixed(1),
			release_date: movie.release_date.split("-").reverse().join("-"),
			genres: movie.genres,
			icon: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'none',
			status: movie.status
		};
	};

	return {
		clearError,
		process,
		setProcess,
		getMovie,
		getRecomendedMovies,
		getMovieByTitle
	}
}

export default useMovieService;