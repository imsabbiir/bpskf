"use client"
import { motion } from "framer-motion";
import { CheckCircle2, ExternalLink } from "lucide-react";

export default function MemberBenefitsSection() {
  const hospitals = ["ডিকেএমসি হাসপাতাল", "ম্যাডিলাইফ হাসপাতাল"];
  const benefits = [
    { title: "ওপিডি ও ডায়াগনস্টিক", discount: "২৫% ছাড়" },
    { title: "ওষুধ ও ফার্মেসি", discount: "১০% ছাড়" },
    { title: "জরুরি ভর্তি", discount: "প্রাধান্য" },
  ];

  return (
    <section className="bg-white pt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-linear-to-br from-slate-900 to-slate-800 rounded-[4rem] p-12 md:p-24 overflow-hidden relative shadow-3xl">
          {/* Blur Circle */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] -mr-48 -mt-48" />

          <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
            {/* Left Text */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
                প্রিমিয়াম স্বাস্থ্য <br />
                <span className="text-green-400 font-medium italic underline decoration-white/20">
                  সদস্য সুবিধা
                </span>
              </h2>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                প্রধান হাসপাতালগুলোর সাথে আমাদের কৌশলগত সহযোগিতার মাধ্যমে
                BPSF সদস্যরা প্রাধান্যপূর্ণ চিকিৎসা এবং আর্থিক সহায়তা পেতে পারেন।
              </p>

              {/* Hospitals */}
              <div className="grid sm:grid-cols-2 gap-6">
                {hospitals.map((hosp) => (
                  <div
                    key={hosp}
                    className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="p-2 bg-green-500/20 rounded-lg text-green-400">
                        <CheckCircle2 size={16} />
                      </span>
                      <ExternalLink size={14} className="text-slate-600" />
                    </div>
                    <h4 className="text-white font-bold text-xl mb-1">{hosp}</h4>
                    <p className="text-xs font-bold text-green-400 uppercase tracking-widest">
                      সুপারিশকৃত ছাড়
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Benefits List */}
            <div className="relative">
              <div className="space-y-4">
                {benefits.map((benefit, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="p-6 bg-white rounded-3xl flex items-center justify-between shadow-lg"
                  >
                    <span className="font-bold text-slate-800">{benefit.title}</span>
                    <span className="px-4 py-1 bg-green-100 text-green-700 rounded-full text-xs font-black">
                      {benefit.discount}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}