"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Filter, Plus, MoreVertical, 
  Users, Calendar, Eye, Edit, Trash2,
  CheckCircle, Clock, AlertCircle, TrendingUp,
  Droplets
} from 'lucide-react';

export default function ManageEvents() {
  const [activeTab, setActiveTab] = useState('active');

  const events = [
    { id: 1, title: "Winter Blood Drive - DU", date: "2026-02-15", volunteers: 45, goal: 60, status: "Urgent", type: "Drive" },
    { id: 2, title: "Health Awareness Seminar", date: "2026-03-10", volunteers: 12, goal: 20, status: "Confirmed", type: "Seminar" },
    { id: 3, title: "Emergency O- Mobilization", date: "2026-01-30", volunteers: 8, goal: 10, status: "Pending", type: "Emergency" },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        
        {/* --- TOP HEADER --- */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Event Operations</h1>
            <p className="text-slate-500 font-medium">Analyze, monitor, and update your active donation campaigns.</p>
          </div>
          <button className="bg-red-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-red-200 hover:bg-red-700 transition flex items-center gap-2">
            <Plus size={18} /> Create New Event
          </button>
        </header>

        {/* --- ANALYTICS BAR --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { label: 'Total Volunteers', value: '1,240', icon: <Users />, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Blood Bags Goal', value: '85%', icon: <TrendingUp />, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'Active Campaigns', value: '12', icon: <Calendar />, color: 'text-red-600', bg: 'bg-red-50' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-4xl border border-slate-100 flex items-center gap-5 shadow-sm">
              <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl`}>{stat.icon}</div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <h4 className="text-2xl font-black text-slate-800">{stat.value}</h4>
              </div>
            </div>
          ))}
        </div>

        {/* --- MAIN CONTENT CARD --- */}
        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
          
          {/* Tabs & Filters */}
          <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex bg-slate-50 p-1.5 rounded-2xl">
              {['active', 'completed', 'drafts'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition ${activeTab === tab ? 'bg-white shadow-md text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            <div className="relative w-full md:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input type="text" placeholder="Search events..." className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-xl outline-none text-sm font-medium" />
            </div>
          </div>

          {/* TABLE AREA */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Event Name</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Volunteers</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Date</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {events.map((event) => (
                  <tr key={event.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-600">
                          <Droplets size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-sm">{event.title}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">{event.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                        event.status === 'Urgent' ? 'bg-red-100 text-red-600' : 
                        event.status === 'Confirmed' ? 'bg-green-100 text-green-600' : 
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {event.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden max-w-[100px]">
                           <div className="bg-red-500 h-full" style={{ width: `${(event.volunteers / event.goal) * 100}%` }} />
                        </div>
                        <span className="text-xs font-black text-slate-600">{event.volunteers}/{event.goal}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm font-bold text-slate-500">
                      {event.date}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition shadow-sm">
                          <Eye size={16} />
                        </button>
                        <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-900 hover:text-white transition shadow-sm">
                          <Edit size={16} />
                        </button>
                        <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-red-50 hover:text-red-600 transition shadow-sm">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* TABLE FOOTER */}
          <div className="p-8 bg-slate-50/50 flex justify-between items-center border-t border-slate-50">
            <p className="text-xs font-bold text-slate-400 uppercase">Showing 3 of 12 Campaigns</p>
            <div className="flex gap-2">
              <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition">Previous</button>
              <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}