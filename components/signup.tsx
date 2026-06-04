"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
    Eye,
    EyeOff,
} from "lucide-react";

export default function SignupForm() {
    const [showPassword, setShowPassword] =
        useState(false);
    const router = useRouter();
    return (
        <div className="w-full max-w-[420px] bg-white border border-[#f1d4cc] rounded-[10px] p-8">
            <h1 className="text-center text-[40px] font-bold text-[#d12b00]">
                Signup
            </h1>

            <p className="text-center text-gray-500 mt-2 mb-8">
                Join the digital bazaar today.
            </p>

            <form className="space-y-5">
                <div>
                    <label className="block mb-2 text-sm font-semibold">
                        Full Name
                    </label>

                    <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full h-[50px] border rounded-md px-4 outline-none focus:border-[#d12b00]"
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-semibold">
                        Phone Number or Email
                    </label>

                    <input
                        type="text"
                        placeholder="e.g. +1 234 567 890"
                        className="w-full h-[50px] border rounded-md px-4 outline-none focus:border-[#d12b00]"
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-semibold">
                        Password
                    </label>

                    <div className="relative">
                        <input
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            placeholder="At least 8 characters"
                            className="w-full h-[50px] border rounded-md px-4 outline-none focus:border-[#d12b00]"
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword(
                                    !showPassword
                                )
                            }
                            className="absolute right-4 top-4 text-gray-500"
                        >
                            {showPassword ? (
                                <Eye className="h-5 w-5" />
                            ) : (
                                <EyeOff className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block mb-2 text-sm font-semibold">
                        Confirm Password
                    </label>

                    <input
                        type="password"
                        placeholder="Confirm password"
                        className="w-full h-[50px] border rounded-md px-4 outline-none focus:border-[#d12b00]"
                    />
                </div>

                <button className="w-full h-[50px] bg-[#d12b00] hover:bg-[#b92500] text-white rounded-md font-semibold transition">
                    Sign Up Now →
                </button>
            </form>

            <div className="flex items-center gap-3 my-7 text-gray-400 text-sm">
                <div className="flex-1 h-[1px] bg-gray-300"></div>

                OR CONTINUE WITH

                <div className="flex-1 h-[1px] bg-gray-300"></div>
            </div>

            <p className="text-center mt-6 text-sm">
                Already have an account?{" "}
                <button
                    type="button"
                    onClick={() =>
                        router.push("/signup")
                    }
                    className="font-semibold text-[#d12b00]"
                >
                    Sign Up
                </button>
            </p>
        </div>
    );
}