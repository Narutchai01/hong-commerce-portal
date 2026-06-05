"use client";

import Image from "next/image";
import Link from "next/link";

type Props = {
  relatedProducts: any[];
};

export default function RelatedProducts({ relatedProducts }: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 p-5">
      <h2 className="mb-5 text-xl font-bold">Related Products</h2>

      <div className="space-y-6">
        {relatedProducts.map((item) => (
          <Link
            href={`/detailProduct/${item.id}`}
            key={item.id}
            className="block"
          >
            <div className="overflow-hidden rounded-xl border bg-white transition hover:shadow-lg">
              <div className="relative h-[220px] w-full bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4">
                <h3 className="line-clamp-2 font-semibold">{item.title}</h3>

                <div className="mt-2 flex items-center justify-between">
                  <span className="text-lg font-bold text-orange-600">
                    ${item.price}
                  </span>

                  <span className="text-sm text-gray-400">{item.brand}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
