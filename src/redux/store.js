import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cartSlice";
import { userReducer } from "./userSlice";
import { searchReducer } from "./searchCourseSlice";
import { courseReducer } from "./courseSlice";



export const store = configureStore({
   reducer:{
    cartState:cartReducer,
    userState:userReducer,
    searchState: searchReducer,
    courseState: courseReducer,
   },
});
