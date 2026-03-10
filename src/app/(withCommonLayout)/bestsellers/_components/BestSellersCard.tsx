import Image from "next/image";
import Link from "next/link";
import { IProduct } from "@/types/product";

const BestSellersCard = ({ product }: { product: IProduct }) => {
  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-[1/1.2] overflow-hidden bg-[#F9F9F9] rounded-sm mb-3">
        <Link href={`/bestsellers/${product._id}`}>
          <Image
            src={product.mainImage}
            alt={product.name}
            fill
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
      </div>
      <div className="space-y-1">
        <p className="text-[10px] md:text-[12px] text-gray-500 uppercase tracking-widest">
          {product.category}
        </p>
        <h3 className="font-semibold text-[#111] text-sm md:text-lg truncate">
          {product.name}
        </h3>
        <p className="text-xl md:text-3xl font-bold text-[#111]">
          ${product.price}
        </p>
      </div>
    </div>
  );
};

export default BestSellersCard;