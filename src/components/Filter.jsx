"use client";
import { Search } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

function Filter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize state from URL if present, otherwise empty
  const [formData, setFormData] = useState({
    search: searchParams.get("search") || "",
    group: searchParams.get("group") || "",
    availability: searchParams.get("availability") || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Sync state to URL with a slight debounce for the search text
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams();
      if (formData.search) params.set("search", formData.search);
      if (formData.group) params.set("group", formData.group);
      if (formData.availability) params.set("availability", formData.availability);

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }, 400); // 400ms delay

    return () => clearTimeout(delayDebounceFn);
  }, [formData, router, pathname]);

  return (
    <div className="container mx-auto px-4 absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
      <div className="bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-xl flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />
          <input
            type="text"
            name="search"
            value={formData.search}
            onChange={handleChange}
            placeholder="Search name, city or district..."
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-100 outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            name="group"
            value={formData.group}
            onChange={handleChange}
            className="flex-1 sm:w-48 px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm font-semibold outline-none focus:border-red-500 transition-all cursor-pointer"
          >
            <option value="">All Blood Groups</option>
            {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>

          <select
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            className="flex-1 sm:w-48 px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm font-semibold outline-none focus:border-red-500 transition-all cursor-pointer"
          >
            <option value="">Availability</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Filter;