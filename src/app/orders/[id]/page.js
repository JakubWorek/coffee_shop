'use client';
import SectionHeaders from '@/components/layout/SectionHeaders';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { CartContext, cartProductPrice } from "@/components/AppContext";
import Image from 'next/image';

export default function OrderPage() {
  const [order, setOrder] = useState();
  const {clearCart} = useContext(CartContext);
  const {id} = useParams();


  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.href.includes('clear-cart=1')) {
        clearCart();
      }
    }
    if (id) {
      fetch('/api/orders?_id='+id)
        .then((res) => res.json())
        .then((data) => {
          setOrder(data);
        });
    }
  }, []);

  let subtotal = order?.cartProducts.reduce((acc, product) => acc + cartProductPrice(product), 0);

  return (
    <section className="max-w-xl text-center mx-auto mt-8">
      <SectionHeaders mainHeader="Your order"/>
      <div className='my-4'>
        <p>
          Your order has been placed. Thank you for ordering with us.
        </p>
      </div>
      {order && (
        <div className="grid md:grid-cols-2 md:gap-16">
          <div>
            {order.cartProducts.map(product => (
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
            </div>
            ))}
            <div className="text-right">
              Subtotal: ${subtotal}
            </div>
            <div className="text-right">
              Delivery: $5
            </div>
            <div className="text-xl font-semibold py-4 text-right">
              Total: ${subtotal+5}
            </div>
          </div>
          <div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-lg font-semibold">Shipping Address</h2>
              <p>{order.userEmail}</p>
              <p>{order.phone}</p>
              <p>{order.streetAdress}</p>
              <p>{order.postalCode}</p>
              <p>{order.city}</p>
              <p>{order.country}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}