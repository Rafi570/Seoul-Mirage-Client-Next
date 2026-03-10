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
      className="flex-1 bg-black text-white h-[60px] rounded-sm font-black text-[11px] uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-4 active:scale-[0.97] shadow-2xl hover:bg-gray-900 disabled:bg-gray-400"
    >
      {loading ? "Processing..." : "Add to Cart"} <span className="text-lg">→</span>
    </button>
  );
};

export default Addtocartbtn;