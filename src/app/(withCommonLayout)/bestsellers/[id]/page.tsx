"use client";

import React, { useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import useAxios from "@/hooks/useAxios";
import { IProduct } from "@/types/product";
import { fetchAllProducts } from "@/services/productService";
import Addtocartbtn from "../_components/Addtocartbtn";
import { AuthContext } from "@/contexts/AuthContext";

const ProductsDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const axios = useAxios();
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState<IProduct | null>(null);
  const [mainImg, setMainImg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const allProducts = await fetchAllProducts(axios);
        const found = allProducts.find((p: IProduct) => String(p._id) === String(id));
        if (found) {
          setProduct(found);
          setMainImg(found.mainImage);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [id, axios]);

  const handleCartAction = async () => {
    if (!user) {
      router.push("/login");
      return;
    }
    console.log("Adding to cart:", product?.name);
  };

  if (loading) return <div className="h-screen flex items-center justify-center font-bold text-[#333]">LOADING SEOUL MIRAGE...</div>;
  if (!product) return <div className="h-screen flex flex-col items-center justify-center">Product not found!</div>;

  return (
    <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 py-20 font-sans">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
        
        {/* Left: Images */}
        <div className="flex flex-col lg:flex-row gap-5 lg:w-[55%]">
          <div className="flex lg:flex-col gap-3">
            {(product.images || [product.mainImage]).map((img, idx) => (
              <div 
                key={idx} 
                onClick={() => setMainImg(img)}
                className={`w-20 h-28 relative cursor-pointer border ${mainImg === img ? 'border-black' : 'border-transparent opacity-60'}`}
              >
                <Image src={img} fill className="object-cover" alt="thumb" />
              </div>
            ))}
          </div>
          <div className="flex-1 aspect-[4/5] relative bg-[#f9f9f9]">
            <Image src={mainImg} fill className="object-cover" alt="main" priority />
          </div>
        </div>

        {/* Right: Info */}
        <div className="lg:w-[45%] space-y-8">
          <div>
            <p className="text-[10px] font-black text-[#CCAF91] uppercase tracking-widest mb-2">{product.category}</p>
            <h1 className="text-4xl font-black text-[#333] uppercase leading-tight">{product.name}</h1>
          </div>

          <div className="border-b pb-8">
            <span className="text-[54px] font-black text-[#333]">${product.price}</span>
            <p className="text-[#666] mt-4 leading-relaxed font-medium">{product.description}</p>
          </div>

          <div className="space-y-4">
             <h5 className="font-black text-[10px] uppercase tracking-widest text-gray-900">THE LOWDOWN:</h5>
             <ul className="list-disc list-inside text-gray-500 text-sm space-y-1 font-medium">
               <li>Dermatologist tested for all skin types.</li>
               <li>Clean, vegan, and cruelty-free.</li>
             </ul>
          </div>

          <Addtocartbtn onAdd={handleCartAction} />
          
          <button onClick={() => router.back()} className="text-gray-400 font-bold uppercase tracking-widest text-[9px] hover:text-black">
            ← Back to Gallery
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetails;