'use client'
import { ChevronRight } from "lucide-react";
import { orderStatusMap } from "@/utils/orderStatus";

interface OrderCardProps {
    order: any;
    onClick: () => void;
}

export default function OrderCard({ order, onClick }: OrderCardProps) {
    const status = orderStatusMap[order.status as keyof typeof orderStatusMap];

    return (
        <div
            onClick={onClick}
            className="cursor-pointer rounded-2xl border bg-white p-5 hover:shadow-md transition group"
        >
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-xs text-neutral-400 uppercase tracking-wider">Order ID</p>
                    <h2 className="font-bold text-neutral-800">{order.orderId}</h2>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
                    {status.label}
                </span>
            </div>

            <div className="mt-5 flex items-center gap-4">
                <img
                    src={order.items[0]?.image}
                    alt={order.items[0]?.title}
                    className="h-20 w-20 rounded-xl object-cover border border-neutral-100"
                />
                <div className="flex-1">
                    <h3 className="font-semibold text-neutral-800 line-clamp-1">
                        {order.items[0]?.title}
                    </h3>
                    <p className="text-sm text-neutral-400">{order.paidDate}</p>
                    <p className="text-xl font-bold text-[#d93f1d] mt-2">
                        ฿{order.totalAmount.toLocaleString()}
                    </p>
                </div>
                <ChevronRight className="text-neutral-300 group-hover:text-[#d93f1d] transition-colors" />
            </div>
        </div>
    );
}