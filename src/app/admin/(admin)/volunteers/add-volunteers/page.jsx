"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UserPlus, Mail, Phone, MapPin, 
  Award, Clock, CheckCircle, Shield,
  ArrowRight, Heart, Droplet
} from 'lucide-react';
import Link from 'next/link';

export default function AddVolunteer() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000); // Simulate API call
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Breadcrumb / Back */}
        <Link href={"/admin/volunteers"} className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest mb-6 hover:text-red-600 transition">
          <ArrowRight className="rotate-180" size={16} /> Back to Volunteers List
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* LEFT: THE FORM */}
          <div className="lg:col-span-2 space-y-8">
            <header>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">Onboard New Hero</h1>
              <p className="text-slate-500 mt-2">Fill in the details to add a verified volunteer to the network.</p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info Group */}
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                   <UserPlus className="text-red-500" size={20} /> Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                    <input type="text" placeholder="e.g. Tanvir Ahmed" className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-red-100 outline-none font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Blood Group</label>
                    <select className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none font-bold text-red-600">
                      <option>Select Group</option>
                      {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => <option key={bg}>{bg}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                    <input type="email" placeholder="tanvir@example.com" className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                    <input type="tel" placeholder="+880 1XXX-XXXXXX" className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none font-medium" />
                  </div>
                </div>
              </div>

              {/* Roles & Expertise */}
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                   <Award className="text-red-500" size={20} /> Skills & Availability
                </h3>
                <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Primary Role</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {['Coordinator', 'Medical', 'Logistics', 'Publicity'].map(role => (
                            <button key={role} type="button" className="py-3 px-4 rounded-xl border-2 border-slate-50 text-xs font-bold text-slate-500 hover:border-red-200 hover:text-red-600 transition">
                                {role}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">District Focus</label>
                        <select className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none font-medium">
                            <option>Dhaka</option>
                            <option>Chittagong</option>
                            <option>Narayanganj</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Availability</label>
                        <select className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none font-medium">
                            <option>Weekends Only</option>
                            <option>Full Time</option>
                            <option>Emergency On-Call</option>
                        </select>
                    </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-5 bg-red-600 text-white font-black text-sm uppercase tracking-[0.2em] rounded-3xl shadow-2xl shadow-red-200 hover:bg-red-700 transition-all flex items-center justify-center gap-3 disabled:bg-slate-300"
              >
                {loading ? "Processing..." : (
                    <>
                        <CheckCircle size={20} /> Confirm Registration
                    </>
                )}
              </button>
            </form>
          </div>

          {/* RIGHT: SUMMARY / GUIDELINES */}
          <div className="space-y-6">
            <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl sticky top-8">
                <div className="bg-red-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Shield size={28} />
                </div>
                <h3 className="text-2xl font-black mb-4 leading-tight">Volunteer Guidelines</h3>
                <ul className="space-y-6">
                    <li className="flex gap-4">
                        <div className="mt-1"><Heart size={18} className="text-red-500" /></div>
                        <p className="text-slate-400 text-sm font-medium">Volunteers must maintain strict confidentiality of donor data.</p>
                    </li>
                    <li className="flex gap-4">
                        <div className="mt-1"><Clock size={18} className="text-red-500" /></div>
                        <p className="text-slate-400 text-sm font-medium">Emergency responders should be available for coordination within 15 minutes.</p>
                    </li>
                    <li className="flex gap-4">
                        <div className="mt-1"><MapPin size={18} className="text-red-500" /></div>
                        <p className="text-slate-400 text-sm font-medium">Assigned districts should be local to ensure rapid mobilization during drives.</p>
                    </li>
                </ul>

                <div className="mt-10 p-6 bg-white/5 rounded-3xl border border-white/10">
                    <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-2">Live Support</p>
                    <p className="text-sm font-medium text-slate-300">Need help onboarding? Contact the lead coordinator at +880 1326-650567.</p>
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}