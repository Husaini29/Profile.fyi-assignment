"use client"

import CartReducer from "@/reducer/CartReducer";
import { createContext, useContext, useReducer } from "react";
import { toast } from 'react-hot-toast';

export const CartContext = createContext();


export function CartContextProvider({ children }){

    const initialState ={
        cart:[]
    }

    const [state,dispatch] = useReducer(CartReducer,initialState);
    
    const addToCart = (product)=>{
        dispatch({ type:"ADD_TO_CART", payload:product });
        toast.success("Product added to cart");
    }
      
    
    const removeFromCart = (product) => {
        const updatedCart = state?.cart.filter(({ id })=> id !== product?.id);
        dispatch({ type:"REMOVE_FROM_CART", payload:updatedCart });
        toast.success("Product removed succesfully")
    }
    
    const increaseProductQuantity = (product) => {
       dispatch({ type:"INCREASE_QTY", payload:product });
    }
    
    const decreaseProductQuantity = (product) => {
        dispatch({ type:"DECREASE_QTY", payload:product }); 
    }
    
    const isProductInCart = (product) => state?.cart?.findIndex(({ id }) => id === product?.id);

    return(
        <CartContext.Provider value={{    
            state,    
            dispatch,
            isProductInCart,
            addToCart,
            removeFromCart,
            increaseProductQuantity,
            decreaseProductQuantity
         }}>
            { children }
        </CartContext.Provider>
    )
}

export const useCart =()=> useContext(CartContext);