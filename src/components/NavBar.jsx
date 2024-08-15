"use client"

import React from 'react'
import Link from 'next/link'
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '@/context/CartContext';
import { useProductData } from '@/context/ProductContext';

export const Navbar = () => {
    const { state:{ cart } } = useCart();
    const { searchInput, setSearchInput } = useProductData();
    const cartItem = cart?.length;

  return (
        <nav className='navbar'>       
            <div className='nav-header'>
            <Link href="/">
                <h3 className='site-name'>E-commerce</h3>
            </Link>
            <input type='text' placeholder=" Search" className='search-input' 
                value={searchInput}
                onChange={(e)=>setSearchInput(e.target.value)}/>
        </div>
            <div className='nav-item'>
            
            <Link href='/cart' className='nav-link'>
                <FiShoppingCart className='nav-icons'/>
                <span className='cart-total'>{cartItem}</span>
            </Link>
            </div>
        </nav>
  )
}
