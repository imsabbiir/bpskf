/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Droplet,
  HeartPulse,
  Phone,
  MessageSquare,
  MapPin,
} from "lucide-react";
import bg from "@/media/blood-bg.jpg";
import Filter from "@/components/Filter";
import Pagination from "@/components/Pagination";
import LimitButton from "@/components/LimitButton";

async function page({ searchParams }) {
  const params = await searchParams;
  const queryString = new URLSearchParams(params).toString();

  // Note: Ensure your API route is updated to return 'users' key based on the previous route.js update
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users?${queryString}`, {
    cache: "no-store",
  });
  
  const data = await res.json();
  const donors = data.users || []; // Changed from data.donors to data.users to match route update
  const totalAvailable = data.totalAvailable || 0;
  const pagination = data.pagination || { page: 1, totalPages: 1, total: 0 };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-10">
      {/* Hero Section */}
      <section
        className="w-full border-b min-h-[500px] bg-cover bg-no-repeat bg-center relative"
        style={{ backgroundImage: `url(${bg?.src || bg})` }}
      >
        <div className="bg-black/60 px-4 pb-32 pt-20 md:pb-40 md:pt-32 text-center backdrop-blur-sm">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
            Blood Donor{" "}
            <span className="text-red-500 font-medium">Directory</span>
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed px-4">
            Save Lives by connecting with donors in your local area. Every drop counts.
          </p>

          {/* Stats Bar */}
          <div className="mt-8 mb-10 flex flex-wrap justify-center items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs sm:text-sm backdrop-blur-md">
              <HeartPulse size={16} className="text-red-500" />
              <span>
                Total Donors: <b>{pagination.total}</b>
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs sm:text-sm backdrop-blur-md">
              <Droplet size={16} className="text-red-500" />
              <span>
                Available Now: <b>{totalAvailable}</b>
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
            <Link
              href="/become-donor"
              className="w-full sm:w-auto px-8 py-3.5 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              Become a Donor <ArrowRight size={18} />
            </Link>
            <button className="w-full sm:w-auto px-8 py-3.5 border border-white/30 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md">
              Emergency Request <Droplet size={18} />
            </button>
          </div>
        </div>

        <div className="absolute left-0 right-0 bottom-0 translate-y-1/2 z-10">
          <Filter />
        </div>
      </section>

      {/* Results Container */}
      <div className="container mx-auto px-4 mt-32 sm:mt-24">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center justify-between p-5 border-b border-slate-100 gap-4">
            <div className="text-sm font-medium text-slate-500 italic">
              Showing {donors.length} of {pagination.total} donors
            </div>
            <LimitButton />
          </div>

          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Donor Info</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Group</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {donors.map((donor) => (
                  <tr key={donor._id} className="hover:bg-slate-50/80 transition-colors group">
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
                          {donor.common.address.upazila}, {donor.common.address.district}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-block w-10 h-10 leading-10 rounded-xl bg-red-50 text-red-600 font-black text-sm">
                        {donor.common.blood_group}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge available={calculateAvailability(donor.donor.last_donation_date)} />
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
          <div className="sm:hidden divide-y divide-slate-100">
            {donors.map((donor) => (
              <div key={donor._id} className="p-4 flex flex-col gap-4">
                <div className="flex items-start gap-4">
                  <Avatar donor={donor} />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <Link
                        href={`/blood-directory/${donor._id}`}
                        className="font-bold text-slate-900 leading-tight"
                      >
                        {donor.common.name}
                      </Link>
                      <span className="px-2 py-1 rounded-lg bg-red-50 text-red-600 font-black text-xs uppercase tracking-tighter shrink-0">
                        {donor.common.blood_group}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                      <MapPin size={12} /> {donor.common.address.upazila}, {donor.common.address.district}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-slate-50 p-2 rounded-xl">
                  <StatusBadge available={calculateAvailability(donor.donor.last_donation_date)} />
                  <ActionButtons phone={donor.common.phone_number} />
                </div>
              </div>
            ))}
          </div>

          {donors.length === 0 && (
            <div className="p-20 text-center text-slate-400">
              <Droplet className="mx-auto mb-4 opacity-20" size={48} />
              <p>No donors found matching your criteria.</p>
            </div>
          )}

          {donors.length > 0 && (
            <Pagination pagination={pagination} currentSearchParams={params} />
          )}
        </div>
      </div>
    </div>
  );
}

/* Helpers Updated for New Data Structure */
const calculateAvailability = (dateStr) => {
  if (!dateStr) return true;
  // New format is YYYY-MM-DD, native Date constructor handles this perfectly
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
    {available ? "available" : "unavailable"}
  </span>
);

const ActionButtons = ({ phone }) => (
  <div className="flex justify-end gap-1">
    <a href={`tel:${phone}`} className="p-2.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
      <Phone size={18} />
    </a>
    <a href={`sms:${phone}`} className="p-2.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
      <MessageSquare size={18} />
    </a>
  </div>
);

export default page;