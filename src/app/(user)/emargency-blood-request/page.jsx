"use client";
import React from "react";
import { 
  User, Droplet, Phone, Hospital, 
  ChevronRight, Calendar, Info, MapPin 
} from "lucide-react";

export default function BloodRequestForm() {
  return (
    <div className="min-h-screen bg-[#F8F9FE] pb-20 pt-6 px-4">
      <div className="max-w-2xl mx-auto mt-20">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="bg-red-100 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Droplet className="text-red-600" size={32} />
          </div>
          <h1 className="text-2xl font-black text-slate-900">জরুরী রক্তের অনুরোধ</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">সঠিক তথ্য দিয়ে দ্রুত রক্তদাতা খুঁজে নিন</p>
        </div>

        <form className="space-y-6">
          {/* Patient Info Card */}
          <FormCard title="রোগীর তথ্য" icon={<User size={20} />}>
            <Input label="রোগীর নাম" required placeholder="নাম লিখুন" />
            <Input label="রোগীর সমস্যা" required placeholder="যেমন: ক্যান্সার, অপারেশন" />
            <div className="grid grid-cols-2 gap-4">
              <Input label="বয়স" placeholder="যেমন: ২৫" />
              <Select label="লিঙ্গ">
                <option>নির্বাচন করুন</option>
                <option>পুরুষ</option>
                <option>মহিলা</option>
              </Select>
            </div>
          </FormCard>

          {/* Blood Requirement Card */}
          <FormCard title="রক্তের প্রয়োজন" icon={<Droplet size={20} />}>
            <div className="grid grid-cols-2 gap-4">
              <Select label="রক্তের গ্রুপ" required>
                <option>A+</option><option>A-</option>
                <option>B+</option><option>B-</option>
                <option>O+</option><option>O-</option>
                <option>AB+</option><option>AB-</option>
              </Select>
              <Select label="পরিমাণ (ব্যাগ)" required>
                {[1, 2, 3, 4, 5].map(i => <option key={i}>{i} ব্যাগ</option>)}
              </Select>
            </div>
            <Select label="জরুরিতার মাত্রা" required>
              <option>সাধারণ</option>
              <option className="text-orange-500 font-bold">জরুরী</option>
              <option className="text-red-600 font-bold">অতি জরুরী</option>
            </Select>
            <div className="grid grid-cols-2 gap-4">
              <Input type="date" label="কখন প্রয়োজন" required />
              <Input label="প্রয়োজনীয় সময়" placeholder="ঘন্টা" />
            </div>
          </FormCard>

          {/* Contact & Hospital Info Card */}
          <FormCard title="হাসপাতাল ও যোগাযোগ" icon={<Hospital size={20} />}>
            <Input label="হাসপাতালের নাম" required placeholder="হাসপাতালের নাম লিখুন" />
            <div className="grid grid-cols-2 gap-4">
              <Select label="জেলা" required><option>জেলা নির্বাচন</option></Select>
              <Select label="থানা" required><option>থানা নির্বাচন</option></Select>
            </div>
            <hr className="my-2 border-slate-100" />
            <Input label="আপনার ফোন নাম্বার" required placeholder="017XXXXXXXX" />
            <Input label="বিকল্প নাম্বার" placeholder="জরুরী প্রয়োজনে" />
          </FormCard>

          {/* Additional Info */}
          <div className="bg-white rounded-4xl p-6 shadow-sm border border-slate-100">
            <label className="flex items-center gap-2 mb-3 font-bold text-slate-800 text-sm">
              <Info size={16} className="text-slate-400" /> অতিরিক্ত তথ্য
            </label>
            <textarea 
              rows="3"
              className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-red-500 text-sm"
              placeholder="রক্তদাতার জন্য কোনো বিশেষ বার্তা থাকলে লিখুন..."
            />
          </div>

          {/* Submit Button */}
          <button className="w-full bg-red-600 text-white py-5 rounded-3xl font-black text-lg shadow-xl shadow-red-200 hover:bg-red-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            অনুরোধ প্রেরণ করুন <ChevronRight size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}

// --- Helper Components ---

function FormCard({ title, icon, children }) {
  return (
    <div className="bg-white rounded-[2.5rem] p-6 lg:p-8 shadow-sm border border-slate-100">
      <div className="flex items-center gap-3 mb-6 border-b border-slate-50 pb-4">
        <div className="bg-slate-900 text-white p-2.5 rounded-2xl shadow-lg">
          {icon}
        </div>
        <h3 className="font-black text-slate-800 tracking-tight">{title}</h3>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Input({ label, type = "text", required, placeholder }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-black text-slate-500 uppercase ml-1 flex items-center">
        {label} {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input 
        type={type} 
        placeholder={placeholder}
        className="w-full bg-slate-50 border-2 border-transparent focus:border-red-500 focus:bg-white rounded-2xl p-4 transition-all outline-none text-slate-800 font-medium placeholder:text-slate-300"
      />
    </div>
  );
}

function Select({ label, children, required }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-black text-slate-500 uppercase ml-1 flex items-center">
        {label} {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select className="w-full bg-slate-50 border-2 border-transparent focus:border-red-500 focus:bg-white rounded-2xl p-4 transition-all outline-none text-slate-800 font-bold appearance-none cursor-pointer">
        {children}
      </select>
    </div>
  );
}