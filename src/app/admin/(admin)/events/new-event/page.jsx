/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, MapPin, Clock, 
  Globe, Lock, Sparkles, 
  CheckCircle, ImageIcon, AlertTriangle, 
  ArrowLeft, Info, Save, Send,
  Upload, X, Droplets, ChevronDown
} from 'lucide-react';

export default function CreateEventPage() {
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    type: "Blood Drive",
    status: "Planning",
    privacy: "Public",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] p-4 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div className="space-y-1">
            <button className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest hover:text-red-600 transition mb-2">
              <ArrowLeft size={14} /> Back to Dashboard
            </button>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Create New Event</h1>
            <p className="text-slate-500 font-medium">Coordinate a new life-saving campaign for the community.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-8 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition">Save Draft</button>
            <button className="px-8 py-4 bg-red-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-red-100 hover:bg-red-700 transition flex items-center gap-2">
              <Send size={18} /> Publish Now
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* --- LEFT COLUMN: INPUT FORM --- */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* STEP 1: IMAGE UPLOAD */}
            <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center font-black text-sm">01</div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight">Cover Image</h3>
              </div>

              <div 
                onClick={() => fileInputRef.current.click()}
                className={`relative group h-64 w-full border-4 border-dashed rounded-[2.5rem] transition-all cursor-pointer flex flex-col items-center justify-center overflow-hidden ${
                  previewImage ? 'border-transparent' : 'border-slate-100 hover:border-red-200 hover:bg-red-50/30'
                }`}
              >
                {previewImage ? (
                  <>
                    <img src={previewImage} className="w-full h-full object-cover" alt="Preview" />
                    <button 
                      onClick={(e) => { e.stopPropagation(); setPreviewImage(null); }}
                      className="absolute top-4 right-4 bg-white/90 p-2 rounded-full text-red-600 shadow-lg hover:bg-red-600 hover:text-white transition"
                    >
                      <X size={20} />
                    </button>
                  </>
                ) : (
                  <div className="text-center">
                    <div className="bg-slate-50 p-5 rounded-3xl inline-block text-slate-400 mb-4 group-hover:scale-110 group-hover:text-red-500 transition-all">
                      <Upload size={32} />
                    </div>
                    <p className="text-sm font-black text-slate-800 uppercase tracking-widest">Upload Banner</p>
                    <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase">PNG, JPG up to 10MB</p>
                  </div>
                )}
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
              </div>
            </section>

            {/* STEP 2: CORE DETAILS & STATUS */}
            <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center font-black text-sm">02</div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight">Event Details</h3>
              </div>

              <div className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Event Title</label>
                  <input 
                    name="title"
                    onChange={handleInputChange}
                    placeholder="e.g. Winter Blood Drive 2026" 
                    className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-3xl focus:bg-white focus:border-red-500 outline-none transition-all font-bold text-slate-700"
                  />
                </div>

                {/* Category & Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
                    <div className="relative">
                      <select name="type" onChange={handleInputChange} className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-3xl outline-none font-bold text-slate-700 appearance-none">
                        <option>Blood Drive</option>
                        <option>Medical Camp</option>
                        <option>Awareness Seminar</option>
                        <option>Training Session</option>
                      </select>
                      <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Priority Status</label>
                    <div className="relative">
                      <select name="status" onChange={handleInputChange} className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-3xl outline-none font-bold text-red-600 appearance-none">
                        <option value="Planning">Planning</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Urgent">Urgent (Emergency)</option>
                      </select>
                      <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-red-400 pointer-events-none" size={18} />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* STEP 3: LOGISTICS (DATE, TIME, LOCATION) */}
            <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center font-black text-sm">03</div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight">Logistics</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Date</label>
                  <div className="relative group">
                    <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-red-500 transition-colors" size={20} />
                    <input name="date" type="date" onChange={handleInputChange} className="w-full p-5 pl-14 bg-slate-50 border-2 border-transparent rounded-3xl outline-none font-bold text-slate-700 focus:bg-white focus:border-red-500" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Time Range</label>
                  <div className="relative group">
                    <Clock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-red-500 transition-colors" size={20} />
                    <input name="time" type="text" onChange={handleInputChange} placeholder="e.g. 10:00 AM - 4:00 PM" className="w-full p-5 pl-14 bg-slate-50 border-2 border-transparent rounded-3xl outline-none font-bold text-slate-700 focus:bg-white focus:border-red-500" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Event Location</label>
                <div className="relative group">
                  <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-red-500 transition-colors" size={20} />
                  <input name="location" type="text" onChange={handleInputChange} placeholder="Hospital Name, Area, District" className="w-full p-5 pl-14 bg-slate-50 border-2 border-transparent rounded-3xl outline-none font-bold text-slate-700 focus:bg-white focus:border-red-500" />
                </div>
              </div>
            </section>
          </div>

          {/* --- RIGHT COLUMN: LIVE PREVIEW --- */}
          <div className="lg:col-span-5">
            <div className="sticky top-10 flex flex-col items-center gap-8">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Real-time Preview</p>
              
              <div className="bg-white w-full max-w-[360px] rounded-[3.5rem] border border-slate-100 shadow-2xl overflow-hidden group">
                {/* Image Section */}
                <div className="h-52 bg-slate-100 relative overflow-hidden">
                  {previewImage ? (
                    <img src={previewImage} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Preview" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                       <ImageIcon size={54} />
                    </div>
                  )}
                  {/* Floating Status Tag */}
                  <div className={`absolute top-5 left-5 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl ${
                    formData.status === 'Urgent' ? 'bg-red-600 text-white' : 
                    formData.status === 'Confirmed' ? 'bg-green-600 text-white' : 
                    'bg-white text-slate-800'
                  }`}>
                    {formData.status}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 space-y-6">
                  {/* Category Type */}
                  <div className="flex items-center gap-2">
                    <div className="bg-red-50 p-2 rounded-xl">
                      <Droplets size={16} className="text-red-600" />
                    </div>
                    <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">{formData.type}</span>
                  </div>

                  {/* Title */}
                  <h4 className="text-2xl font-black text-slate-900 leading-tight">
                    {formData.title || "Untitled Campaign"}
                  </h4>

                  {/* Logistics List */}
                  <div className="space-y-3.5 pt-2">
                    <div className="flex items-center gap-3 text-slate-500 text-sm font-bold">
                      <Calendar size={18} className="text-red-500" /> {formData.date || "Scheduled Date"}
                    </div>
                    <div className="flex items-center gap-3 text-slate-500 text-sm font-bold">
                      <Clock size={18} className="text-red-500" /> {formData.time || "Event Hours"}
                    </div>
                    <div className="flex items-center gap-3 text-slate-500 text-sm font-bold">
                      <MapPin size={18} className="text-red-500" /> {formData.location || "Venue Location"}
                    </div>
                  </div>

                  <button className="w-full py-5 bg-slate-900 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl mt-4 shadow-xl shadow-slate-200">
                    Register as Volunteer
                  </button>
                </div>
              </div>

              {/* Context Warning */}
              {formData.status === 'Urgent' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full max-w-[360px] p-6 bg-red-600 rounded-[2.5rem] text-white shadow-xl shadow-red-200 flex gap-4"
                >
                  <AlertTriangle className="shrink-0" size={24} />
                  <div>
                    <h5 className="font-black text-sm uppercase tracking-widest">Emergency Broadcast</h5>
                    <p className="text-[11px] font-bold opacity-80 mt-1 leading-relaxed">
                      This will notify 500+ donors and volunteers instantly via SMS and App alerts.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}