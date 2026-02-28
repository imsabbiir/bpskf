"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, Phone, MapPin, Award, 
  Calendar, Clock, 
  ShieldCheck,
  MessageSquare, Edit3, Share2
} from 'lucide-react';

export default function VolunteerProfile() {
  const volunteer = {
    name: "Ariful Islam",
    role: "Lead Coordinator",
    blood: "O+",
    joined: "January 2024",
    district: "Narayanganj",
    phone: "01326650567",
    email: "ariful.vol@redlife.com",
    stats: {
      events: 28,
      hours: 140,
      rating: 4.9
    },
    skills: ["First Aid", "Public Speaking", "Logistics"],
    recentActivity: [
      { id: 1, event: "DU Blood Drive", date: "Jan 15, 2026", role: "Site Supervisor" },
      { id: 2, event: "Emergency O- Request", date: "Jan 02, 2026", role: "Coordination" },
      { id: 3, event: "NID Awareness Seminar", date: "Dec 20, 2025", role: "Speaker" },
    ]
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Action Bar */}
        <div className="flex justify-between items-center mb-8">
          <button className="text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-red-600 transition">
            ← Back to Directory
          </button>
          <div className="flex gap-3">
            <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:bg-slate-50 transition">
              <Share2 size={18} />
            </button>
            <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-slate-800 transition shadow-lg">
              <Edit3 size={18} /> Edit Profile
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: IDENTITY CARD */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 text-center relative overflow-hidden">
              {/* Decorative Background */}
              <div className="absolute top-0 left-0 w-full h-24 bg-linear-to-r from-red-600 to-red-400 opacity-10" />
              
              <div className="relative mt-4 inline-block">
                <div className="w-32 h-32 bg-slate-100 rounded-[2.5rem] flex items-center justify-center text-4xl font-black text-slate-300 border-4 border-white shadow-xl overflow-hidden mx-auto">
                   {volunteer.name[0]}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-2 rounded-xl border-4 border-white">
                  <ShieldCheck size={18} />
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-2xl font-black text-slate-900 leading-tight">{volunteer.name}</h2>
                <p className="text-red-500 font-bold text-xs uppercase tracking-widest mt-1">{volunteer.role}</p>
              </div>

              <div className="flex justify-center gap-2 mt-4">
                <span className="px-3 py-1 bg-red-50 text-red-600 text-[10px] font-black rounded-full uppercase">Group {volunteer.blood}</span>
                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black rounded-full uppercase">On-Call</span>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-8 py-6 border-y border-slate-50">
                <div>
                  <p className="text-xl font-black text-slate-800">{volunteer.stats.events}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Events</p>
                </div>
                <div className="border-x border-slate-50">
                  <p className="text-xl font-black text-slate-800">{volunteer.stats.rating}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Rating</p>
                </div>
                <div>
                  <p className="text-xl font-black text-slate-800">{volunteer.stats.hours}h</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Impact</p>
                </div>
              </div>

              <div className="mt-8 space-y-4 text-left">
                <div className="flex items-center gap-3 text-slate-600 font-medium text-sm">
                  <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400"><Phone size={16} /></div>
                  {volunteer.phone}
                </div>
                <div className="flex items-center gap-3 text-slate-600 font-medium text-sm">
                  <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400"><Mail size={16} /></div>
                  {volunteer.email}
                </div>
                <div className="flex items-center gap-3 text-slate-600 font-medium text-sm">
                  <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400"><MapPin size={16} /></div>
                  {volunteer.district}, Bangladesh
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: DETAILS & HISTORY */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Skills & Bio */}
            <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100">
              <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
                <Award className="text-red-500" size={20} /> Expertise & Badges
              </h3>
              <div className="flex flex-wrap gap-3">
                {volunteer.skills.map(skill => (
                  <span key={skill} className="px-5 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold text-slate-600">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Recent Activity Timeline */}
            <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                  <Clock className="text-red-500" size={20} /> Recent Contribution
                </h3>
                <button className="text-[10px] font-black text-red-600 uppercase tracking-widest hover:underline">View All</button>
              </div>

              <div className="space-y-6 relative">
                {/* Vertical Line */}
                <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-slate-100" />

                {volunteer.recentActivity.map((activity) => (
                  <div key={activity.id} className="relative flex items-start gap-8 pl-10 group">
                    <div className="absolute left-2.5 top-1.5 w-3 h-3 bg-white border-2 border-red-500 rounded-full z-10 group-hover:scale-125 transition-all" />
                    <div className="flex-1 bg-slate-50/50 p-5 rounded-4xl border border-transparent hover:border-red-100 hover:bg-red-50/30 transition-all">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold text-slate-800">{activity.event}</p>
                          <p className="text-xs text-slate-500 mt-1 font-medium">{activity.role}</p>
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase">{activity.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Action */}
            <div className="flex gap-4">
              <button className="flex-1 py-5 bg-red-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-3xl shadow-xl shadow-red-200 hover:bg-red-700 transition flex items-center justify-center gap-3">
                <MessageSquare size={18} /> Send Message
              </button>
              <button className="flex-1 py-5 bg-white border border-slate-200 text-slate-600 font-black text-xs uppercase tracking-[0.2em] rounded-3xl hover:bg-slate-50 transition flex items-center justify-center gap-3">
                <Calendar size={18} /> Assign to Event
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}