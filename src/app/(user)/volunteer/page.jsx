/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  User,
  Phone,
  MessageSquare,
  MapPin,
} from "lucide-react";
import Filter from "@/components/Filter";
import Pagination from "@/components/Pagination";
import LimitButton from "@/components/LimitButton";
import bg from "@/media/bpsf.jpeg";

async function page({ searchParams }) {
  const params = await searchParams;
  const queryString = new URLSearchParams(params).toString();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/volunteers?${queryString}`,
    { cache: "no-store" }
  );

  const data = await res.json();
  const volunteers = data.volunteers || [];
  const totalAvailable = data.totalAvailable || volunteers.length;
  const pagination = data.pagination || { page: 1, totalPages: 1, total: volunteers.length };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-10">

      {/* হিরো সেকশন */}
      <section
        className="w-full border-b min-h-[500px] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${bg?.src || bg})` }}
      >
        <div className="bg-black/60 px-4 pb-32 pt-20 md:pb-40 md:pt-32 text-center backdrop-blur-sm">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
            ভলান্টিয়ার <span className="text-green-500 font-medium">ডিরেক্টরি</span>
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed px-4">
            আমাদের সঙ্গে হাত মেলান। প্রতিটি ভলান্টিয়ারের অবদান গুরুত্বপূর্ণ।
          </p>

          {/* স্ট্যাটস বার */}
          <div className="mt-8 mb-10 flex flex-wrap justify-center items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs sm:text-sm backdrop-blur-md">
              <User size={16} className="text-green-500" />
              <span>
                মোট ভলান্টিয়ার: <b>{pagination.total}</b>
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs sm:text-sm backdrop-blur-md">
              <User size={16} className="text-green-500" />
              <span>
                বর্তমানে উপস্থিত: <b>{totalAvailable}</b>
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
            <Link
              href="/become-volunteer"
              className="w-full sm:w-auto px-8 py-3.5 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              ভলান্টিয়ার হোন <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        <div className="absolute left-0 right-0 bottom-0 translate-y-1/2 z-10">
          <Filter />
        </div>
      </section>

      {/* ফলাফলের কন্টেইনার */}
      <div className="container mx-auto px-4 mt-32 sm:mt-24">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center justify-between p-5 border-b border-slate-100 gap-4">
            <div className="text-sm font-medium text-slate-500 italic">
              প্রদর্শিত হচ্ছে {volunteers.length} জনের মধ্যে {pagination.total} জন ভলান্টিয়ার
            </div>
            <LimitButton />
          </div>

          {/* ডেস্কটপ টেবিল */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">ভলান্টিয়ারের তথ্য</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">দক্ষতা</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">স্থিতি</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">কার্যক্রম</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {volunteers.map((volunteer) => (
                  <tr key={volunteer._id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4 flex items-center gap-4">
                      <Avatar volunteer={volunteer} />
                      <div className="min-w-0">
                        <Link
                          href={`/volunteer/${volunteer._id}`}
                          className="font-bold text-slate-900 group-hover:text-green-600 truncate block"
                        >
                          {volunteer.name}
                        </Link>
                        <p className="text-xs text-slate-500 flex items-center gap-1 truncate">
                          <MapPin size={12} className="shrink-0" />
                          {volunteer.city}, {volunteer.district}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-block px-3 py-1 rounded-full bg-green-50 text-green-600 font-bold text-sm">
                        {volunteer.skills.join(", ")}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge available={volunteer.available} />
                    </td>
                    <td className="px-6 py-4">
                      <ActionButtons phone={volunteer.phone} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* মোবাইল কার্ড ভিউ */}
          <div className="sm:hidden divide-y divide-slate-100">
            {volunteers.map((volunteer) => (
              <div key={volunteer._id} className="p-4 flex flex-col gap-4">
                <div className="flex items-start gap-4">
                  <Avatar volunteer={volunteer} />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <Link
                        href={`/volunteer/${volunteer._id}`}
                        className="font-bold text-slate-900 leading-tight"
                      >
                        {volunteer.name}
                      </Link>
                      <span className="px-2 py-1 rounded-lg bg-green-50 text-green-600 font-black text-xs uppercase tracking-tighter shrink-0">
                        {volunteer.skills.join(", ")}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                      <MapPin size={12} /> {volunteer.city}, {volunteer.district}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-slate-50 p-2 rounded-xl">
                  <StatusBadge available={volunteer.available} />
                  <ActionButtons phone={volunteer.phone} />
                </div>
              </div>
            ))}
          </div>

          {volunteers.length === 0 && (
            <div className="p-20 text-center text-slate-400">
              <User className="mx-auto mb-4 opacity-20" size={48} />
              <p>আপনার অনুসন্ধানের সাথে মেলানো কোনো ভলান্টিয়ার পাওয়া যায়নি।</p>
            </div>
          )}

          {volunteers.length > 0 && (
            <Pagination pagination={pagination} currentSearchParams={params} />
          )}
        </div>
      </div>
    </div>
  );
}

const Avatar = ({ volunteer }) => (
  <div className="w-12 h-12 rounded-2xl bg-slate-100 shrink-0 flex items-center justify-center font-bold text-slate-400 overflow-hidden border border-slate-200 shadow-inner">
    {volunteer.image ? (
      <img src={volunteer.image} alt={volunteer.name} className="w-full h-full object-cover" />
    ) : (
      volunteer.name.charAt(0)
    )}
  </div>
);

const StatusBadge = ({ available }) => (
  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-wider ${
    available ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-slate-100 text-slate-500 border-slate-200"
  }`}>
    <span className={`w-2 h-2 rounded-full ${available ? "bg-emerald-500 animate-pulse" : "bg-slate-400"}`}></span>
    {available ? "উপলব্ধ" : "অপ্রাপ্য"}
  </span>
);

const ActionButtons = ({ phone }) => (
  <div className="flex justify-end gap-1">
    <a href={`tel:${phone}`} className="p-2.5 text-slate-500 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all">
      <Phone size={18} />
    </a>
    <a href={`sms:${phone}`} className="p-2.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
      <MessageSquare size={18} />
    </a>
  </div>
);

export default page;