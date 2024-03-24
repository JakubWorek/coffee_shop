'use client';
import { CartContext, cartProductPrice } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import Trash from "@/components/icons/Trash";



export default function CartPage() {
  const {cartProducts, removeProductFromCart} = useContext(CartContext);
  const [phone, setPhone] = useState('');
  const [streetAdress, setStreetAdress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
    if(typeof window !== 'undefined'){
      if (window.location.href.includes('canceled=1')){
        alert('Payment canceled');
      }
    }
  }, []);

  useEffect(() => {
    fetch('/api/profile')
      .then(res => res.json())
      .then(data => {
        setPhone(data.phone || '');
        setStreetAdress(data.streetAdress || '');
        setPostalCode(data.postalCode || '');
        setCity(data.city || '');
        setCountry(data.country || '');
      });
  }, []);

  let subtotal = cartProducts.reduce((acc, product) => acc + cartProductPrice(product), 0)

  async function proceedToCheckout(e){
    e.preventDefault();
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phone,
        streetAdress,
        postalCode,
        city,
        country,
        cartProducts
      })
    });
    const link = await response.json()
    window.location = link;
  }

  if (cartProducts?.length === 0){
    return (
      <section className="max-w-xl text-center mx-auto mt-8">
        <SectionHeaders mainHeader="Cart"/>
        <div className='my-4'>
          <p>
            Your cart is empty
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader={"Cart"} />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          {cartProducts?.length === 0 && (
            <div className="text-center">Your cart is empty</div>
          )}
          {cartProducts?.length > 0 && cartProducts.map((product, index) => (
            <div className="flex items-center gap-4 mb-2 border-b py-2">
              <div className="w-24">
                <Image src={product.image} alt={product.name} width={100} height={100} />
              </div>
              <div className="grow">
                <h3 className="font-semibold">
                  {product.name}
                </h3>
                {product.size && (
                  <div className="text-sm text-gray-500">
                    Size: <span>{product.size.name}</span>
                  </div>
                )}
              </div>
              <div className="text-lg font-semibold">
                ${cartProductPrice(product)}
              </div>
              <div className="ml-2">
                <button
                  type='button'
                  onClick={() => removeProductFromCart(index)}
                  className="p-2 text-red-500"
                >
                  <Trash />
                </button>
              </div>
            </div>
          ))}
          <div className="text-right pr-16">
            Subtotal: ${subtotal}
          </div>
          <div className="text-right pr-16">
            Delivery: $5
          </div>
          <div className="text-xl font-semibold py-4 text-right pr-16">
            Total: ${subtotal+5}
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Delivery Information</h2>
          <form onSubmit={proceedToCheckout}>
            <input type="tel" 
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input type="text"
              placeholder="Street Adress"
              value={streetAdress}
              onChange={(e) => setStreetAdress(e.target.value)}
            />
            <div className="flex gap-4">
              <input type="text"
                style={{'margin' : '0'}}
                placeholder="Postal Code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
              <input type="text"
                style={{'margin' : '0'}}
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <input type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <button 
              type="submit"
              className="mt-4 bg-emerald-400 text-white"
            >
              Pay ${subtotal+5}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}