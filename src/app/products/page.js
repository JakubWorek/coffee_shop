"use client";
import { useEffect, useState } from "react";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import Right from "@/components/icons/Right";
import Image from "next/image";
import EditIcon from "@/components/icons/EditIcon";
import Trash from "@/components/icons/Trash";

export default function ProductsPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/profile')
      .then(response => response.json())
      .then(data => 
        setIsAdmin(data.admin)
      )
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    fetch('/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
  }

  async function deleteProduct(_id) {
    const response = await fetch('/api/products', {
      method: 'DELETE',
      body: JSON.stringify({ _id }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response.ok) {
      fetchProducts();
    }
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
    <section className="mt-8 max-w-md mx-auto">
      <UserTabs isAdmin={isAdmin}/>
      <h1 className="text-center text-emerald-600 text-4xl mb-4">
        Products
      </h1>
      <div className="mt-8">
        <Link 
          href="/products/new"
          className="p-2 rounded-full bg-emerald-400 text-white text-center flex justify-center gap-2"
        > 
          Create new product
          <Right/>
        </Link>
      </div>
      <div className="mt-8">
      <h2 className=" mt-8 mb-2 text-sm text-gray-500">Existing products:</h2>
        {products?.length > 0 && products.map(product => (
          <div className="bg-gray-300 rounded-lg p-2 px-4 flex gap-1 mb-2">
            <div className="relative flex flex-row grow gap-2">
              <Image src={product.image} alt={product.name}
                width={100} height={100} className="rounded-md"
              />
              {product.name}
            </div>
            
            <div className="flex flex-row h-10">
              <Link 
                href={'/products/edit/' + product._id}
                className="bg-emerald-300 rounded-lg border p-2 gap-2"
              >
                <EditIcon/>
              </Link>
              <button
                className=" bg-red-400"
                onClick={() => {deleteProduct(product._id)}}
              >
                <Trash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}