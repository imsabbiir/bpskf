"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Droplet, Calendar, MapPin, History, Award,
  Hospital, UserCircle, Edit3, Plus, X, Save,
} from "lucide-react";

const DonationPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modal & Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    patient_name: "",
    hospital_name: "",
    location: "",
    donation_date: "",
  });

  const fetchUserData = async () => {
    try {
      const res = await fetch("/api/users/me");
      const data = await res.json();
      if (res.ok) setUserData(data.user);
    } catch (err) {
      console.error("Failed to fetch user data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleOpenModal = (index = null) => {
    if (index !== null) {
      setEditingIndex(index);
      setFormData(userData.donor.donation_history[index]);
    } else {
      setEditingIndex(null);
      setFormData({
        patient_name: "",
        hospital_name: "",
        location: "",
        donation_date: new Date().toISOString().split('T')[0],
      });
    }
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch("/api/users/donation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData, editingIndex }),
      });

      if (res.ok) {
        await fetchUserData(); // Refresh data to show new list and stats
        setIsModalOpen(false);
      } else {
        alert("Failed to save. Check your connection.");
      }
    } catch (err) {
      console.error("Submit error", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-slate-400">Loading Journey...</div>;
  if (!userData) return <div className="min-h-screen flex items-center justify-center font-bold">Please log in.</div>;

  const history = userData.donor?.donation_history || [];
  const totalDonations = history.length;

  // Eligibility Check
  const lastDateStr = userData.donor?.last_donation_date;
  const lastDate = lastDateStr ? new Date(lastDateStr) : null;
  const nextEligibleDate = lastDate ? new Date(lastDate) : new Date();
  if (lastDate) nextEligibleDate.setDate(lastDate.getDate() + 120);
  const isEligible = !lastDate || new Date() > nextEligibleDate;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 relative">
      {/* Header & Impact Stats */}
      <div className="bg-white border-b border-slate-200 pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                Donation <span className="text-red-600">Journey</span>
              </h1>
              <p className="text-slate-500 mt-2 font-medium">
                Hero: <span className="text-slate-900">{userData.common.name}</span> •
                Group: <span className="text-red-600 font-bold">{userData.common.blood_group}</span>
              </p>
            </div>

            <div className={`px-6 py-3 rounded-2xl border flex items-center gap-3 ${isEligible ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"}`}>
              <div className={`w-3 h-3 rounded-full animate-pulse ${isEligible ? "bg-green-500" : "bg-amber-500"}`} />
              <span className={`font-bold text-sm ${isEligible ? "text-green-700" : "text-amber-700"}`}>
                {isEligible ? "Eligible to Donate Now" : `Next Eligible: ${nextEligibleDate.toLocaleDateString()}`}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard label="Total Times" value={totalDonations} icon={<History />} color="text-blue-600" bg="bg-blue-50" />
            <StatCard label="Lives Saved" value={totalDonations * 3} icon={<Droplet />} color="text-red-600" bg="bg-red-50" />
            <StatCard label="Last Donation" value={userData.donor?.last_donation_date || "N/A"} icon={<Calendar />} color="text-slate-600" bg="bg-slate-100" />
            <StatCard label="Donor Status" value={userData.donor?.status} icon={<Award />} color="text-green-600" bg="bg-green-50" />
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="max-w-4xl mx-auto px-6 mt-12">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
            <div className="w-1.5 h-6 bg-red-600 rounded-full" />
            Donation History
          </h2>
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-red-600 text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-slate-900 transition-all shadow-lg shadow-red-100"
          >
            <Plus size={20} /> Add Record
          </button>
        </div>

        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-linear-to-b before:from-slate-200 before:via-slate-200 before:to-transparent">
          {history.slice().reverse().map((item, revIndex) => {
            const originalIndex = history.length - 1 - revIndex;
            return (
              <motion.div key={originalIndex} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative flex items-start gap-6 group">
                <div className="absolute left-0 w-10 h-10 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center z-10 group-hover:border-red-500 transition-colors">
                  <Droplet size={18} className="text-slate-400 group-hover:text-red-500" />
                </div>
                <div className="ml-12 flex-1 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm group-hover:shadow-md transition-all group-hover:border-red-100">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-red-600 font-bold text-sm uppercase tracking-widest">
                        <Calendar size={14} />
                        {new Date(item.donation_date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                      </div>
                      <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                        <Hospital size={20} className="text-slate-400" />
                        {item.hospital_name}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                        <div className="flex items-center gap-2 text-slate-600 text-sm">
                          <UserCircle size={16} className="text-slate-400" />
                          <span className="font-medium text-slate-400">Recipient:</span> {item.patient_name}
                        </div>
                        <div className="flex items-center gap-2 text-slate-600 text-sm">
                          <MapPin size={16} className="text-slate-400" />
                          <span className="font-medium text-slate-400">Location:</span> {item.location}
                        </div>
                      </div>
                    </div>
                    <button onClick={() => handleOpenModal(originalIndex)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 text-slate-600 font-bold text-sm hover:bg-red-50 hover:text-red-600 transition-colors border border-transparent hover:border-red-100">
                      <Edit3 size={16} /> Edit
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal Container */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => !isSubmitting && setIsModalOpen(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative w-full max-w-lg bg-white rounded-4xl shadow-2xl p-8" >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black text-slate-900">{editingIndex !== null ? "Edit Donation" : "New Record"}</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 bg-slate-100 rounded-full hover:bg-red-50 hover:text-red-600 transition-colors"><X size={20} /></button>
              </div>
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="space-y-1.5"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Hospital Name</label>
                  <input type="text" required value={formData.hospital_name} onChange={(e) => setFormData({...formData, hospital_name: e.target.value})} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-red-500 font-bold" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Patient Name</label>
                    <input type="text" required value={formData.patient_name} onChange={(e) => setFormData({...formData, patient_name: e.target.value})} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-red-500 font-bold" />
                  </div>
                  <div className="space-y-1.5"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Date</label>
                    <input type="date" required value={formData.donation_date} onChange={(e) => setFormData({...formData, donation_date: e.target.value})} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-red-500 font-bold" />
                  </div>
                </div>
                <div className="space-y-1.5"><label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Location</label>
                  <input type="text" required value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-red-500 font-bold" />
                </div>
                <button disabled={isSubmitting} type="submit" className="w-full py-5 bg-red-600 text-white rounded-2xl font-black text-lg hover:bg-slate-900 transition-all shadow-lg shadow-red-100 mt-4 flex items-center justify-center gap-2 disabled:opacity-50">
                  {isSubmitting ? "Processing..." : <><Save size={20} /> {editingIndex !== null ? "Update Details" : "Save Record"}</>}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const StatCard = ({ label, value, icon, color, bg }) => (
  <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all">
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 ${bg} ${color} rounded-xl flex items-center justify-center`}>
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</p>
        <p className={`text-lg font-black text-slate-900 capitalize`}>{value}</p>
      </div>
    </div>
  </div>
);

export default DonationPage;

