"use client"
import React, { useEffect, useState } from "react";
import useAxios from "@/hooks/useAxios";
import { IProduct } from "@/types/product";
import { fetchBestsellers } from "@/services/productService";
import BestSellersCard from "./_components/BestSellersCard";

const Bestsellers = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const axios = useAxios();

  useEffect(() => {
    fetchBestsellers(axios).then(setProducts).catch(console.error);
  }, [axios]);

  return (
    <div className="max-w-screen-2xl mx-auto px-10 py-16 font-sans">
      <h2 className="text-2xl font-bold mb-10 text-[#333]">Bestsellers</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {products.map((product: IProduct) => (
          <BestSellersCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Bestsellers;