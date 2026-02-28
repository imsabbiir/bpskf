"use client";

import { Phone, Lock, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Page() {
  const router = useRouter();
  const [user, setUser] = useState({
    phone: "",
    password: "",
  });
  const [error, setError] = useState({});

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let tempErrors = {};

    const phoneRegex = /^01[3-9]\d{8}$/;

    if (user.phone) {
      if (phoneRegex.test(user.phone)) {
      } else {
        tempErrors.phone = "Enter a valid 11-digit number (e.g., 017xxxxxxxx)";
      }
    } else {
      tempErrors.phone = "Phone number is required";
    }

    if (!user.password) {
      tempErrors.password = "Password is required";
    }
    setError(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(validateForm()){
        try {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (!res.ok) {
      setError({ general: data.message || "Login failed" });
      return;
    }

    // ✅ Login success
    router.push("/admin/dashboard"); // or /admin/dashboard
  } catch (err) {
    setError({ general: "Something went wrong. Try again." });
  }
    }
  };

  return (
    <div className="py-20 bg-[#F8FAFC] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Blur */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px] opacity-50" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px] opacity-50" />

      <div className="w-full max-w-lg bg-white/70 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)]">
        <div className="bg-white rounded-[2.2rem] p-8 md:p-10 border border-gray-50">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Welcome Back 👋
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              Login to access your Admin dashboard and manage the website.
            </p>
          </div>

          {/* Form */}
          <form
            className="space-y-6"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            {/* Fake inputs to block browser autofill */}
            <input type="text" name="fake-user" className="hidden" />
            <input type="password" name="fake-pass" className="hidden" />

            <div className="grid grid-cols-1 gap-5">
              {/* Phone */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone
                    size={18}
                    className={`${
                      error.phone ? "text-red-400" : "text-gray-400"
                    } group-focus-within:text-indigo-500 transition-colors`}
                  />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  autoComplete="new-phone"
                  className="w-full pl-11 pr-4 py-4 bg-gray-50 rounded-2xl text-sm font-medium placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none"
                />
                {error.phone && (
                  <p className="text-red-500 text-xs mt-1 ml-2 flex items-center gap-1">
                    <AlertCircle size={12} /> {error.phone}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock
                    size={18}
                    className={`${
                      error.password ? "text-red-400" : "text-gray-400"
                    } group-focus-within:text-indigo-500 transition-colors`}
                  />
                </div>
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  placeholder="Password"
                  autoComplete="new-password"
                  className="w-full pl-11 pr-4 py-4 bg-gray-50 rounded-2xl text-sm font-medium placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none"
                />
                {error.password && (
                  <p className="text-red-500 text-xs mt-1 ml-2 flex items-center gap-1">
                    <AlertCircle size={12} /> {error.password}
                  </p>
                )}
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full mt-4 bg-gray-900 text-white py-4 rounded-2xl text-sm font-bold shadow-lg shadow-gray-200 hover:bg-indigo-600 hover:shadow-indigo-200 hover:-translate-y-0.5 transition-all duration-200 active:scale-95"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
