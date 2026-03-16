/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import {motion} from "framer-motion"
import {
  ArrowRight,
  Droplet,
  HeartPulse,
  Phone,
  MessageSquare,
  MapPin,
  User,
} from "lucide-react";
import bg from "@/media/blood-bg.jpg";
import Filter from "@/components/Filter";
import Pagination from "@/components/Pagination";
import LimitButton from "@/components/LimitButton";

// ================= Page Component =================

const toBanglaNumber = (num) => {
  const banglaDigits = ["0", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num.toString().replace(/\d/g, (d) => banglaDigits[d]);
};
async function Page({ searchParams }) {
  const params = await searchParams;
  const queryString = new URLSearchParams(params).toString();

  // API থেকে donors ডেটা fetch করা
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users?${queryString}`,
    { cache: "no-store" },
  );
  const data = await res.json();
  const donors = data.users || [];
  const totalAvailable = data.totalAvailable || 0;
  const pagination = data.pagination || { page: 1, totalPages: 1, total: 0 };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-10">
      {/* ================= Hero Section ================= */}
      <section
        className="bg-slate-900 w-full border-b min-h-[500px] bg-cover bg-center relative mt-10"
        // style={{ backgroundImage: `url(${bg?.src || bg})` }}
      >
        <div className="px-4 pb-32 pt-20 md:pb-40 md:pt-32 text-center backdrop-blur-sm">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            রক্তের সন্ধানে <span className="text-red-500">জীবন</span> বাঁচান
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed px-4 trio">
            আপনার স্থানীয় এলাকার donors এর সাথে সংযোগ করে জীবন বাঁচান। প্রতিটি
            ড্রপ গুরুত্বপূর্ণ।
          </p>

          {/* Stats */}
          <div className="mt-8 mb-10 flex flex-wrap justify-center items-center gap-3 sm:gap-4">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl min-w-[120px] flex flex-col items-center">
              <User size={16} className="text-green-500" />
              <p className="text-slate-400 text-[10px] uppercase font-bold">
                মোট ডোনার:
              </p>
              <p className={`text-2xl font-black text-emerald-400`}>
                {toBanglaNumber(pagination.total)}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl min-w-[120px] flex flex-col items-center">
              <Droplet size={16} className="text-red-500" />
              <p className="text-slate-400 text-[10px] uppercase font-bold">
                উপলব্ধ:
              </p>
              <p className={`text-2xl font-black text-red-400`}>
                {toBanglaNumber(totalAvailable)}
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
            <Link
              href="/become-donor"
              className="w-full sm:w-auto px-8 py-3.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all flex items-center justify-center gap-2 shadow-lg noto"
            >
              ডোনার হোন <ArrowRight size={18} />
            </Link>
            <Link
              href="/emargency-blood-request"
              className="w-full sm:w-auto px-8 py-3.5 border border-white/30 text-white rounded-xl transition-all flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md noto"
            >
              জরুরি রিকোয়েস্ট <Droplet size={18} />
            </Link>
          </div>
        </div>

        {/* Filter Section */}
        <div className="absolute left-0 right-0 bottom-0 translate-y-1/2 z-10">
          <Filter />
        </div>
      </section>

      {/* ================= Results Table / Cards ================= */}
      <div className="container mx-auto px-4 mt-32 sm:mt-24">
        <div className="md:bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Header with Limit */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-5 border-b border-slate-100 gap-4">
            <div className="text-sm font-medium text-slate-500 italic">
              দেখানো হয়েছে {toBanglaNumber(pagination.total)} এর মধ্যে {toBanglaNumber(donors.length)} ডোনার
            </div>
            <LimitButton />
          </div>

          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    ডোনারের তথ্য
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">
                    রক্ত গ্রুপ
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    উপলব্ধতা
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">
                    ক্রিয়া
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {donors.map((donor) => (
                  <tr
                    key={donor._id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    <td className="px-6 py-4 flex items-center gap-4">
                      <Avatar donor={donor} />
                      <div className="min-w-0">
                        <Link
                          href={`/blood-directory/${donor._id}`}
                          className="font-bold text-slate-900 group-hover:text-red-600 truncate block"
                        >
                          {donor.common.name}
                        </Link>
                        <p className="text-xs text-slate-500 flex items-center gap-1 truncate">
                          <MapPin size={12} className="shrink-0" />
                          {donor.common.address.upazila},{" "}
                          {donor.common.address.district}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-block w-10 h-10 leading-10 rounded-xl bg-red-50 text-red-600 font-black text-sm">
                        {donor.common.blood_group}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge
                        available={calculateAvailability(
                          donor.donor.last_donation_date,
                        )}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <ActionButtons phone={donor.common.phone_number} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="sm:hidden divide-y divide-slate-200 flex flex-col gap-3">
            {donors.map((donor) => (
              <div
                key={donor._id}
                className="bg-white rounded-2xl shadow-sm border border-black p-4 flex items-center gap-4"
              >

                {/* Avatar */}
                <Avatar donor={donor} />


                {/* Info */}
                <div className="flex-1 min-w-0">

                  <Link
                        href={`/blood-directory/${donor._id}`}
                        className="font-bold text-slate-900 leading-tight"
                      >
                        {donor.common.name}
                      </Link>

                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin size={12}/>
                    {donor.common.address.upazila},{" "}
                    {donor.common.address.district}
                  </p>


                  <div className="flex items-center gap-3 mt-2">

                    <span className="px-2 py-1 text-xs bg-red-50 text-red-600 rounded-md font-bold">
                      {donor.common.blood_group}
                    </span>

                    <StatusBadge
                    available={calculateAvailability(
                      donor.donor.last_donation_date,
                    )}
                  />

                  </div>

                </div>


                {/* Actions */}
                <div className="flex flex-col gap-2">

                  <a
                    href={`tel:${donor.common.phone_number}`}
                    className="p-2 rounded-lg bg-red-50 text-red-600"
                  >
                    <Phone size={16}/>
                  </a>

                  <a
                    href={`sms:${donor.common.phone_number}`}
                    className="p-2 rounded-lg bg-blue-50 text-blue-600"
                  >
                    <MessageSquare size={16}/>
                  </a>

                </div>

              </div>              
            ))}
          </div>

          {/* No Donors Fallback */}
          {donors.length === 0 && (
            <div className="p-20 text-center text-slate-400">
              <Droplet className="mx-auto mb-4 opacity-20" size={48} />
              <p>আপনার নির্বাচিত মানদণ্ডের সাথে কোন ডোনার পাওয়া যায়নি।</p>
            </div>
          )}

          {/* Pagination */}
          {donors.length > 0 && (
            <Pagination pagination={pagination} currentSearchParams={params} />
          )}
        </div>
      </div>
    </div>
  );
}

// ================= Helper Functions =================
const calculateAvailability = (dateStr) => {
  if (!dateStr) return true;
  const lastDate = new Date(dateStr);
  const today = new Date();
  const diff = (today - lastDate) / (1000 * 3600 * 24);
  return diff >= 120;
};

const Avatar = ({ donor }) => (
  <div className="w-12 h-12 rounded-2xl bg-slate-100 shrink-0 flex items-center justify-center font-bold text-slate-400 overflow-hidden border border-slate-200 shadow-inner">
    {donor?.common?.image ? (
      <img
        src={donor.common.image}
        alt={donor.common.name}
        className="w-full h-full object-cover"
      />
    ) : (
      donor.common?.name?.charAt(0)
    )}
  </div>
);

const StatusBadge = ({ available }) => (
  <span
    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-wider ${
      available
        ? "bg-emerald-50 text-emerald-600 border-emerald-100"
        : "bg-slate-100 text-slate-500 border-slate-200"
    }`}
  >
    <span
      className={`w-2 h-2 rounded-full ${available ? "bg-emerald-500 animate-pulse" : "bg-slate-400"}`}
    ></span>
    {available ? "উপলব্ধ" : "অপ্রাপ্য"}
  </span>
);


const ActionButtons = ({ phone }) => (
  <div className="flex justify-end gap-1">
    <a
      href={`tel:${phone}`}
      className="p-2.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
    >
      <Phone size={18} />
    </a>
    <a
      href={`sms:${phone}`}
      className="p-2.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
    >
      <MessageSquare size={18} />
    </a>
  </div>
);

export default Page;
