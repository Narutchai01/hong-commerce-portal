"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { mockUser } from "@/data/mockUser";

export default function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleLogin = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      email === mockUser.email &&
      password === mockUser.password
    ) {
      localStorage.setItem(
        "token",
        "mock_token"
      );

      localStorage.setItem(
        "user",
        JSON.stringify(mockUser)
      );

      router.push("/");
    } else {
      setError(
        "Invalid email or password"
      );
    }
  };

  return (
    <div className="w-full max-w-[420px] rounded-[10px] border border-[#f1d4cc] bg-white p-8">
      <h1 className="text-center text-[40px] font-bold text-[#d12b00]">
        Login
      </h1>

      <p className="mt-2 mb-8 text-center text-gray-500">
        Welcome back to the digital
      </p>

      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-semibold">
            Phone Number or Email
          </label>

          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="h-[50px] w-full rounded-md border px-4 outline-none focus:border-[#d12b00]"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">Password</label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="h-[50px] w-full rounded-md border px-4 pr-12 outline-none focus:border-[#d12b00]"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className="h-[50px] w-full rounded-md bg-[#d12b00] font-semibold text-white transition hover:bg-[#b92500]"
        >
          Login Now →
        </button>
      </form>

      <p className="mt-6 text-center text-sm">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={() => router.push("/signup")}
          className="font-semibold text-[#d12b00]"
        >
          Sign Up
        </button>
      </p>
    </div>
  );
}
