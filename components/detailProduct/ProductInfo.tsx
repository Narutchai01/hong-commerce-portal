import QuantitySelector from "./QuantitySelector";

type Props = {
  product: any;
  qty: number;
  setQty: React.Dispatch<React.SetStateAction<number>>;
};

export default function ProductInfo({
  product,
  qty,
  setQty,
}: Props) {
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

      <QuantitySelector qty={qty} setQty={setQty} />

      <div className="mt-8 flex gap-4">
        <button className="flex-1 rounded-xl border-2 border-orange-500 py-4 font-semibold text-orange-500">
          Add to Cart
        </button>

        <button className="flex-1 rounded-xl bg-orange-500 py-4 font-semibold text-white">
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