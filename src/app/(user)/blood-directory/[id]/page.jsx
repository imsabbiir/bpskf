/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  Phone, Mail, MapPin, Calendar, Scale, History,
  CheckCircle2, AlertCircle, ArrowLeft, Hospital,
  User, Droplet, Share2, Award
} from "lucide-react";
import Link from "next/link";

const DonorDetails = async ({ params }) => {
  const { id } = await params;
  let user = null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}`, {
      cache: "no-store",
    });
    
    if (!res.ok) throw new Error("Failed to fetch");
    user = await res.json(); 
  } catch (err) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
          <AlertCircle size={40} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Donor Not Found</h2>
        <p className="text-slate-500 mt-2">The profile you are looking for doesn`t exist or there was a connection error.</p>
        <Link href="/blood-directory" className="mt-6 px-6 py-2 bg-slate-900 text-white rounded-xl font-medium flex items-center gap-2">
          <ArrowLeft size={18} /> Back to Directory
        </Link>
      </div>
    );
  }

  // Updated Helper Logic for YYYY-MM-DD
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

  const { status, daysSince } = calculateEligibility(user.donor.last_donation_date);

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/blood-directory" className="flex items-center gap-2 text-slate-600 hover:text-red-600 transition-colors">
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Directory</span>
          </Link>
          <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <Share2 size={20} className="text-slate-500" />
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Profile Card */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 text-center">
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
              <h1 className="text-2xl font-bold text-slate-900">{user.common.name}</h1>
              <p className="text-slate-500 text-sm flex items-center justify-center gap-1 mt-1">
                <Phone size={14} className="text-red-500" /> {user.common.phone_number}
              </p>
              <p className="text-slate-500 text-sm flex md:items-center justify-center gap-1 mt-1">
                <MapPin size={14} className="text-red-500" /> {user.common.address.village}, {user.common.address.upazila}, {user.common.address.district}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <a href={`tel:${user.common.phone_number}`} className="flex flex-col items-center justify-center p-4 bg-red-50 rounded-2xl text-red-600 hover:bg-red-100 transition-all active:scale-95">
                  <Phone size={24} className="mb-1" />
                  <span className="text-xs font-bold">Call Now</span>
                </a>
                <a href={`sms:${user.common.phone_number}`} className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-2xl text-blue-600 hover:bg-blue-100 transition-all active:scale-95">
                  <Mail size={24} className="mb-1" />
                  <span className="text-xs font-bold">Message</span>
                </a>
              </div>
            </div>

            {/* Donor Vitals Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <User size={18} className="text-slate-400" /> Donor Vitals
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-50">
                  <div className="flex items-center gap-3 text-slate-500">
                    <Scale size={18} /> <span className="text-sm">Weight</span>
                  </div>
                  <span className="font-bold text-slate-900">{user.donor.weight || "N/A"} KG</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-50">
                  <div className="flex items-center gap-3 text-slate-500">
                    <User size={18} /> <span className="text-sm">Gender</span>
                  </div>
                  <span className="font-bold text-slate-900 capitalize">{user.common.gender}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-slate-500">
                    <Calendar size={18} /> <span className="text-sm">Age</span>
                  </div>
                  <span className="font-bold text-slate-900">{calculateAge(user.common.date_of_birth)} Years</span>
                </div>
              </div>
            </div>

            {/* Volunteer Status (New Section) */}
            {user.volunteer?.requested && (
              <div className="bg-slate-900 rounded-3xl p-6 shadow-lg text-white">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Award size={18} className="text-yellow-400" /> Volunteer Profile
                </h3>
                <div className="space-y-3 text-sm">
                  <p className="flex justify-between"><span className="text-slate-400">Status:</span> <span className="capitalize text-yellow-400 font-bold">{user.volunteer.status}</span></p>
                  <p className="flex justify-between"><span className="text-slate-400">Assigned:</span> <span>{user.volunteer.assigned_area || "General"}</span></p>
                  <div className="pt-2 flex flex-wrap gap-1">
                    {user.volunteer.skills.map((skill, i) => (
                      <span key={i} className="bg-white/10 px-2 py-1 rounded text-[10px]">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: History and Status */}
          <div className="lg:col-span-2 space-y-6">
            <div className={`rounded-3xl p-6 border flex flex-col md:flex-row items-center gap-4 transition-all ${status ? "bg-emerald-50 border-emerald-100" : "bg-amber-50 border-amber-100"}`}>
              <div className={`p-4 rounded-2xl ${status ? "bg-emerald-500" : "bg-amber-500"} text-white shadow-lg`}>
                {status ? <CheckCircle2 size={32} /> : <AlertCircle size={32} />}
              </div>
              <div className="text-center md:text-left">
                <h2 className={`text-xl font-bold ${status ? "text-emerald-900" : "text-amber-900"}`}>
                  {status ? "Ready to Donate" : "Recovery Period"}
                </h2>
                <p className={`text-sm mt-1 ${status ? "text-emerald-700" : "text-amber-700"}`}>
                  {status ? `It has been ${daysSince} days since last donation. Eligible.` : `Last donated ${daysSince} days ago. 120-day rest period is recommended.`}
                </p>
              </div>
            </div>

            {/* Donation History */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <History className="text-red-500" />
                  <h3 className="font-bold text-slate-900">Donation History</h3>
                </div>
                <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-bold text-slate-500">
                  {user.donor.donation_history?.length || 0} Donations
                </span>
              </div>
              <div className="p-6">
                {user.donor.donation_history?.length > 0 ? (
                  <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-100">
                    {user.donor.donation_history.map((log, i) => (
                      <div key={i} className="relative flex items-start gap-6 group">
                        <div className="absolute left-0 w-10 h-10 bg-white border-2 border-red-500 rounded-full flex items-center justify-center z-10 shadow-sm transition-transform group-hover:scale-110">
                          <Droplet size={16} className="text-red-500" />
                        </div>
                        <div className="ml-12 pt-1">
                          <time className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-md uppercase tracking-widest">{log.donation_date}</time>
                          <h4 className="text-md font-bold text-slate-900 mt-2">For: {log.patient_name}</h4>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-2 text-sm text-slate-500">
                            <span className="flex items-center gap-1.5"><Hospital size={14} className="text-slate-400" /> {log.hospital_name}</span>
                            <span className="flex items-center gap-1.5"><MapPin size={14} className="text-slate-400" /> {log.location}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-400">
                    <History size={48} className="mx-auto mb-3 opacity-20" />
                    <p>No donation records available for this donor yet.</p>
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

export default DonorDetails;