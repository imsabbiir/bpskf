import { User, DollarSign, Handshake } from "lucide-react";

export default function CTASection() {
  const actions = [
    { icon: <User size={20} />, label: "স্বেচ্ছাসেবক হোন" },
    { icon: <DollarSign size={20} />, label: "দান করুন" },
    { icon: <Handshake size={20} />, label: "সাথী হোন" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto bg-linear-to-br from-green-600 to-emerald-700 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-green-500/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />

        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            পরিবর্তন আনার জন্য প্রস্তুত?
          </h2>
          <p className="text-gray-200 text-lg mb-10 max-w-xl mx-auto">
            আপনি সময়, অর্থ বা রক্ত দান করুন—আপনার অবদান জীবন রক্ষা করে এবং আমাদের পৃথিবীকে সুরক্ষিত রাখে।
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            {actions.map((btn) => (
              <button
                key={btn.label}
                className="flex items-center gap-2 px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all font-semibold border border-white/10"
              >
                {btn.icon} {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}