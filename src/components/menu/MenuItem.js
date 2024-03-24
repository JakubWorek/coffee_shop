'use client';
import {useContext, useState} from 'react';
import { CartContext } from '@/components/AppContext';
import ProductInfo from '@/components/menu/ProductInfo';
import Image from 'next/image';
import { set } from 'mongoose';

export default function MenuItem({product}) {
  const {addToCart} = useContext(CartContext);
  const {name, description, image, basePrice, sizes} = product;
  const [showPopup, setShowPopup] = useState(false);
  const [
    selectedSize, 
    setSelectedSize
  ] = useState(sizes.length > 0 ? sizes[0] : null);
  
  function handleAddToCartButton(){
    if(showPopup){
      addToCart(product, selectedSize);
      setShowPopup(false);
    } else {
      if (sizes.length === 0){
        addToCart(product);
        return;
      } else {
        setShowPopup(true);
      }
    }
  }

  let selectedPrice = basePrice;
  if (selectedSize){
    selectedPrice += selectedSize.price;
  }

  return (
    <>
      {showPopup && (
        <div 
          onClick={() => setShowPopup(false)}
          className='fixed inset-0 bg-black/80 flex items-center justify-center'
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className='bg-white p-2 rounded-lg max-w-md my-8'
          >
            <div 
              className='overflow-y-scroll p-2'
              style={{maxHeight: 'calc(100vh - 100px)'}}
            >
              <Image src={image} alt={name} width={200} height={200}
              className='mx-auto'
              />
              <h3 className='text-xl font-semibold text-center'>
                {name}
              </h3>
              <p className='text-gray-500 text-center mb-2'>
                {description}
              </p>
              {sizes?.length > 0 && (
                <div className='bg-gray-300 rounded-md p-2'>
                  Choose size:
                  {sizes.map(size => (
                    <label className='block p-2 border  mb-1'>
                      <input 
                        type='radio' 
                        name='size' 
                        value={size} 
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        checked={selectedSize?.name === size.name}
                      />
                      {size.name} ${basePrice + size.price}
                    </label>
                  ))}
                </div>
              )}
              <button
                type='button'
                onClick={handleAddToCartButton}
                className='bg-emerald-400 text-white rounded-full px-8 py-2 mt-4 sticky bottom-2'
              >
                Add to cart ${selectedPrice}
              </button>
              <button 
                type='button'
                className='bg-red-400 text-white rounded-full px-8 py-2 mt-1'
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <ProductInfo product={product} onAddToCart={handleAddToCartButton}/>
    </>
    
  )
}