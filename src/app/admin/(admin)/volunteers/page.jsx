"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Mail, Phone, 
  Award, CalendarCheck, MapPin, MoreHorizontal,
  UserPlus, Star, HeartPulse
} from 'lucide-react';
import Link from 'next/link';

const VolunteersPage = () => {
  const [filter, setFilter] = useState('all'); 

  const volunteers = [
    { id: 1, name: "Ariful Islam", role: "Lead Coordinator", district: "Dhaka", events: 12, rating: 4.9, status: "on-call", phone: "017XXXXXXXX" },
    { id: 2, name: "Sumaiya Akter", role: "Field Volunteer", district: "Narayanganj", events: 8, rating: 4.7, status: "active", phone: "018XXXXXXXX" },
    { id: 3, name: "Tanvir Ahmed", role: "Medical Assistant", district: "Gazipur", events: 25, rating: 5.0, status: "on-call", phone: "013XXXXXXXX" },
    { id: 4, name: "Nusrat Jahan", role: "Publicity Head", district: "Chittagong", events: 5, rating: 4.5, status: "active", phone: "019XXXXXXXX" },
  ];

  const filteredList = filter === 'on-call' 
    ? volunteers.filter(v => v.status === 'on-call') 
    : volunteers;

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              Volunteers <span className="text-red-600 bg-red-50 px-3 py-1 rounded-2xl text-sm font-bold tracking-normal">{volunteers.length} Total</span>
            </h1>
            <p className="text-slate-500 font-medium mt-1">Manage and coordinate your life-saving volunteer network.</p>
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <Link href={"/admin/volunteers/add-volunteers"} className="flex-1 md:flex-none bg-slate-900 text-white px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition shadow-lg shadow-slate-200">
              <UserPlus size={20} /> Add Volunteer
            </Link>
          </div>
        </header>

        {/* Stats & Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
          <div className="lg:col-span-3 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search by name, role or district..." 
                className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-red-100 transition shadow-sm"
              />
            </div>
            <div className="flex bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm">
                <button 
                  onClick={() => setFilter('all')}
                  className={`px-6 py-2.5 rounded-xl text-sm font-black transition ${filter === 'all' ? 'bg-red-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  All
                </button>
                <button 
                  onClick={() => setFilter('on-call')}
                  className={`px-6 py-2.5 rounded-xl text-sm font-black flex items-center gap-2 transition ${filter === 'on-call' ? 'bg-red-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  <HeartPulse size={16} /> On-Call
                </button>
            </div>
          </div>
          <button className="bg-white border border-slate-100 p-4 rounded-2xl text-slate-600 font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition shadow-sm">
            <Filter size={18} /> More Filters
          </button>
        </div>

        {/* Volunteer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredList.map((v) => (
              <motion.div 
                key={v.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-red-100 transition-all group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-16 h-16 bg-slate-100 rounded-3xl flex items-center justify-center text-xl font-black text-slate-400 border-2 border-white shadow-inner">
                    {v.name[0]}
                  </div>
                  <div className="flex flex-col items-end">
                    <button className="text-slate-300 hover:text-slate-600 mb-2"><MoreHorizontal size={20} /></button>
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${v.status === 'on-call' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                      {v.status}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-black text-slate-800 group-hover:text-red-600 transition-colors">{v.name}</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter mt-1">{v.role}</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                    <MapPin size={16} className="text-slate-300" /> {v.district}, BD
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                    <CalendarCheck size={16} className="text-slate-300" /> {v.events} Events Joined
                  </div>
                  <div className="flex items-center gap-2 text-sm font-black text-amber-500">
                    <Star size={16} className="fill-amber-500" /> {v.rating} <span className="text-slate-300 font-medium ml-1">Rating</span>
                  </div>
                </div>

                <div className="flex gap-2 border-t border-slate-50 pt-6">
                  <button className="flex-1 bg-slate-50 hover:bg-red-50 hover:text-red-600 p-3 rounded-xl transition text-slate-500">
                    <Phone size={18} className="mx-auto" />
                  </button>
                  <button className="flex-1 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 p-3 rounded-xl transition text-slate-500">
                    <Mail size={18} className="mx-auto" />
                  </button>
                  <Link href={`/admin/volunteers/${v.id}`} className="flex-2 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-red-600 transition">
                    View Profile
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Impact Message */}
        <div className="mt-12 p-8 bg-slate-900 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-slate-300">
            <div className="flex items-center gap-4">
                <div className="bg-red-600 p-4 rounded-3xl">
                    <Award size={32} />
                </div>
                <div>
                    <h4 className="text-xl font-bold">Volunteer of the Month</h4>
                    <p className="text-slate-400 text-sm">Tanvir Ahmed has completed 25 successful emergency coordinations!</p>
                </div>
            </div>
            <button className="px-8 py-3 bg-white text-slate-900 font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-red-500 hover:text-white transition">Announce Awards</button>
        </div>
      </div>
    </div>
  );
};

export default VolunteersPage;