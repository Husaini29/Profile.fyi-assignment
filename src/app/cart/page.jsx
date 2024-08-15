"use client"

import React from 'react'
import { useCart } from '@/context/CartContext';
import { AiOutlineMinus,AiOutlinePlus } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function Cart() {
    const { state:{ cart },dispatch,removeFromCart,increaseProductQuantity,decreaseProductQuantity } = useCart();
    const router = useRouter();

    const currPrice = cart.reduce((acc,curr)=> acc + curr?.original_price * curr?.quantity,0).toFixed(2);
    const discountPrice = cart.reduce((acc,curr)=> acc + ((curr?.original_price-curr?.price) * curr?.quantity),0).toFixed(2);
    const totalPrice = cart.reduce((acc,curr)=> acc + curr?.price * curr?.quantity,0).toFixed(2);


    const removeFromCartHandler=(e,product)=>{
      e.preventDefault();
      removeFromCart(product)
    }

    const updateCartHandler=(e,product,actionType)=>{
      e.preventDefault();
      if(actionType === "increment"){
        increaseProductQuantity(product);
      } else{
        decreaseProductQuantity(product);
      }
    }

    const handlePlaceOrder =(e)=>{
        e.preventDefault();
        dispatch({ type:"EMPTY_CART" });
        router.push("/");
        toast.success("Order placed successfully");
    }

  return (
    <div className='cart-container'>
      <h2 className='cart-count'>{ cart.length>0 ? `My Cart (${cart.length})` : "No Item In Cart..."}</h2>
        <div className='cart-items-container'>
          <div>
            {
                cart?.map((product)=>{
                    const { id,title,image,price,quantity } = product;
                    return(
                        <div className='cart-card-container' key={id}>
                            <div className='cart-image'>
                                <img src={image} alt={title} className='cart-product-image' />
                            </div>
                            <div className='cart-item-details'> 
                                <h4>{title}</h4>
                                <p>Price: ${price}</p>
                                <p className='cart-quantity'>Quantity:
                                    <button className='update-cart-qty' 
                                    disabled={quantity===1}
                                    onClick={(e)=> updateCartHandler(e,product,"decrement")}><AiOutlineMinus/></button>
                                    <span>{quantity}</span>
                                    <button className='update-cart-qty' 
                                    onClick={(e)=> updateCartHandler(e,product,"increment")}><AiOutlinePlus/></button>
                                </p>
                                <button className='remove-btn' 
                                onClick={(e)=> removeFromCartHandler(e,product)}>
                                    Remove From Cart</button>
                            </div>
                        </div>
                    )
                })
            }
           
          </div>
          {
            cart.length >0 && (
              <div className='cart-price-card'>
              <h3>Cart Summary</h3>
              <hr/>
              <p>
                <span>Price</span>
                <span className='right'>${currPrice}</span>
              </p>
              <p>
                <span>Discount</span>
                <span className='right'>${discountPrice}</span>
              </p>
              <hr/>
              <p>
                <span>Total</span>
                <span className='right'>${totalPrice}</span>
              </p>
              <hr/>
              <p className='discount-msg'>You will save ${discountPrice} on this order!</p>
              <button className='checkout-btn' onClick={(e)=>handlePlaceOrder(e)} >Place Order</button>
          </div>
            )
          }
        </div>
    </div>
  )
}
