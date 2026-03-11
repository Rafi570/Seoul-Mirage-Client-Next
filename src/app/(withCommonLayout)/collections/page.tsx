import React from "react";
import Link from "next/link";
import { IProduct } from "@/types/product";
import { getCollectionsData } from "@/services/productService";
import BestSellersCard from "../bestsellers/_components/BestSellersCard";
import Container from "@/components/shared/Container";

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function CollectionsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const products: IProduct[] = await getCollectionsData(currentPage);


  const totalPages = 2; 

  return (
    <div className="bg-white min-h-screen py-16 font-sans">
      <Container>
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-[32px] md:text-[42px] font-normal text-[#111] uppercase tracking-tighter">
            Our Collections
          </h1>
          <div className="h-[1px] w-20 bg-black mt-2"></div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-8 md:gap-y-16">
          {products && products.length > 0 ? (
            products.map((product: IProduct) => (
              <BestSellersCard key={product._id} product={product} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-gray-400 uppercase tracking-widest text-sm">
              No products found in this collection.
            </div>
          )}
        </div>

        {/* Pagination System */}
        {products.length > 0 && (
          <div className="mt-24 flex justify-center items-center gap-3">
            {/* Previous Button - ১ম পেজে থাকলে ডিজেবল */}
            <Link
              href={`/collections?page=${currentPage - 1}`}
              className={`w-12 h-12 flex items-center justify-center border border-gray-200 transition-all hover:border-black ${
                currentPage <= 1 ? "pointer-events-none opacity-20" : ""
              }`}
            >
              <span className="text-xl">←</span>
            </Link>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Link
                key={page}
                href={`/collections?page=${page}`}
                className={`w-12 h-12 flex items-center justify-center text-[13px] font-black transition-all border ${
                  currentPage === page
                    ? "bg-[#F2EADA] border-[#F2EADA] text-black"
                    : "text-gray-400 hover:text-black border-gray-100"
                }`}
              >
                {String(page).padStart(2, "0")}
              </Link>
            ))}

            <Link
              href={`/collections?page=${currentPage + 1}`}
              className={`w-12 h-12 flex items-center justify-center border border-gray-200 transition-all hover:border-black ${
                currentPage >= totalPages || products.length < 8 
                  ? "pointer-events-none opacity-20" 
                  : ""
              }`}
            >
              <span className="text-xl">→</span>
            </Link>
          </div>
        )}
      </Container>
    </div>
  );
}