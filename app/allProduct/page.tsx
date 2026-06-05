"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ProductCard from "@/components/productCard";
import { products } from "@/data/mockData";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 16;

  const categories = [
    "all",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    } else {
      setSelectedCategory("all");
    }
  }, [categoryFromUrl]);

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="px-4 py-10">
        <h1 className="mb-6 text-2xl font-bold text-primary">All Products</h1>
        <div className="mb-6 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`border px-4 py-1 text-lg transition
                ${selectedCategory === cat
                  ? "border-primary bg-primary text-white"
                  : "border-gray-300 bg-white text-primary hover:border-primary"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {paginatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
              id={product.id}
            />
          ))}
        </div>
        <div className="mt-8 flex justify-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="rounded border px-3 py-1"
          >
            ‹
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`rounded px-3 py-1 border ${currentPage === i + 1
                  ? "bg-primary text-white border-primary"
                  : ""
                }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((p) => Math.min(p + 1, totalPages))
            }
            className="rounded border px-3 py-1"
          >
            ›
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
