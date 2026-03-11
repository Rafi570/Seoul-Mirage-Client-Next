"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import useAxios from "@/hooks/useAxios";
import { Loader2, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { ICheckoutData, IFormData, IPaymentInfo } from "@/types/payment";

const ProcessPayPage: React.FC = () => {
  const router = useRouter();
  const axiosInstance = useAxios();
  
  const [isPaying, setIsPaying] = useState<boolean>(false);
  const [checkoutData, setCheckoutData] = useState<ICheckoutData | null>(null);

  const [formData, setFormData] = useState<IFormData>({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    postCode: "",
    phone: "",
  });

  useEffect(() => {
    const data = sessionStorage.getItem("checkout_data");
    if (data) {
      try {
        setCheckoutData(JSON.parse(data) as ICheckoutData);
      } catch (error) {
        console.error("Session data parsing error:", error);
        router.push("/orders");
      }
    } else {
      router.push("/orders");
    }
  }, [router]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFinalPayment = async (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!checkoutData?.selectedOrders?.length) return;

    setIsPaying(true);
    try {
      const paymentInfo: IPaymentInfo = {
        orderIds: checkoutData.selectedOrders.map((order) => order._id),
        totalAmount: checkoutData.totalPayable,
        shippingAddress: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          postCode: formData.postCode,
          phone: formData.phone,
        },
      };


      const res = await axiosInstance.post<{ url: string }>("/api/orders/init-payment", paymentInfo);
      
      if (res.data?.url) {
        sessionStorage.removeItem("checkout_data");
        window.location.replace(res.data.url);
      }
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Could not connect to payment gateway!");
    } finally {
      setIsPaying(false);
    }
  };

  if (!checkoutData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F2EADA]">
        <Loader2 className="animate-spin text-black" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2EADA] py-12 px-4 md:px-10 font-raleway">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest mb-6 hover:underline transition-all"
        >
          <ArrowLeft size={14}/> Back to Selection
        </button>
        
        <h1 className="text-[42px] font-normal mb-10 uppercase tracking-tighter text-black">
          Checkout
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Shipping Form Section */}
          <div className="flex-1 bg-white p-8 md:p-12 shadow-sm rounded-sm border border-gray-100">
            <h2 className="text-xl font-black mb-8 uppercase tracking-tight border-b border-gray-50 pb-4">
              Shipping Information
            </h2>
            
            <form onSubmit={handleFinalPayment} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">First name</label>
                  <input name="firstName" value={formData.firstName} onChange={handleInputChange} type="text" required className="w-full border border-gray-100 p-4 bg-gray-50 focus:bg-white focus:outline-none focus:border-black font-bold transition-all" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Last name</label>
                  <input name="lastName" value={formData.lastName} onChange={handleInputChange} type="text" required className="w-full border border-gray-100 p-4 bg-gray-50 focus:bg-white focus:outline-none focus:border-black font-bold transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Email</label>
                  <input name="email" value={formData.email} onChange={handleInputChange} type="email" required className="w-full border border-gray-100 p-4 bg-gray-50 focus:bg-white focus:outline-none focus:border-black font-bold transition-all" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Phone</label>
                  <input name="phone" value={formData.phone} onChange={handleInputChange} type="text" required placeholder="017XXXXXXXX" className="w-full border border-gray-100 p-4 bg-gray-50 focus:bg-white focus:outline-none focus:border-black font-bold transition-all" />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Address (Street & House)</label>
                <input name="address" value={formData.address} onChange={handleInputChange} type="text" required className="w-full border border-gray-100 p-4 bg-gray-50 focus:bg-white focus:outline-none focus:border-black font-bold transition-all" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input name="city" value={formData.city} onChange={handleInputChange} type="text" placeholder="City" required className="w-full border border-gray-100 p-4 bg-gray-50 focus:bg-white focus:outline-none focus:border-black font-bold transition-all" />
                <input name="state" value={formData.state} onChange={handleInputChange} type="text" placeholder="State" required className="w-full border border-gray-100 p-4 bg-gray-50 focus:bg-white focus:outline-none focus:border-black font-bold transition-all" />
                <input name="postCode" value={formData.postCode} onChange={handleInputChange} type="text" placeholder="Postal Code" required className="w-full border border-gray-100 p-4 bg-gray-50 focus:bg-white focus:outline-none focus:border-black font-bold transition-all" />
              </div>

              <button
                type="submit"
                disabled={isPaying}
                className="w-full md:w-auto bg-black text-white px-16 py-5 font-black uppercase tracking-[0.3em] text-[10px] transition-all disabled:bg-gray-400 shadow-xl active:scale-[0.98]"
              >
                {isPaying ? (
                  <span className="flex items-center gap-2"><Loader2 className="animate-spin" size={16}/> Redirecting to SSLCommerz...</span>
                ) : "Secure Payment ❯"}
              </button>
            </form>
          </div>

          {/* Summary Section */}
          <div className="w-full lg:w-[450px]">
            <div className="bg-white p-8 shadow-sm border border-gray-50 sticky top-28">
              <h2 className="text-lg font-black mb-6 uppercase">Order Summary</h2>
              <div className="max-h-[350px] overflow-y-auto mb-6 pr-2 custom-scrollbar">
                {checkoutData.selectedOrders.map((order) => (
                  <div key={order._id} className="mb-6 last:mb-0 border-b border-gray-50 pb-6">
                    <p className="text-[9px] font-black text-[#CCAF91] mb-3 uppercase tracking-widest">
                      ORDER #{order._id.slice(-6).toUpperCase()}
                    </p>
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex gap-4 items-center mb-4">
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <Image 
                            src={item.image || "https://placehold.co/400x500.png?text=Seoul+Mirage"} 
                            alt={item.name} 
                            fill
                            className="object-cover bg-gray-50 border border-gray-50"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-[12px] font-black leading-tight">{item.name}</h4>
                          <p className="text-[10px] font-bold text-gray-400 uppercase">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-black">${item.price.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-gray-100 font-bold">
                <div className="flex justify-between text-[11px] uppercase text-gray-400 tracking-widest">
                  <span>Subtotal</span>
                  <span className="text-black">${(checkoutData.totalPayable - 5.99).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[11px] uppercase text-gray-400 tracking-widest">
                  <span>Shipping</span>
                  <span className="text-black">$5.99</span>
                </div>
                <div className="flex justify-between text-2xl font-black pt-4 border-t border-gray-100 tracking-tighter">
                  <span>Total</span>
                  <span>${checkoutData.totalPayable.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessPayPage;