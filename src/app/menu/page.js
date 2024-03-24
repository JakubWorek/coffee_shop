'use client';
import { useEffect, useState } from 'react';
import SectionHeaders from '@/components/layout/SectionHeaders';
import MenuItem from '@/components/menu/MenuItem';

export default function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/categories')
      .then(response => response.json())
      .then(categories => {
        setCategories(categories);
      });
    fetch('/api/products')
      .then(response => response.json())
      .then(products => {
        setProducts(products);
      });
  }, []);

  return (
    <section>
      {categories && categories.map((category) => (
        <div key={category._id}>
          <SectionHeaders subHeader={'Check our'} mainHeader={category.name}/>
          <div className="grid grid-cols-3 gap-4 mt-4 mb-8">
            {products.filter(product => product.category === category._id).map((product) => (
              <MenuItem product={product} />
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}