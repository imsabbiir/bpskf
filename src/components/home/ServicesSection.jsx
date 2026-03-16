"use client"
import { ArrowRight, ChevronRight, Droplet, ScanHeart, TreeDeciduous, University } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { motion } from "framer-motion";
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};
function ServicesSection() {
  return (
    <section className="py-24 bg-green-200">
  <div className="max-w-7xl mx-auto px-6">
    {/* Header Content */}
    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
      <div className="max-w-2xl">
        <motion.div
          {...fadeInUp}
          className="flex items-center gap-2 mb-4"
        >
          <span className="w-10 h-0.5 bg-green-600"></span>
          <span className="text-green-600 font-bold uppercase tracking-[0.2em] text-xs">
            আমাদের মূল স্তম্ভ
          </span>
        </motion.div>
        <motion.h2
          {...fadeInUp}
          className="text-4xl md:text-5xl font-black text-slate-900 mb-6"
        >
          স্পষ্ট <span className="text-green-600">প্রভাব</span> তৈরি করা
        </motion.h2>
        <motion.p
          {...fadeInUp}
          className="text-slate-500 text-lg font-medium leading-relaxed"
        >
          আমরা সুস্থ সমাজের মূল স্তম্ভগুলিতে ফোকাস করি: স্বাস্থ্য, পরিবেশ, এবং নৈতিক শিক্ষা। প্রতিটি উদ্যোগ দীর্ঘমেয়াদি টেকসই করার জন্য ডিজাইন করা হয়েছে।
        </motion.p>
      </div>

      <motion.div {...fadeInUp}>
        <Link
          href="/activities"
          className="group flex items-center gap-3 px-6 py-3 bg-slate-50 text-slate-900 rounded-2xl font-bold hover:bg-green-600 hover:text-white transition-all duration-300 shadow-sm"
        >
          সব কার্যক্রম দেখুন
          <ArrowRight
            size={20}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </motion.div>
    </div>

    {/* Impact Cards Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        {
          icon: <Droplet size={32} />,
          title: "রক্তদান",
          stats: "৩৫০+ ব্যাগ",
          color: "text-red-500",
          border: "hover:border-red-200",
          bg: "bg-red-50/50",
          glow: "group-hover:shadow-red-100",
        },
        {
          icon: <TreeDeciduous size={32} />,
          title: "গাছ রোপণ",
          stats: "৫০০+ চারা",
          color: "text-green-600",
          border: "hover:border-green-200",
          bg: "bg-green-50/50",
          glow: "group-hover:shadow-green-100",
        },
        {
          icon: <ScanHeart size={32} />,
          title: "স্বাস্থ্য সচেতনতা",
          stats: "২,০০০+ স্ক্রিনিং",
          color: "text-emerald-500",
          border: "hover:border-emerald-200",
          bg: "bg-emerald-50/50",
          glow: "group-hover:shadow-emerald-100",
        },
        {
          icon: <University size={32} />,
          title: "নৈতিক শিক্ষা",
          stats: "মাসিক মহফিল",
          color: "text-blue-600",
          border: "hover:border-blue-200",
          bg: "bg-blue-50/50",
          glow: "group-hover:shadow-blue-100",
        },
      ].map((card, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className={`group relative p-10 rounded-[3rem] bg-white border border-slate-100 ${card.border} transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] ${card.glow}`}
        >
          {/* Subtle Background Shape */}
          <div
            className={`absolute top-0 right-0 w-32 h-32 ${card.bg} rounded-full -mr-16 -mt-16 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity`}
          />

          <div
            className={`${card.color} mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}
          >
            {card.icon}
          </div>

          <div className="relative z-10">
            <h3 className="text-2xl font-black text-slate-900 mb-2">
              {card.title}
            </h3>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.15em] mb-6">
              {card.stats}
            </p>
            <p className="text-slate-500 font-medium leading-relaxed text-sm">
              সক্রিয় {card.title.toLowerCase()} প্রোগ্রাম এবং জরুরি প্রতিক্রিয়ার মাধ্যমে বিরাবো কমিউনিটিকে সমর্থন করা হচ্ছে।
            </p>
          </div>

          <div className="mt-8 flex items-center gap-2 text-slate-900 font-bold text-sm group-hover:text-green-600 transition-colors">
            আরও জানুন <ChevronRight size={16} />
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>
  )
}

export default ServicesSection