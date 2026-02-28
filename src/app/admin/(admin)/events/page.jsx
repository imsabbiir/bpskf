"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, MapPin, Clock, Plus, 
  MoreVertical,
  Search, Filter,
  Droplet
} from 'lucide-react';
import Link from 'next/link';

const EventsPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  
  const initialEvents = [
    {
      id: 1,
      title: "Dhaka University Blood Drive",
      date: "2026-02-15",
      time: "10:00 AM - 04:00 PM",
      location: "TSC, University of Dhaka",
      volunteers: 24,
      status: "Confirmed",
      type: "Drive"
    },
    {
      id: 2,
      title: "World Blood Donor Day Seminar",
      date: "2026-06-14",
      time: "09:00 AM - 12:00 PM",
      location: "Bangabandhu International Conference Center",
      volunteers: 12,
      status: "Planning",
      type: "Seminar"
    },
    {
      id: 3,
      title: "Emergency Donation Camp",
      date: "2026-01-30",
      time: "08:00 AM - 08:00 PM",
      location: "Narayanganj Sadar Hospital",
      volunteers: 45,
      status: "Urgent",
      type: "Camp"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Upcoming Events</h1>
            <p className="text-slate-500 font-medium">Coordinate and track upcoming donation campaigns.</p>
          </div>
          
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-red-600 text-white px-6 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-red-700 transition-all shadow-xl shadow-red-200"
          >
            <Plus size={20} /> Create New Event
          </button>
        </header>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search events by title or location..." 
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-red-100 transition"
            />
          </div>
          <button className="px-6 py-4 bg-white border border-slate-100 rounded-2xl text-slate-600 font-bold flex items-center gap-2 hover:bg-slate-50 transition">
            <Filter size={18} /> Filter
          </button>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {initialEvents.map((event) => (
            <motion.div 
              key={event.id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col"
            >
              {/* Event Card Header */}
              <div className="p-6 pb-0 flex justify-between items-start">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  event.status === 'Urgent' ? 'bg-red-100 text-red-600' : 
                  event.status === 'Confirmed' ? 'bg-green-100 text-green-600' : 
                  'bg-blue-100 text-blue-600'
                }`}>
                  {event.status}
                </span>
                <button className="text-slate-300 hover:text-slate-600 transition">
                  <MoreVertical size={20} />
                </button>
              </div>

              {/* Event Content */}
              <div className="p-8 space-y-6 flex-1">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 leading-tight mb-2">{event.title}</h3>
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wide">
                    <Droplet size={14} className="text-red-500 fill-red-500" /> {event.type}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-slate-600 font-medium text-sm">
                    <Calendar size={18} className="text-slate-400" />
                    {new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 font-medium text-sm">
                    <Clock size={18} className="text-slate-400" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 font-medium text-sm">
                    <MapPin size={18} className="text-slate-400" />
                    {event.location}
                  </div>
                </div>
              </div>

              {/* Event Footer */}
              <div className="p-6 bg-slate-50 flex justify-between items-center border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-500">
                        U{i}
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">+{event.volunteers} Going</span>
                </div>
                <Link href={`/admin/events/${event.id}`} className="text-red-600 font-black text-xs uppercase tracking-widest hover:underline transition">
                  Manage
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State Mockup */}
        {initialEvents.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-slate-200">
             <Calendar size={64} className="mx-auto text-slate-200 mb-4" />
             <h2 className="text-2xl font-bold text-slate-800">No scheduled events</h2>
             <p className="text-slate-500 mt-2">Start a new campaign to save lives today.</p>
          </div>
        )}
      </div>

      {/* CREATE EVENT MODAL (Simplified) */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl relative z-10"
            >
              <h2 className="text-2xl font-black text-slate-900 mb-6">Schedule Event</h2>
              <form className="space-y-4">
                <input type="text" placeholder="Event Title" className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-red-100" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="date" className="w-full p-4 bg-slate-50 rounded-2xl outline-none" />
                  <input type="time" className="w-full p-4 bg-slate-50 rounded-2xl outline-none" />
                </div>
                <input type="text" placeholder="Location (e.g., Hospital Name, Area)" className="w-full p-4 bg-slate-50 rounded-2xl outline-none" />
                <textarea placeholder="Event Description" className="w-full p-4 bg-slate-50 rounded-2xl outline-none h-32 resize-none" />
                
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-4 font-bold text-slate-400">Cancel</button>
                  <button type="submit" className="flex-2 py-4 bg-red-600 text-white font-bold rounded-2xl shadow-lg shadow-red-200 hover:bg-red-700">Publish Event</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventsPage;