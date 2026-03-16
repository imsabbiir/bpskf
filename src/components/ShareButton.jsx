"use client";
import React, { useState } from "react";
import { Share2, MessageCircle, Facebook, Send, Mail, Link2, X } from "lucide-react";

export default function ShareButton({ name, bloodGroup }) {
  const [isOpen, setIsOpen] = useState(false);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `${name} (${bloodGroup}) রক্তদাতার প্রোফাইলটি দেখুন।`;

  const options = [
    { name: "WhatsApp", icon: <MessageCircle size={20}/>, color: "bg-[#25D366]", link: `https://api.whatsapp.com/send?text=${shareText} ${shareUrl}` },
    { name: "Messenger", icon: <Facebook size={20}/>, color: "bg-[#0084FF]", link: `fb-messenger://share?link=${shareUrl}` },
    { name: "Facebook", icon: <Facebook size={20}/>, color: "bg-[#1877F2]", link: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}` },
    { name: "Telegram", icon: <Send size={20}/>, color: "bg-[#0088cc]", link: `https://t.me/share/url?url=${shareUrl}&text=${shareText}` },
    { name: "Gmail", icon: <Mail size={20}/>, color: "bg-[#EA4335]", link: `mailto:?subject=Blood Donor Profile&body=${shareText} ${shareUrl}` },
  ];

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("লিঙ্ক কপি হয়েছে!");
  };

  return (
    
    <div className="relative">
      <button onClick={() => setIsOpen(true)} className="p-2.5 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors shadow-sm cursor-pointer">
        <Share2 size={20} className="text-slate-500" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center sm:items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-black text-slate-800 text-xl">শেয়ার করুন</h3>
              <button onClick={() => setIsOpen(false)} className="p-2 bg-slate-100 rounded-full"><X size={20}/></button>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              {options.map((opt) => (
                <a key={opt.name} href={opt.link} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
                  <div className={`${opt.color} text-white p-4 rounded-2xl group-hover:scale-110 transition-transform shadow-lg`}>{opt.icon}</div>
                  <span className="text-[10px] font-bold text-slate-500">{opt.name}</span>
                </a>
              ))}
              <button onClick={copyLink} className="flex flex-col items-center gap-2 group">
                <div className="bg-slate-100 text-slate-600 p-4 rounded-2xl group-hover:scale-110 transition-transform shadow-sm"><Link2 size={20}/></div>
                <span className="text-[10px] font-bold text-slate-500">Copy</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}