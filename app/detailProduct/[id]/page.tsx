"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ProductGallery from "@/components/detailProduct/ProductGallery";
import ProductInfo from "@/components/detailProduct/ProductInfo";
import RelatedProducts from "@/components/detailProduct/RelatedProducts";
import { products } from "@/data/mockData";

export default function ProductDetailPage() {
  const params = useParams();

  const productId = Number(params.id);

  const product = products.find(
    (item) => item.id === productId
  );

  if (!product) {
    return <div>Product not found</div>;
  }

  const [selectedImage, setSelectedImage] = useState(product.image);
  const [qty, setQty] = useState(1);

  const relatedProducts = useMemo(() => {
    return products.filter(
      (item) =>
        item.category === product.category &&
        item.id !== product.id
    );
  }, [product]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white p-5">
        <div className="mx-auto grid w-full grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">

          <div className="grid gap-6 rounded-2xl border border-gray-200 p-5 lg:grid-cols-[1200px_1fr]">
            
            <ProductGallery
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              productImage={product.image}
              title={product.title}
            />

            <ProductInfo
              product={product}
              qty={qty}
              setQty={setQty}
            />
          </div>

          <RelatedProducts
            relatedProducts={relatedProducts}
          />

        </div>
      </div>

      <Footer />
    </>
  );
}