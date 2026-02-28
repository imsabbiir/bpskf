/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion"; // Added for Modal
import {
  AlertCircle,
  Calendar,
  Camera,
  CheckCircle2,
  Clock,
  Heart,
  Loader2,
  MapPin,
  Phone,
  User,
  VenusAndMars,
  Users,
  X
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal State

  // State for form fields
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/users/me");
        const data = await res.json();
        if (res.ok) {
          setUserData(data.user);
          setFormData(data.user.common || {});
        } else {
          router.push("/login");
        }
      } catch (err) {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Logic for the Modal Agreement
  const handleAgreeAndApply = async () => {
  setUpdating(true); // Re-using your existing updating state
  try {
    const res = await fetch("/api/users/volunteer", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        "volunteer.requested": true,
        "volunteer.status": "pending"
      }),
    });

    if (res.ok) {
      const updatedData = await res.json();
      // Update local state so UI changes immediately
      setUserData(prev => ({
        ...prev,
        volunteer: { request: true, status: "pending" }
      }));
      setIsModalOpen(false);
      alert("Application submitted! Your status is now pending.");
    } else {
      alert("Failed to submit application.");
    }
  } catch (err) {
    console.error("Application error:", err);
    alert("An error occurred.");
  } finally {
    setUpdating(false);
  }
};

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      <main className="flex-1 p-4 md:p-10 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">User Dashboard</h1>
            <p className="text-gray-500 text-sm">
              Manage your profile and volunteer applications
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 1. IDENTITY CARD */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 text-3xl font-bold border-4 border-white shadow-md overflow-hidden">
                    {formData?.image ? (
                      <img
                        src={formData?.image}
                        alt={formData?.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      formData?.name?.charAt(0)
                    )}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  {formData?.name}
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  {formData?.phone_number}
                </p>
                <div className="flex justify-center gap-4 border-t border-gray-50 pt-6">
                  <StatBox
                    value={userData?.donor?.donation_history?.length || 0}
                    label="Donations"
                  />
                  <div className="w-px h-8 bg-gray-100 self-center"></div>
                  <StatBox value="48h" label="Volunteer" />
                </div>
              </div>

              {/* 2. VERIFICATION STATUS */}
              <div className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm">
                <h4 className="text-sm font-bold text-gray-900 mb-4">
                  Verification Status
                </h4>
                <div className="space-y-3">
                  <StatusBadge
                    label="Donor"
                    status={userData?.donor?.status}
                    color="bg-rose-500"
                    icon={<Heart size={14} />}
                  />
                  <StatusBadge
                    label="Volunteer"
                    status={userData?.volunteer?.status}
                    color="bg-blue-500"
                    icon={<Users size={14} />}
                    onApply={() => setIsModalOpen(true)} // Open Modal
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              {/* 3. PERSONAL INFORMATION */}
              <div className="bg-white p-8 rounded-4xl border border-gray-100 shadow-sm">
                <h4 className="text-lg font-bold text-gray-900 mb-6">
                  Personal Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="Full Name"
                    icon={<User size={18} />}
                    value={formData.name}
                  />
                  <InputField
                    label="Phone Number"
                    icon={<Phone size={18} />}
                    value={formData.phone_number}
                  />
                  <InputField
                    label="Gender"
                    name="gender"
                    icon={<VenusAndMars size={18} />}
                    value={formData.gender}
                  />
                  <InputField
                    label="Date of Birth"
                    icon={<Calendar size={18} />}
                    value={formData.date_of_birth}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* 4. ACCOUNT DETAILS (ADDRESS) */}
              <div className="bg-white p-8 rounded-4xl border border-gray-100 shadow-sm">
                <h4 className="text-lg font-bold text-gray-900 mb-6">
                  Account Details (Address)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="City"
                    icon={<MapPin size={18} />}
                    value={formData?.address?.city}
                  />
                  <InputField
                    label="District"
                    icon={<MapPin size={18} />}
                    value={formData?.address?.district}
                  />
                  <InputField
                    label="Upazila"
                    icon={<MapPin size={18} />}
                    value={formData?.address?.upazila}
                  />
                  <InputField
                    label="Village"
                    icon={<MapPin size={18} />}
                    value={formData?.address?.village}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* VOLUNTEER AGREEMENT MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                    <Users size={32} />
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <X size={20} className="text-slate-400" />
                  </button>
                </div>

                <h2 className="text-2xl font-black text-slate-900 mb-4">Volunteer Application</h2>
                
                <div className="space-y-4 text-slate-600 text-sm leading-relaxed mb-8 bg-slate-50 p-6 rounded-3xl border border-slate-100">
                  <h4 className="font-bold text-slate-900 uppercase tracking-widest text-[10px]">Privacy & Terms</h4>
                  <p>1. By becoming a volunteer, you agree to respond to blood requests when available.</p>
                  <p>2. Your contact details will be visible to our administration and emergency coordinators.</p>
                  <p>3. You agree to treat all patient information with strict confidentiality.</p>
                  <p>4. This is a non-paid, social welfare position under Birabo Progoti.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-6 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleAgreeAndApply}
                    className="flex-1 px-6 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95"
                  >
                    I Agree & Apply
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Sub-components
function StatBox({ value, label }) {
  return (
    <div className="text-center">
      <p className="text-xl font-bold text-gray-900">{value}</p>
      <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
        {label}
      </p>
    </div>
  );
}

function InputField({ label, name, icon, value, type = "text", onChange }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-500 transition-colors">
          {icon}
        </div>
        <input
          type={type}
          name={name}
          value={value || ""}
          disabled={!onChange}
          onChange={onChange}
          className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl text-sm font-semibold focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none disabled:opacity-80"
        />
      </div>
    </div>
  );
}

function StatusBadge({ label, status, color, icon, onApply }) {
  const isApproved = status === "approved";
  const isPending = status === "pending";
  const isNone = !status || status === "none";

  return (
    <div className="p-3 rounded-xl border border-gray-100 bg-white flex flex-col gap-3 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg text-white ${color} ${isNone ? "grayscale opacity-50" : ""}`}>
            {icon}
          </div>
          <span className="text-sm font-bold text-gray-700">{label}</span>
        </div>
        {isApproved && <CheckCircle2 size={18} className="text-green-500" />}
        {isPending && <AlertCircle size={18} className="text-amber-500" />}
      </div>

      {isNone ? (
        <button
          onClick={onApply}
          className="w-full py-2 bg-indigo-50 text-indigo-600 text-[11px] font-bold rounded-lg hover:bg-indigo-600 hover:text-white transition-all uppercase tracking-tight"
        >
          Become a {label}
        </button>
      ) : (
        <p className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md w-fit ${
          isApproved ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
        }`}>
          {status}
        </p>
      )}
    </div>
  );
}