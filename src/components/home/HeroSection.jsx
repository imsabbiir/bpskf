"use client"
import { ArrowRight, Heart } from 'lucide-react'
import Link from 'next/link'
import { motion } from "framer-motion";
import React from 'react'
import bg from "@/media/bpsf.jpeg";

function HeroSection() {
  return (
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
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] text-green-400 uppercase bg-white/10 backdrop-blur-md rounded-full border border-white/10 ">
              সেবায় প্রগতি, সমাজের উন্নতি
            </span>
            <h1 className=" text-4xl md:text-7xl font-black tracking-tight text-white mb-6 trio hind">
              বিরাব প্রগতি <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-green-400 to-emerald-300">
                সমাজকল্যাণ ফাউন্ডেশন
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-sm text-justify text-slate-300 mb-10 leading-relaxed trio">
              আমাদের লক্ষ্য হলো মানুষের স্বাস্থ্য সচেতনতা বৃদ্ধি, পরিচ্ছন্ন ও নিরাপদ পরিবেশ নিশ্চিত করা এবং নৈতিক মূল্যবোধের চর্চা ছড়িয়ে দেওয়া। বিভিন্ন সামাজিক ও মানবিক কার্যক্রমের মাধ্যমে আমরা বিরাবোর মানুষের জীবনমান উন্নয়ন এবং একটি সচেতন, সুস্থ ও দায়িত্বশীল সমাজ গড়ে তুলতে কাজ করে যাচ্ছি।
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/join"
                className="px-8 py-4 bg-green-600 text-white rounded-2xl hover:bg-green-500 transition-all shadow-xl shadow-green-900/20 flex items-center gap-2 group noto"
              >
                স্বেচ্ছাসেবক হোন{" "}
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <button className="px-8 py-4 bg-white/10 border border-white/20 backdrop-blur-md text-white rounded-2xl  hover:bg-white hover:text-slate-900 transition-all flex items-center gap-2 noto">
                <Heart size={18} className="text-red-400" /> রক্ত দান
              </button>
            </div>
          </motion.div>
        </div>
      </section>
  )
}

export default HeroSection