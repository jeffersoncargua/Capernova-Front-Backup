import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState:{
        user:{
            unique_name : '',
            role : ''
        },
        isAuth:false
    },
    reducers:{
        signIn(state,action){
            const newUser = {unique_name:action.payload.unique_name, role:action.payload.role};
            return {...state, user:newUser,isAuth:true}
        },
        logout(state,action){
            const userLogout = {unique_name:'',role:''}
            return {...state, user:userLogout, isAuth:false}
        }
    }
});

export const {signIn,logout} = userSlice.actions;
export const userReducer = userSlice.reducer;