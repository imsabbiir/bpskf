/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  Calendar,
  Scale,
  History,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Hospital,
  User,
  Droplet,
  Share2,
  Award,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import ShareButton from "@/components/ShareButton";

const DonorDetails = async ({ params }) => {
  const { id } = await params;
  let user = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) throw new Error("ফেচ করতে ব্যর্থ হলো");
    user = await res.json();
  } catch (err) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
          <AlertCircle size={40} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">
          রক্তদাতা পাওয়া যায়নি
        </h2>
        <p className="text-slate-500 mt-2">
          আপনি যে প্রোফাইলটি খুঁজছেন তা নেই বা সংযোগে সমস্যা হয়েছে।
        </p>
        <Link
          href="/blood-directory"
          className="mt-6 px-6 py-2 bg-slate-900 text-white rounded-xl font-medium flex items-center gap-2"
        >
          <ArrowLeft size={18} /> তালিকায় ফিরে যান
        </Link>
      </div>
    );
  }

  
  const calculateEligibility = (lastDateStr) => {
    if (!lastDateStr) return { status: true, daysSince: "N/A" };
    const lastDate = new Date(lastDateStr);
    const today = new Date();
    const diff = Math.floor((today - lastDate) / (1000 * 3600 * 24));
    return { status: diff >= 120, daysSince: diff };
  };

  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  const { status, daysSince } = calculateEligibility(
    user.donor.last_donation_date,
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-16 pb-12">
      <div className="container mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* বাম কলাম: প্রোফাইল কার্ড */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 text-center relative">
              <div className="absolute right-10">
                <ShareButton
                  name={user.common.name}
                  bloodGroup={user.common.blood_group}
                />
              </div>
              <Link
                href="/blood-directory"
                className="p-2.5 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200 absolute left-10 cursor-pointer"
              >
                <ArrowLeft size={20} />
              </Link>
              <div className="relative w-32 h-32 mx-auto mb-4">
                <img
                  src={user.common.image || "https://i.pravatar.cc/150"}
                  alt={user.common.name}
                  className="w-full h-full object-cover rounded-3xl border-4 border-white shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 bg-red-600 text-white w-12 h-12 flex items-center justify-center rounded-2xl font-black text-lg border-4 border-white">
                  {user.common.blood_group}
                </div>
              </div>
              <h1 className="text-2xl font-bold text-slate-900">
                {user.common.name}
              </h1>
              <p className="text-slate-500 text-sm flex items-center justify-center gap-1 mt-1">
                <Phone size={14} className="text-red-500" />{" "}
                {user.common.phone_number}
              </p>
              <p className="text-slate-500 text-sm flex md:items-center justify-center gap-1 mt-1">
                <MapPin size={14} className="text-red-500" />{" "}
                {user.common.address.village}, {user.common.address.upazila},{" "}
                {user.common.address.district}
              </p>

              <div className="max-w-md mx-auto bg-slate-900 rounded-4xl p-3 shadow-2xl flex gap-3 border border-white/10 mt-5">
                <a
                  href={`tel:${user.common.phone_number}`}
                  className="flex-2 bg-red-600 text-white rounded-3xl flex items-center justify-center gap-3 font-bold py-4 active:scale-95 transition-all"
                >
                  <Phone size={20} /> ফোন দিন
                </a>
                <a
                  href={`sms:${user.common.phone_number}`}
                  className="flex-1 bg-white/10 text-white rounded-3xl flex items-center justify-center active:scale-95 transition-all"
                >
                  <MessageSquare size={20} />
                </a>
              </div>
            </div>

            {/* স্বেচ্ছাসেবক তথ্য */}
            {user.volunteer?.requested && (
              <div className="bg-slate-900 rounded-4xl p-6 shadow-xl text-white relative overflow-hidden group">
                <Award className="absolute -right-4 -bottom-4 w-24 h-24 text-white/5 group-hover:rotate-12 transition-transform" />
                <h3 className="font-bold mb-4 flex items-center gap-2 text-yellow-400">
                  <Award size={20} /> স্বেচ্ছাসেবক প্রোফাইল
                </h3>
                <div className="space-y-3 text-sm relative z-10">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-slate-400">অবস্থা:</span>{" "}
                    <span className="capitalize text-yellow-400 font-black">
                      {user.volunteer.status}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-slate-400">এলাকা:</span>{" "}
                    <span className="font-bold">
                      {user.volunteer.assigned_area || "সাধারণ"}
                    </span>
                  </div>
                  <div className="pt-2 flex flex-wrap gap-2">
                    {user.volunteer.skills?.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-white/10 px-3 py-1 rounded-lg text-[10px] font-medium border border-white/5"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ডান কলাম: ইতিহাস ও অবস্থা */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <InfoBox
                label="বয়স"
                value={`${calculateAge(user.common.date_of_birth)} বছর`}
                icon={<Calendar size={20} />}
              />
              <InfoBox
                label="ওজন"
                value={`${user.donor.weight || 0} কেজি`}
                icon={<Scale size={20} />}
              />
              <InfoBox
                label="লিঙ্গ"
                value={user.common.gender === "male" ? "পুরুষ" : "নারী"}
                icon={<User size={20} />}
              />
              {/* প্রাপ্যতা (Availability) কার্ড */}
              <InfoBox
                label="প্রাপ্যতা"
                value={status ? "অ্যাভেলেবল" : "অযোগ্য"}
                icon={
                  status ? (
                    <CheckCircle2 size={20} className="text-emerald-500" />
                  ) : (
                    <AlertCircle size={20} className="text-amber-500" />
                  )
                }
              />
            </div>
            <div
              className={`rounded-md px-6 py-2 border flex items-center gap-4 transition-all ${status ? "bg-emerald-100 border-emerald-200" : "bg-amber-100 border-amber-200"}`}
            >
              <div
                className={`p-2 rounded-md ${status ? "bg-emerald-500" : "bg-amber-500"} text-white shadow-lg`}
              >
                {status ? (
                  <CheckCircle2 size={16} />
                ) : (
                  <AlertCircle size={16} />
                )}
              </div>
              <div className="text-center md:text-left">
                <p
                  className={`text-xs md:text-sm mt-1 ${status ? "text-emerald-700" : "text-amber-700"}`}
                >
                  {status
                    ? `শেষ রক্তদানের ${daysSince} দিন হয়েছে। যোগ্য।`
                    : `শেষ রক্তদানের ${daysSince} দিন হয়েছে। 120 দিনের বিশ্রাম প্রয়োজন।`}
                </p>
              </div>
            </div>

            {/* রক্তদান ইতিহাস */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <History className="text-red-500" />
                  <h3 className="font-bold text-slate-900">রক্তদান ইতিহাস</h3>
                </div>
                <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-bold text-slate-500">
                  {user.donor.donation_history?.length || 0} টি রক্তদান
                </span>
              </div>
              <div className="p-6">
                {user.donor.donation_history?.length > 0 ? (
                  <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-100">
                    {user.donor.donation_history.map((log, i) => (
                      <div
                        key={i}
                        className="relative flex items-start gap-6 group"
                      >
                        <div className="absolute left-0 w-10 h-10 bg-white border-2 border-red-500 rounded-full flex items-center justify-center z-10 shadow-sm transition-transform group-hover:scale-110">
                          <Droplet size={16} className="text-red-500" />
                        </div>
                        <div className="ml-12 pt-1">
                          <time className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-md uppercase tracking-widest">
                            {log.donation_date}
                          </time>
                          <h4 className="text-md font-bold text-slate-900 mt-2">
                            রোগীর নাম: {log.patient_name}
                          </h4>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-2 text-sm text-slate-500">
                            <span className="flex items-center gap-1.5">
                              <Hospital size={14} className="text-slate-400" />{" "}
                              {log.hospital_name}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <MapPin size={14} className="text-slate-400" />{" "}
                              {log.location}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-400">
                    <History size={48} className="mx-auto mb-3 opacity-20" />
                    <p>এই রক্তদাতার কোনো রক্তদান রেকর্ড নেই।</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const InfoBox = ({ label, value, icon }) => (
  <div className="bg-white p-5 rounded-4xl border border-slate-100 text-center shadow-sm group hover:shadow-md transition-all">
    <div className="text-slate-300 group-hover:text-red-500 transition-colors mb-3 flex justify-center">
      {icon}
    </div>
    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1 tracking-tighter">
      {label}
    </p>
    <p className="text-base font-black text-slate-800">{value}</p>
  </div>
);
export default DonorDetails;
