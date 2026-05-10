"use client";

import {
    ChevronRight,
    Minus,
    Plus,
    Trash2,
    Truck,
} from "lucide-react";

interface Props {
    brands: string[];
    groupedItems: any;
    selected: number[];
    cartItems: any[];
    selectedItems: any[];
    subtotal: number;
    remainingForFreeShipping: number;
    shippingProgress: number;

    toggleItem: (id: number) => void;
    toggleBrand: (brand: string) => void;
    toggleSelectAll: () => void;
    deleteSelected: () => void;

    increaseQty: (id: number) => void;
    decreaseQty: (id: number) => void;
}

export default function CartItems({
    brands,
    groupedItems,
    selected,
    cartItems,
    selectedItems,
    subtotal,
    remainingForFreeShipping,
    shippingProgress,

    toggleItem,
    toggleBrand,
    toggleSelectAll,
    deleteSelected,

    increaseQty,
    decreaseQty,
}: Props) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between rounded-md border bg-white px-5 py-4">
                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        checked={
                            selected.length === cartItems.length &&
                            cartItems.length > 0
                        }
                        onChange={toggleSelectAll}
                    />

                    <h2 className="text-xl font-bold">
                        Select All ({selectedItems.length} items)
                    </h2>
                </div>

                <button
                    onClick={deleteSelected}
                    className="flex items-center gap-2 text-red-500 font-semibold hover:underline"
                >
                    <Trash2 className="h-4 w-4" />
                    Delete Selected
                </button>
            </div>
            <div className="rounded-md border bg-white px-5 py-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-primary">
                    <Truck className="h-4 w-4" />

                    {remainingForFreeShipping > 0 ? (
                        <>
                            Add $
                            {remainingForFreeShipping.toFixed(2)}
                            {" "}more for Free Shipping
                        </>
                    ) : (
                        <>🎉 You got Free Shipping</>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <div className="h-2 flex-1 rounded-full bg-gray-200">
                        <div
                            className="h-full bg-primary transition-all"
                            style={{
                                width: `${shippingProgress}%`,
                            }}
                        />
                    </div>

                    <p className="text-sm font-semibold text-gray-500">
                        ${subtotal.toFixed(2)} / $100.00
                    </p>
                </div>
            </div>

            {brands.map((brand) => {
                const items = groupedItems[brand];

                return (
                    <div
                        key={brand}
                        className="rounded-md border bg-white"
                    >
                        <div className="flex items-center gap-2 border-b bg-gray-50 px-4 py-3">
                            <input
                                type="checkbox"
                                checked={items.every((i: any) =>
                                    selected.includes(i.id)
                                )}
                                onChange={() =>
                                    toggleBrand(brand)
                                }
                            />

                            <h3 className="font-semibold">
                                {brand}
                            </h3>

                            <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>

                        {items.map((item: any) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between p-4"
                            >
                                <div className="flex items-center gap-4">
                                    <input
                                        type="checkbox"
                                        checked={selected.includes(item.id)}
                                        onChange={() =>
                                            toggleItem(item.id)
                                        }
                                    />

                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="h-[80px] w-[80px] rounded-md border object-cover"
                                    />

                                    <div>
                                        <h2 className="font-semibold">
                                            {item.title}
                                        </h2>

                                        <p className="text-sm text-gray-500">
                                            {item.category}
                                        </p>

                                        <p className="font-bold text-primary">
                                            ${item.price}
                                        </p>
                                    </div>
                                </div>

                                <div className="ml-auto flex items-center overflow-hidden rounded-md border">
                                    <button
                                        onClick={() =>
                                            decreaseQty(item.id)
                                        }
                                        className="flex h-10 w-10 items-center justify-center hover:bg-gray-100"
                                    >
                                        <Minus className="h-4 w-4" />
                                    </button>

                                    <div className="w-10 text-center">
                                        {item.quantity}
                                    </div>

                                    <button
                                        onClick={() =>
                                            increaseQty(item.id)
                                        }
                                        className="flex h-10 w-10 items-center justify-center hover:bg-gray-100"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            })}
        </div>
    );
}
