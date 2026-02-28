
import React from "react";
import {
  ChevronUp,
  Trash2,
  Edit,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import UserRow from "./crud/UserRow";

const Table = async ({
  columns,
  rows,
  limitState,
  sortState,
  paginationState,
}) => {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              {columns.map((column, index) => {
                return (
                  <th
                    key={index}
                    className="capitalize p-4 text-sm font-semibold text-gray-600"
                  >
                    <div className="flex items-center gap-3">
                      {column?.title}
                      {column?.sort ? <ChevronUp size={14} /> : ""}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((item, index) => (
              <UserRow key={item?._id} user={item}/>
            ))}
          </tbody>
        </table>
      </div>

      {limitState || sortState || paginationState ? (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-gray-200">
          {/* Rows per page & Sort Mockup */}
          <div className="flex items-center gap-4 text-sm text-gray-600">
            {limitState ? (
              <div className="flex items-center gap-2">
                <span>Show:</span>
                <select className="bg-gray-50 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
              </div>
            ) : (
              ""
            )}

            {sortState ? (
              <div className="flex items-center gap-2">
                <span>Sort:</span>
                <select className="bg-gray-50 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Newest</option>
                  <option>Oldest</option>
                  <option>Name (A-Z)</option>
                </select>
              </div>
            ) : (
              ""
            )}

            <div className="hidden sm:block border-l border-gray-300 h-4"></div>
          </div>

          {/* Navigation Buttons */}
          {paginationState ? (
            <div className="flex items-center gap-2">
              <button className="p-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50">
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-1">
                <button className="px-3 py-1 rounded bg-blue-600 text-white text-sm">
                  1
                </button>
                <button className="px-3 py-1 rounded border border-gray-300 text-sm hover:bg-gray-50">
                  2
                </button>
                <button className="px-3 py-1 rounded border border-gray-300 text-sm hover:bg-gray-50">
                  3
                </button>
              </div>
              <button className="p-2 border border-gray-300 rounded hover:bg-gray-100">
                <ChevronRight size={18} />
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Table;
