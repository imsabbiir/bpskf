"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, MapPin, Calendar, Clock, 
  Users, Trash2, CheckCircle, Shield,
  Search, Mail, Phone, ExternalLink, Droplet
} from 'lucide-react';

export default function EventDetailManage() {
  // Mock Data for a single event
  const [eventData] = useState({
    title: "Dhaka University Winter Blood Drive",
    date: "Feb 15, 2026",
    time: "10:00 AM - 04:00 PM",
    location: "TSC, Dhaka University",
    status: "Urgent",
    type: "Public Drive",
    totalSlots: 50,
    coverImage: null // Placeholder
  });

  // Mock Data for Interested Volunteers
  const [volunteers, setVolunteers] = useState([
    { id: 1, name: "Ariful Islam", blood: "O+", role: "Coordinator", phone: "017XXXXXXXX", joinedAt: "2 hours ago" },
    { id: 2, name: "Sumaiya Akter", blood: "A+", role: "Medical", phone: "018XXXXXXXX", joinedAt: "5 hours ago" },
    { id: 3, name: "Tanvir Ahmed", blood: "B+", role: "General", phone: "013XXXXXXXX", joinedAt: "Yesterday" },
    { id: 4, name: "Nusrat Jahan", blood: "AB+", role: "Publicity", phone: "019XXXXXXXX", joinedAt: "2 days ago" },
  ]);

  const removeVolunteer = (id) => {
    if (window.confirm("Are you sure you want to remove this volunteer from this event?")) {
      setVolunteers(volunteers.filter(v => v.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* --- HEADER NAVIGATION --- */}
        <div className="flex justify-between items-center mb-8">
          <button className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-red-600 transition">
            <ArrowLeft size={16} /> Back to Events List
          </button>
          <div className="flex gap-3">
             <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition">Edit Event</button>
             <button className="px-5 py-2.5 bg-red-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-red-100">Stop Recruitment</button>
          </div>
        </div>

        {/* --- EVENT SUMMARY CARD --- */}
        <div className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-sm mb-10 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-[5rem] -mr-8 -mt-8 flex items-center justify-center p-8">
            <Droplet className="text-red-500 opacity-20" size={64} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <span className="px-4 py-1.5 bg-red-50 text-red-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                  {eventData.status} • {eventData.type}
                </span>
                <h1 className="text-3xl md:text-4xl font-black text-slate-900 mt-4 leading-tight">{eventData.title}</h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-50">
                <div className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                  <Calendar className="text-red-500" size={18} /> {eventData.date}
                </div>
                <div className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                  <Clock className="text-red-500" size={18} /> {eventData.time}
                </div>
                <div className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                  <MapPin className="text-red-500" size={18} /> {eventData.location}
                </div>
              </div>
            </div>

            {/* PROGRESS BOX */}
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white flex flex-col justify-center">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Interested</p>
                  <h3 className="text-4xl font-black">{volunteers.length} <span className="text-lg text-slate-500">/ {eventData.totalSlots}</span></h3>
                </div>
                <div className="bg-red-600 p-3 rounded-2xl">
                  <Users size={24} />
                </div>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-red-500 h-full transition-all duration-1000" 
                  style={{ width: `${(volunteers.length / eventData.totalSlots) * 100}%` }} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* --- VOLUNTEER MANAGEMENT SECTION --- */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-xl font-black text-slate-800 flex items-center gap-3">
              Interested Volunteers <span className="bg-slate-200 text-slate-600 text-xs px-2 py-0.5 rounded-md">{volunteers.length}</span>
            </h2>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="text" placeholder="Search by name or role..." className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl outline-none focus:border-red-500 transition-all font-medium text-sm" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <AnimatePresence>
              {volunteers.map((v) => (
                <motion.div 
                  key={v.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white p-6 rounded-4xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-md transition-shadow group"
                >
                  <div className="flex items-center gap-5 w-full md:w-auto">
                    <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center font-black text-slate-400 text-xl border-2 border-white shadow-inner">
                      {v.name[0]}
                    </div>
                    <div>
                      <h4 className="font-black text-slate-800 text-lg flex items-center gap-2">
                        {v.name}
                        <span className="bg-red-50 text-red-600 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-tighter">Blood: {v.blood}</span>
                      </h4>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mt-1">
                        <Shield size={12} className="text-blue-500" /> {v.role} • <span className="lowercase font-medium tracking-normal text-slate-300">Joined {v.joinedAt}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="flex gap-2 mr-4">
                      <button className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition">
                        <Phone size={18} />
                      </button>
                      <button className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition">
                        <Mail size={18} />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeVolunteer(v.id)}
                      className="flex-1 md:flex-none px-6 py-3 bg-red-50 text-red-600 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                      <Trash2 size={16} /> Remove
                    </button>
                    <button className="p-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition shadow-lg shadow-slate-200">
                      <ExternalLink size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {volunteers.length === 0 && (
              <div className="bg-white p-20 rounded-[3rem] border-4 border-dashed border-slate-100 text-center">
                <Users className="mx-auto text-slate-200 mb-4" size={48} />
                <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No volunteers interested yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}