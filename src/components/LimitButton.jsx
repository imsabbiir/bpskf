"use client";
import React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

function LimitButton() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Get current limit from URL or default to 10
  const currentLimit = searchParams.get("limit") || "10";

  const handleLimitChange = (e) => {
    const newLimit = e.target.value;
    const params = new URLSearchParams(searchParams);
    
    // Set the new limit
    params.set("limit", newLimit);
    // Important: Reset to page 1 when changing limit to avoid "out of bounds" errors
    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center gap-2 bg-slate-50 px-4 py-1 rounded-xl border border-slate-100">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
        Show
      </span>
      <select 
        value={currentLimit}
        onChange={handleLimitChange}
        className="bg-transparent text-sm font-bold outline-none py-2 cursor-pointer"
      >
        {[10, 20, 50].map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LimitButton;