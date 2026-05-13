'use client'
import { MapPin, MapPinCheckInside, Phone, Plus, Trash2 } from "lucide-react";

interface Address {
    fullName: string;
    phone: string;
    detail: string;
    city: string;
    zipCode: string;
    country: string;
    isDefault: boolean;
}

interface AddressSectionProps {
    addressList: Address[];
    onOpenAddModal: () => void;
    onEditClick: (index: number) => void;
    onSetDefault: (index: number) => void;
    onDeleteClick: (index: number) => void;
}

export default function AddressSection({
    addressList, onOpenAddModal, onEditClick, onSetDefault, onDeleteClick
}: AddressSectionProps) {
    return (
        <div className="xl:col-span-1 bg-white p-8 rounded-2xl shadow-md border border-gray-100">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <span className="p-3 rounded-full bg-red-50 text-red-700">
                        <MapPin className="w-6 h-6" />
                    </span>
                    <h2 className="text-2xl font-bold text-gray-900">Address</h2>
                </div>
                <button
                    onClick={onOpenAddModal}
                    className="text-l text-primary font-extrabold hover:underline transition-all flex items-center gap-1"
                >
                    <Plus className="w-4 h-4" /> Add New
                </button>
            </div>

            <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {addressList.map((addr, index) => (
                    <div
                        key={index}
                        className={`bg-white border-2 p-6 rounded-2xl relative transition-all duration-200 cursor-pointer ${addr.isDefault ? 'border-primary shadow-md' : 'border-gray-100 hover:border-gray-300'
                            }`}
                        onClick={() => onSetDefault(index)}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <p className="text-lg font-black text-gray-900">{addr.fullName}</p>
                                {addr.isDefault && (
                                    <span className="px-3 py-1 bg-orange-100 text-orange-700 text-[10px] font-bold uppercase rounded-md tracking-wider">Default</span>
                                )}
                            </div>
                            {addr.isDefault && <MapPinCheckInside className="text-primary w-5 h-5" />}
                        </div>

                        <div className="text-base text-gray-700 space-y-3 leading-relaxed">
                            <p className="font-semibold text-gray-900 flex items-center gap-3">
                                <Phone className="w-4 h-4 text-gray-400" /> {addr.phone}
                            </p>
                            <div className="flex gap-3">
                                <MapPin className="w-5 h-5 text-gray-400 shrink-0 mt-1" />
                                <div>
                                    <p className="text-gray-700">{addr.detail}</p>
                                    <p className="font-medium text-gray-800">{addr.city}, {addr.zipCode}</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                            <div className="flex gap-4">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onEditClick(index);
                                    }}
                                    className="text-sm font-bold text-blue-600 hover:underline"
                                >
                                    Edit
                                </button>
                                {!addr.isDefault && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onSetDefault(index);
                                        }}
                                        className="text-sm font-bold text-gray-400 hover:text-primary"
                                    >
                                        Set as Default
                                    </button>
                                )}
                            </div>
                            {!addr.isDefault && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); 
                                        onDeleteClick(index); 
                                    }}
                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                    title="Delete Address"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}