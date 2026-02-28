"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Droplet, TreeDeciduous, ScanHeart, University, User, DollarSign, Handshake, Heart, Calendar, MapPin, Quote, Phone, Mail, CheckCircle2, Facebook, Twitter, Instagram, Youtube, ChevronRight, ShieldCheck, ExternalLink,} from "lucide-react";
import bg from "@/media/bpsf.jpeg";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const Home = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-green-100 overflow-x-hidden font-sans">
      {/* --- Enhanced Hero Section --- */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center z-0 scale-105"
          style={{ backgroundImage: `url(${bg?.src || bg})` }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/90 via-black/80 to-black z-10" />

        <div className="relative z-20 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] text-green-400 uppercase bg-white/10 backdrop-blur-md rounded-full border border-white/10">
              Together for Humanity
            </span>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white mb-6">
              Birabo Progoti <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-green-400 to-emerald-300">
                Somajkollan Foundation
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-300 mb-10 leading-relaxed">
              Empowering Birabo through healthcare, environmental protection,
              and moral guidance.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/join"
                className="px-8 py-4 bg-green-600 text-white rounded-2xl font-bold hover:bg-green-500 transition-all shadow-xl shadow-green-900/20 flex items-center gap-2 group"
              >
                Join as Volunteer{" "}
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <button className="px-8 py-4 bg-white/10 border border-white/20 backdrop-blur-md text-white rounded-2xl font-bold hover:bg-white hover:text-slate-900 transition-all flex items-center gap-2">
                <Heart size={18} className="text-red-400" /> Donate Now
              </button>
            </div>
          </motion.div>
        </div>
      </section>
      {/* --- STATS SECTION: Overlapping for better flow --- */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Droplet />,
                label: "Blood Donation",
                count: "355+",
                color: "from-red-500 to-rose-600",
              },
              {
                icon: <TreeDeciduous />,
                label: "Trees Planted",
                count: "500+",
                color: "from-green-500 to-emerald-600",
              },
              {
                icon: <ScanHeart />,
                label: "Health Campaigns",
                count: "15+",
                color: "from-blue-500 to-cyan-600",
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                {...fadeInUp}
                transition={{ delay: i * 0.1 }}
                className="group p-8 bg-white border border-slate-100 shadow-2xl shadow-slate-200/50 rounded-[2.5rem] transition-all hover:-translate-y-2"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-linear-to-br ${stat.color} flex items-center justify-center text-white mb-6 shadow-lg`}
                >
                  {stat.icon}
                </div>
                <span className="font-bold text-slate-400 uppercase tracking-widest text-xs">
                  {stat.label}
                </span>
                <h3 className="text-4xl font-black text-slate-900 mt-2">
                  {stat.count}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- MISSION/VISION: Better color contrast --- */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1 py-4">
              <h2 className="text-4xl font-black text-slate-900 mb-6 leading-tight">
                Small Steps,
                <br />
                <span className="text-green-600">Big Changes.</span>
              </h2>
              <p className="text-slate-500 font-medium leading-relaxed">
                BPSF is built on the foundation of selfless service. We don`t
                just dream of a better Birabo; we build it.
              </p>
            </div>
            {[
              {
                title: "Our Mission",
                desc: "Sustainable social welfare through healthcare and nature.",
                icon: <ScanHeart />,
                color: "bg-green-600",
              },
              {
                title: "Our Vision",
                desc: "A self-reliant, compassionate society for every individual.",
                icon: <TreeDeciduous />,
                color: "bg-slate-900",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                {...fadeInUp}
                className={`p-10 rounded-[3rem] ${item.color} text-white shadow-2xl`}
              >
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-8">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-white/80 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
                  Our Pillars
                </span>
              </motion.div>
              <motion.h2
                {...fadeInUp}
                className="text-4xl md:text-5xl font-black text-slate-900 mb-6"
              >
                Making a <span className="text-green-600">Tangible</span> Impact
              </motion.h2>
              <motion.p
                {...fadeInUp}
                className="text-slate-500 text-lg font-medium leading-relaxed"
              >
                We focus on the pillars of a healthy society: Health,
                Environment, and Moral Guidance. Each initiative is designed for
                long-term sustainability.
              </motion.p>
            </div>

            <motion.div {...fadeInUp}>
              <Link
                href="/activities"
                className="group flex items-center gap-3 px-6 py-3 bg-slate-50 text-slate-900 rounded-2xl font-bold hover:bg-green-600 hover:text-white transition-all duration-300 shadow-sm"
              >
                View All Activities
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
                title: "Blood Donation",
                stats: "350+ Bags",
                color: "text-red-500",
                border: "hover:border-red-200",
                bg: "bg-red-50/50",
                glow: "group-hover:shadow-red-100",
              },
              {
                icon: <TreeDeciduous size={32} />,
                title: "Tree Planting",
                stats: "500+ Saplings",
                color: "text-green-600",
                border: "hover:border-green-200",
                bg: "bg-green-50/50",
                glow: "group-hover:shadow-green-100",
              },
              {
                icon: <ScanHeart size={32} />,
                title: "Health Campaign",
                stats: "2k+ Screened",
                color: "text-emerald-500",
                border: "hover:border-emerald-200",
                bg: "bg-emerald-50/50",
                glow: "group-hover:shadow-emerald-100",
              },
              {
                icon: <University size={32} />,
                title: "Moral Guidance",
                stats: "Monthly Mahfil",
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
                    Supporting the Birabo community through active{" "}
                    {card.title.toLowerCase()} programs and emergency response.
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-2 text-slate-900 font-bold text-sm group-hover:text-green-600 transition-colors">
                  Learn more <ChevronRight size={16} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- HEALTHCARE PARTNERS (DKMC & MADILIFE) --- */}
      <section className="bg-white pt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-linear-to-br from-slate-900 to-slate-800 rounded-[4rem] p-12 md:p-24 overflow-hidden relative shadow-3xl">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] -mr-48 -mt-48" />

            <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
                  Premium Health <br />
                  <span className="text-green-400 font-medium italic underline decoration-white/20">
                    Member Benefits
                  </span>
                </h2>
                <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                  Our strategic bonding with top hospitals ensures that BPSF
                  family members receive priority care and financial ease when
                  it matters most.
                </p>
                <div className="grid sm:grid-cols-2 gap-6">
                  {["DKMC Hospital", "Madilife Hospital"].map((hosp) => (
                    <div
                      key={hosp}
                      className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="p-2 bg-green-500/20 rounded-lg text-green-400">
                          <CheckCircle2 size={16} />
                        </span>
                        <ExternalLink size={14} className="text-slate-600" />
                      </div>
                      <h4 className="text-white font-bold text-xl mb-1">
                        {hosp}
                      </h4>
                      <p className="text-xs font-bold text-green-400 uppercase tracking-widest">
                        Discount Recommended
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <div className="relative">
                <div className="space-y-4">
                  {[
                    { title: "OPD & Diagnostics", discount: "25% OFF" },
                    { title: "Medicine & Pharmacy", discount: "10% OFF" },
                    { title: "Emergency Admission", discount: "PRIORITY" },
                  ].map((benefit, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      className="p-6 bg-white rounded-3xl flex items-center justify-between shadow-lg"
                    >
                      <span className="font-bold text-slate-800">
                        {benefit.title}
                      </span>
                      <span className="px-4 py-1 bg-green-100 text-green-700 rounded-full text-xs font-black">
                        {benefit.discount}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- UPCOMING EVENTS: Redesign --- */}
<section className="py-24 bg-white relative">
  <div className="max-w-7xl mx-auto px-6">
    
    {/* Section Header */}
    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="w-10 h-0.5 bg-green-600"></span>
          <span className="text-green-600 font-bold uppercase tracking-[0.2em] text-xs">Stay Connected</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-slate-900">
          Mark the <span className="text-green-600">Date</span>
        </h2>
        <p className="text-slate-500 mt-4 font-medium max-w-md">
          Join us on the ground. Your presence is the first step toward collective progress.
        </p>
      </div>
      
      <button className="group flex items-center gap-2 font-bold text-slate-900 hover:text-green-600 transition-colors bg-slate-50 px-6 py-3 rounded-2xl">
        Calendar View 
        <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>

    {/* Events Grid */}
    <div className="grid md:grid-cols-2 gap-8">
      {[
        {
          title: "Winter Cloth Distribution",
          date: "25 Jan",
          time: "10:00 AM",
          location: "Birabo High School",
          icon: <User size={24} />,
          theme: "from-orange-500 to-amber-400",
          tag: "Community",
        },
        {
          title: "Annual Waz Mahfil",
          date: "10 Feb",
          time: "05:00 PM",
          location: "Central Mosque Grounds",
          icon: <University size={24} />,
          theme: "from-indigo-600 to-blue-500",
          tag: "Moral Guidance",
        },
      ].map((event, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="group relative overflow-hidden bg-slate-50 p-1 rounded-[3rem] transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200"
        >
          {/* Main Card Content */}
          <div className="relative z-10 bg-white p-8 md:p-10 rounded-[2.8rem] h-full transition-transform duration-500 group-hover:scale-[0.99]">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
              {/* Date Badge */}
              <div className="flex items-center gap-4">
                <div className={`w-20 h-20 rounded-3xl bg-linear-to-br ${event.theme} flex flex-col items-center justify-center text-white shadow-lg`}>
                  <span className="text-2xl font-black leading-none">{event.date.split(" ")[0]}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">{event.date.split(" ")[1]}</span>
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    {event.tag}
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 mt-2 group-hover:text-green-600 transition-colors leading-tight">
                    {event.title}
                  </h3>
                </div>
              </div>

              {/* Icon Overlay */}
              <div className="hidden sm:flex w-14 h-14 bg-slate-50 rounded-2xl items-center justify-center text-slate-400 group-hover:bg-green-600 group-hover:text-white transition-all duration-500">
                {event.icon}
              </div>
            </div>

            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-3 text-slate-500 font-medium">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                  <MapPin size={16} />
                </div>
                {event.location}
              </div>
              <div className="flex items-center gap-3 text-slate-500 font-medium">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                  <Calendar size={16} />
                </div>
                Starting at {event.time}
              </div>
            </div>

            <div className="flex items-center justify-between pt-8 border-t border-slate-100">
              <button className="flex items-center gap-2 text-slate-900 font-black text-sm uppercase tracking-widest group/btn">
                RSVP Now 
                <ArrowRight size={18} className="text-green-600 group-hover/btn:translate-x-2 transition-transform" />
              </button>
              
              <div className="flex -space-x-3">
                {[1, 2, 3].map((u) => (
                  <div key={u} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm" />
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-white bg-green-100 flex items-center justify-center text-[10px] font-bold text-green-600">
                  +12
                </div>
              </div>
            </div>
          </div>

          {/* Background Decorative Element */}
          <div className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${event.theme} opacity-0 group-hover:opacity-5 blur-3xl transition-opacity duration-500`} />
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* --- VOICES OF IMPACT --- */}
      <section className="py-20 bg-slate-50 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black mb-4">
              Real Stories, Real Impact
            </h2>
            <p className="text-slate-500 font-medium">
              BPSF isn`t just an organization; it`s a lifeline.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Abir Hasan",
                role: "Blood Recipient",
                text: "When my surgery was at risk due to blood shortage, BPSF responded in minutes. True heroes.",
              },
              {
                name: "Dr. Rakib",
                role: "Local Physician",
                text: "The environmental awareness brought by this foundation has physically changed our landscape.",
              },
              {
                name: "Sultana Ahmed",
                role: "Active Volunteer",
                text: "The discount at Madilife through BPSF was a huge relief during my mother's treatment.",
              },
            ].map((voice, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                variants={itemVariants}
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

      {/* --- FINAL ACTION TO CALL --- */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto bg-linear-to-br from-green-600 to-emerald-700 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          {/* Decorative Circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-green-500/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to make a difference?
            </h2>
            <p className="text-gray-200 text-lg mb-10 max-w-xl mx-auto">
              Whether you donate time, money, or blood, your contribution saves
              lives and protects our planet.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { icon: <User size={20} />, label: "Volunteer" },
                { icon: <DollarSign size={20} />, label: "Donate" },
                { icon: <Handshake size={20} />, label: "Partner" },
              ].map((btn) => (
                <button
                  key={btn.label}
                  className="flex items-center gap-2 px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all font-semibold border border-white/10"
                >
                  {btn.icon} {btn.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- MODERN CONTACT SECTION --- */}
      <section className="py-10 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-slate-900 rounded-[4rem] overflow-hidden flex flex-col lg:flex-row shadow-3xl">
            <div className="lg:w-1/2 p-12 md:p-20 text-white flex flex-col justify-center">
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                Let`s Talk <br />{" "}
                <span className="text-green-400">Progoti.</span>
              </h2>
              <p className="text-slate-400 text-lg mb-12 font-medium">
                Have a project proposal or need blood support? Our team is
                available 24/7 for the community.
              </p>

              <div className="space-y-8">
                {[
                  {
                    icon: <Phone />,
                    label: "Call Emergency",
                    val: "+880 1XXX XXXXXX",
                  },
                  {
                    icon: <Mail />,
                    label: "General Email",
                    val: "info@bpsf.org",
                  },
                  {
                    icon: <MapPin />,
                    label: "Our HQ",
                    val: "Birabo, Rupganj, Narayanganj",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 group">
                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-green-500 transition-all duration-500 group-hover:rotate-12">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                        {item.label}
                      </p>
                      <p className="text-xl font-bold">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-1/2 bg-slate-50 p-12 md:p-20">
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full p-5 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-green-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full p-5 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-green-500 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1">
                    Your Message
                  </label>
                  <textarea
                    rows="4"
                    placeholder="How can we help you?"
                    className="w-full p-5 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-green-500 outline-none transition-all"
                  />
                </div>
                <button className="w-full py-5 bg-green-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-green-100 hover:bg-slate-900 hover:shadow-none transition-all duration-500">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Column 1: About */}
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-white tracking-tight">
                BPSF<span className="text-green-500">.</span>
              </h3>
              <p className="text-sm leading-relaxed text-slate-400">
                Birabo Progoti Somajkollan Foundation is a non-profit
                organization dedicated to uplifting society through healthcare,
                environment, and humanitarian support.
              </p>
              <div className="flex gap-4">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="text-white font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4">
                {[
                  "About Us",
                  "Our Mission",
                  "Success Stories",
                  "Volunteer",
                  "Donate",
                ].map((link) => (
                  <li key={link}>
                    <Link
                      href={`/${link.toLowerCase().replace(" ", "-")}`}
                      className="flex items-center gap-2 hover:text-green-500 transition-colors group"
                    >
                      <ChevronRight
                        size={14}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Impact Areas */}
            <div>
              <h4 className="text-white font-bold mb-6">Impact Areas</h4>
              <ul className="space-y-4">
                {[
                  "Blood Donation",
                  "Tree Plantation",
                  "Health Awareness",
                  "Education Support",
                  "Emergency Relief",
                ].map((area) => (
                  <li key={area} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    {area}
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Newsletter/Registration */}
            <div className="space-y-6">
              <h4 className="text-white font-bold">Newsletter</h4>
              <p className="text-sm text-slate-400">
                Get updates on our latest projects and upcoming events.
              </p>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 transition-colors"
                />
                <button className="absolute right-2 top-2 px-3 py-1 bg-green-600 text-white rounded-lg text-xs font-bold hover:bg-green-700 transition-colors">
                  Join
                </button>
              </div>
              <div className="pt-4 border-t border-white/5">
                <p className="text-[10px] uppercase tracking-widest text-slate-500">
                  Reg No: XXX-XXX-2025
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <p>© {currentYear} BPSF. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Made with{" "}
              <Heart size={14} className="text-red-500 fill-red-500" /> in
              Birabo
            </p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
