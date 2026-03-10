"use client"
import React from 'react';

interface AddToCartProps {
  onAdd: () => void;
  loading?: boolean;
}

const Addtocartbtn = ({ onAdd, loading }: AddToCartProps) => {
  return (
    <button
      onClick={onAdd}
      disabled={loading}
      className="group relative w-full h-[60px] bg-[#111] overflow-hidden transition-all duration-500 hover:bg-[#222] disabled:bg-gray-400 active:scale-[0.98]"
    >
      <div className="relative z-10 flex items-center justify-center gap-3">
        <span className="text-white text-[11px] font-black uppercase tracking-[0.5em] ml-2">
          {loading ? "Adding to Collection..." : "Add to Cart"}
        </span>
        {!loading && (
          <svg 
            className="w-4 h-4 text-white transform transition-transform duration-500 group-hover:translate-x-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        )}
      </div>
      <div className="absolute inset-0 bg-white/5 transform -translate-x-full transition-transform duration-500 group-hover:translate-x-0" />
    </button>
  );
};

export default Addtocartbtn;