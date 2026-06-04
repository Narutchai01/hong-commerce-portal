"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { mockUser } from "@/data/mockUser";
import { ShieldCheck } from "lucide-react";

type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image?: string;
  brand?: string;
};

type Order = {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
};

export default function PaymentCard() {
  const router = useRouter();

  const [items, setItems] = useState<CartItem[]>([]);
  const [orderId, setOrderId] = useState("");
  const [expireTime, setExpireTime] = useState("");
  const [shippingFee, setShippingFee] =
    useState(15);


  useEffect(() => {
    if (typeof window === "undefined")
      return;

    const stored =
      localStorage.getItem(
        "currentOrder"
      );

    if (!stored) {
      setItems([]);
      setOrderId("");
      return;
    }

    try {
      const order: Order =
        JSON.parse(stored);

      const normalizedItems: CartItem[] =
        Array.isArray(order.items)
          ? order.items.map(
              (i: any) => ({
                id: Number(i.id),
                title: String(
                  i.title || ""
                ),
                price: Number(
                  i.price || 0
                ),
                quantity: Number(
                  i.quantity || 1
                ),
                image: i.image || "",
                brand: i.brand || "",
              })
            )
          : [];

      setItems(normalizedItems);

      setOrderId(order.orderId || "");

      const fee = Number(
        order.shippingFee
      );

      setShippingFee(
        Number.isFinite(fee) &&
          fee > 0
          ? fee
          : 15
      );
    } catch (err) {
      console.error(
        "Payment parse error:",
        err
      );

      setItems([]);
      setOrderId("");
    }
  }, []);

  const subtotal = useMemo(() => {
    return items.reduce(
      (sum, i) =>
        sum + i.price * i.quantity,
      0
    );
  }, [items]);

  const total = useMemo(() => {
    return subtotal + shippingFee;
  }, [subtotal, shippingFee]);


  useEffect(() => {
    if (
      !orderId ||
      items.length === 0
    )
      return;

    const existingOrders =
      localStorage.getItem(
        "orders"
      );

    const orders = existingOrders
      ? JSON.parse(existingOrders)
      : [];

    const alreadyExists =
      orders.some(
        (o: any) =>
          o.orderId === orderId
      );

    if (!alreadyExists) {
      const expireAt =
        Date.now() +
        24 * 60 * 60 * 1000;

      const newOrder = {
        orderId,

        totalAmount: total,

        paidDate:
          new Date().toLocaleString(
            "th-TH",
            {
              dateStyle: "medium",
              timeStyle: "short",
            }
          ),

        status: "toPay",

        items,

        expireAt,
      };

      orders.unshift(newOrder);

      localStorage.setItem(
        "orders",
        JSON.stringify(orders)
      );

      localStorage.setItem(
        `paymentExpireAt_${orderId}`,
        String(expireAt)
      );
    }
  }, [orderId, items, total]);


  useEffect(() => {
    if (!orderId) return;

    const key = `paymentExpireAt_${orderId}`;

    let expireAt = Number(
      localStorage.getItem(key)
    );

    if (!expireAt) {
      expireAt =
        Date.now() +
        24 * 60 * 60 * 1000;

      localStorage.setItem(
        key,
        String(expireAt)
      );
    }

    const tick = () => {
      const diff =
        expireAt - Date.now();

      if (diff <= 0) {
        setExpireTime("Expired");

        const existingOrders =
          localStorage.getItem(
            "orders"
          );

        if (existingOrders) {
          const orders =
            JSON.parse(
              existingOrders
            );

          const updatedOrders =
            orders.map(
              (order: any) => {
                if (
                  order.orderId ===
                    orderId &&
                  order.status ===
                    "toPay"
                ) {
                  return {
                    ...order,
                    status:
                      "cancelled",
                  };
                }

                return order;
              }
            );

          localStorage.setItem(
            "orders",
            JSON.stringify(
              updatedOrders
            )
          );
        }

        return;
      }

      const h = Math.floor(
        diff / 3600000
      );

      const m = Math.floor(
        (diff % 3600000) / 60000
      );

      const s = Math.floor(
        (diff % 60000) / 1000
      );

      setExpireTime(
        `${String(h).padStart(
          2,
          "0"
        )}:${String(m).padStart(
          2,
          "0"
        )}:${String(s).padStart(
          2,
          "0"
        )}`
      );
    };

    tick();

    const interval = setInterval(
      tick,
      1000
    );

    return () =>
      clearInterval(interval);
  }, [orderId]);


  const merchantName = useMemo(() => {
    if (!items.length)
      return "BazaarFlow";

    return Array.from(
      new Set(
        items.map((i) => i.title)
      )
    ).join(", ");
  }, [items]);

  return (
    <div className="w-full max-w-md rounded-2xl border bg-white shadow-sm">
      <div className="bg-[#d93f1d] px-6 py-5 text-center text-white">
        <h1 className="text-2xl font-bold">
          Thai QR Payment
        </h1>

        <div className="mt-3 text-sm">
          Remaining:{" "}
          <b>{expireTime}</b>
        </div>
      </div>

      <div className="border-b px-6 py-5">
        <div className="flex justify-between py-2">
          <span>Merchant</span>

          <span className="font-semibold">
            {merchantName}
          </span>
        </div>

        <div className="flex justify-between py-2">
          <span>Order ID</span>

          <span className="font-semibold">
            {orderId}
          </span>
        </div>

        <div className="flex justify-between py-2">
          <span>Total</span>

          <span className="text-xl font-bold text-[#d93f1d]">
            ฿{total.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="px-6 py-8">
        <div className="h-[260px] w-[260px] mx-auto bg-gray-100 rounded-xl" />

        <div className="text-center mt-5 text-sm text-gray-500">
          Scan to pay
        </div>

        <div className="mt-6 space-y-3">
          <button
            onClick={() => {
              const storedOrder =
                localStorage.getItem(
                  "currentOrder"
                );

              if (storedOrder) {
                const order =
                  JSON.parse(
                    storedOrder
                  );

                localStorage.setItem(
                  "orderId",
                  order.orderId
                );

                localStorage.setItem(
                  "paymentTotal",
                  JSON.stringify(
                    total
                  )
                );

                localStorage.setItem(
                  "checkoutItems",
                  JSON.stringify(
                    order.items
                  )
                );

                localStorage.setItem(
                  "paidDate",
                  new Date().toLocaleString(
                    "th-TH",
                    {
                      dateStyle:
                        "medium",
                      timeStyle:
                        "short",
                    }
                  )
                );

                const existingOrders =
                  localStorage.getItem(
                    "orders"
                  );

                if (existingOrders) {
                  const orders =
                    JSON.parse(
                      existingOrders
                    );

                  const updatedOrders =
                    orders.map(
                      (
                        o: any
                      ) => {
                        if (
                          o.orderId ===
                          order.orderId
                        ) {
                          return {
                            ...o,
                            status:
                              "toShip",
                          };
                        }

                        return o;
                      }
                    );

                  localStorage.setItem(
                    "orders",
                    JSON.stringify(
                      updatedOrders
                    )
                  );
                }
              }

              router.push(
                `/${mockUser.id}/payment/success`
              );
            }}
            className="w-full bg-[#d93f1d] text-white py-4 rounded-xl font-semibold"
          >
            Download QR
          </button>
          <button
            onClick={() => {
              const existingOrders =
                localStorage.getItem(
                  "orders"
                );

              if (existingOrders) {
                const orders =
                  JSON.parse(
                    existingOrders
                  );

                const updatedOrders =
                  orders.map(
                    (
                      o: any
                    ) => {
                      if (
                        o.orderId ===
                        orderId
                      ) {
                        return {
                          ...o,
                          status:
                            "cancelled",
                        };
                      }

                      return o;
                    }
                  );

                localStorage.setItem(
                  "orders",
                  JSON.stringify(
                    updatedOrders
                  )
                );
              }

              router.push(
                `/${mockUser.id}/myOrder`
              );
            }}
            className="w-full border py-4 rounded-xl text-gray-500"
          >
            Cancel Payment
          </button>
        </div>
      </div>

      <div className="border-t bg-gray-50 p-4 text-center text-xs text-gray-400 flex justify-center gap-2">
        <ShieldCheck className="h-4 w-4" />
        SECURED PAYMENT
      </div>
    </div>
  );
}