import {createSlice} from '@reduxjs/toolkit';

const searchSlice = createSlice({
    name:'search',
    initialState:{
        searchCourse:'',
    },
    reducers:{
        search(state,action){
            return {...state, searchCourse:action.payload}
        },
        remove(state,action){
            return {...state, searchCourse:''}
        }
    }
});

export const {search,remove} = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
