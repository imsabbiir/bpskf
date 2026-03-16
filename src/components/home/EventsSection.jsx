"use client"
import { motion } from "framer-motion";
import { ChevronRight, User, University, MapPin, Calendar, ArrowRight } from "lucide-react";

export default function EventsSection() {
  const events = [
    {
      title: "শীতবস্ত্র বিতরণ কর্মসূচি",
      date: "25 জানু",
      time: "১০:০০ AM",
      location: "বিরাবো হাই স্কুল",
      icon: <User size={24} />,
      theme: "from-orange-500 to-amber-400",
      tag: "কমিউনিটি",
    },
    {
      title: "বার্ষিক ওয়াজ মাহফিল",
      date: "10 ফেব",
      time: "০৫:০০ PM",
      location: "সেন্ট্রাল মসজিদ প্রাঙ্গণ",
      icon: <University size={24} />,
      theme: "from-indigo-600 to-blue-500",
      tag: "নৈতিক দিকনির্দেশনা",
    },
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-10 h-0.5 bg-green-600"></span>
              <span className="text-green-600 font-bold uppercase tracking-[0.2em] text-xs">
                যুক্ত থাকুন
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900">
              তারিখ <span className="text-green-600">নিশ্চিত করুন</span>
            </h2>
            <p className="text-slate-500 mt-4 font-medium max-w-md">
              মাঠে আমাদের সাথে যোগ দিন। আপনার উপস্থিতি হলো সমষ্টিগত অগ্রগতির প্রথম ধাপ।
            </p>
          </div>

          <button className="group flex items-center gap-2 font-bold text-slate-900 hover:text-green-600 transition-colors bg-slate-50 px-6 py-3 rounded-2xl">
            ক্যালেন্ডার দেখুন
            <ChevronRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {events.map((event, i) => (
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
                    <div
                      className={`w-20 h-20 rounded-3xl bg-linear-to-br ${event.theme} flex flex-col items-center justify-center text-white shadow-lg`}
                    >
                      <span className="text-2xl font-black leading-none">
                        {event.date.split(" ")[0]}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">
                        {event.date.split(" ")[1]}
                      </span>
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
                    সময়: {event.time}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-8 border-t border-slate-100">
                  <button className="flex items-center gap-2 text-slate-900 font-black text-sm uppercase tracking-widest group/btn">
                    এখন RSVP করুন
                    <ArrowRight
                      size={18}
                      className="text-green-600 group-hover/btn:translate-x-2 transition-transform"
                    />
                  </button>

                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((u) => (
                      <div
                        key={u}
                        className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm"
                      />
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-green-100 flex items-center justify-center text-[10px] font-bold text-green-600">
                      +12
                    </div>
                  </div>
                </div>
              </div>

              {/* Background Decorative Element */}
              <div
                className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${event.theme} opacity-0 group-hover:opacity-5 blur-3xl transition-opacity duration-500`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}