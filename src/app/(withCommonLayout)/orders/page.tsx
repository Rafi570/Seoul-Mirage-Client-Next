import React from "react";
import OrderHistoryClient from "./_components/OrderHistoryClient";

export const metadata = {
  title: "Order Selection | Seoul Mirage",
  description: "Select your unpaid orders and proceed to payment.",
};

export default function OrderHistoryPage() {
  return (
    <div className="min-h-screen bg-[#F2EADA] py-16 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-[42px] font-normal text-[#111] mb-12 uppercase tracking-tighter">
          Order Selection
        </h1>
        
        <OrderHistoryClient    />
      </div>
    </div>
  );
}