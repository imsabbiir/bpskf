"use client";

import { Phone, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    if (error) setError(""); // টাইপ করলে এরর ক্লিয়ার হবে
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/users/login", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "কিছু ভুল হয়েছে");
      }

      // লগইন সফল হলে
      router.push("/user/dashboard");
      router.refresh(); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4 relative overflow-hidden">
      {/* ব্যাকগ্রাউন্ড ব্লার */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px] opacity-50" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px] opacity-50" />

      <div className="w-full max-w-lg bg-white/70 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)]">
        <div className="bg-white rounded-[2.2rem] p-8 md:p-10 border border-gray-50">
          {/* হেডার */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              স্বাগতম ফিরে 👋
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              লগইন করুন আপনার ডোনার ড্যাশবোর্ডে প্রবেশ করতে এবং প্রোফাইল পরিচালনা করতে
            </p>
          </div>

          {/* ফর্ম */}
          <form
            className="space-y-6"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            {/* ফেক ইনপুট ব্রাউজারের অটোফিল ব্লক করতে */}
            <input type="text" name="fake-user" className="hidden" />
            <input type="password" name="fake-pass" className="hidden" />

            <div className="grid grid-cols-1 gap-5">
              {/* ফোন */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone
                    size={18}
                    className="text-gray-400 group-focus-within:text-indigo-500 transition-colors"
                  />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  placeholder="ফোন নম্বর"
                  autoComplete="new-phone"
                  className="w-full pl-11 pr-4 py-4 bg-gray-50 rounded-2xl text-sm font-medium placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none"
                />
              </div>

              {/* পাসওয়ার্ড */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock
                    size={18}
                    className="text-gray-400 group-focus-within:text-indigo-500 transition-colors"
                  />
                </div>
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  placeholder="পাসওয়ার্ড"
                  autoComplete="new-password"
                  className="w-full pl-11 pr-4 py-4 bg-gray-50 rounded-2xl text-sm font-medium placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none"
                />
              </div>
            </div>

            {/* লগইন বোতাম */}
            <button
              type="submit"
              className="w-full mt-4 bg-gray-900 text-white py-4 rounded-2xl text-sm font-bold shadow-lg shadow-gray-200 hover:bg-indigo-600 hover:shadow-indigo-200 hover:-translate-y-0.5 transition-all duration-200 active:scale-95"
            >
              লগইন
            </button>

            {/* এরর দেখানোর জন্য */}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}