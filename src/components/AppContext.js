"use client";
import {SessionProvider} from 'next-auth/react';
import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext({});

export function cartProductPrice(cartProduct){
  let price = cartProduct.basePrice;
  if (cartProduct.size){
    price += cartProduct.size.price;
  }
  return price;
}

export function AppProvider({children}){
  const [cartProducts, setCartProducts] = useState([]);
  const lS = typeof window !== 'undefined' ? window.localStorage : null;

  useEffect(() => {
    if (lS && lS.getItem('cart')){
        setCartProducts(JSON.parse(lS.getItem('cart')));
    }
  }, []);

  function clearCart(){
    setCartProducts([]);
    saveCartProductsToLocalStorage([]);
  }

  function removeProductFromCart(index){
    setCartProducts(prevProducts => {
      const newProducts = prevProducts.filter((product, i) => i !== index);
      saveCartProductsToLocalStorage(newProducts);
      return newProducts;
    });
  }

  function saveCartProductsToLocalStorage(cartProducts){
    if (lS){
      lS.setItem('cart', JSON.stringify(cartProducts));
    }
  }

  function addToCart(product, size=null){
    setCartProducts(prevProducts => {
      const cartProduct = {...product, size};
      const newProducts = [...prevProducts, cartProduct];
      saveCartProductsToLocalStorage(newProducts);
      return newProducts;
    });
  }

  return (
    <SessionProvider>
      <CartContext.Provider value={{cartProducts, setCartProducts, addToCart, removeProductFromCart, clearCart}}>
        {children}
      </CartContext.Provider>
    </SessionProvider>
  )
}