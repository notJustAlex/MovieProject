import { IGenre } from "./genre.interface";

interface ICreatedBy {
	id: number;
	credit_id: string;
	name: string;
	gender: number;
	profile_path: string;
}

interface IEpisodeToAir {
	id: number;
	name: string;
	overview: string;
	vote_average: number;
	vote_count: number;
	air_date: string;
	episode_number: number;
	episode_type: string;
	production_code: string;
	runtime: number;
	season_number: number;
	show_id: number;
	still_path: string;
}

interface INetworks {
	id: number;
	logo_path: string;
	name: string;
	origin_country: string;
}

interface IProductionCountries {
	iso_3166_1: string;
	name: string;
}

interface IProductionCompany {
	id: number;
	logo_path: string;
	name: string;
	origin_country: string;
}

interface ISeason {
	air_date: string;
	episode_count: number;
	id: number;
	name: string;
	overview: string;
	poster_path: null | string;
	season_number: number;
	vote_average: number;
}

interface ISpokenLanguages {
	english_name: string;
	iso_639_1: string;
	name: string;
}

export interface IDetailSerie {
	adult: boolean;
	backdrop_path: string;
	created_by: ICreatedBy[];
	episode_run_time: number[];
	first_air_date: string;
	genres: IGenre[];
	homepage: string;
	id: number;
	in_production: boolean;
	languages: string[];
	last_air_date: string;
	last_episode_to_air: IEpisodeToAir;
	name: string;
	next_episode_to_air: IEpisodeToAir;
	networks: INetworks[];
	number_of_episodes: number;
	number_of_seasons: number;
	origin_country: string[];
	original_language: string;
	original_name: string;
	overview: string;
	popularity: number;
	poster_path: string;
	production_companies: IProductionCompany[];
	production_countries: IProductionCountries[];
	seasons: ISeason[];
	spoken_languages: ISpokenLanguages[];
	status: string;
	tagline: string;
	type: string;
	vote_average: number;
	vote_count: number;
}
