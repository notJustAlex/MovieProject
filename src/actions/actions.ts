import { createAction } from "@reduxjs/toolkit";

export const changeActiveGenres = createAction<number[]>(
	"CHANGE_ACTIVE_GENRES"
);
