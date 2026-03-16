"use client"
import { motion } from "framer-motion";
import { ScanHeart, TreeDeciduous } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function MissionVisionSection() {
  const items = [
    {
      title: "আমাদের মিশন",
      desc: "স্বাস্থ্যসেবা, রক্তদান ও পরিবেশ সংরক্ষণ এর মাধ্যমে সমাজের মানুষের জীবনমান উন্নয়ন করা।",
      icon: <ScanHeart size={24} weight="bold" />,
      color: "bg-green-600",
    },
    {
      title: "আমাদের ভিশন",
      desc: "একটি স্বাস্থ্যকর, সচেতন ও সহমর্মী সমাজ যেখানে প্রতিটি মানুষ নিরাপদ ও সম্মানজনক জীবন যাপন করবে।",
      icon: <TreeDeciduous size={24} weight="bold" />,
      color: "bg-slate-900",
    },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Text */}
          <div className="md:col-span-1 py-4">
            <h2 className="text-4xl font-black text-slate-900 mb-6 leading-tight">
              ছোট পদক্ষেপ, <br />
              <span className="text-green-600">বড় পরিবর্তন।</span>
            </h2>
            <p className="text-slate-500 font-medium leading-relaxed">
              BPSF স্বেচ্ছাসেবার মূল ভিত্তিতে গড়ে উঠেছে। আমরা শুধু একটি উন্নত বিরাবোর স্বপ্ন দেখি না; আমরা এটিকে বাস্তবে গড়ে তুলি।
            </p>
          </div>

          {/* Mission & Vision Cards */}
          {items.map((item, i) => (
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
  );
}