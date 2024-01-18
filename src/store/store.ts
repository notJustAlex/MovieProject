import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../reducer/reducer";

const store = configureStore({
	reducer: appReducer,
});

export default store;
