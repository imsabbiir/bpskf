/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ArrowLeft, Phone, MapPin, Award } from "lucide-react";
import Link from "next/link";

const VolunteerDetails = async ({ params }) => {
  const { id } = await params;
  let volunteer = null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/volunteers/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("ডাটা আনা যায়নি");
    volunteer = await res.json();
    console.log(volunteer);
  } catch (err) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
          <Award size={40} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">ভলান্টিয়ার পাওয়া যায়নি</h2>
        <p className="text-slate-500 mt-2">আপনি যে ভলান্টিয়ারের প্রোফাইল খুঁজছেন, তা বিদ্যমান নেই।</p>
        <Link
          href="/volunteer"
          className="mt-6 px-6 py-2 bg-slate-900 text-white rounded-xl font-medium flex items-center gap-2"
        >
          <ArrowLeft size={18} /> ভলান্টিয়ারদের কাছে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* উপরের নেভিগেশন */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/volunteer"
            className="flex items-center gap-2 text-slate-600 hover:text-green-600 transition-colors"
          >
            <ArrowLeft size={20} /> <span className="font-medium">ভলান্টিয়ারদের কাছে ফিরে যান</span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* বাম কলাম: প্রোফাইল কার্ড */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <img
                src={volunteer.image || "https://i.pravatar.cc/150"}
                alt={volunteer.name}
                className="w-full h-full object-cover rounded-3xl border-4 border-white shadow-lg"
              />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">{volunteer.name}</h1>
            <p className="text-slate-500 text-sm flex items-center justify-center gap-1 mt-1">
              <Phone size={14} className="text-green-600" /> {volunteer.phone}
            </p>
            <p className="text-slate-500 text-sm flex items-center justify-center gap-1 mt-1">
              <MapPin size={14} className="text-green-600" /> {volunteer.city}, {volunteer.district}
            </p>

            {/* যোগাযোগ বোতাম */}
            <div className="mt-6 flex justify-center gap-3">
              <a
                href={`tel:${volunteer.phone}`}
                className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-2xl text-green-600 hover:bg-green-100 transition-all active:scale-95"
              >
                <Phone size={24} className="mb-1" /> <span className="text-xs font-bold">কল করুন</span>
              </a>
            </div>
          </div>

          {/* ভলান্টিয়ারের দক্ষতা */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Award size={18} className="text-yellow-400" /> ভলান্টিয়ারের দক্ষতা
            </h3>
            <div className="flex flex-wrap gap-2">
              {volunteer.skills.length > 0 ? (
                volunteer.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-green-50 px-3 py-1 rounded-full text-green-700 text-xs font-semibold"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-slate-400 text-sm">কোনো দক্ষতা তালিকাভুক্ত নেই</p>
              )}
            </div>
          </div>

          {/* যোগদানের তারিখ */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">যোগদানের তারিখ</h3>
            <p className="text-slate-500 text-sm">{new Date(volunteer.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        {/* ডান কলাম: কার্যকলাপ */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Award size={18} className="text-yellow-400" /> ভলান্টিয়ারের কার্যকলাপ
            </h3>
            <p className="text-slate-500 text-sm">
              এই ভলান্টিয়ারের কার্যকলাপ বা নোট এখানে প্রদর্শিত হবে।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDetails;