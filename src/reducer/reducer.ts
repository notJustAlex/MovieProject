import { createReducer } from "@reduxjs/toolkit";
import { changeActiveGenres } from "../actions/actions";

interface AppState {
	activeGenres: number[];
}

const initialState: AppState = {
	activeGenres: [],
};

const appReducer = createReducer(initialState, (builder) => {
	builder.addCase(changeActiveGenres, (state, action) => {
		state.activeGenres = action.payload;
	});
});

export default appReducer;
