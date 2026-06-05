"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function SignupForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    // For mock app, we'll just redirect to login
    router.push("/login");
  };

  return (
    <div className="w-full max-w-[420px] rounded-[10px] border border-[#f1d4cc] bg-white p-8">
      <h1 className="text-center text-[40px] font-bold text-[#d12b00]">
        Signup
      </h1>

      <p className="mt-2 mb-8 text-center text-gray-500">
        Join the digital bazaar today.
      </p>

      <form onSubmit={handleSignup} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-semibold">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="John Doe"
            required
            className="h-[50px] w-full rounded-md border px-4 outline-none focus:border-[#d12b00]"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Phone Number or Email
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. +1 234 567 890"
            required
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
              placeholder="At least 8 characters"
              required
              minLength={8}
              className="h-[50px] w-full rounded-md border px-4 outline-none focus:border-[#d12b00]"
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

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            required
            className="h-[50px] w-full rounded-md border px-4 outline-none focus:border-[#d12b00]"
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className="h-[50px] w-full rounded-md bg-[#d12b00] font-semibold text-white transition hover:bg-[#b92500]"
        >
          Sign Up Now →
        </button>
      </form>

      <div className="my-7 flex items-center gap-3 text-sm text-gray-400">
        <div className="h-[1px] flex-1 bg-gray-300"></div>
        OR CONTINUE WITH
        <div className="h-[1px] flex-1 bg-gray-300"></div>
      </div>

      <p className="mt-6 text-center text-sm">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => router.push("/login")}
          className="font-semibold text-[#d12b00]"
        >
          Login
        </button>
      </p>
    </div>
  );
}
