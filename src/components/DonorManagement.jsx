/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  CheckCircle,
  MoreHorizontal,
  ShieldCheck,
  UserCheck,
  ChevronRight,
  ChevronLeft,
  Droplet,
  X,
  Ban,
  RotateCcw,
  AlertCircle,
} from "lucide-react";
import LimitButton from "@/components/LimitButton";
import { toast } from "react-hot-toast";

const DonorManagement = ({ initialData, pagination }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [selectedIds, setSelectedIds] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Modal State
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, status: null, id: null });

  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
    setSelectedIds([]);
  }, [searchParams]);

  const activeTab = searchParams.get("verified") || "pending";

  // --- Modal Trigger ---
  const triggerConfirmation = (status, singleId = null) => {
    setConfirmModal({ isOpen: true, status, id: singleId });
  };

  // --- API Handler ---
  const handleStatusUpdate = async () => {
    const { status, id } = confirmModal;
    const idsToUpdate = id ? [id] : selectedIds;
    
    setConfirmModal({ isOpen: false, status: null, id: null });
    setIsUpdating(true);
    
    try {
      const res = await fetch("/api/users/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: idsToUpdate, status }),
      });

      if (res.ok) {
        toast.success(`Successfully updated to ${status}`);
        setSelectedIds([]);
        router.refresh();
      } else {
        throw new Error("Failed to update status");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const updateURL = (newParams) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === "") params.delete(key);
      else params.set(key, value);
    });
    if (newParams.search !== undefined || newParams.verified !== undefined) {
      params.set("page", "1");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearchTrigger = () => updateURL({ search: searchTerm.trim() });
  const handleKeyDown = (e) => e.key === "Enter" && handleSearchTrigger();
  const handleTabChange = (status) => updateURL({ verified: status });
  
  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === initialData.length) setSelectedIds([]);
    else setSelectedIds(initialData.map((d) => d._id));
  };

  const getBulkActionConfig = () => {
    switch (activeTab) {
      case "pending":
        return {
          label: "Approve Selected",
          icon: <UserCheck size={18} />,
          color: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100",
          action: () => triggerConfirmation("approved"),
        };
      case "approved":
        return {
          label: "Block Selected",
          icon: <Ban size={18} />,
          color: "bg-red-600 hover:bg-red-700 shadow-red-100",
          action: () => triggerConfirmation("blocked"),
        };
      case "blocked":
        return {
          label: "Unblock (Pending)",
          icon: <RotateCcw size={18} />,
          color: "bg-slate-700 hover:bg-slate-800 shadow-slate-100",
          action: () => triggerConfirmation("pending"),
        };
      default:
        return null;
    }
  };

  const bulkConfig = getBulkActionConfig();

  return (
    <div className={`p-4 md:p-8 bg-slate-50 min-h-screen ${isUpdating ? "opacity-70 pointer-events-none" : ""}`}>
      
      {/* Confirmation Modal Overlay */}
      <AnimatePresence>
        {confirmModal.isOpen && (
          <div className="fixed inset-0 z-999 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl border border-slate-100"
            >
              <div className="flex flex-col items-center text-center">
                <div className={`p-4 rounded-full mb-4 ${confirmModal.status === 'blocked' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                  <AlertCircle size={32} />
                </div>
                <h3 className="text-xl font-black text-slate-800 mb-2 capitalize">Confirm {confirmModal.status}</h3>
                <p className="text-slate-500 mb-6">
                  Are you sure you want to {confirmModal.status} {confirmModal.id ? "this donor" : `${selectedIds.length} donors`}?
                </p>
                <div className="flex gap-3 w-full">
                  <button 
                    onClick={() => setConfirmModal({ isOpen: false, status: null, id: null })}
                    className="flex-1 px-4 py-3 rounded-xl font-bold text-slate-400 hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleStatusUpdate}
                    className={`flex-1 px-4 py-3 rounded-xl font-bold text-white transition shadow-lg ${
                        confirmModal.status === 'blocked' ? 'bg-red-600 hover:bg-red-700' : 
                        confirmModal.status === 'approved' ? 'bg-emerald-600 hover:bg-emerald-700' : 
                        'bg-slate-800 hover:bg-black'
                    }`}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Donor Management</h1>
          <p className="text-slate-500">Verify and manage life-saving heroes.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer hover:text-red-600 transition-colors" size={18} onClick={handleSearchTrigger} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search hero names or areas..."
              className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-red-100 transition-all shadow-sm"
            />
          </div>
          <LimitButton />
        </div>
      </div>

      {/* Tabs & Bulk Actions */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
        <div className="flex bg-slate-200/50 p-1 rounded-2xl w-fit border border-slate-200/50">
          {["pending", "approved", "blocked"].map((status) => (
            <button
              key={status}
              onClick={() => handleTabChange(status)}
              className={`px-6 py-2 rounded-xl font-bold text-sm transition capitalize ${
                activeTab === status ? "bg-white text-red-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {status} {activeTab === status && `(${pagination.total})`}
            </button>
          ))}
        </div>

        <AnimatePresence>
          {selectedIds.length > 0 && bulkConfig && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex items-center gap-3">
              <span className="text-sm font-bold text-slate-500">{selectedIds.length} heroes selected</span>
              <button
                onClick={bulkConfig.action}
                className={`${bulkConfig.color} text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition shadow-md active:scale-95`}
              >
                {bulkConfig.icon} {bulkConfig.label}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-4xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="p-5 w-10">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded accent-red-600 cursor-pointer"
                    checked={selectedIds.length === initialData.length && initialData.length > 0}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Donor</th>
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Blood Group</th>
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Location</th>
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Verification</th>
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {initialData.map((user) => (
                <tr key={user._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-5">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded accent-red-600 cursor-pointer"
                      checked={selectedIds.includes(user._id)}
                      onChange={() => toggleSelect(user._id)}
                    />
                  </td>
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-500 border border-slate-200 overflow-hidden">
                        {user.common.image ? <img src={user.common.image} alt="" className="w-full h-full object-cover" /> : user.common.name?.[0]}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{user.common.name}</p>
                        <p className="text-xs text-slate-500">{user.common.phone_number}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className="flex items-center gap-1.5 font-black text-red-600 uppercase">
                      <Droplet size={14} className="fill-red-600" /> {user.common.blood_group}
                    </span>
                  </td>
                  <td className="p-5 text-sm text-slate-600 font-medium">
                    <span className="capitalize">{user.common.address.upazila}</span>, <span className="capitalize">{user.common.address.district}</span>
                  </td>
                  <td className="p-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                      user.donor.status === "approved" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                      user.donor.status === "blocked" ? "bg-red-50 text-red-600 border-red-100" : "bg-amber-50 text-amber-600 border-amber-100"
                    }`}>
                      {user.donor.status}
                    </span>
                  </td>
                  <td className="p-5 text-right">
                    <button 
                      onClick={() => triggerConfirmation(activeTab === "pending" ? "approved" : activeTab === "approved" ? "blocked" : "pending", user._id)}
                      className="bg-white border border-slate-200 text-slate-400 hover:text-emerald-600 hover:border-emerald-200 p-2 rounded-xl transition-all shadow-sm active:scale-95"
                    >
                      {activeTab === "pending" ? <CheckCircle size={20} /> : activeTab === "approved" ? <Ban size={20} /> : <RotateCcw size={20} />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DonorManagement;