import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cartSlice";
import { courseReducer } from "./courseSlice";
import { orderReducer } from "./orderSlice";
import { playListReducer } from "./playlistSlice";
import { searchReducer } from "./searchProductSlice";
import { userReducer } from "./userSlice";

export const store = configureStore({
	reducer: {
		cartState: cartReducer,
		userState: userReducer,
		searchState: searchReducer,
		courseState: courseReducer,
		orderState: orderReducer,
		playListState: playListReducer,
	},
});
