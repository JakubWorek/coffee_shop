'use client';
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";
import { useEffect, useState } from "react";

export default function HomeMenu() {
  const [bestSellers, setBestSellers] = useState([])

  useEffect(() => {
    fetch('/api/products')
      .then(response => response.json())
      .then(products => {
        setBestSellers(products.slice(-3))
      })
  }, [])
  

  return (
    <section className="">
      <div className="text-center mb-4">
        <SectionHeaders subHeader={'Check our'} mainHeader={'Best sellers'}/>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {bestSellers?.length>0 && bestSellers.map((product) => (
          <MenuItem product={product} />
        ))}
      </div>
    </section>
  )
}