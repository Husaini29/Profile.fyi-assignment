"use client"

import { createContext, useContext, useState } from "react";
import { products } from "@/data";

export const ProductContext = createContext();

export function ProductContextProvier({ children }){
    const [searchInput,setSearchInput] = useState("");
    
    const searchedProduct = searchInput.length > 0 ? products.filter(({ title })=> title.toLowerCase().includes(searchInput.toLowerCase())) : products;
    
    return(
        <ProductContext.Provider value={{ 
            searchInput,
            setSearchInput,
            searchedProduct,
            products
        }}>
                { children }
        </ProductContext.Provider>
    )
}

export const useProductData = () =>{ 
    return useContext(ProductContext)
}