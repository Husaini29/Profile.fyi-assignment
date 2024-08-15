"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext';

export const ProductCard = ({ product }) => {

    const { id,title,image,price,original_price } = product;
    const { isProductInCart,addToCart } = useCart();
    const router = useRouter();
   
    const addToCartHandler=(e,product)=>{
        e.preventDefault();
        isProductInCart(product) === -1 ? addToCart(product) : router.push("/cart");
    }

  return (
    <div className='product'>
      <img src={image} alt={title} className='product-image' height={200} width={200}/>
        <div className='product-card-details'>
            <h4 className='product-title'>{title}</h4>
            <b className='product-desc'>${price}</b>
            <span className='original-price'>${original_price}</span>
            <button 
                className='cart-btn' 
                onClick={(e)=> addToCartHandler(e,product)}>
                    {isProductInCart(product) === -1 ? "Add to Cart" : "Go to Cart"}
              </button>
        </div>
    </div>
  )
}
