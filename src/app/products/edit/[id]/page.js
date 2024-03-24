"use client";
import { useEffect, useState } from "react";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import Right from "@/components/icons/Right";
import { useParams } from "next/navigation";
import ProductForm from "@/components/layout/ProductForm";

export default function EditProductsPage() {
  const {id} = useParams();

  const [isAdmin, setIsAdmin] = useState(false);
  
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch('/api/profile')
      .then(response => response.json())
      .then(data => 
        setIsAdmin(data.admin)
      )
  }, []);

  useEffect(() => {
    fetch('/api/products')
      .then(response => response.json())
      .then(data => {
        const product = data.find(product => product._id === id);
        setProduct(product);
      }
    )
  }, []);

  async function handleFormSubmit(e, data) {
    e.preventDefault();
    data = {...data, _id: id}
    const response = await fetch('/api/products', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
  }

  if (!isAdmin) {
    return (
      <section className="mt-8 max-w-lg mx-auto">
        <h1 className="text-center text-emerald-600 text-4xl mb-4">
          You are not admin!!!
        </h1>
      </section>
    )
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin}/>
      <div className="max-w-md mx-auto my-8">
        <Link href="/products"
          className="p-2 rounded-full bg-emerald-400 text-white text-center flex justify-center gap-2"
        >
          <span>Show all products</span>
          <Right/>
        </Link>
      </div>
      <h1 className="text-center text-emerald-600 text-4xl mb-4">
        Edit product
      </h1>
      <ProductForm handleFormSubmit={handleFormSubmit} product={product}/>
    </section>
  )
}