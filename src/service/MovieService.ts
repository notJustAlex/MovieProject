import { IGenre } from "../assets/interfaces/genre.interface";
import { IMovie } from "../assets/interfaces/movie.interface";
import { ISerie } from "../assets/interfaces/serie.interface";
import { IVideo } from "../assets/interfaces/video.interface";
import { useHttp } from "../hooks/http.hooks";

const useMovieService = () => {
	const {
		request,
		clearError,
		process: requestProcess,
		setProcess,
	} = useHttp();

	const _apiBase = "https://api.themoviedb.org/3";
	const _TMDBApiKey = process.env.REACT_APP_TMDB_API_KEY;
	const _YouTubeApiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

	const getAllGenres = async () => {
		const movieGenresResponse = await request(
			`${_apiBase}/genre/movie/list?api_key=${_TMDBApiKey}`
		);
		const movieGenres: IGenre[] = movieGenresResponse.genres;

		const tvGenresResponse = await request(
			`${_apiBase}/genre/tv/list?api_key=${_TMDBApiKey}`
		);
		const tvGenres: IGenre[] = tvGenresResponse.genres;

		return [
			...new Map(
				[...movieGenres, ...tvGenres].map((genre) => [genre.id, genre])
			).values(),
		];
	};

	const getPopularMovies = async (page: number = 1) => {
		const res = await request(
			`${_apiBase}/trending/movie/day?api_key=${_TMDBApiKey}&page=${page}`
		);
		return res.results;
	};

	const getRecommendedMovies = async (
		page: number = 1,
		genres: number[] = []
	) => {
		const res = await request(
			`${_apiBase}/discover/movie?api_key=${_TMDBApiKey}&language=en&page=${page}&sort_by=vote_count.desc&with_genres=${genres.join(
				","
			)}`
		);
		return res.results;
	};

	const getMovieById = async (id: string, type: string) => {
		const res =
			type === "movie"
				? await request(`${_apiBase}/movie/${id}?api_key=${_TMDBApiKey}`)
				: await request(`${_apiBase}/tv/${id}?api_key=${_TMDBApiKey}`);

		return res;
	};

	const getMoviesVideoByID = async (id: string) => {
		const res = await request(
			`${_apiBase}/movie/${id}/videos?api_key=${_TMDBApiKey}`
		);

		if (!res) return null;

		const result: IVideo | undefined = res?.results.find(
			(video: IVideo) => video.name === "Official Trailer"
		);

		return result || res.results[0];
	};

	const getMoviesCommentsByID = async (id: string, pageToken: string = "") => {
		const res = await request(
			`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${id}&key=${_YouTubeApiKey}&pageToken=${pageToken}`
		);

		return res;
	};

	const getMovieByTitle = async (title: string) => {
		const moviesResponse = await request(
			`${_apiBase}/search/movie?api_key=${_TMDBApiKey}&query=${title}`
		);
		const movies: IMovie[] = moviesResponse.results;

		const tvResponse = await request(
			`${_apiBase}/search/tv?api_key=${_TMDBApiKey}&query=${title}`
		);
		const tv: ISerie[] = tvResponse.results;

		return [...movies, ...tv];
	};

	const getPopularSeries = async (page: number = 1) => {
		const res = await request(
			`${_apiBase}/tv/popular?api_key=${_TMDBApiKey}&language=en&page=${page}`
		);
		return res.results;
	};

	const getCartoons = async (page: number = 1) => {
		const res = await request(
			`${_apiBase}/discover/tv?api_key=${_TMDBApiKey}&include_adult=false&include_null_first_air_dates=false&language=en&page=${page}&sort_by=popularity.desc&with_genres=10762`
		);
		return res.results;
	};

	return {
		clearError,
		process: requestProcess,
		setProcess,
		getAllGenres,
		getPopularMovies,
		getPopularSeries,
		getRecommendedMovies,
		getCartoons,
		getMovieById,
		getMoviesVideoByID,
		getMoviesCommentsByID,
		getMovieByTitle,
	};
};

export default useMovieService;
