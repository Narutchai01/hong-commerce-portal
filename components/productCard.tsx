"use client";

import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  id: number;
  image: string;
  title: string;
  price: number;
};

export default function ProductCard({
  id,
  image,
  title,
  price,
}: ProductCardProps) {
  return (
    <Link href={`/detailProduct/${id}`}>
      <div className="group overflow-hidden rounded-xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
        
        <div className="relative overflow-hidden">
          <Image
            src={image}
            alt={title}
            width={400}
            height={400}
            className="h-[400px] w-full object-cover transition duration-300 group-hover:scale-105"
          />
        </div>

        <div className="space-y-2 p-3">
          <h3 className="line-clamp-2 text-sm font-medium text-gray-800">
            {title}
          </h3>

          <p className="text-xs font-semibold text-primary">
            Free Shipping
          </p>

          <div className="flex items-end justify-between">
            <span className="text-2xl font-bold text-primary">
              ${price}
            </span>
          </div>
        </div>

      </div>
    </Link>
  );
}