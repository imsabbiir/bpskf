import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'
import Link from 'next/link'

function Pagination({ pagination, currentSearchParams }) {
  const { page, totalPages } = pagination;

  // Helper to create a new URL with the updated page number
  const createPageURL = (pageNumber) => {
    const params = new URLSearchParams(currentSearchParams);
    params.set('page', pageNumber.toString());
    return `?${params.toString()}`;
  };

  return (
    <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex justify-center items-center gap-4">
      {/* Previous Button */}
      <Link
        href={createPageURL(page - 1)}
        className={`p-2 rounded-lg border bg-white transition-colors ${
          page <= 1 ? "pointer-events-none opacity-50" : "hover:bg-slate-50"
        }`}
      >
        <ChevronLeft size={20} />
      </Link>

      {/* Page Numbers */}
      <div className="flex gap-2">
        {[...Array(totalPages)].map((_, i) => {
          const pageNum = i + 1;
          const isActive = page === pageNum;

          return (
            <Link
              key={pageNum}
              href={createPageURL(pageNum)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm transition-all ${
                isActive
                  ? "bg-red-600 text-white shadow-lg shadow-red-200"
                  : "bg-white border text-slate-600 hover:bg-slate-50"
              }`}
            >
              {pageNum}
            </Link>
          );
        })}
      </div>

      {/* Next Button */}
      <Link
        href={createPageURL(page + 1)}
        className={`p-2 rounded-lg border bg-white transition-colors ${
          page >= totalPages ? "pointer-events-none opacity-50" : "hover:bg-slate-50"
        }`}
      >
        <ChevronRight size={20} />
      </Link>
    </div>
  )
}

export default Pagination