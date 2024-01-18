import { IGenre } from "./genre.interface";

interface IProductionCompany {
	id: number;
	logo_path: string;
	name: string;
	origin_country: string;
}

interface IProductionCountries {
	iso_3166_1: string;
	name: string;
}

interface ISpokenLanguages {
	english_name: string;
	iso_639_1: string;
	name: string;
}

export interface IDetailMovie {
	adult: boolean;
	backdrop_path: string;
	belongs_to_collection: {
		id: number;
		name: string;
		poster_path: string;
		backdrop_path: string;
	};
	budget: number;
	genres: IGenre[];
	homepage: string;
	id: number;
	imdb_id: string;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	production_companies: IProductionCompany[];
	production_countries: IProductionCountries[];
	release_date: string;
	revenue: number;
	runtime: number;
	spoken_languages: ISpokenLanguages[];
	status: string;
	tagline: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}
