import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: {
		user: {
			nameIdentifier: "",
			unique_name: "",
			role: "",
			name: "",
			lastName: "",
		},
		isAuth: false,
	},
	reducers: {
		signIn(state, action) {
			const newUser = {
				nameIdentifier: action.payload.id,
				unique_name: action.payload.unique_name,
				role: action.payload.role,
				name: action.payload.name,
				lastName: action.payload.lastName,
			};
			return { ...state, user: newUser, isAuth: true };
		},
		logout(state, action) {
			const userLogout = {
				nameIdentifier: "",
				unique_name: "",
				role: "",
				name: "",
				lastName: "",
			};
			return { ...state, user: userLogout, isAuth: false };
		},
	},
});

export const { signIn, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
