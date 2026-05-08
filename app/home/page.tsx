"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import HomeBanner from "@/components/banner";
import Categories from "@/components/categories";
import ProductCard from "@/components/productCard";
import Footer from "@/components/footer";
import { products } from "@/data/mockData";
import Link from "next/link";

export default function HomePage() {
  const [visibleCount, setVisibleCount] = useState(4);

  const loadMore = () => {
    if (visibleCount < products.length) {
      setVisibleCount((prev) => prev + 4);
    }
  };

  return (
    <main className="min-h-screen">
      <Navbar />

      <HomeBanner />

      <Categories />

      <section className="px-4 pb-10">
        <div className="mb-8 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-primary">
            Popular Products
          </h2>
        </div>
        <div className="mb-8 flex flex-col items-end">
          <Link
            href="/products"
            className="text-md font-semibold text-primary underline hover:opacity-70"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {products.slice(0, visibleCount).map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
            />
          ))}
        </div>

        {visibleCount < products.length && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={loadMore}
              disabled={visibleCount >= products.length}
              className="rounded-xl border-2 border-primary bg-white px-8 py-3 font-semibold text-primary transition hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-primary"
            >
              {visibleCount >= products.length
                ? "No More Products"
                : "Load More"}
            </button>
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}