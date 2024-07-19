import { createSlice } from "@reduxjs/toolkit";


const courseSlice = createSlice({
    name: "course",
    initialState :{
        courseList:[],
    },
    reducers:{
        getCourse(state,action){  
            
        },
        removeCourse(state,action){
            
        }
    }
});

export const {getCourse,removeCourse} = courseSlice.actions;
export const courseReducer = courseSlice.reducer;