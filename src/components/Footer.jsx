import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, ChevronRight, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: About */}
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-white tracking-tight">
              BPSF<span className="text-green-500">.</span>
            </h3>
            <p className="text-sm leading-relaxed text-slate-400">
              বিরাবো প্রগতি সমাজকল্যাণ ফাউন্ডেশন একটি অলাভজনক সংস্থা, যা স্বাস্থ্যসেবা, পরিবেশ সচেতনতা এবং মানবিক সহায়তার মাধ্যমে সমাজকে উন্নত করতে কাজ করে।
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
            <h4 className="text-white font-bold mb-6">দ্রুত লিঙ্ক</h4>
            <ul className="space-y-4">
              {[
                "আমাদের সম্পর্কে",
                "আমাদের লক্ষ্য",
                "সাফল্যের গল্প",
                "স্বেচ্ছাসেবক হোন",
                "দান করুন",
              ].map((link) => (
                <li key={link}>
                  <Link
                    href={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
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
            <h4 className="text-white font-bold mb-6">প্রভাবের ক্ষেত্র</h4>
            <ul className="space-y-4">
              {[
                "রক্ত দান",
                "গাছ রোপণ",
                "স্বাস্থ্য সচেতনতা",
                "শিক্ষা সহায়তা",
                "জরুরি ত্রাণ",
              ].map((area) => (
                <li key={area} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  {area}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-6">
            <h4 className="text-white font-bold">নিউজলেটার</h4>
            <p className="text-sm text-slate-400">
              আমাদের সর্বশেষ প্রকল্প এবং আসন্ন ইভেন্টের আপডেট পান।
            </p>
            <div className="relative">
              <input
                type="email"
                placeholder="ইমেল ঠিকানা"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 transition-colors"
              />
              <button className="absolute right-2 top-2 px-3 py-1 bg-green-600 text-white rounded-lg text-xs font-bold hover:bg-green-700 transition-colors">
                যোগ করুন
              </button>
            </div>
            <div className="pt-4 border-t border-white/5">
              <p className="text-[10px] uppercase tracking-widest text-slate-500">
                রেজি নং: XXX-XXX-2025
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {currentYear} BPSF. সর্বস্বত্ব সংরক্ষিত।</p>
          <p className="flex items-center gap-1">
            তৈরি হয়েছে{" "}
            <Heart size={14} className="text-red-500 fill-red-500" /> দ্বারা
            বিরাবোতে
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              গোপনীয়তার নীতি
            </a>
            <a href="#" className="hover:text-white transition-colors">
              পরিষেবার শর্তাবলী
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}