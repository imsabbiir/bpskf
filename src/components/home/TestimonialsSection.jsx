"use client"
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function TestimonialsSection() {
  const voices = [
    {
      name: "আবির হাসান",
      role: "রক্ত গ্রহণকারী",
      text: "আমার সার্জারির সময় রক্তের অভাব দেখা দেয়েছিল, তখন BPSF মিনিটের মধ্যে সাহায্য করেছে। সত্যিকারের নায়ক।",
    },
    {
      name: "ডা. রকিব",
      role: "স্থানীয় চিকিৎসক",
      text: "এই ফাউন্ডেশন দ্বারা আনা পরিবেশ সচেতনতা আমাদের এলাকা শারীরিকভাবে পরিবর্তন করেছে।",
    },
    {
      name: "সুলতানা আহমেদ",
      role: "সক্রিয় স্বেচ্ছাসেবক",
      text: "ম্যাডিলাইফে BPSF এর মাধ্যমে পাওয়া ছাড় আমার মায়ের চিকিৎসার সময় অনেক সহায়ক হয়েছে।",
    },
  ];

  return (
    <section className="py-20 bg-slate-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-black mb-4">
            বাস্তব গল্প, বাস্তব প্রভাব
          </h2>
          <p className="text-slate-500 font-medium">
            BPSF কেবল একটি সংস্থা নয়; এটি একটি জীবনের সহায়তা।
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {voices.map((voice, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col justify-between"
            >
              <Quote className="text-green-500/20 mb-6" size={40} />
              <p className="text-slate-600 font-medium leading-relaxed mb-8 italic">
                {voice.text}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-100 border-2 border-white overflow-hidden shadow-sm" />
                <div>
                  <h4 className="font-bold text-slate-900 leading-none">
                    {voice.name}
                  </h4>
                  <span className="text-xs text-green-600 font-bold uppercase tracking-widest">
                    {voice.role}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}