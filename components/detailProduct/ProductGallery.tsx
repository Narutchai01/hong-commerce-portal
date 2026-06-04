"use client";

import Image from "next/image";

type Props = {
  selectedImage: string;
  setSelectedImage: (image: string) => void;
  productImage: string;
  title: string;
};

export default function ProductGallery({
  selectedImage,
  setSelectedImage,
  productImage,
  title,
}: Props) {
  return (
    <div>
      <div className="relative h-[560px] overflow-hidden rounded-xl border border-gray-200 bg-[#f4f4f4]">
        <Image
          src={selectedImage}
          alt={title}
          fill
          className="object-contain"
        />
      </div>

      <div className="mt-4 flex gap-3">
        {[productImage].map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(img)}
            className={`relative h-40 w-40 overflow-hidden rounded-lg border-2 ${
              selectedImage === img
                ? "border-orange-500"
                : "border-transparent"
            }`}
          >
            <Image
              src={img}
              alt="thumb"
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}