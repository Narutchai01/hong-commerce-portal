"use client";

import { mockUser } from "@/data/mockUser";
import { useRouter } from "next/navigation";

function QuantitySelector({
  qty,
  setQty,
}: {
  qty: number;
  setQty: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="flex items-center gap-3 mt-4">
      <button
        onClick={() => setQty(Math.max(1, qty - 1))}
        className="px-3 py-1 border rounded"
      >
        -
      </button>

      <span className="font-semibold">{qty}</span>

      <button
        onClick={() => setQty(qty + 1)}
        className="px-3 py-1 border rounded"
      >
        +
      </button>
    </div>
  );
}
export default function ProductInfo({
  product,
  qty,
  setQty,
}: any) {
  const router = useRouter();

  const handleAddToCart = () => {
  const user = localStorage.getItem("user");

  if (!user) {
    router.push("/login");
    return;
  }

  const stored = localStorage.getItem("cart");

  let cart = stored ? JSON.parse(stored) : [];

  const existing = cart.find(
    (i: any) => i.id === product.id
  );

  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({
      id: Number(product.id),
      title: product.title,
      price: product.price,
      quantity: qty,
      image: product.image,
      brand: product.brand,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  window.dispatchEvent(new Event("cartUpdated"));
};
  const handleBuyNow = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      router.push("/login");
      return;
    }

    const item = {
      id: Number(product.id),
      title: product.title,
      price: product.price,
      quantity: qty,
      image: product.image,
      brand: product.brand,
    };

    const order = {
      orderId: `BF-${Date.now()}`,
      items: [item],
      total: product.price * qty,
      status: "toPay",
      createdAt: Date.now(),
      source: "buyNow",
    };

    localStorage.setItem(
      "currentOrder",
      JSON.stringify(order)
    );

    localStorage.setItem(
      "selectedCartItems",
      JSON.stringify([Number(product.id)])
    );

    router.push(`/${mockUser.id}/checkout`);
  };
  return (
    <div>
      <span className="rounded-full bg-orange-500 px-3 py-1 text-xs text-white">
        {product.brand}
      </span>

      <h1 className="mt-4 text-3xl font-bold leading-tight">
        {product.title}
      </h1>

      <div className="mt-4 flex flex-wrap gap-2">
        {product.tags.map((tag: string) => (
          <span
            key={tag}
            className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="mt-6 rounded-xl bg-orange-50 p-5">
        <div className="flex items-center gap-3">
          <span className="text-4xl font-bold text-orange-600">
            ${product.price}
          </span>

          <span className="text-lg text-gray-400 line-through">
            ${product.originalPrice}
          </span>

          <span className="rounded-md bg-red-500 px-2 py-1 text-xs text-white">
            -{product.discount}%
          </span>
        </div>
      </div>

      <div className="mt-6 space-y-2 text-gray-600">
        <p>🚚 Free Shipping Available</p>
        <p>📦 Stock: {product.stock}</p>

        <p>
          🎨 Colors: {product.colors.join(", ")}
        </p>
      </div>
      <div className="mt-6">
        <h3 className="font-semibold text-neutral-900">
          Quantity
        </h3>

        <QuantitySelector
          qty={qty}
          setQty={setQty}
        />
      </div>

      <div className="mt-8 flex gap-4">
        <button
          onClick={handleAddToCart}
          className="flex-1 rounded-xl border-2 border-orange-500 py-4 font-semibold text-orange-500"
        >
          Add to Cart
        </button>

        <button
          onClick={handleBuyNow}
          className="flex-1 rounded-xl bg-orange-500 py-4 font-semibold text-white"
        >
          Buy Now
        </button>
      </div>

      <div className="mt-10 border-t pt-6">
        <h3 className="mb-4 text-xl font-bold">
          Product Description
        </h3>

        <p className="leading-8 text-gray-600">
          {product.description}
        </p>
      </div>
    </div>
  );
}