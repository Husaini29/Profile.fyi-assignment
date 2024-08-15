import React from 'react';
import { ProductCard } from "@/components/ProductCard";
import { useProductData } from '@/context/ProductContext';

export const ProductListing = () => {
  const { searchedProduct } = useProductData();
 
  return (
    <div>
          <div className='product-container'>  
            {searchedProduct?.length === 0 && <h2 className='product-head'>No Products Found...</h2>}
            {searchedProduct?.length !== 0 && <h2 className='product-head'>Showing All Products ({ searchedProduct?.length})</h2>}
            <div className="product-card-container">
                {
                searchedProduct?.map(product=>
                        <ProductCard key={product.id} product={product}/>
                    )
                }
            </div>
        </div>
    </div>
  )
}
