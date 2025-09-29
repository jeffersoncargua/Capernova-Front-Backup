import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
	name: "order",
	initialState: {
		order: {
			name: "",
			lastName: "",
			phone: "",
			email: "",
			id: "",
			directionMain: "",
			directionSec: "",
		},
	},
	reducers: {
		createOrder(state, action) {
			const newOrder = {
				name: action.payload.name,
				lastName: action.payload.lastName,
				phone: action.payload.phone,
				email: action.payload.email,
				id: action.payload.id,
				directionMain: action.payload.directionMain,
				directionSec: action.payload.directionSec,
			};
			return { ...state, order: newOrder };
		},
		cancelOrder(state) {
			const cancel = {
				name: "",
				lastName: "",
				phone: "",
				email: "",
				id: "",
				directionMain: "",
				directionSec: "",
			};
			return { ...state, order: cancel };
		},
		clearOrder(state) {
			const clear = {
				name: "",
				lastName: "",
				phone: "",
				email: "",
				id: "",
				principalDir: "",
				directionSec: "",
			};
			return { ...state, order: clear };
		},
	},
});

export const { createOrder, cancelOrder, clearOrder } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
