/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Shield, Globe, Camera, Lock, Save,
  Trash2, AlertTriangle, Database, Loader2
} from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

export default function AdminSettings() {
  const [activeSection, setActiveSection] = useState("profile");
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    phone: "",
    image: "",
    role: ""
  });
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  // Password States
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  const [notifs, setNotifs] = useState({
    newDonor: true,
    emergency: true,
    updates: false,
  });

  const fileInputRef = useRef(null);
  const IMGBB_API_KEY = "6ad1958c294b93229c443eb0b10d8673";

  const sections = [
    { id: "profile", label: "Admin Profile", icon: <User size={18} /> },
    { id: "security", label: "Security", icon: <Shield size={18} /> },
    { id: "system", label: "System Config", icon: <Globe size={18} /> },
  ];

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await fetch("/api/admin/me");
        if (!res.ok) throw new Error("Unauthorized");
        const data = await res.json();
        setAdminData(data.admin);
      } catch (error) {
        console.error("Failed to load admin profile");
      } finally {
        setLoading(false);
      }
    };
    fetchAdmin();
  }, []);

  // 1. IMAGE UPLOAD FUNCTIONALITY (ImgBB)
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const uploadToast = toast.loading("Uploading image...");
    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setAdminData({ ...adminData, image: data.data.url });
        toast.success("Image uploaded!", { id: uploadToast });
      } else {
        throw new Error();
      }
    } catch (err) {
      toast.error("Upload failed", { id: uploadToast });
    }
  };

  // 2. UPDATE PROFILE DETAILS
  const handleUpdateProfile = async () => {
    setIsUpdating(true);
    try {
      const res = await fetch("/api/admin/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adminData),
      });
      if (res.ok) toast.success("Profile updated successfully!");
      else throw new Error();
    } catch (err) {
      toast.error("Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };

  // 3. CHANGE PASSWORD FUNCTIONALITY
  const handleChangePassword = async () => {
    if (passwords.new !== passwords.confirm) {
      return toast.error("New passwords do not match!");
    }

    setIsUpdating(true);
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwords.current,
          newPassword: passwords.new
        }),
      });
      if (res.ok) {
        toast.success("Password updated!");
        setPasswords({ current: "", new: "", confirm: "" });
      } else {
        const err = await res.json();
        toast.error(err.message || "Update failed");
      }
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-red-600" /></div>;

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 font-sans">
      <Toaster />
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Settings</h1>
          <p className="text-slate-500 mt-2 font-medium">Manage your account preferences and platform configurations.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* NAVIGATION */}
          <div className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-5 py-4 rounded-3xl font-bold text-sm transition-all duration-300 ${
                  activeSection === section.id
                    ? "bg-red-600 text-white shadow-xl shadow-red-200 translate-x-2"
                    : "bg-white text-slate-500 hover:bg-slate-100 border border-transparent"
                }`}
              >
                {section.icon} {section.label}
              </button>
            ))}
          </div>

          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {activeSection === "profile" && (
                <motion.div key="profile" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                    <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
                      <div className="relative">
                        <div className="w-28 h-28 bg-slate-100 rounded-4xl flex items-center justify-center text-4xl font-black text-slate-300 overflow-hidden border-4 border-white shadow-md">
                          {adminData?.image ? (
                            <img src={adminData.image} alt="Admin" className="w-full h-full object-cover" />
                          ) : "SA"}
                        </div>
                        <input type="file" hidden ref={fileInputRef} onChange={handleImageUpload} accept="image/*" />
                        <button 
                          onClick={() => fileInputRef.current.click()}
                          className="absolute -bottom-2 -right-2 p-3 bg-red-600 text-white rounded-2xl shadow-lg border-4 border-white hover:scale-110 transition">
                          <Camera size={18} />
                        </button>
                      </div>
                      <div className="text-center md:text-left">
                        <h3 className="text-2xl font-black text-slate-800">{adminData?.name}</h3>
                        <p className="text-red-500 font-bold text-sm uppercase tracking-[0.2em] mt-1">{adminData?.role}</p>
                        <div className="flex gap-2 mt-3 justify-center md:justify-start">
                          <span className="px-3 py-1 bg-green-100 text-green-600 text-[10px] font-black rounded-full uppercase">Verified Admin</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Admin Full Name</label>
                        <input
                          type="text"
                          value={adminData?.name || ""}
                          onChange={(e) => setAdminData({...adminData, name: e.target.value})}
                          className="w-full p-4 bg-slate-50 border-none rounded-[1.2rem] focus:ring-2 focus:ring-red-100 outline-none font-semibold text-slate-700"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Official Email</label>
                        <input
                          type="email"
                          value={adminData?.email || ""}
                          onChange={(e) => setAdminData({...adminData, email: e.target.value})}
                          className="w-full p-4 bg-slate-50 border-none rounded-[1.2rem] focus:ring-2 focus:ring-red-100 outline-none font-semibold text-slate-700"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Support Phone</label>
                        <input
                          type="tel"
                          value={adminData?.phone || ""}
                          onChange={(e) => setAdminData({...adminData, phone: e.target.value})}
                          className="w-full p-4 bg-slate-50 border-none rounded-[1.2rem] focus:ring-2 focus:ring-red-100 outline-none font-semibold text-slate-700"
                        />
                      </div>
                    </div>

                    <button 
                      onClick={handleUpdateProfile}
                      disabled={isUpdating}
                      className="mt-10 flex items-center gap-2 bg-slate-900 text-white px-10 py-4 rounded-[1.2rem] font-bold hover:bg-red-600 transition-all shadow-xl shadow-slate-200 disabled:opacity-50">
                      {isUpdating ? <Loader2 className="animate-spin" size={18}/> : <Save size={18} />} Update Profile
                    </button>
                  </div>
                </motion.div>
              )}

              {activeSection === "security" && (
                <motion.div key="security" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                    <h3 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-3">
                      <Lock className="text-red-500" size={24} /> Password & Security
                    </h3>
                    <div className="max-w-md space-y-5">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Current Password</label>
                        <input
                          type="password"
                          value={passwords.current}
                          onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                          className="w-full p-4 bg-slate-50 border-none rounded-[1.2rem] outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase ml-1">New Password</label>
                        <input
                          type="password"
                          value={passwords.new}
                          onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                          className="w-full p-4 bg-slate-50 border-none rounded-[1.2rem] outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Confirm New Password</label>
                        <input
                          type="password"
                          value={passwords.confirm}
                          onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                          className="w-full p-4 bg-slate-50 border-none rounded-[1.2rem] outline-none"
                        />
                      </div>
                      <button 
                        onClick={handleChangePassword}
                        disabled={isUpdating}
                        className="bg-red-600 text-white px-8 py-4 rounded-[1.2rem] font-bold text-sm hover:bg-red-700 transition shadow-lg shadow-red-100 disabled:opacity-50">
                        {isUpdating ? "Updating..." : "Update Security Key"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSection === "system" && (
                <motion.div key="notifs" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                    <h3 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-3">
                      <Database className="text-red-500" size={24} /> System Config
                    </h3>
                    <div className="space-y-2">
                      {[
                        { title: "New Donor Registration", desc: "Notify when someone signs up.", id: "newDonor" },
                        { title: "Emergency Blood Request", desc: "Urgent SMS/Email alerts.", id: "emergency" },
                      ].map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-6 rounded-3xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100">
                          <div>
                            <p className="font-black text-slate-700 text-base">{item.title}</p>
                            <p className="text-xs text-slate-500 font-medium mt-1">{item.desc}</p>
                          </div>
                          <button
                            onClick={() => setNotifs({ ...notifs, [item.id]: !notifs[item.id] })}
                            className={`w-14 h-7 flex items-center rounded-full p-1 transition-all duration-300 ${notifs[item.id] ? "bg-red-600" : "bg-slate-200"}`}
                          >
                            <motion.div animate={{ x: notifs[item.id] ? 28 : 0 }} className="bg-white w-5 h-5 rounded-full shadow-lg" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}