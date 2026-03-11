"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import useAxios from "@/hooks/useAxios";
import { IOrder } from "@/types/order";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";

const OrderHistoryClient: React.FC = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const router = useRouter();

  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  const fetchOrders = useCallback(async () => {
    if (!user?.email) return;

    try {
      const res = await axiosInstance.get<IOrder[]>(
        `/api/orders/user/${user.email}`,
      );
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  }, [user?.email, axiosInstance]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleSelectOrder = (orderId: string): void => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId],
    );
  };

  // ২. ক্যালকুলেশন মেমোরাইজেশন
  const { selectedSubtotal, shipping, finalTotal } = useMemo(() => {
    const subtotal = orders
      .filter((order) => selectedOrders.includes(order._id))
      .reduce((acc, curr) => acc + curr.totalAmount, 0);

    const shipCost = selectedOrders.length > 0 ? 5.99 : 0;
    return {
      selectedSubtotal: subtotal,
      shipping: shipCost,
      finalTotal: subtotal + shipCost,
    };
  }, [orders, selectedOrders]);

  const handleProceedToPay = (): void => {
    const ordersToPay = orders.filter((order) =>
      selectedOrders.includes(order._id),
    );

    const checkoutData = {
      selectedOrders: ordersToPay,
      totalPayable: finalTotal,
    };

    sessionStorage.setItem("checkout_data", JSON.stringify(checkoutData));
    router.push("/process-pay");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-bold uppercase tracking-widest text-gray-400">
            Fetching Seoul Mirage Orders...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-12 animate-in fade-in duration-500">
      {/* Order List Side */}
      <div className="flex-1 space-y-6">
        {orders.length === 0 ? (
          <div className="bg-white p-16 text-center border border-dashed border-gray-200 rounded-sm">
            <p className="text-gray-400 font-medium tracking-tight">
              No orders found in your history.
            </p>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className={`relative flex gap-6 p-6 border transition-all duration-300 ${
                selectedOrders.includes(order._id)
                  ? "bg-white border-black shadow-lg translate-x-1"
                  : "bg-white/40 border-gray-100 hover:border-gray-300"
              }`}
            >
              {order.status === "Unpaid" && (
                <div className="flex items-start pt-1">
                  <input
                    type="checkbox"
                    checked={selectedOrders.includes(order._id)}
                    onChange={() => handleSelectOrder(order._id)}
                    className="w-5 h-5 accent-black cursor-pointer rounded-none"
                  />
                </div>
              )}

              <div className="flex-1">
                <div className="flex justify-between mb-4 items-center">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                    Order ID: #{order._id.slice(-8).toUpperCase()}
                  </p>
                  <span
                    className={`text-[9px] font-black uppercase px-3 py-1 tracking-tighter ${
                      order.status === "Unpaid"
                        ? "bg-red-50 text-red-600 border border-red-100"
                        : "bg-green-50 text-green-700 border border-green-100"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {order.items.map((item, idx) => {
                  // ৩. ইমেজ ফিক্স: .png যুক্ত করা হয়েছে SVG এরর এড়াতে
                  const isValidUrl =
                    item.image &&
                    (item.image.startsWith("http") ||
                      item.image.startsWith("/"));
                  const fallbackImage =
                    "https://placehold.co/400x500.png?text=No+Image";

                  return (
                    <div
                      key={idx}
                      className="flex gap-4 items-center mb-4 last:mb-0"
                    >
                      <div className="relative w-16 h-20 bg-gray-50 overflow-hidden border border-gray-100 flex-shrink-0">
                        <Image
                          src={isValidUrl ? item.image : fallbackImage}
                          fill
                          unoptimized // SVG বা পিক্সেল এরর এড়াতে
                          className="object-cover"
                          alt={item.name || "Product Image"}
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xs font-black uppercase tracking-tight">
                          {item.name}
                        </h4>
                        <p className="text-[10px] text-gray-400 font-bold mt-1">
                          {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <p className="font-black text-xs text-right">
                        ${(item.quantity * item.price).toFixed(2)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary Side */}
      <div className="w-full lg:w-[400px]">
        <div className="bg-[#F9F6F1] p-10 sticky top-28 border border-[#EBE4D8] shadow-sm">
          <h2 className="text-lg font-black mb-8 uppercase tracking-widest border-b border-[#E5DFD5] pb-4">
            Payment Summary
          </h2>

          <div className="space-y-5 mb-8">
            <div className="flex justify-between text-[10px] font-black uppercase text-gray-400">
              <span>Items Selected</span>
              <span className="text-black font-black">
                {selectedOrders.length}
              </span>
            </div>
            <div className="flex justify-between text-[10px] font-black uppercase text-gray-400">
              <span>Subtotal</span>
              <span className="text-black font-black">
                ${selectedSubtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-[10px]  -black uppercase text-gray-400">
              <span>Shipping Fee</span>
              <span className="text-black font-black">
                ${shipping.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-baseline mb-10 pt-6 border-t border-[#E5DFD5]">
            <span className="text-sm font-black uppercase tracking-widest">
              Total Payable
            </span>
            <span className="text-3xl font-black tracking-tighter text-black">
              ${finalTotal.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleProceedToPay}
            disabled={selectedOrders.length === 0}
            className={`w-full py-5 font-black uppercase tracking-[0.4em] text-[10px] transition-all duration-300 ${
              selectedOrders.length > 0
                ? "bg-black text-white hover:bg-gray-900 shadow-xl active:scale-[0.98]"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Pay Now
          </button>

          {selectedOrders.length === 0 && (
            <p className="text-[9px] text-center mt-4 text-gray-400 font-bold uppercase tracking-tighter italic">
              * Please select at least one unpaid order to checkout
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryClient;
