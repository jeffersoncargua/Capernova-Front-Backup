import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState :{
        cartList : [],
        total : 0
    },
    reducers:{
        addToCart(state,action){
            console.log(action.payload);
            const updatedCartList = state.cartList.concat(action.payload);
            const total = state.total + action.payload.precio;         
            return {...state, total:parseFloat(total.toFixed(2)), cartList:updatedCartList}
        },
        removeToCart(state,action){
            const updatedCartList = state.cartList.filter(item => item.id !== action.payload.id);
            const total = state.total - action.payload.precio;
            return {...state, total:parseFloat(total.toFixed(2)), cartList:updatedCartList} 
        }
    }
});

export const {addToCart,removeToCart} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;


