"use client";

import { CartItem, mockUser } from "@/data/mockUser";
import { MapPin, Package, Truck, QrCode, X, MapPinCheckInside, Phone, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  items: CartItem[];
  shippingMethod: "standard" | "express";
  setShippingMethod: (method: "standard" | "express") => void;
}

export default function CheckoutForm({
  items,
  shippingMethod,
  setShippingMethod,
}: Props) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addressList, setAddressList] = useState<any[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  useEffect(() => {
    const savedAddresses = localStorage.getItem('userAddresses');
    if (savedAddresses) {
      const list = JSON.parse(savedAddresses);
      setAddressList(list);
      const defaultAddr = list.find((a: any) => a.isDefault) || list[0];
      setSelectedAddress(defaultAddr);
    } else {
      const initialAddr = {
        fullName: mockUser.fullName,
        phone: mockUser.phone,
        detail: mockUser.address.detail,
        city: mockUser.address.city,
        zipCode: mockUser.address.zipCode,
        country: mockUser.address.country,
        isDefault: true
      };
      setAddressList([initialAddr]);
      setSelectedAddress(initialAddr);
    }
  }, []);

  const safeItems = Array.isArray(items)
    ? items.map((i: any) => ({
        ...i,
        id: Number(i.id),
        price: Number(i.price),
        quantity: Number(i.quantity),
      }))
    : [];

  useEffect(() => {
    localStorage.setItem("shippingMethod", shippingMethod);
  }, [shippingMethod]);

  const handleSelectAddress = (addr: any) => {
    setSelectedAddress(addr);
    setIsModalOpen(false);
  };

  return (
    <div className="lg:col-span-2 space-y-6">
      <section className="bg-white border border-orange-200 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-neutral-900 font-semibold text-lg">
            <MapPin className="w-5 h-5 text-orange-500" />
            Delivery Address
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="text-sm text-orange-500 font-medium hover:underline cursor-pointer"
          >
            Change
          </button>
        </div>

        {selectedAddress ? (
          <div className="border border-orange-200 rounded-lg p-4 relative bg-orange-50/30">
            {selectedAddress.isDefault && (
               <span className="absolute top-3 right-3 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase">
                Default
              </span>
            )}

            <h3 className="font-semibold text-neutral-900">
              {selectedAddress.fullName} ({selectedAddress.phone})
            </h3>

            <div className="mt-2 text-sm text-neutral-600 leading-6">
              <p>{selectedAddress.detail}</p>
              <p>
                {selectedAddress.city}, {selectedAddress.zipCode}
              </p>
              <p>{selectedAddress.country}</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-4 text-neutral-500 text-sm italic">
            Please select a delivery address
          </div>
        )}
      </section>
      <section className="bg-white border border-orange-200 rounded-xl p-5">
        <div className="flex items-center gap-2 text-neutral-900 font-semibold text-lg mb-5">
          <Package className="w-5 h-5 text-orange-500" />
          Order Items Summary
        </div>
        <div className="space-y-4">
          {safeItems.map((item) => (
            <div key={`${item.id}-${item.title}`} className="border border-orange-100 rounded-lg p-4 flex items-center gap-4">
              <div className="w-24 h-24 rounded-lg overflow-hidden bg-neutral-100 flex items-center justify-center">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-neutral-900 text-lg">{item.title}</h3>
                <p className="text-sm text-neutral-500 mt-1">Brand: {item.brand}</p>
                <p className="text-orange-500 font-bold mt-3 text-lg">${item.price.toFixed(2)}</p>
              </div>
              <div className="text-sm text-neutral-500 font-medium">Qty: {item.quantity}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border border-orange-200 rounded-xl p-5">
         <div className="flex items-center gap-2 text-neutral-900 font-semibold text-lg mb-5">
          <Truck className="w-5 h-5 text-orange-500" />
          Shipping Option
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className={`rounded-lg p-4 cursor-pointer flex gap-3 items-start border-2 transition-colors ${shippingMethod === "standard" ? "border-orange-500 bg-orange-50/20" : "border-neutral-200 hover:border-orange-300"}`}>
            <input type="radio" name="shipping" checked={shippingMethod === "standard"} onChange={() => setShippingMethod("standard")} className="accent-orange-500 mt-1" />
            <div>
              <h3 className="font-semibold text-neutral-900">Standard Delivery</h3>
              <p className="text-sm text-neutral-500 mt-1">Receive by Oct 15 - Oct 18</p>
              <p className="text-orange-500 font-bold mt-2">$15.00</p>
            </div>
          </label>
          <label className={`rounded-lg p-4 cursor-pointer flex gap-3 items-start border-2 transition-colors ${shippingMethod === "express" ? "border-orange-500 bg-orange-50/20" : "border-neutral-200 hover:border-orange-300"}`}>
            <input type="radio" name="shipping" checked={shippingMethod === "express"} onChange={() => setShippingMethod("express")} className="accent-orange-500 mt-1" />
            <div>
              <h3 className="font-semibold text-neutral-900">Express Delivery</h3>
              <p className="text-sm text-neutral-500 mt-1">Receive by Oct 12 - Oct 13</p>
              <p className="text-orange-500 font-bold mt-2">$30.00</p>
            </div>
          </label>
        </div>
      </section>

      <section className="bg-white border border-orange-200 rounded-xl p-5">
        <div className="flex items-center gap-2 text-neutral-900 font-semibold text-lg mb-5">
          <QrCode className="w-5 h-5 text-orange-500" />
          Payment Method
        </div>
        <div className="border-2 border-orange-500 rounded-lg p-4 flex items-center justify-between bg-orange-50/10">
          <div className="flex items-center gap-3">
            <QrCode className="w-5 h-5 text-neutral-500" />
            <span className="font-medium text-neutral-800">QR Code Payment</span>
          </div>
          <span className="text-sm text-neutral-500 italic">Secure Payment</span>
        </div>
      </section>
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-neutral-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-neutral-900">Select Delivery Address</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-full hover:bg-neutral-100 text-neutral-400 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
              {addressList.map((addr, index) => (
                <div
                  key={index}
                  onClick={() => handleSelectAddress(addr)}
                  className={`border-2 p-5 rounded-xl cursor-pointer transition-all relative group ${
                    selectedAddress?.detail === addr.detail 
                    ? 'border-orange-500 bg-orange-50/30' 
                    : 'border-neutral-100 hover:border-orange-200 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-neutral-900">{addr.fullName}</p>
                      {addr.isDefault && (
                        <span className="text-[10px] bg-orange-100 text-orange-600 px-2 py-0.5 rounded font-bold uppercase">Default</span>
                      )}
                    </div>
                    {selectedAddress?.detail === addr.detail && (
                      <MapPinCheckInside className="text-orange-500 w-5 h-5" />
                    )}
                  </div>

                  <div className="text-sm text-neutral-600 space-y-1">
                    <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> {addr.phone}</p>
                    <p className="pl-5">{addr.detail}</p>
                    <p className="pl-5">{addr.city}, {addr.zipCode}, {addr.country}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}