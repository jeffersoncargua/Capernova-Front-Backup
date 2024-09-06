import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState :{
        cartList : [],
        total : 0
    },
    reducers:{
        addToCart(state,action){
            
            const cartItem = state.cartList.find(item => item.id === action.payload.id);
             
            //console.log(cartItem);
            
            if (cartItem) {
                //console.log(cartItem.cantidad);
                //console.log(cartItem.precio);
                state.total = state.total - (cartItem.cantidad* cartItem.precio);
                state.cartList.map((item) => item.id === action.payload.id ? {...item, cantidad:item.cantidad = action.payload.cantidad}:item);
                state.total = state.total + (action.payload.precio*action.payload.cantidad);         
                //return {...state, total:parseFloat(total.toFixed(2)),cartList:updatedCartList}
            }else{
                const updatedCartList = state.cartList.concat(action.payload);
                const total = state.total + (action.payload.precio*action.payload.cantidad);         
                return {...state, total:parseFloat(total.toFixed(2)), cartList:updatedCartList}
            }
            
        },
        removeToCart(state,action){
            const updatedCartList = state.cartList.filter(item => item.id !== action.payload.id);
            const total = state.total - (action.payload.precio*action.payload.cantidad);
            return {...state, total:parseFloat(total.toFixed(2)), cartList:updatedCartList} 
        },
        clearToCart(state,action){
            return {...state, total:0, cartList:[]} 
        }
    }
});

export const {addToCart,removeToCart,clearToCart} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;


