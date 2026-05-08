type Props = {
  qty: number;
  setQty: React.Dispatch<React.SetStateAction<number>>;
};

export default function QuantitySelector({
  qty,
  setQty,
}: Props) {
  return (
    <div className="mt-6 flex items-center gap-4">
      <span className="font-medium">Quantity</span>

      <div className="flex items-center rounded-lg border">
        <button
          className="h-10 w-10 text-lg"
          onClick={() =>
            setQty((prev) => Math.max(1, prev - 1))
          }
        >
          -
        </button>

        <div className="w-10 text-center">{qty}</div>

        <button
          className="h-10 w-10 text-lg"
          onClick={() => setQty((prev) => prev + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
}