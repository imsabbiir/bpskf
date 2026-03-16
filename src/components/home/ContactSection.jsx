import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactSection() {
  const contacts = [
    { icon: <Phone />, label: "জরুরি কল", val: "+880 1XXX XXXXXX" },
    { icon: <Mail />, label: "সাধারণ ইমেল", val: "info@bpsf.org" },
    { icon: <MapPin />, label: "আমাদের সদর দফতর", val: "বিরাবো, রূপগঞ্জ, নারায়ণগঞ্জ" },
  ];

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-slate-900 rounded-[4rem] overflow-hidden flex flex-col lg:flex-row shadow-3xl">
          {/* Left Side: Contact Info */}
          <div className="lg:w-1/2 p-12 md:p-20 text-white flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              চলুন কথা বলি <br />
              <span className="text-green-400">প্রগতি।</span>
            </h2>
            <p className="text-slate-400 text-lg mb-12 font-medium">
              আপনার প্রজেক্ট প্রস্তাবনা বা রক্ত সহায়তার প্রয়োজন? আমাদের দল ২৪/৭ কমিউনিটির জন্য প্রস্তুত।
            </p>

            <div className="space-y-8">
              {contacts.map((item, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-green-500 transition-all duration-500 group-hover:rotate-12">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                      {item.label}
                    </p>
                    <p className="text-xl font-bold">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="lg:w-1/2 bg-slate-50 p-12 md:p-20">
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1">
                    পূর্ণ নাম
                  </label>
                  <input
                    type="text"
                    placeholder="আপনার নাম"
                    className="w-full p-5 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-green-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1">
                    ইমেল
                  </label>
                  <input
                    type="email"
                    placeholder="আপনার ইমেল"
                    className="w-full p-5 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-green-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1">
                  আপনার বার্তা
                </label>
                <textarea
                  rows="4"
                  placeholder="আমরা কিভাবে সাহায্য করতে পারি?"
                  className="w-full p-5 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-green-500 outline-none transition-all"
                />
              </div>

              <button className="w-full py-5 bg-green-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-green-100 hover:bg-slate-900 hover:shadow-none transition-all duration-500">
                বার্তা পাঠান
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}