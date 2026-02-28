"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  Loader2,
  Search,
  Filter,
  Calendar,
  MapPin,
  User,
  ChevronLeft,
  ChevronRight,
  Droplet,
} from "lucide-react";

const Donations = () => {
  const [allDonations, setAllDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("All");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await fetch("/api/donations");
        const data = await res.json();
        if (data.success) {
          setAllDonations(data.allDonations || []);
        }
      } catch (error) {
        console.error("Failed to fetch donations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDonations();
  }, []);

  // 1. Calculate Stats for the 4 Cards
  const stats = useMemo(() => {
    const groups = ["A", "B", "AB", "O"];
    return groups.map((group) => ({
      group,
      positive: allDonations.filter((d) => d.blood_group === `${group}+`)
        .length,
      negative: allDonations.filter((d) => d.blood_group === `${group}-`)
        .length,
    }));
  }, [allDonations]);

  // 2. Filter Logic
  const filteredDonations = useMemo(() => {
    return allDonations.filter((donation) => {
      const matchesSearch =
        donation.donor_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donation.hospital_name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());
      const matchesGroup =
        selectedGroup === "All" || donation.blood_group === selectedGroup;
      return matchesSearch && matchesGroup;
    });
  }, [allDonations, searchTerm, selectedGroup]);

  // 3. Pagination Logic
  const totalPages = Math.ceil(filteredDonations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredDonations.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-red-600" size={40} />
      </div>
    );

  return (
    <main className="p-6 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Blood Group Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="relative overflow-hidden bg-white p-6 rounded-4xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300"
            >
              {/* Background Decorative Element */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-slate-50 rounded-full opacity-50" />

              <div className="relative z-10">
                {/* Card Header */}
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                      Group
                    </span>
                    <h2 className="text-4xl font-black text-slate-800 leading-none">
                      {stat.group}
                    </h2>
                  </div>
                  <div className="">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-emerald-600"></div>
                      <p className="text-[10px] font-bold text-emerald-600 px-2 py-0.5 rounded-full self-center">
                        + Positive
                      </p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-600"></div>
                      <p className="text-[10px] font-bold text-red-600 px-2 py-0.5 rounded-full self-center">
                        - Negative
                      </p>
                    </div>
                  </div>
                </div>

                {/* The Split UI */}
                <div className="flex items-center justify-between bg-slate-50/80 p-4 rounded-2xl border border-slate-100">
                  {/* Positive Section */}
                  <div className="text-center text-4xl font-black flex-1 text-emerald-600">{stat.positive}</div>

                  {/* Elegant Divider */}
                  <div className="w-px h-10 bg-slate-200 mx-2" />

                  {/* Negative Section */}
                  <div className="text-center text-4xl font-black flex-1 text-red-600">{stat.negative}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Header & Controls Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-800">
              Donation Records
            </h1>
            <p className="text-sm text-slate-500 font-medium">
              Showing {filteredDonations.length} total records
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search name or hospital..."
                className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none w-64"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            {/* Blood Group Filter */}
            <select
              value={selectedGroup}
              onChange={(e) => {
                setSelectedGroup(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 outline-none cursor-pointer"
            >
              <option value="All">All Groups</option>
              {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>

            {/* Limit Selector */}
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 outline-none cursor-pointer"
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
            </select>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase">
                    Donor Info
                  </th>
                  <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase">
                    Patient & Hospital
                  </th>
                  <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase text-center">
                    Group
                  </th>
                  <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {currentItems.length > 0 ? (
                  currentItems.map((donation, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 font-bold border border-red-100">
                            {donation.donor_name?.charAt(0)}
                          </div>
                          <p className="text-sm font-bold text-slate-800">
                            {donation.donor_name}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-sm font-bold text-slate-700">
                            <User size={14} className="text-slate-400" />{" "}
                            {donation.patient_name}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <MapPin size={12} className="text-slate-400" />{" "}
                            {donation.hospital_name}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className="px-3 py-1 bg-red-50 text-red-600 rounded-lg font-black text-xs">
                          {donation.blood_group}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                          <Calendar size={14} className="text-slate-400" />
                          {new Date(donation.donation_date).toLocaleDateString(
                            "en-GB",
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-20 text-center text-slate-400"
                    >
                      No records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between px-2">
          <p className="text-sm text-slate-500 font-medium">
            Page {currentPage} of {totalPages || 1}
          </p>
          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="p-2 bg-white border border-slate-200 rounded-xl disabled:opacity-50 hover:bg-slate-50 transition text-slate-600"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="p-2 bg-white border border-slate-200 rounded-xl disabled:opacity-50 hover:bg-slate-50 transition text-slate-600"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Donations;
